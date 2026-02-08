import React from "react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  image: string;
  category: string;
  name: string;
  price: number;
  currency?: string;
  isFavorite?: boolean;
  discount?: number;
  onFavoriteToggle?: () => void;
  onAddToCart?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  category,
  name,
  price,
  currency = "AOA",
  isFavorite = false,
  discount,
  onFavoriteToggle,
  onAddToCart,
}) => {
  const formatPrice = (value: number) => {
    return value.toLocaleString("pt-AO");
  };

  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-sm flex flex-col border border-border">
      <Link to={`/produto/${id}`} className="relative aspect-[4/5] bg-muted">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        {discount && (
          <span className="absolute top-3 left-3 bg-destructive text-destructive-foreground text-[10px] font-bold px-2 py-0.5 rounded">
            -{discount}%
          </span>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            onFavoriteToggle?.();
          }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full backdrop-blur flex items-center justify-center transition-colors ${
            isFavorite 
              ? 'bg-primary/10 text-primary' 
              : 'bg-card/80 text-muted-foreground'
          }`}
        >
          <span className={`material-symbols-outlined text-xl ${isFavorite ? 'fill-1' : ''}`}>
            favorite
          </span>
        </button>
      </Link>
      <div className="p-3">
        <p className="text-xs text-muted-foreground mb-1">{category}</p>
        <h4 className="text-sm font-medium mb-2 truncate">{name}</h4>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold font-price">
            {formatPrice(price)}{" "}
            <span className="text-[10px] text-primary">{currency}</span>
          </span>
          <button
            onClick={onAddToCart}
            className="bg-primary/10 text-primary p-1 rounded-lg hover:bg-primary/20 transition-colors"
          >
            <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
