import React from "react";
import QuantitySelector from "./QuantitySelector";
import { formatPrice } from "@/utils/currency";

interface CartItem {
  id: string;
  name: string;
  attr: string;
  price: number;
  qty: number;
  image: string;
}

interface CartItemCardProps {
  item: CartItem;
  onUpdateQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({
  item,
  onUpdateQty,
  onRemove,
}) => {
  return (
    <div className="relative bg-white dark:bg-white/5 rounded-2xl p-3 sm:p-4 shadow-sm border border-gray-100 dark:border-white/10 flex items-center gap-3 sm:gap-4 transition-all duration-200">
      <button
        onClick={() => onRemove(item.id)}
        className="absolute -top-2 -right-2 size-7 bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-white/10 rounded-full flex items-center justify-center text-gray-500 transition-colors z-10"
      >
        <span className="material-symbols-outlined text-lg">close</span>
      </button>

      <div className="size-20 sm:size-24 shrink-0 bg-gray-100 dark:bg-white/5 rounded-xl overflow-hidden flex items-center justify-center">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col flex-1 min-w-0 h-full justify-between">
        <div>
          <h3 className="font-bold text-sm sm:text-base leading-tight truncate pr-2">
            {item.name}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-[10px] sm:text-xs mt-0.5 truncate">
            {item.attr}
          </p>
        </div>

        <div className="flex items-center justify-between mt-2 gap-2">
          <span className="font-bold text-sm sm:text-lg text-[#6d3ff8] whitespace-nowrap">
            {formatPrice(item.price)}
          </span>

          <QuantitySelector
            value={item.qty}
            onChange={(delta) => onUpdateQty(item.id, delta)}
            className="scale-90 sm:scale-100 origin-right"
          />
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
