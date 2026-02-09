import React, { useState } from "react";
import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";

const CART_ITEMS = [
  {
    id: 1,
    name: "Nike Air Force 1",
    attr: "Tamanho: 42 • Cor: Branco",
    price: "25.500,00",
    qty: 1,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=200",
  },
  {
    id: 2,
    name: "Camiseta Oversized Trallo",
    attr: "Tamanho: L • Cor: Preto",
    price: "12.000,00",
    qty: 2,
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=200",
  },
  {
    id: 3,
    name: "Relógio Digital Premium",
    attr: "Cor: Prateado",
    price: "45.900,00",
    qty: 1,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200",
  },
];

const CartPage: React.FC = () => {
  const [items] = useState(CART_ITEMS);

  return (
    <div className="min-h-screen bg-[#f6f5f8] dark:bg-[#141022] text-[#121118] dark:text-white pb-40">
      <PageHeader
        title="Carrinho"
        rightElement={
          <button className="text-[#6d3ff8] font-bold text-sm px-2">Limpar</button>
        }
      />

      <main className="px-4 pt-24 space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-white/5 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-white/10 flex gap-4"
          >
            <div className="size-24 shrink-0 bg-gray-100 dark:bg-white/5 rounded-xl overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            
            <div className="flex flex-col flex-1 justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-base leading-tight">{item.name}</h3>
                  <button className="text-gray-400">
                    <span className="material-symbols-outlined text-xl">close</span>
                  </button>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">{item.attr}</p>
              </div>

              <div className="flex items-center justify-between mt-2">
                <span className="font-bold text-lg text-[#6d3ff8]">{item.price} Kz</span>
                <div className="flex items-center bg-gray-100 dark:bg-white/5 rounded-full p-1 gap-3">
                  <button className="size-8 flex items-center justify-center rounded-full bg-white dark:bg-white/10 shadow-sm text-[#6d3ff8]">
                    <span className="material-symbols-outlined text-sm">remove</span>
                  </button>
                  <span className="font-bold text-sm w-4 text-center">{item.qty}</span>
                  <button className="size-8 flex items-center justify-center rounded-full bg-[#6d3ff8] text-white shadow-sm">
                    <span className="material-symbols-outlined text-sm">add</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* Bottom Sheet Expansível */}
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 350 }} 
        dragElastic={0.05}
        initial={{ y: 280 }} // Começa minimizado (apenas a ponta visível)
        animate={{ y: 0 }} // Sobe para a posição aberta ao carregar (ou você pode manter minimizado)
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed bottom-0 left-0 right-0 z-[70] bg-white dark:bg-[#1c182d] rounded-t-[2.5rem] shadow-[0_-15px_50px_rgba(0,0,0,0.15)] border-t border-gray-100 dark:border-white/10 px-6 pb-12 pt-4 backdrop-blur-2xl"
      >
        {/* Barra de Arrastar (Handle) */}
        <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mb-8 cursor-grab active:cursor-grabbing" />

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center text-gray-500 dark:text-gray-400">
              <span className="text-sm">Subtotal</span>
              <span className="font-bold">95.400,00 Kz</span>
            </div>
            <div className="flex justify-between items-center text-gray-500 dark:text-gray-400">
              <span className="text-sm">Taxa de Entrega</span>
              <span className="text-green-500 font-bold">Grátis</span>
            </div>
            
            <div className="pt-4 border-t border-dashed border-gray-200 dark:border-white/10 flex justify-between items-center">
              <div>
                <span className="block text-xs text-gray-400 uppercase font-black">Total a pagar</span>
                <span className="font-black text-3xl text-[#121118] dark:text-white">
                  95.400,00 <span className="text-sm">Kz</span>
                </span>
              </div>
            </div>
          </div>

          <button className="w-full bg-gradient-to-r from-[#FF4D6D] to-[#ff758c] text-white py-5 rounded-2xl font-black text-lg shadow-lg shadow-[#FF4D6D]/30 active:scale-[0.98] transition-all flex items-center justify-center gap-3">
            <span className="material-symbols-outlined">payments</span>
            Finalizar Compra
          </button>
          
          <div className="mt-8 p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5 flex items-center gap-3 text-gray-500 dark:text-gray-400 text-xs">
            <span className="material-symbols-outlined text-sm">shield</span>
            Pagamento 100% seguro via Multicaixa Express
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CartPage;