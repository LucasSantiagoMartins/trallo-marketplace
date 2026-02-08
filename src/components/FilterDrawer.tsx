import React from "react";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const FilterDrawer: React.FC<FilterDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      <aside className="relative w-[85%] md:w-[40%] h-full bg-background shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
        <div className="p-6 border-b border-border/50 flex items-center justify-between">
          <h2 className="text-lg font-bold">Filtros</h2>
          <button 
            onClick={onClose}
            className="size-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-8">
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Preço</h4>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold">Mín</span>
                    <div className="p-3 bg-muted/50 rounded-lg border border-border text-sm font-medium">0 Kz</div>
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold">Máx</span>
                    <div className="p-3 bg-muted/50 rounded-lg border border-border text-sm font-medium">500.000 Kz</div>
                  </div>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full relative">
                  <div className="absolute h-full w-2/3 bg-primary rounded-full" />
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Ordenar por</h4>
              <div className="flex flex-wrap gap-2">
                {["Novidades", "Menor Preço", "Maior Preço", "Mais Vendidos"].map((opt) => (
                  <button 
                    key={opt} 
                    className="px-4 py-2 rounded-full border border-border text-xs font-medium hover:border-primary hover:text-primary transition-all"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Estado</h4>
              <div className="space-y-3">
                {["Novo", "Semi-novo", "Usado"].map((status) => (
                  <label key={status} className="flex items-center gap-3 cursor-pointer group">
                    <div className="size-5 rounded border border-border flex items-center justify-center group-hover:border-primary transition-colors">
                      <div className="size-2.5 bg-primary rounded-sm opacity-0 group-hover:opacity-20" />
                    </div>
                    <span className="text-sm font-medium">{status}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-border/50 bg-card/50">
          <div className="flex gap-3">
            <button 
              onClick={onClose}
              className="flex-1 py-4 text-sm font-bold border border-border rounded-2xl hover:bg-muted transition-colors"
            >
              Limpar
            </button>
            <button className="flex-[2] bg-primary text-primary-foreground py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity">
              Aplicar
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default FilterDrawer;