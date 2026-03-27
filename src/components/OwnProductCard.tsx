import React, { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { ProductDTO, ProductStatus } from "@/types/product";
import {
  getProductStatusLabel,
  getProductStatusColor,
} from "@/utils/mappers/product.mapper";
import { BASE_UPLOAD_URL } from "@/api/endpoints";
import { formatPrice } from "@/utils/currency";

interface OwnProductCardProps {
  product: ProductDTO;
  onDelete?: (product: ProductDTO) => void;
  onActivateDispatch?: (productId: string) => void;
}

const OwnProductCard = forwardRef<HTMLDivElement, OwnProductCardProps>(
  ({ product, onDelete, onActivateDispatch }, ref) => {
    const navigate = useNavigate();

    const isVerifying = product.status === ProductStatus.SUBMITTED;
    const isPending = product.status === ProductStatus.AWAITING_SUBMISSION;
    const isOutOfStock = product.stock.availableQuantity === 0;

    return (
      <div
        ref={ref}
        className={`p-3 md:p-4 rounded-[2rem] flex items-center gap-3 md:gap-5 border transition-all duration-300 animate-in fade-in zoom-in-95 overflow-hidden ${
          isVerifying
            ? "bg-amber-50/30 dark:bg-amber-500/5 border-dashed border-amber-200 dark:border-amber-900/50 opacity-80"
            : isPending
              ? "bg-blue-50/30 dark:bg-blue-500/5 border-blue-100 dark:border-blue-900/30"
              : "bg-white dark:bg-gray-800/40 border-gray-100 dark:border-gray-700/50 shadow-sm lg:hover:shadow-md"
        }`}
      >
        <div
          className={`size-20 md:size-28 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 ${isVerifying ? "grayscale opacity-50" : ""}`}
        >
          <img
            src={BASE_UPLOAD_URL + product.coverImage}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-between flex-1 min-w-0 py-1 h-full">
          <div className="relative">
            <div className="flex justify-between items-start gap-2 mb-1">
              <h4
                className={`font-bold text-sm md:text-lg truncate ${isVerifying ? "text-slate-400" : "text-foreground"}`}
              >
                {product.name}
              </h4>
              <span
                className={`px-2 py-0.5 text-[7px] md:text-[9px] font-black rounded-lg uppercase whitespace-nowrap flex-shrink-0 ${
                  isOutOfStock
                    ? "bg-red-500/10 text-red-500"
                    : getProductStatusColor(product.status)
                }`}
              >
                {isOutOfStock
                  ? "Esgotado"
                  : getProductStatusLabel(product.status)}
              </span>
            </div>
            <p
              className={`text-base md:text-lg font-black ${isVerifying ? "text-gray-400" : "text-primary"}`}
            >
              {formatPrice(product.price)}
            </p>
          </div>

          <div className="flex items-center justify-between mt-2 gap-2">
            <div className="flex items-center flex-shrink-0">
              <span className="text-[9px] md:text-xs font-bold text-slate-400 flex items-center gap-1 whitespace-nowrap">
                <span
                  className={`material-symbols-outlined text-sm md:text-base ${isOutOfStock ? "text-red-500" : ""}`}
                >
                  inventory_2
                </span>
                {product.stock.availableQuantity} un.
              </span>
            </div>

            <div className="flex items-center gap-1.5 md:gap-2 flex-wrap justify-end">
              {!isVerifying && (
                <>
                  {!isPending && !isOutOfStock && !product.isDispatch && (
                    <button
                      onClick={() => onActivateDispatch?.(product.id)}
                      className="size-8 md:size-10 flex items-center justify-center bg-amber-50 dark:bg-amber-500/10 rounded-xl text-amber-600 active:scale-90 transition-transform"
                      title="Ativar Despacho"
                    >
                      <span className="material-symbols-outlined text-lg md:text-xl">
                        speed
                      </span>
                    </button>
                  )}

                  <button
                    onClick={() =>
                      navigate(`/editar-produto`, {
                        state: { product },
                      })
                    }
                    className="size-8 md:size-10 flex items-center justify-center bg-gray-100 dark:bg-gray-700/50 rounded-xl text-gray-500 lg:hover:text-primary transition-all active:scale-90"
                  >
                    <span className="material-symbols-outlined text-lg md:text-xl">
                      edit
                    </span>
                  </button>

                  {isPending ? (
                    <button
                      onClick={() =>
                        navigate(`/submeter-produto`, {
                          state: { product },
                        })
                      }
                      className="h-8 md:h-10 px-3 md:px-5 flex items-center gap-2 bg-blue-500 text-white rounded-full shadow-lg shadow-blue-500/20 active:scale-95 transition-all flex-shrink-0"
                    >
                      <span className="material-symbols-outlined text-base md:text-xl">
                        published_with_changes
                      </span>
                      <span className="text-[9px] md:text-xs font-bold uppercase tracking-wider">
                        Submeter
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onDelete?.(product)}
                      className="size-8 md:size-10 flex items-center justify-center bg-red-50 dark:bg-red-500/10 rounded-xl text-red-500 active:scale-90 transition-transform"
                    >
                      <span className="material-symbols-outlined text-lg md:text-xl">
                        delete
                      </span>
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
);

OwnProductCard.displayName = "OwnProductCard";
export default OwnProductCard;
