import { ProductCondition } from "@/types/product";
import React, { useState, useRef, useEffect } from "react";
import { formatPrice } from "@/utils/currency";
import TralloInput from "./TralloInput";
import TralloButton from "./TralloButton";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: {
    minPrice?: number;
    maxPrice?: number;
    condition?: ProductCondition;
    isDispatch?: boolean;
  }) => void;
  onSearch: (filters: {
    minPrice?: number;
    maxPrice?: number;
    condition?: ProductCondition;
    isDispatch?: boolean;
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
  const [isDispatch, setIsDispatch] = useState<boolean>(false);

  // Estados para o gesto de arrastar (Swipe)
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [translateX, setTranslateX] = useState(0);
  const isDragging = useRef(false);

  // Resetar posição quando fechar/abrir
  useEffect(() => {
    if (!isOpen) setTranslateX(0);
  }, [isOpen]);

  if (!isOpen) return null;

  const parseCurrency = (value: string): number | "" => {
    const numericValue = value.replace(/\D/g, "");
    return numericValue === "" ? "" : Number(numericValue);
  };

  const getFilters = () => ({
    minPrice: minPrice === "" ? undefined : minPrice,
    maxPrice: maxPrice === "" ? undefined : maxPrice,
    condition,
    isDispatch,
  });

  const handleClear = () => {
    setMinPrice("");
    setMaxPrice("");
    setCondition(undefined);
    setIsDispatch(false);
    onApply({
      minPrice: undefined,
      maxPrice: undefined,
      condition: undefined,
      isDispatch: false,
    });
  };

  const handleConditionChange = (value: ProductCondition | "DISPATCH") => {
    if (value === "DISPATCH") {
      setCondition(undefined);
      setIsDispatch(true);
    } else {
      setCondition(value);
      setIsDispatch(false);
    }
  };

  // --- Lógica de Swipe nativa ---
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    isDragging.current = true;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const currentTouch = e.targetTouches[0].clientX;
    const distance = currentTouch - touchStart;
    
    // Só permite arrastar para a direita (para fechar)
    if (distance > 0) {
      setTranslateX(distance);
    }
  };

  const onTouchEnd = () => {
    isDragging.current = false;
    if (!touchStart || !translateX) return;

    // Se arrastou mais de 100px, fecha o drawer
    if (translateX > 100) {
      onClose();
    } else {
      // Caso contrário, volta para a posição inicial
      setTranslateX(0);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end overflow-hidden">
      {/* Overlay com fade do Tailwind */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      <aside
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{ 
          transform: `translateX(${translateX}px)`,
          transition: isDragging.current ? "none" : "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        }}
        className={`relative w-[85%] md:w-[40%] h-full bg-background shadow-2xl flex flex-col animate-in slide-in-from-right duration-300`}
      >
        {/* Indicador de arrasto lateral no mobile */}
        <div className="md:hidden w-1.5 h-12 bg-border/60 rounded-full absolute left-2 top-1/2 -translate-y-1/2 opacity-50" />

        <div className="p-6 border-b border-border/50 flex items-center justify-between">
          <h2 className="text-lg font-bold">Filtros</h2>
          {/* O X some no telefone, visível apenas md para cima */}
          <button
            onClick={onClose}
            className="hidden md:flex size-10 items-center justify-center rounded-full hover:bg-muted transition-colors"
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
                      <TralloInput
                        type="text"
                        value={
                          minPrice !== ""
                            ? formatPrice(minPrice).replace("Kz", "").trim()
                            : ""
                        }
                        onChange={(e) => setMinPrice(parseCurrency(e.target.value))}
                        placeholder="0"
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
                      <TralloInput
                        type="text"
                        value={
                          maxPrice !== ""
                            ? formatPrice(maxPrice).replace("Kz", "").trim()
                            : ""
                        }
                        onChange={(e) => setMaxPrice(parseCurrency(e.target.value))}
                        placeholder="Sem limite"
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
                  { label: "Em despacho", value: "DISPATCH" as const },
                ].map((item) => {
                  const isSelected =
                    item.value === "DISPATCH"
                      ? isDispatch
                      : condition === item.value && !isDispatch;

                  return (
                    <label
                      key={item.value}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="condition"
                        className="hidden"
                        checked={isSelected}
                        onChange={() => handleConditionChange(item.value)}
                      />
                      <div
                        className={`size-5 rounded border flex items-center justify-center transition-colors ${
                          isSelected
                            ? "border-primary bg-primary/10"
                            : "border-border"
                        }`}
                      >
                        {isSelected && (
                          <div className="size-2.5 bg-primary rounded-sm" />
                        )}
                      </div>
                      <span className={`text-sm font-medium ${isSelected ? "text-primary" : ""}`}>
                        {item.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-border/50 bg-card/50">
          <div className="flex flex-col gap-3">
            <TralloButton onClick={handleClear} variant="outline">
              Limpar Filtros
            </TralloButton>
            <div className="flex gap-3">
              <TralloButton onClick={() => onApply(getFilters())} variant="outline">
                Aplicar
              </TralloButton>
              <TralloButton onClick={() => onSearch(getFilters())} className="flex-[2]">
                Pesquisar
              </TralloButton>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default FilterDrawer;