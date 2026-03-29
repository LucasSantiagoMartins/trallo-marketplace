import React from "react";
import { PurchaseSupportResponseDto } from "@/types/purchase-support";
import ProductCard from "./ProductCard";
import { useCart } from "@/hooks/use-cart";

interface Props {
  data: PurchaseSupportResponseDto;
}

export const PurchaseResults: React.FC<Props> = ({ data }) => {
  const isSetup = data.type === "SETUP_GUIDE";
  const { addProduct } = useCart();

  const handleAddToCart = async (productId: string) => {
    await addProduct(productId);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="bg-slate-50 border border-slate-100 p-6 rounded-3xl flex flex-wrap gap-6 justify-between items-center shadow-sm">
        <div className="flex-1 min-w-[200px]">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            Contexto
          </p>
          <h3 className="text-lg font-bold text-slate-900">
            {data.meta.context}
          </h3>
        </div>
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            Orçamento
          </p>
          <h3 className="text-lg font-bold text-[#6c3ef8]">
            {new Intl.NumberFormat("pt-AO", {
              style: "currency",
              currency: "AOA",
            }).format(data.meta.totalBudget)}
          </h3>
        </div>
      </div>

      {isSetup ? (
        <div className="space-y-16">
          {data.items?.map((item, idx) => (
            <div key={idx} className="group">
              <div className="flex items-center gap-4 mb-6">
                <span className="flex-none h-10 w-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold shadow-lg">
                  {idx + 1}
                </span>
                <div>
                  <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                    {item.name}
                    {item.priority === "essential" && (
                      <span className="text-[9px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-black uppercase">
                        Obrigatório
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Orçamento sugerido:{" "}
                    {new Intl.NumberFormat("pt-AO", {
                      style: "currency",
                      currency: "AOA",
                    }).format(item.allocatedBudget)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {item.products && item.products.length > 0 ? (
                  item.products.map((prod) => (
                    <ProductCard
                      key={prod.id}
                      product={prod}
                      onAddToCart={handleAddToCart}
                    />
                  ))
                ) : (
                  <div className="col-span-full py-12 px-6 text-center border-2 border-dashed border-slate-100 rounded-[2rem] bg-slate-50/50">
                    <span className="material-symbols-outlined text-slate-300 text-4xl mb-2">
                      search_off
                    </span>
                    <p className="text-slate-500 font-bold">
                      Nenhum produto encontrado nesta faixa.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.products?.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
};
