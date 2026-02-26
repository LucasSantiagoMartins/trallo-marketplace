import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHeader from "../components/PageHeader";
import CartItemCard from "../components/CartItemCard";
import PaymentChoiceModal from "@/components/PaymentChoiceModal";
import CheckoutModal from "@/components/CheckoutModal";
import EmptyCartCard from "../components/EmptyCartCard";
import { getMyCart } from "@/services/cart.service";
import { BASE_UPLOAD_URL } from "@/api/endpoints";

interface CartItem {
  id: string;
  name: string;
  attr: string;
  price: number;
  qty: number;
  image: string;
}

const CartPage: React.FC = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [modalType, setModalType] = useState<
    "single" | "all" | "payment_choice" | "checkout" | null
  >(null);
  const [idToRemove, setIdToRemove] = useState<string | null>(null);
  const [paymentType, setPaymentType] = useState<"online" | "presencial">(
    "online",
  );
  const [paymentMethod, setPaymentMethod] = useState<"mcx" | "transfer">("mcx");

  useEffect(() => {
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

    fetchCart();
  }, []);

  const updateQty = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item,
      ),
    );
  };

  const handleOpenRemoveModal = (id: string) => {
    setIdToRemove(id);
    setModalType("single");
  };

  const handleConfirmAction = () => {
    if (modalType === "single" && idToRemove !== null) {
      setItems((prev) => prev.filter((item) => item.id !== idToRemove));
    } else if (modalType === "all") {
      setItems([]);
    }
    closeModal();
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
                exit={{
                  opacity: 0,
                  scale: 0.8,
                  transition: { duration: 0.2 },
                }}
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
          />
        )}

        {(modalType === "single" || modalType === "all") && (
          <div className="fixed inset-0 z-[130] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-[#1c182d] w-full max-w-md rounded-3xl p-6 text-center"
            >
              <h4 className="text-lg font-bold mb-6">
                {modalType === "all" ? "Limpar carrinho?" : "Remover item?"}
              </h4>
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleConfirmAction}
                  className="w-full py-3 text-white bg-red-500 rounded-xl font-bold"
                >
                  Sim, confirmar
                </button>
                <button
                  onClick={closeModal}
                  className="w-full py-3 text-gray-500 bg-gray-100 dark:bg-white/5 rounded-xl"
                >
                  Cancelar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CartPage;