import React from "react";
import { useNavigate } from "react-router-dom";
import { SearchedProductDTO } from "@/types/product";
import { BASE_UPLOAD_URL } from "@/api/endpoints";
import {
  getProductConditionLabel,
  getProductConditionColor,
  getProductStatusLabel,
  getProductStatusColor,
} from "@/utils/mappers/product.mapper";
import { formatPrice } from "@/utils/currency";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/enums/user";

interface ProductCardProps {
  product: SearchedProductDTO;
  onAddToCart?: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const isBuyer = user?.role === UserRole.BUYER;

  const displayImage = `${BASE_UPLOAD_URL}${product.coverImage}`;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.(product.id);
  };

  const handleNavigate = () => {
    navigate(`/detalhes-produto`, { state: { product } });
  };

  return (
    <div
      onClick={handleNavigate}
      className="group relative bg-white rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)] border border-slate-100 flex flex-col w-full cursor-pointer"
    >
      <div className="relative aspect-square max-h-[220px] overflow-hidden bg-slate-50">
        <img
          src={displayImage}
          alt={product.name}
          loading="lazy"
          decoding="async"
          width={400}
          height={400}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.src = "/placeholder-product.png";
          }}
        />

        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          <div
            className={`text-[11px] font-bold px-3 py-1.5 rounded-full shadow-sm backdrop-blur-md bg-white/90 border border-white/20 ${getProductConditionColor(
              product.condition,
            )}`}
          >
            {getProductConditionLabel(product.condition)}
          </div>
        </div>

        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="p-3.5 flex flex-col flex-1 gap-2">
        <div className="flex flex-col gap-1">
          <div
            className={`w-fit px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 ${getProductStatusColor(
              product.status,
            )}`}
          >
            <span className="material-symbols-outlined text-[12px]">
              check_circle
            </span>
            {getProductStatusLabel(product.status)}
          </div>

          <h4 className="text-slate-800 font-bold text-lg line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h4>

          <p className="text-slate-500 text-sm line-clamp-2 min-h-[40px] leading-relaxed">
            {product.description ||
              "Nenhuma descrição disponível para este produto."}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-primary">
                {formatPrice(product.price, false)}
              </span>
              <span className="text-[11px] font-bold text-primary">Kz</span>
            </div>
          </div>

          {onAddToCart && isBuyer && (
            <button
              onClick={handleAddToCart}
              className="w-12 h-12 rounded-2xl flex items-center justify-center bg-primary text-white shadow-lg shadow-primary/30 transition-all duration-500 ease-out hover:bg-primary/90 active:scale-90 lg:translate-y-4 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 opacity-100 translate-y-0"
            >
              <span className="material-symbols-outlined text-2xl">
                shopping_cart
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
