import React from "react";
import { formatPrice } from "@/utils/currency";
import {
  getProductConditionLabel,
  productConditionColor,
  productConditionIcon,
} from "@/utils/mappers/product.mapper";
import { SearchedProductDTO } from "@/types/product";

interface Props {
  product: SearchedProductDTO;
}

const ProductMainInfo: React.FC<Props> = ({ product }) => {
  return (
    <div className="bg-card p-5 rounded-xl shadow-xl border border-border">
      <h1 className="text-xl md:text-3xl font-bold text-[#121118] dark:text-white">
        {product.name}
      </h1>

      <div className="flex items-baseline gap-1 mt-2">
        <span className="text-3xl font-price font-bold text-primary">
          {formatPrice(product.price, false)}
        </span>
        <span className="text-lg font-price font-bold text-primary">Kz</span>
      </div>

      <div className="mt-3 flex items-center justify-between border-t pt-4">
        <div
          className={`flex items-center gap-1.5 ${productConditionColor[product.condition]}`}
        >
          <span className="material-symbols-outlined text-[18px]">
            {productConditionIcon[product.condition]}
          </span>
          <span className="text-xs font-black uppercase">
            {getProductConditionLabel(product.condition)}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-muted-foreground">
          <span className="material-symbols-outlined text-[18px]">
            inventory_2
          </span>
          <span className="text-xs font-bold uppercase">
            {product.stock?.availableQuantity || 0} disponíveis
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductMainInfo;
