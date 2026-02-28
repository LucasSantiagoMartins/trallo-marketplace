import React, { useState } from "react";
import { StockMovementDTO } from "@/types/warehouse-inventory";
import { BASE_UPLOAD_URL } from "@/api/endpoints";
import {
  movementTypeMap,
  movementOriginMap,
} from "@/utils/mappers/warehouse-inventory.mapper";

interface ProductProps {
  movement: StockMovementDTO;
}

export const ProductStockCard: React.FC<ProductProps> = ({ movement }) => {
  const { product, type, origin, createdAt, delivery } = movement;
  const [copiedSku, setCopiedSku] = useState(false);
  const [copiedTracking, setCopiedTracking] = useState(false);

  const typeConfig = movementTypeMap[type];
  const originConfig = movementOriginMap[origin];

  const handleCopy = (text: string, setter: (v: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-[#1c182d] rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-white/5 hover:border-[#6C3EF8]/30 transition-all group">
      <div className="flex items-start gap-5">
        <div className="relative size-24 rounded-xl bg-slate-100 dark:bg-white/5 flex-shrink-0 overflow-hidden border border-slate-200 dark:border-white/10">
          <img
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            src={
              product.coverImage
                ? `${BASE_UPLOAD_URL}/${product.coverImage}`
                : "/placeholder-product.png"
            }
            alt={product.name}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-1">
            <div className="truncate">
              <h3 className="font-clash font-bold text-slate-900 dark:text-white text-lg leading-tight truncate">
                {product.name}
              </h3>

              <div className="flex flex-col gap-1 mt-1">
                <div className="flex items-center gap-2">
                  <p className="text-[11px] font-numbers text-slate-400 tracking-wider">
                    Código: {product.sku}
                  </p>
                  <button
                    onClick={() => handleCopy(product.sku, setCopiedSku)}
                    className="flex items-center justify-center p-1 rounded-md hover:bg-slate-100 dark:hover:bg-white/10 transition-colors text-slate-400 hover:text-[#6C3EF8]"
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      {copiedSku ? "check" : "content_copy"}
                    </span>
                  </button>
                </div>

                {delivery?.trackingCode && (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-[#6C3EF8]">
                      <span className="material-symbols-outlined text-[14px]">
                        local_shipping
                      </span>
                      <p className="text-[11px] font-bold tracking-wider">
                        Rastreio: {delivery.trackingCode}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        handleCopy(delivery.trackingCode, setCopiedTracking)
                      }
                      className="flex items-center justify-center p-1 rounded-md hover:bg-slate-100 dark:hover:bg-white/10 transition-colors text-slate-400 hover:text-[#6C3EF8]"
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        {copiedTracking ? "check" : "content_copy"}
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col items-end gap-1.5">
              <span
                className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm ${typeConfig.color}`}
              >
                {typeConfig.label}
              </span>
              {product.quantity === 0 && (
                <span className="px-2 py-0.5 rounded-md text-[9px] font-bold uppercase bg-orange-50 dark:bg-orange-500/10 text-orange-500 border border-orange-200 dark:border-orange-500/20">
                 Entregue / concluído
                </span>
              )}
            </div>
          </div>

          <div className="h-px w-full bg-slate-100 dark:bg-white/5 my-3" />

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              {product.quantity > 0 && (
                <>
                  <p className="text-[9px] text-slate-400 uppercase font-black tracking-widest mb-1">
                    Qtd. Produto
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="font-numbers text-xl font-bold text-slate-900 dark:text-white">
                      {product.quantity}
                    </span>
                    <span className="text-[10px] font-medium text-slate-500 uppercase">
                      un
                    </span>
                  </div>
                </>
              )}
            </div>

            <div>
              <p className="text-[9px] text-slate-400 uppercase font-black tracking-widest mb-1">
                Prateleira / Fileira
              </p>
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {product.shelfCode}
                <span className="text-slate-400 font-normal mx-1">|</span>
                {product.row}
              </p>
            </div>

            <div className="col-span-2 sm:col-span-1 sm:text-right flex flex-col sm:justify-end items-start sm:items-end">
              <span
                className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase mb-1 ${originConfig.color}`}
              >
                {originConfig.label}
              </span>

              {delivery?.delivererName && (
                <p className="text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                  Entregador: {delivery.delivererName}
                </p>
              )}

              <p className="text-[10px] text-slate-400 font-numbers">
                {new Date(createdAt).toLocaleDateString("pt-BR")} às{" "}
                {new Date(createdAt).toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};