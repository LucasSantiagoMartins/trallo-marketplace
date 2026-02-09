import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHeader from "../components/PageHeader";

interface CartItem {
  id: number;
  name: string;
  attr: string;
  price: number;
  qty: number;
  image: string;
}

const INITIAL_ITEMS: CartItem[] = [
  {
    id: 1,
    name: "Nike Air Force 1",
    attr: "Tamanho: 42 • Cor: Branco",
    price: 25500,
    qty: 1,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=200",
  },
  {
    id: 2,
    name: "Camiseta Oversized Trallo",
    attr: "Tamanho: L • Cor: Preto",
    price: 12000,
    qty: 2,
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=200",
  },
  {
    id: 3,
    name: "Relógio Digital Premium",
    attr: "Cor: Prateado",
    price: 45900,
    qty: 1,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200",
  },
];

const CartPage: React.FC = () => {
  const [items, setItems] = useState<CartItem[]>(INITIAL_ITEMS);
  const [modalType, setModalType] = useState<"single" | "all" | null>(null);
  const [idToRemove, setIdToRemove] = useState<number | null>(null);

  const updateQty = (id: number, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item,
      ),
    );
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

  return (
    <div className="min-h-screen bg-[#f6f5f8] dark:bg-[#141022] text-[#121118] dark:text-white pb-60">
      <PageHeader
        title="Carrinho"
        rightElement={
          items.length > 0 && (
            <button
              onClick={() => setModalType("all")}
              className="text-[#6d3ff8] font-bold text-sm px-2 active:opacity-50"
            >
              Limpar
            </button>
          )
        }
      />

      <main className="px-4 pt-24 space-y-4">
        <AnimatePresence mode="popLayout">
          {items.length > 0 ? (
            items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                className="bg-white dark:bg-white/5 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-white/10 flex gap-4"
              >
                <div className="size-24 shrink-0 bg-gray-100 dark:bg-white/5 rounded-xl overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-base leading-tight">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => {
                          setIdToRemove(item.id);
                          setModalType("single");
                        }}
                        className="text-gray-400"
                      >
                        <span className="material-symbols-outlined text-xl">
                          close
                        </span>
                      </button>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                      {item.attr}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-lg text-[#6d3ff8]">
                      {item.price.toLocaleString("pt-AO")} Kz
                    </span>
                    <div className="flex items-center bg-gray-100 dark:bg-white/5 rounded-full p-1 gap-3">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="size-8 flex items-center justify-center rounded-full bg-white dark:bg-white/10 shadow-sm text-[#6d3ff8]"
                      >
                        <span className="material-symbols-outlined text-sm">
                          remove
                        </span>
                      </button>
                      <span className="font-bold text-sm w-4 text-center">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        className="size-8 flex items-center justify-center rounded-full bg-[#6d3ff8] text-white shadow-sm"
                      >
                        <span className="material-symbols-outlined text-sm">
                          add
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center pt-20 text-center"
            >
              <div className="size-24 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-5xl text-gray-300">
                  shopping_cart_off
                </span>
              </div>
              <h2 className="text-xl font-bold mb-2">
                Teu carrinho está vazio
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm max-w-[250px] mb-8">
                Parece que ainda não adicionaste nenhum produto ao teu carrinho.
              </p>
              <button className="bg-[#6d3ff8] text-white px-8 py-3 rounded-xl font-bold active:scale-95 transition-transform">
                Explorar Loja
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Sheet - Só aparece se houver itens */}
      <AnimatePresence>
        {items.length > 0 && (
          <motion.div
            drag="y"
            dragConstraints={{ top: 0, bottom: 260 }}
            initial={{ y: 300 }}
            animate={{ y: 0 }}
            exit={{ y: 500 }}
            className="fixed bottom-0 left-0 right-0 z-[70] bg-white dark:bg-[#1c182d] rounded-t-[2.5rem] shadow-[0_-15px_50px_rgba(0,0,0,0.15)] border-t border-gray-100 dark:border-white/10 px-6 pb-12 pt-4 backdrop-blur-2xl"
          >
            <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mb-8 cursor-grab" />
            <div className="max-w-3xl mx-auto">
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center text-gray-500 text-sm italic">
                  <span>Subtotal</span>
                  <span className="font-bold">
                    {subtotal.toLocaleString("pt-AO")} Kz
                  </span>
                </div>
                <div className="pt-4 border-t border-dashed border-gray-200 dark:border-white/10 flex justify-between items-center">
                  <div>
                    <span className="block text-xs text-gray-400 uppercase font-black">
                      Total a pagar
                    </span>
                    <span className="font-black text-3xl text-[#121118] dark:text-white">
                      {subtotal.toLocaleString("pt-AO")}{" "}
                      <span className="text-sm">Kz</span>
                    </span>
                  </div>
                </div>
              </div>
              <button className="w-full bg-[#6d3ff8] text-white py-5 rounded-2xl font-black text-lg shadow-lg shadow-[#6d3ff8]/30 active:scale-[0.98] flex items-center justify-center gap-3">
                <span className="material-symbols-outlined">payments</span>
                Finalizar Compra
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de Confirmação Único para ambas ações */}
      <AnimatePresence>
        {modalType && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-[#1c182d] w-full max-w-xs rounded-3xl p-6 shadow-2xl text-center"
            >
              <div className="size-16 bg-red-100 dark:bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-red-500 text-3xl">
                  {modalType === "all" ? "delete_sweep" : "delete"}
                </span>
              </div>
              <h4 className="text-lg font-bold mb-2">
                {modalType === "all" ? "Limpar carrinho?" : "Remover item?"}
              </h4>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                {modalType === "all"
                  ? "Tens certeza que desejas remover todos os produtos do carrinho?"
                  : "Desejas retirar este produto do teu carrinho?"}
              </p>
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleConfirmAction}
                  className="w-full py-3 font-bold text-white bg-red-500 rounded-xl active:scale-95 transition-transform"
                >
                  Sim, {modalType === "all" ? "limpar tudo" : "remover"}
                </button>
                <button
                  onClick={closeModal}
                  className="w-full py-3 font-bold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/5 rounded-xl active:scale-95"
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
