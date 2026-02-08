import React from "react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  image: string;
  category: string;
  name: string;
  price: number;
  currency?: string;
  discount?: number;
  onAddToCart?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  category,
  name,
  price,
  currency = "Kz",
  discount,
  onAddToCart,
}) => {
  const formatPrice = (value: number) => {
    return value.toLocaleString("pt-AO");
  };

  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-col w-full">
      <div className="relative aspect-video sm:aspect-square lg:aspect-[4/3] overflow-hidden bg-slate-50">
        <Link to={`/produto/${id}`}>
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        {discount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-lg z-10">
            -{discount}%
          </div>
        )}
      </div>

      <div className="p-4 flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <span className="text-[10px] uppercase tracking-[0.1em] text-slate-400 font-bold block">
            {category}
          </span>
          <h4 className="text-slate-800 font-semibold text-base mb-1 line-clamp-1 group-hover:text-primary transition-colors">
            {name}
          </h4>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-black text-slate-900">
              {formatPrice(price)}
            </span>
            <span className="text-[10px] font-bold text-primary uppercase">
              {currency}
            </span>
          </div>
        </div>

        <button
          onClick={onAddToCart}
          className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center relative overflow-hidden transition-all duration-300 active:scale-90 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/10 hover:border-primary/20"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 opacity-50" />
          <span className="material-symbols-outlined text-xl text-primary relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.05)]">
            add_shopping_cart
          </span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;