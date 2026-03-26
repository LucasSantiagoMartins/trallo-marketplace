import React from "react";
import { CheckCircle2, Package } from "lucide-react";
import TralloButton from "@/components/TralloButton";
import { BASE_UPLOAD_URL } from "@/api/endpoints";

interface Product {
  productId: string;
  name: string;
  coverImage?: string;
}

interface ProductSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelect: (product: { productId: string; name: string }) => void;
}

const ProductSelectionModal = ({
  isOpen,
  onClose,
  products,
  onSelect,
}: ProductSelectionModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md transition-all">
      <div className="bg-white dark:bg-[#13111c] w-full max-w-md rounded-[1.5rem] p-6 shadow-2xl border border-slate-200 dark:border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold dark:text-white tracking-tight">
            Selecionar Produto
          </h3>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <span className="sr-only">Fechar</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-2 max-h-[420px] overflow-y-auto pr-2 custom-scrollbar">
          {products.map((item) => (
            <div
              key={item.productId}
              onClick={() => {
                onSelect({
                  productId: item.productId,
                  name: item.name,
                });
                onClose();
              }}
              className="group flex items-center gap-4 p-3 rounded-2xl border border-transparent hover:border-slate-200 dark:hover:border-white/10 hover:bg-slate-50 dark:hover:bg-white/[0.03] cursor-pointer transition-all duration-200 active:scale-[0.98]"
            >
              <div className="relative w-12 h-12 shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center">
                {item.coverImage ? (
                  <img
                    src={`${BASE_UPLOAD_URL}${item.coverImage}`}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <Package className="w-6 h-6 text-slate-400" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">
                  {item.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  ID: {item.productId.slice(0, 8)}
                </p>
              </div>

              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <TralloButton
            fullWidth
            variant="secondary"
            onClick={onClose}
          >
            Voltar
          </TralloButton>
        </div>
      </div>
    </div>
  );
};

export default ProductSelectionModal;