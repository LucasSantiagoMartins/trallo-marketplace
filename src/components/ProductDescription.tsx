import { getLabelByFieldName } from "@/constants/product-fields";
import React from "react";

interface Props {
  description?: string;
  details?: Record<string, any>;
}

const ProductDescription: React.FC<Props> = ({ description, details }) => {
  return (
    <div className="bg-card p-6 rounded-xl shadow-soft border border-border space-y-6">
      <div>
        <h3 className="font-bold text-base md:text-lg mb-4 flex items-center gap-2">
          Descrição
        </h3>
        <p className="text-muted-foreground leading-relaxed text-xs md:text-sm whitespace-pre-line">
          {description || "Sem descrição disponível."}
        </p>
      </div>

      {details && Object.keys(details).length > 0 && (
        <div className="pt-6 border-t border-dashed">
          <h3 className="font-bold text-base md:text-lg mb-4 flex items-center gap-2">
            Especificações Técnicas
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {Object.entries(details).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between p-3 rounded-full md:rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10"
              >
                <span className="text-[9px] md:text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                  {getLabelByFieldName(key)}
                </span>
                <span className="text-xs md:text-sm font-semibold text-slate-900 dark:text-white">
                  {String(value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDescription;
