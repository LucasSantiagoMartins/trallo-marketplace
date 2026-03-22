import React from "react";

interface EmptyStateProps {
  icon?: string;
  title?: string;
  description?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon = "search_off",
  title = "Nenhum item encontrado",
  description = "Não conseguimos encontrar o que procuras. Tenta ajustar os teus filtros ou termos de busca.",
}) => {
  return (
    <div className="col-span-full w-full max-w-md mx-auto p-1">
      <div className="bg-white dark:bg-white/5 border border-slate-200/60 dark:border-white/10 rounded-3xl p-10 shadow-sm flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-500">
        <div className="mb-6 text-slate-300 dark:text-slate-600">
          <span className="material-symbols-outlined text-6xl select-none">
            {icon}
          </span>
        </div>

        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
          {title}
        </h3>

        <p className="text-sm text-muted-foreground leading-relaxed max-w-[260px]">
          {description}
        </p>
      </div>
    </div>
  );
};

export default EmptyState;
