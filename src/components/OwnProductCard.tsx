import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export interface Product {
  id: number;
  name: string;
  price: string;
  stock: number;
  status: "Ativo" | "Sem Stock" | "Verificando" | "Pendente";
  image: string;
}

interface OwnProductCardProps {
  product: Product;
  onDelete?: (product: Product) => void;
  onSendToVerify?: (product: Product) => void;
}

const OwnProductCard = forwardRef<HTMLDivElement, OwnProductCardProps>(
  ({ product, onDelete, onSendToVerify }, ref) => {
    const navigate = useNavigate();
    const isVerifying = product.status === "Verificando";
    const isPending = product.status === "Pendente";

    return (
      <motion.div
        ref={ref}
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
        className={`p-4 rounded-[2rem] flex gap-5 border transition-all duration-300 ${
          isVerifying
            ? "bg-amber-50/30 dark:bg-amber-500/5 border-dashed border-amber-200 dark:border-amber-900/50 opacity-80"
            : isPending
              ? "bg-blue-50/30 dark:bg-blue-500/5 border-blue-100 dark:border-blue-900/30"
              : "bg-white dark:bg-gray-800/40 border-gray-100 dark:border-gray-700/50 shadow-sm hover:shadow-md"
        }`}
      >
        <div
          className={`size-24 md:size-28 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 ${isVerifying ? "grayscale opacity-50" : ""}`}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-between flex-1 min-w-0 py-1">
          <div className="relative">
            <div className="flex justify-between items-start gap-2 mb-1">
              <h4
                className={`font-bold text-base md:text-lg truncate ${isVerifying ? "text-slate-400" : "text-foreground"}`}
              >
                {product.name}
              </h4>
              <span
                className={`px-2 py-1 text-[9px] font-black rounded-lg uppercase whitespace-nowrap ${
                  product.status === "Ativo"
                    ? "bg-emerald-500/10 text-emerald-500"
                    : product.status === "Sem Stock"
                      ? "bg-red-500/10 text-red-500"
                      : product.status === "Verificando"
                        ? "bg-amber-500/10 text-amber-600"
                        : "bg-blue-500/10 text-blue-600"
                }`}
              >
                {product.status === "Verificando"
                  ? "Em Verificação"
                  : product.status === "Pendente"
                    ? "Pendente de Envio"
                    : product.status}
              </span>
            </div>
            <p
              className={`text-lg font-black ${isVerifying ? "text-gray-400" : "text-primary"}`}
            >
              {product.price}
            </p>
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                <span
                  className={`material-symbols-outlined text-sm ${product.stock === 0 ? "text-red-500" : ""}`}
                >
                  inventory_2
                </span>
                {product.stock} unidades
              </span>
            </div>

            <div className="flex gap-2">
              {!isVerifying && (
                <>
                  <button
                    onClick={() => navigate("/editar-produto")}
                    className="size-10 flex items-center justify-center bg-gray-100 dark:bg-gray-700/50 rounded-xl text-gray-500 hover:text-primary transition-colors active:scale-90"
                  >
                    <span className="material-symbols-outlined text-xl">
                      edit
                    </span>
                  </button>

                  {isPending ? (
                    <button
                      onClick={() => navigate("/submeter-produto")}
                      className="size-10 flex items-center justify-center bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-500/20 active:scale-90"
                      title="Enviar para verificação"
                    >
                      <span className="material-symbols-outlined text-xl">
                        rocket_launch
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onDelete?.(product)}
                      className="size-10 flex items-center justify-center bg-red-50 dark:bg-red-500/10 rounded-xl text-red-500 active:scale-90"
                    >
                      <span className="material-symbols-outlined text-xl">
                        delete
                      </span>
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  },
);

OwnProductCard.displayName = "OwnProductCard";
export default OwnProductCard;
