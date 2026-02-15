import { getProductConditionLabel } from "@/utils/mappers/product.mapper";
import React from "react";

interface ProductCardProps {
  productData: any;
  imagesLoaded: boolean;
  thumbnail: string;
  isExpanded: boolean;
  onToggleExpand: () => void;
  primaryColor: string;
}

const ProductReviewCard: React.FC<ProductCardProps> = ({
  productData,
  imagesLoaded,
  thumbnail,
  isExpanded,
  onToggleExpand,
  primaryColor,
}) => {
  return (
    <section className="bg-white dark:bg-slate-900/50 rounded-3xl shadow-sm border border-white/5 overflow-hidden transition-all duration-300">
      <div className="p-6 flex items-center gap-5">
        <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-slate-100 dark:bg-slate-800">
          {!imagesLoaded ? (
            <div className="w-full h-full animate-pulse bg-slate-300 dark:bg-slate-700" />
          ) : (
            <img
              alt="Produto"
              className="w-full h-full object-cover"
              src={thumbnail}
            />
          )}
        </div>
        <div className="flex-1">
          <span
            className="text-[10px] font-bold uppercase"
            style={{ color: primaryColor }}
          >
            {productData.category} • {getProductConditionLabel(productData.condition)}
          </span>
          <h2 className="text-lg font-bold leading-tight">
            {productData.name}
          </h2>
          <p className="text-xl font-black">
            {productData.price} {productData.currency}
          </p>
        </div>
        <button
          onClick={onToggleExpand}
          className="size-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center transition-transform duration-300"
          style={{
            transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <span className="material-symbols-outlined">expand_more</span>
        </button>
      </div>

      {isExpanded && (
        <div className="px-6 pb-6 pt-2 border-t border-slate-100 dark:border-white/5 animate-in slide-in-from-top-2 duration-300">
         
          <p className="text-sm text-slate-500 dark:text-slate-400 italic">
            {productData.description}
          </p>
        </div>
      )}
    </section>
  );
};

export default ProductReviewCard;