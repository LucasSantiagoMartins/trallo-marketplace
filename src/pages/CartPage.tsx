import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import PageHeader from "../components/PageHeader";
import CartItemCard from "../components/CartItemCard";
import PaymentChoiceModal from "@/components/PaymentChoiceModal";
import CheckoutModal from "@/components/CheckoutModal";
import EmptyState from "@/components/EmptyState";
import CartTotalPanel from "../components/CartTotalPanel";
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
import { useCart } from "@/hooks/use-cart";
import { CartItemDto } from "@/dtos/cart";

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { syncCartWithServer } = useCart();
  const [items, setItems] = useState<CartItemDto[]>([]);
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
        const formattedItems: CartItemDto[] = res.data.items.map((item) => ({
          id: item.id,
          name: item.product.name,
          attr: item.product.description,
          price: item.priceSnapshot,
          qty: item.quantity,
          image: `${BASE_UPLOAD_URL}/${item.product.coverImage}`,
          availableQuantity: item.product.availableQuantity,
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
        {isLoading ? (
          <div className="flex justify-center pt-10">
            <div className="w-8 h-8 border-4 border-[#6d3ff8] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : items.length > 0 ? (
          items.map((item) => (
            <div
              key={item.id}
              className="animate-in fade-in zoom-in-95 duration-300"
            >
              <CartItemCard
                item={item}
                onUpdateQty={updateQty}
                onRemove={handleOpenRemoveModal}
              />
            </div>
          ))
        ) : (
          <div className="animate-in fade-in duration-500 pt-10">
            <EmptyState
              icon="shopping_cart"
              title="Teu carrinho está vazio"
              description="Parece que ainda não adicionaste nenhum produto ao teu carrinho. Explora os nossos produtos e encontra o que precisas."
            />
          </div>
        )}
      </main>

      {items.length > 0 && !modalType && !isLoading && (
        <CartTotalPanel
          total={total}
          onCheckout={() => setModalType("payment_choice")}
        />
      )}

      {modalType === "payment_choice" && (
        <div className="fixed inset-0 z-[80] animate-in fade-in duration-200">
          <PaymentChoiceModal
            onClose={closeModal}
            onSelect={(type) => {
              setPaymentType(type);
              setModalType("checkout");
            }}
          />
        </div>
      )}

      {modalType === "checkout" && (
        <div className="fixed inset-0 z-[80] animate-in slide-in-from-right duration-300">
          <CheckoutModal
            paymentType={paymentType}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            deliveryFee={deliveryFee}
            total={total}
            onClose={closeModal}
            onConfirm={handleConfirmCheckout}
          />
        </div>
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
    </div>
  );
};

export default CartPage;
