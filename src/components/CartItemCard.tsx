import React from "react";
import { motion } from "framer-motion";

interface CartItem {
  id: number;
  name: string;
  attr: string;
  price: number;
  qty: number;
  image: string;
}

interface CartItemCardProps {
  item: CartItem;
  onUpdateQty: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({
  item,
  onUpdateQty,
  onRemove,
}) => {
  return (
    <motion.div
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
            <h3 className="font-bold text-base leading-tight">{item.name}</h3>
            <button onClick={() => onRemove(item.id)} className="text-gray-400">
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
            {item.attr}
          </p>
        </div>

        <div className="flex items-center justify-between mt-2">
          <span className="font-bold text-sm md:text-lg text-[#6d3ff8] whitespace-nowrap">
            {item.price.toLocaleString("pt-AO")} Kz
          </span>
          <div className="flex items-center bg-gray-100 dark:bg-white/5 rounded-full p-1 gap-3">
            <button
              onClick={() => onUpdateQty(item.id, -1)}
              className="size-8 flex items-center justify-center rounded-full bg-white dark:bg-white/10 shadow-sm text-[#6d3ff8]"
            >
              <span className="material-symbols-outlined text-sm">remove</span>
            </button>
            <span className="font-bold text-sm w-4 text-center">
              {item.qty}
            </span>
            <button
              onClick={() => onUpdateQty(item.id, 1)}
              className="size-8 flex items-center justify-center rounded-full bg-[#6d3ff8] text-white shadow-sm"
            >
              <span className="material-symbols-outlined text-sm">add</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItemCard;
