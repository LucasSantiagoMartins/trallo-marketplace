import React from "react";
import { Link } from "react-router-dom";
import { SearchedProductDTO } from "@/types/product";
import { BASE_UPLOAD_URL } from "@/api/endpoints";
import {
  getProductConditionLabel,
  getProductConditionColor,
  getProductStatusLabel,
  getProductStatusColor,
} from "@/utils/mappers/productMapper";

interface ProductCardProps {
  product: SearchedProductDTO;
  onAddToCart?: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const formatPrice = (value: number) => {
    return value.toLocaleString("pt-AO");
  };

  const displayImage = product.coverImage
    ? `${BASE_UPLOAD_URL}${product.coverImage}`
    : "/placeholder-product.png";

  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-col w-full">
      <div className="relative aspect-video sm:aspect-square lg:aspect-[4/3] overflow-hidden bg-slate-50">
        <Link to={`/produto/${product.id}`}>
          <img
            src={displayImage}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          <div
            className={`text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm backdrop-blur-md bg-white/80 ${getProductConditionColor(product.condition)}`}
          >
            {getProductConditionLabel(product.condition)}
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h4 className="text-slate-800 font-semibold text-base mb-1 line-clamp-1 group-hover:text-primary transition-colors">
              {product.name}
            </h4>

            <div
              className={`inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider ${getProductStatusColor(product.status)}`}
            >
              {getProductStatusLabel(product.status)}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-1">
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-black text-slate-900">
              {formatPrice(product.price)}
            </span>
            <span className="text-[10px] font-bold text-primary uppercase">
              Kz
            </span>
          </div>

          <button
            onClick={() => onAddToCart?.(product.id)}
            className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center relative overflow-hidden transition-all duration-300 active:scale-95 border-2 border-primary bg-transparent group"
          >
            <span className="material-symbols-outlined text-lg text-primary relative z-10">
              shopping_cart
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
