import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import TralloButton from "@/components/TralloButton";
import { PendingVerificationDTO } from "@/types/product";
import { BASE_UPLOAD_URL } from "@/api/endpoints";
import { formatPrice } from "@/utils/currency";
import { getProductStatusLabel } from "@/utils/mappers/product.mapper";

interface ProductVerificationCardProps {
  product: PendingVerificationDTO;
  onAction?: (product: PendingVerificationDTO) => void;
}

const ProductVerificationCard: React.FC<ProductVerificationCardProps> = ({ product, onAction }) => {
  const navigate = useNavigate();
  const timeAgo = new Date(product.createdAt).toLocaleDateString("pt-AO");

  const handleVerifyClick = () => {
    if (onAction) onAction(product);
    navigate(`/area-operacional/validar-produto`, { state: { product } });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-slate-800/40 rounded-[2rem] p-4 border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
      <div className="flex gap-4">
        <div className="w-20 h-20 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden flex-shrink-0 ring-1 ring-slate-200 dark:ring-white/10">
          <img src={BASE_UPLOAD_URL + product.coverImage} alt={product.name} className="w-full h-full object-cover" />
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex justify-between items-start mb-1">
            <span className="bg-[#6C3EF8]/10 text-[#6C3EF8] text-[8px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
              {getProductStatusLabel(product.status)}
            </span>
            <span className="text-[10px] font-medium text-slate-400">{timeAgo}</span>
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white line-clamp-1 text-sm mb-0.5">{product.name}</h3>
          <div className="flex items-center justify-between mt-auto">
            <p className="clash-font font-bold text-lg text-slate-900 dark:text-white">{formatPrice(product.price)}</p>
            <TralloButton variant="primary" onClick={handleVerifyClick} className="!h-8 !px-4 !text-[9px] !uppercase !bg-[#6C3EF8] !rounded-full">
              Verificar
            </TralloButton>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductVerificationCard;