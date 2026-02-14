import React from "react";

interface InventoryControlCardProps {
  onAction: (type: "entradas" | "saidas") => void;
}

export const InventoryControlCard: React.FC<InventoryControlCardProps> = ({
  onAction,
}) => {
  return (
    <div className="sticky top-28 p-8 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800/50 dark:to-gray-900/50 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-xl">
      <div className="size-14 rounded-2xl bg-[#6d3ff8] flex items-center justify-center text-white mb-6 shadow-lg shadow-purple-500/20">
        <span className="material-symbols-outlined text-3xl">info</span>
      </div>

      <h4 className="font-black text-xl mb-4 tracking-tight">
        Ações de Inventário
      </h4>

      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
        Selecione o tipo de movimentação que deseja realizar no armazém hoje.
      </p>

      <div className="flex flex-col gap-3">
        <button
          onClick={() => onAction("entradas")}
          className="w-full py-4 bg-[#6d3ff8] text-white rounded-2xl font-bold shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2 transition-all hover:brightness-110 active:scale-[0.98]"
        >
          <span className="material-symbols-outlined font-bold">
            add_circle
          </span>
          Nova Entrada
        </button>

        <button
          onClick={() => onAction("saidas")}
          className="w-full py-4 bg-white dark:bg-white/5 text-slate-900 dark:text-white border border-gray-200 dark:border-white/10 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all hover:bg-gray-50 dark:hover:bg-white/10 active:scale-[0.98]"
        >
          <span className="material-symbols-outlined font-bold">
            remove_circle
          </span>
          Registrar Saída
        </button>
      </div>
    </div>
  );
};
