import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import CartItemCard from "../components/CartItemCard";
import PaymentChoiceModal from "@/components/PaymentChoiceModal";
import CheckoutModal from "@/components/CheckoutModal";
import EmptyCartCard from "../components/EmptyCartCard";
import ConfirmActionModal from "../components/ConfirmActionModal";
import {
  getMyCart,
  updateCartItemQuantity,
  removeFromCart,
  clearCart,
} from "@/services/cart.service";
import { BASE_UPLOAD_URL } from "@/api/endpoints";
import { checkoutFromCart, PaymentMethod, PaymentMode } from "@/services/checkout.service";

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
  const [items, setItems] = useState<CartItem[]>([]);
  const [modalType, setModalType] = useState<
    "single" | "all" | "payment_choice" | "checkout" | null
  >(null);
  const [idToRemove, setIdToRemove] = useState<string | null>(null);
  const [paymentType, setPaymentType] = useState<"online" | "presencial">(
    "online",
  );
  const [paymentMethod, setPaymentMethod] = useState<"mcx" | "transfer">("mcx");

  const fetchCart = async () => {
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
        }
      } catch (error) {
        console.error("Erro ao remover item:", error);
      }
    } else if (modalType === "all") {
      try {
        const res = await clearCart();
        if (res.success) {
          setItems([]);
        }
      } catch (error) {
        console.error("Erro ao limpar carrinho:", error);
      }
    }
    closeModal();
  };

  const handleConfirmCheckout = async () => {
    try {
      const mode = paymentType === "online"
        ? PaymentMode.ONLINE_PAYMENT
        : PaymentMode.ONSITE_PAYMENT;

      let method;
      if (paymentType === "online") {
        method = paymentMethod === "mcx"
          ? PaymentMethod.MULTICAIXA_EXPRESS
          : PaymentMethod.REFERENCE;
      }

      const response = await checkoutFromCart({
        paymentMode: mode,
        paymentMethod: method
      });

      if (response && response.data) {
        navigate("/orders/success", { state: { order: response.data } });
        return response.data;
      }

      return response;
    } catch (error) {
      console.error("Erro ao finalizar checkout do carrinho", error);
      throw error;
    }
  };

  const closeModal = () => {
    setModalType(null);
    setIdToRemove(null);
  };

  const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);
  const deliveryFee = paymentType === "presencial" ? 0 : 2500;
  const total = subtotal + deliveryFee;

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
      />

      <main className="px-4 pt-24 space-y-4 max-w-3xl mx-auto">
        <AnimatePresence mode="popLayout" initial={false}>
          {items.length > 0 ? (
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
        {items.length > 0 && !modalType && (
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
                {total.toLocaleString("pt-AO")} Kz
              </span>
              <button
                onClick={() => setModalType("payment_choice")}
                className="w-full bg-[#6d3ff8] text-white py-5 rounded-2xl font-black text-lg shadow-lg active:scale-[0.98] transition-transform"
              >
                Finalizar Compra
              </button>
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

        <ConfirmActionModal
          isOpen={modalType === "single" || modalType === "all"}
          type={
            modalType === "single" || modalType === "all" ? modalType : null
          }
          onConfirm={handleConfirmAction}
          onClose={closeModal}
        />
      </AnimatePresence>
    </div>
  );
};

export default CartPage;