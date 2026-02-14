import React from "react";

interface ProductProps {
  name: string;
  sku: string;
  quantity: number;
  location: string;
  status: "Disponível" | "Stock Baixo";
  image: string;
}

export const ProductStockCard: React.FC<ProductProps> = ({
  name,
  sku,
  quantity,
  location,
  status,
  image,
}) => {
  const isLowStock = status === "Stock Baixo";

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex flex-col gap-4">
      <div className="flex gap-4">
        <div className="size-20 rounded-lg bg-slate-100 flex-shrink-0 overflow-hidden">
          <img className="w-full h-full object-cover" src={image} alt={name} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h3 className="font-clash font-semibold text-slate-900 truncate pr-2">
              {name}
            </h3>
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                isLowStock
                  ? "bg-action-pink/10 text-action-pink"
                  : "bg-success-green/10 text-success-green"
              }`}
            >
              {status}
            </span>
          </div>
          <p className="text-xs text-slate-400 font-numbers mt-0.5">
            SKU: {sku}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">
                Quantidade
              </p>
              <p className="font-numbers text-lg font-bold text-slate-900 leading-none">
                {quantity}{" "}
                <span className="text-xs font-medium text-slate-500">
                  Unid.
                </span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">
                Localização
              </p>
              <p className="text-xs font-medium text-slate-700">{location}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
