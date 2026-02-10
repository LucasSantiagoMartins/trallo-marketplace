import React from "react";

interface ClassificationDetailsProps {
  category: string;
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
  return (
    <section className="bg-card rounded-2xl p-4 shadow-sm border border-border/50 space-y-3">
      <h2 className="font-bold text-base px-1">Detalhes de Classificação</h2>
      <div
        onClick={onOpenCategory}
        className="flex items-center justify-between p-4 bg-muted/30 rounded-xl cursor-pointer hover:bg-muted/60 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary">
            category
          </span>
          <span className="text-sm font-semibold">Categoria</span>
        </div>
        <span className="text-sm font-medium text-muted-foreground">
          {category || "Selecionar"}
        </span>
      </div>

      <div
        onClick={onOpenCondition}
        className="flex items-center justify-between p-4 bg-muted/30 rounded-xl cursor-pointer hover:bg-muted/60 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary">
            history_edu
          </span>
          <span className="text-sm font-semibold">Estado</span>
        </div>
        <span className="text-sm font-medium text-muted-foreground">
          {condition}
        </span>
      </div>
    </section>
  );
};

export default ClassificationDetails;
