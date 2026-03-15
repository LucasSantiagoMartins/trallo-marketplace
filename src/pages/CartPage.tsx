import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import PageHeader from "../components/PageHeader";
import CartItemCard from "../components/CartItemCard";
import PaymentChoiceModal from "@/components/PaymentChoiceModal";
import CheckoutModal from "@/components/CheckoutModal";
import EmptyCartCard from "../components/EmptyCartCard";
import {
  getMyCart,
  updateCartItemQuantity,
  removeFromCart,
  clearCart,
} from "@/services/cart.service";
import { BASE_UPLOAD_URL } from "@/api/endpoints";
import { checkoutFromCart } from "@/services/checkout.service";
import { PaymentMethod, PaymentMode } from "@/enums/payment";
import ConfirmAction from "@/components/ConfirmAction";
import TralloButton from "@/components/TralloButton";
import { formatPrice } from "@/utils/currency";
import { useCart } from "@/hooks/use-cart";

interface CartItem {
  id: string;
  name: string;
  attr: string;
  price: number;
  qty: number;
  image: string;
}

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { syncCartWithServer } = useCart();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalType, setModalType] = useState<
    "single" | "all" | "payment_choice" | "checkout" | null
  >(null);
  const [idToRemove, setIdToRemove] = useState<string | null>(null);
  const [paymentType, setPaymentType] = useState<"online" | "presencial">(
    "online",
  );
  const [paymentMethod, setPaymentMethod] = useState<"mcx" | "transfer">("mcx");

  const fetchCart = async () => {
    try {
      const res = await getMyCart();
      if (res.success && res.data) {
        const formattedItems: CartItem[] = res.data.items.map((item) => ({
          id: item.id,
          name: item.product.name,
          attr: item.product.description,
          price: item.priceSnapshot,
          qty: item.quantity,
          image: `${BASE_UPLOAD_URL}/${item.product.coverImage}`,
        }));
        setItems(formattedItems);
      }
    } catch (err) {
      toast.error("Erro ao carregar o carrinho.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQty = async (id: string, delta: number) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;

    const newQty = Math.max(1, item.qty + delta);
    const res = await updateCartItemQuantity(id, newQty);

    if (res.success) {
      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, qty: newQty } : i)),
      );
    } else {
      toast.error(res.message || "Erro ao atualizar quantidade.");
    }
  };

  const handleOpenRemoveModal = (id: string) => {
    setIdToRemove(id);
    setModalType("single");
  };

  const handleConfirmAction = async () => {
    if (modalType === "single" && idToRemove) {
      try {
        const res = await removeFromCart(idToRemove);
        if (res.success) {
          setItems((prev) => prev.filter((item) => item.id !== idToRemove));
          syncCartWithServer();
          toast.success("Item removido.");
        }
      } catch (error) {
        toast.error("Não foi possível remover o item.");
      }
    } else if (modalType === "all") {
      try {
        const res = await clearCart();
        if (res.success) {
          setItems([]);
          syncCartWithServer();
          toast.success("Carrinho limpo com sucesso.");
        }
      } catch (error) {
        toast.error("Erro ao limpar o carrinho.");
      }
    }
    closeModal();
  };

  const handleConfirmCheckout = async () => {
    try {
      const mode =
        paymentType === "online"
          ? PaymentMode.ONLINE_PAYMENT
          : PaymentMode.ONSITE_PAYMENT;

      let method;
      if (paymentType === "online") {
        method =
          paymentMethod === "mcx"
            ? PaymentMethod.MULTICAIXA_EXPRESS
            : PaymentMethod.REFERENCE;
      }

      const response = await checkoutFromCart({
        paymentMode: mode,
        paymentMethod: method,
      });

      if (response && response.success) {
        toast.success("Pedido realizado com sucesso.");
        syncCartWithServer();
        navigate("/meus-pedidos", { state: { order: response.data } });
        return response.data;
      } else {
        toast.error(response.message || "Erro ao processar o pedido.");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao finalizar checkout.",
      );
    }
  };

  const closeModal = () => {
    setModalType(null);
    setIdToRemove(null);
  };

  const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);
  const deliveryFee = paymentType === "presencial" ? 0 : 2500;
  const total = subtotal + deliveryFee;

  const isClearingAll = modalType === "all";

  return (
    <div className="min-h-screen bg-[#f6f5f8] dark:bg-[#141022] text-[#121118] dark:text-white pb-60">
      <PageHeader
        title="Carrinho"
        rightElement={
          items.length > 0 && (
            <button
              onClick={() => setModalType("all")}
              className="text-[#6d3ff8] font-bold text-sm px-2"
            >
              Limpar
            </button>
          )
        }
        backTo="/"
      />

      <main className="px-4 pt-24 space-y-4 max-w-3xl mx-auto">
        <AnimatePresence mode="popLayout" initial={false}>
          {isLoading ? (
            <div className="flex justify-center pt-10">
              <div className="w-8 h-8 border-4 border-[#6d3ff8] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : items.length > 0 ? (
            items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
              >
                <CartItemCard
                  item={item}
                  onUpdateQty={updateQty}
                  onRemove={handleOpenRemoveModal}
                />
              </motion.div>
            ))
          ) : (
            <EmptyCartCard />
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {items.length > 0 && !modalType && !isLoading && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%", transition: { duration: 0.3 } }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 180 }}
            dragElastic={0.1}
            className="fixed bottom-0 left-0 right-0 z-[70] bg-white dark:bg-[#1c182d] rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] border-t border-gray-100 dark:border-white/10 px-6 pb-12 pt-4 touch-none"
          >
            <div className="max-w-3xl mx-auto flex flex-col items-center">
              <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mb-6" />
              <span className="text-xs text-gray-400 uppercase font-black">
                Total a pagar
              </span>
              <span className="font-black text-3xl mb-6">
                {formatPrice(total)}
              </span>
              <TralloButton
                onClick={() => setModalType("payment_choice")}
                className="w-full bg-[#6d3ff8] text-lg shadow-lg active:scale-[0.98] transition-transform"
              >
                Finalizar Compra
              </TralloButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {modalType === "payment_choice" && (
          <PaymentChoiceModal
            onClose={closeModal}
            onSelect={(type) => {
              setPaymentType(type);
              setModalType("checkout");
            }}
          />
        )}

        {modalType === "checkout" && (
          <CheckoutModal
            paymentType={paymentType}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            deliveryFee={deliveryFee}
            total={total}
            onClose={closeModal}
            onConfirm={handleConfirmCheckout}
          />
        )}

        <ConfirmAction
          isLoading={false}
          description={
            isClearingAll
              ? "irá limpar todos os itens do seu carrinho"
              : "este item será removido do seu carrinho"
          }
          title={
            isClearingAll
              ? "Tem a certeza que quer limpar o carrinho?"
              : "Remover este item?"
          }
          confirmText={isClearingAll ? "limpar carrinho" : "remover"}
          isOpen={modalType === "single" || modalType === "all"}
          onConfirm={handleConfirmAction}
          onClose={closeModal}
        />
      </AnimatePresence>
    </div>
  );
};

export default CartPage;
