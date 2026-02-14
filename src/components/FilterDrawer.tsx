import { ProductCondition } from "@/types/product";
import React, { useState } from "react";
import { formatPrice } from "@/utils/currency";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: {
    minPrice?: number;
    maxPrice?: number;
    condition?: ProductCondition;
  }) => void;
  onSearch: (filters: {
    minPrice?: number;
    maxPrice?: number;
    condition?: ProductCondition;
  }) => void;
}

const FilterDrawer: React.FC<FilterDrawerProps> = ({
  isOpen,
  onClose,
  onApply,
  onSearch,
}) => {
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [condition, setCondition] = useState<ProductCondition | undefined>();

  if (!isOpen) return null;

  const parseCurrency = (value: string): number | "" => {
    const numericValue = value.replace(/\D/g, "");
    return numericValue === "" ? "" : Number(numericValue);
  };

  const currentFilters = {
    minPrice: minPrice === "" ? undefined : minPrice,
    maxPrice: maxPrice === "" ? undefined : maxPrice,
    condition,
  };

  const handleClear = () => {
    setMinPrice("");
    setMaxPrice("");
    setCondition(undefined);
  };

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
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">
                Preço
              </h4>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold">
                      Mín
                    </span>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                        Kz
                      </span>
                      <input
                        type="text"
                        value={
                          minPrice !== ""
                            ? formatPrice(minPrice).replace("Kz", "").trim()
                            : ""
                        }
                        onChange={(e) =>
                          setMinPrice(parseCurrency(e.target.value))
                        }
                        placeholder="0"
                        className="w-full p-3 pl-9 bg-muted/50 rounded-lg border border-border text-sm font-medium focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold">
                      Máx
                    </span>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                        Kz
                      </span>
                      <input
                        type="text"
                        value={
                          maxPrice !== ""
                            ? formatPrice(maxPrice).replace("Kz", "").trim()
                            : ""
                        }
                        onChange={(e) =>
                          setMaxPrice(parseCurrency(e.target.value))
                        }
                        placeholder="Sem limite"
                        className="w-full p-3 pl-9 bg-muted/50 rounded-lg border border-border text-sm font-medium focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">
                Estado
              </h4>
              <div className="space-y-3">
                {[
                  { label: "Novo", value: ProductCondition.NEW },
                  { label: "Quase novo", value: ProductCondition.SEMI_NEW },
                  { label: "Usado", value: ProductCondition.USED },
                ].map((item) => (
                  <label
                    key={item.value}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="radio"
                      name="condition"
                      className="hidden"
                      checked={condition === item.value}
                      onChange={() => setCondition(item.value)}
                    />
                    <div
                      className={`size-5 rounded border flex items-center justify-center transition-colors ${
                        condition === item.value
                          ? "border-primary bg-primary/10"
                          : "border-border"
                      }`}
                    >
                      {condition === item.value && (
                        <div className="size-2.5 bg-primary rounded-sm" />
                      )}
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        condition === item.value ? "text-primary" : ""
                      }`}
                    >
                      {item.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-border/50 bg-card/50">
          <div className="flex flex-col gap-3">
            <button
              onClick={handleClear}
              className="w-full py-3 text-xs font-bold border border-border rounded-xl hover:bg-muted transition-colors"
            >
              Limpar Filtros
            </button>
            <div className="flex gap-3">
              <button
                onClick={() => onApply(currentFilters)}
                className="flex-1 py-4 text-sm font-bold border border-primary text-primary rounded-2xl hover:bg-primary/5 transition-colors"
              >
                Aplicar
              </button>
              <button
                onClick={() => onSearch(currentFilters)}
                className="flex-[2] bg-primary text-primary-foreground py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity"
              >
                Pesquisar
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default FilterDrawer;
