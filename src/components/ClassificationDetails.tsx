import React from "react";
import { ProductCategory } from "@/enums/product-category.enum";
import { productCategoryLabel } from "@/utils/mappers/product-category.mapper";

interface ClassificationDetailsProps {
  category: ProductCategory | "";
  condition: string;
  onOpenCategory: () => void;
  onOpenCondition: () => void;
}

const ClassificationDetails: React.FC<ClassificationDetailsProps> = ({
  category,
  condition,
  onOpenCategory,
  onOpenCondition,
}) => {
  const categoryDisplayName = category
    ? productCategoryLabel[category]
    : "Não definida";

  return (
    <section className="bg-white dark:bg-slate-900/40 rounded-[2rem] p-6 shadow-sm border border-slate-100 dark:border-white/5 space-y-4">
      <div className="flex items-center gap-2 mb-2 px-1">
        <h2 className="font-black text-sm uppercase tracking-wider text-slate-500">
          Categoria & Estado do produto
        </h2>
      </div>

      <div className="grid gap-3">
        <button
          onClick={onOpenCategory}
          className="flex items-center justify-between p-4 bg-slate-50 dark:bg-white/5 rounded-2xl group hover:ring-2 hover:ring-primary/20 transition-all active:scale-[0.96] text-left transform-gpu"
        >
          <div className="flex items-center gap-4">
            <div className="size-10 rounded-xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center group-hover:text-primary transition-colors duration-300">
              <span className="material-symbols-outlined text-[22px]">
                widgets
              </span>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-tight">
                Categoria
              </p>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                {categoryDisplayName}
              </p>
            </div>
          </div>
          <span className="material-symbols-outlined text-slate-300 group-hover:translate-x-1 transition-transform duration-300 ease-out">
            chevron_right
          </span>
        </button>

        <button
          onClick={onOpenCondition}
          className="flex items-center justify-between p-4 bg-slate-50 dark:bg-white/5 rounded-2xl group hover:ring-2 hover:ring-primary/20 transition-all active:scale-[0.96] text-left transform-gpu"
        >
          <div className="flex items-center gap-4">
            <div className="size-10 rounded-xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center group-hover:text-primary transition-colors duration-300">
              <span className="material-symbols-outlined text-[22px]">
                sell
              </span>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-tight">
                Condição
              </p>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                {condition || "Selecionar estado"}
              </p>
            </div>
          </div>
          <span className="material-symbols-outlined text-slate-300 group-hover:translate-x-1 transition-transform duration-300 ease-out">
            chevron_right
          </span>
        </button>
      </div>
    </section>
  );
};

export default ClassificationDetails;
