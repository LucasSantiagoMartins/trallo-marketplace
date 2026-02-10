import React from "react";

export interface Product {
  id: number;
  name: string;
  price: string;
  stock: number;
  status: "Ativo" | "Sem Stock" | "Verificando";
  image: string;
}

interface OwnProductCardProps {
  product: Product;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const OwnProductCard: React.FC<OwnProductCardProps> = ({
  product,
  onEdit,
  onDelete,
}) => {
  const isVerifying = product.status === "Verificando";

  return (
    <div
      className={`p-4 rounded-[2rem] flex gap-5 border transition-all duration-300 ${
        isVerifying
          ? "bg-amber-50/30 dark:bg-amber-500/5 border-dashed border-amber-200 dark:border-amber-900/50"
          : "bg-white dark:bg-gray-800/40 border-gray-100 dark:border-gray-700/50 shadow-sm hover:shadow-md"
      }`}
    >
      {/* Imagem maior */}
      <div
        className={`size-24 md:size-28 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 ${isVerifying ? "opacity-60" : ""}`}
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
              className={`font-bold text-base md:text-lg truncate ${isVerifying ? "text-amber-700/70 dark:text-amber-500/70" : "text-foreground"}`}
            >
              {product.name}
            </h4>
            <span
              className={`px-2 py-1 text-[9px] font-black rounded-lg uppercase whitespace-nowrap ${
                product.status === "Ativo"
                  ? "bg-emerald-500/10 text-emerald-500"
                  : product.status === "Sem Stock"
                    ? "bg-red-500/10 text-red-500"
                    : "bg-amber-500/10 text-amber-600"
              }`}
            >
              {product.status === "Verificando"
                ? "Aguardando Verificação"
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
            <button
              onClick={() => onEdit?.(product.id)}
              className="size-10 flex items-center justify-center bg-gray-100 dark:bg-gray-700/50 rounded-xl text-gray-500 hover:text-primary transition-colors active:scale-90"
            >
              <span className="material-symbols-outlined text-xl">edit</span>
            </button>
            {!isVerifying && (
              <button
                onClick={() => onDelete?.(product.id)}
                className="size-10 flex items-center justify-center bg-red-50 dark:bg-red-500/10 rounded-xl text-red-500 active:scale-90"
              >
                <span className="material-symbols-outlined text-xl">
                  delete
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnProductCard;
