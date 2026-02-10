import React from "react";
import { motion } from "framer-motion";
import TralloButton from "@/components/TralloButton";

export interface ValidationItem {
  id: number;
  name: string;
  price: string;
  seller: string;
  type: "store" | "person";
  timeAgo: string;
  image: string;
  category: string;
}

interface ValidationCardProps {
  item: ValidationItem;
  onOpen: () => void;
}

const ValidationCard: React.FC<ValidationCardProps> = ({ item, onOpen }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2 }}
    className="bg-white dark:bg-slate-800/40 rounded-[2rem] p-4 border border-slate-100 dark:border-slate-800 shadow-sm relative transition-all hover:shadow-md"
  >
    <div className="flex gap-4">
      <div className="w-20 h-20 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden flex-shrink-0 ring-1 ring-slate-200 dark:ring-white/10">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex justify-between items-start mb-1">
          <span className="bg-[#6C3EF8]/10 text-[#6C3EF8] text-[8px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
            Pendente
          </span>
          <span className="text-[10px] font-medium text-slate-400">
            {item.timeAgo}
          </span>
        </div>

        <h3 className="font-bold text-slate-900 dark:text-white line-clamp-1 text-sm tracking-tight mb-0.5">
          {item.name}
        </h3>

        <div className="flex items-center gap-1 text-slate-500 mb-2">
          <span className="material-symbols-outlined text-[14px]">
            {item.type === "store" ? "storefront" : "person"}
          </span>
          <span className="text-[11px] font-medium truncate">
            {item.seller}
          </span>
        </div>
        
        <div className="flex items-center justify-between mt-auto">
          <p className="clash-font font-bold text-lg text-slate-900 dark:text-white">
            {item.price}
          </p>
          
          <TralloButton
            variant="primary"
            icon="check_circle"
            onClick={onOpen}
            className="!h-8 !px-3 !text-[9px] !uppercase !tracking-widest !bg-[#6C3EF8] !rounded-full"
          >
            Validar
          </TralloButton>
        </div>
      </div>
    </div>
  </motion.div>
);

export default ValidationCard;