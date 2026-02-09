import React, { forwardRef } from "react";
import { motion } from "framer-motion";

const EmptyCartCard = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9, y: 15 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          delay: 0.1,
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        },
      }}
      exit={{
        opacity: 0,
        scale: 0.9,
        transition: { duration: 0.2 },
      }}
      className="p-8 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800/50 dark:to-[#1c182d] rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-sm text-center"
    >
      <div className="size-16 rounded-3xl bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] flex items-center justify-center text-white mb-6 shadow-lg shadow-purple-500/20 mx-auto">
        <span className="material-symbols-outlined text-3xl">
          shopping_cart_off
        </span>
      </div>

      <h4 className="font-black text-xl mb-2 tracking-tight text-[#181112] dark:text-white">
        Seu carrinho está vazio
      </h4>

      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-[250px] mx-auto">
        Parece que você ainda não adicionou nenhum produto. Que tal explorar
        nossas ofertas?
      </p>

      <div className="mt-8 pt-6 border-t border-gray-100 dark:border-white/5">
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#6d3ff8]/10 border border-[#6d3ff8]/20 group active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-xl text-[#7C3AED]">
            arrow_back
          </span>
          <p className="text-xs font-black text-[#7C3AED] uppercase tracking-wider">
            Voltar para a loja
          </p>
        </button>
      </div>
    </motion.div>
  );
});

EmptyCartCard.displayName = "EmptyCartCard";

export default EmptyCartCard;
