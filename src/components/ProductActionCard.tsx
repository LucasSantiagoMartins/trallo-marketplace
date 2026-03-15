import React from "react";
import { OrderStockItem } from "@/dtos/order";
import { BASE_UPLOAD_URL } from "@/api/endpoints";
import TralloButton from "@/components/TralloButton";

interface ProductActionCardProps {
  product: OrderStockItem;
  buttonText: string;
  buttonVariant?: "outline" | "primary" | "secondary" | "destructive";
  isDisabled?: boolean;
  onAction: (product: OrderStockItem) => void;
  className?: string;
}

const ProductActionCard: React.FC<ProductActionCardProps> = ({
  product,
  buttonText,
  buttonVariant = "outline",
  isDisabled = false,
  onAction,
  className = "",
}) => {
  return (
    <div
      className={`bg-card p-5 rounded-2xl flex justify-between items-center border border-border hover:border-primary/50 transition-colors ${className}`}
    >
      <div className="flex items-center gap-4">
        {product.coverImage && (
          <img
            src={BASE_UPLOAD_URL + product.coverImage}
            alt={product.name}
            className="w-14 h-14 rounded-xl object-cover bg-muted"
          />
        )}
        <div>
          <h3 className="font-bold text-lg leading-tight">{product.name}</h3>
          <div className="flex gap-3 mt-1.5">
            <span className="text-[11px] font-semibold text-muted-foreground bg-secondary/50 px-2.5 py-1 rounded-full border border-border/50">
              {product.productSku}
            </span>
          </div>
        </div>
      </div>

      <TralloButton
        className={`h-10 text-sm ${
          isDisabled && buttonVariant === "secondary" ? "text-emerald-500" : ""
        }`}
        onClick={() => onAction(product)}
        disabled={isDisabled}
      >
        {buttonText}
      </TralloButton>
    </div>
  );
};

export default ProductActionCard;
