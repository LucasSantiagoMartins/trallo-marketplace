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
    <div className="col-span-full flex flex-col items-center justify-center py-16 md:py-24 px-6 text-center animate-in fade-in zoom-in duration-500">
      <div className="size-20 md:size-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
        <span className="material-symbols-outlined text-4xl md:text-5xl text-muted-foreground">
          {icon}
        </span>
      </div>
      <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-xs md:text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed text-balance">
        {description}
      </p>
    </div>
  );
};

export default EmptyState;
