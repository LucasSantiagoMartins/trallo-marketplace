import React, { useEffect, useState } from "react";
import { ProductCategory } from "@/enums/product-category.enum";
import { productCategoryLabel } from "@/utils/mappers/product-category.mapper";
import { ProductStatus } from "@/types/product";
import { productStatusLabel } from "@/utils/mappers/product.mapper";
import TralloButton from "./TralloButton";

interface ProductFilterProps {
  onClose: () => void;
  isOpen: boolean;
  currentCategory?: ProductCategory | "Todas";
  currentStatus?: ProductStatus | "Todos";
  onApply?: (filters: {
    category: string;
    status: string;
    sortBy: string;
  }) => void;
}

const OwnProductFilterDrawer: React.FC<ProductFilterProps> = ({
  onClose,
  isOpen,
  currentCategory = "Todas",
  currentStatus = "Todos",
  onApply,
}) => {
  const [activeStatus, setActiveStatus] = useState<ProductStatus | "Todos">(
    currentStatus,
  );
  const [activeCategory, setActiveCategory] = useState<
    ProductCategory | "Todas"
  >(currentCategory);
  const [sortBy, setSortBy] = useState("Preço");
  const [mounted, setMounted] = useState(false);

  const [startY, setStartY] = useState<number | null>(null);
  const [currentY, setCurrentY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const categories = Object.values(ProductCategory);
  const statuses = Object.values(ProductStatus);

  useEffect(() => {
    if (isOpen) {
      setActiveStatus(currentStatus);
      setActiveCategory(currentCategory);
      setMounted(true);
    } else {
      setMounted(false);
    }
  }, [isOpen, currentCategory, currentStatus]);

  const handleClose = () => {
    setMounted(false);
    setTimeout(() => {
      onClose();
      setCurrentY(0);
    }, 400);
  };

  const handleApply = () => {
    if (onApply) {
      onApply({
        category: activeCategory,
        status: activeStatus,
        sortBy,
      });
    }
    handleClose();
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
    setIsDragging(true);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (startY === null) return;
    const deltaY = e.touches[0].clientY - startY;
    if (deltaY > 0) {
      window.requestAnimationFrame(() => setCurrentY(deltaY));
    }
  };

  const onTouchEnd = () => {
    setIsDragging(false);
    if (currentY > 120) {
      handleClose();
    } else {
      setCurrentY(0);
    }
    setStartY(null);
  };

  if (!isOpen && !mounted) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center overflow-hidden touch-none">
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      <div
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{
          transform: isDragging
            ? `translateY(${currentY}px)`
            : mounted
              ? `translateY(${currentY}px) scale(1)`
              : "translateY(100%) scale(0.95)",
          transition: isDragging
            ? "none"
            : "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s",
        }}
        className={`relative w-full md:max-w-md bg-white dark:bg-gray-900 rounded-t-[2.5rem] md:rounded-[3rem] p-6 md:p-8 shadow-2xl max-h-[90vh] overflow-y-auto will-change-transform ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full pt-2 pb-6 md:hidden cursor-grab active:cursor-grabbing">
          <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full mx-auto" />
        </div>

        <div className="flex justify-between items-center mb-8">
          <h4 className="text-xl font-black tracking-tight text-foreground">
            Filtrar
          </h4>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setActiveStatus("Todos");
                setActiveCategory("Todas");
                setSortBy("Preço");
              }}
              className="text-[9px] font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1.5 rounded-xl active:scale-90 transition-transform"
            >
              Limpar
            </button>
            <button
              onClick={handleClose}
              className="hidden md:flex size-8 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-slate-500"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>
        </div>

        <div className="space-y-6 mb-8">
          <section>
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-3">
              Estado
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveStatus("Todos")}
                className={`px-4 py-2.5 rounded-xl text-[11px] font-bold transition-all ${
                  activeStatus === "Todos"
                    ? "bg-primary text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-slate-500"
                }`}
              >
                Todos
              </button>
              {statuses.map((s) => (
                <button
                  key={s}
                  onClick={() => setActiveStatus(s)}
                  className={`px-4 py-2.5 rounded-xl text-[11px] font-bold transition-all ${
                    activeStatus === s
                      ? "bg-primary text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-slate-500"
                  }`}
                >
                  {productStatusLabel[s] || s}
                </button>
              ))}
            </div>
          </section>

          <section>
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-3">
              Categoria
            </label>
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar -mx-2 px-2">
              <button
                onClick={() => setActiveCategory("Todas")}
                className={`px-4 py-2.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all border-2 ${
                  activeCategory === "Todas"
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-transparent  bg-gray-100 dark:bg-gray-800 text-slate-500"
                }`}
              >
                Todas
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all border-2 ${
                    activeCategory === cat
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-transparent bg-gray-100 dark:bg-gray-800 text-slate-500"
                  }`}
                >
                  {productCategoryLabel[cat] || cat}
                </button>
              ))}
            </div>
          </section>

          <section>
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-3">
              Ordenar por
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSortBy("Preço")}
                className={`flex items-center justify-center gap-2 py-3.5 rounded-2xl border-2 rounded-full transition-all ${
                  sortBy === "Preço"
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-gray-100 dark:border-gray-800 text-slate-500"
                }`}
              >
                <span className="material-symbols-outlined text-base">
                  trending_up
                </span>
                <span className="text-[10px] font-black uppercase">Preço</span>
              </button>
              <button
                onClick={() => setSortBy("Novos")}
                className={`flex items-center justify-center gap-2 py-3.5 rounded-2xl border-2 transition-all ${
                  sortBy === "Novos"
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-gray-100 dark:border-gray-800 text-slate-500"
                }`}
              >
                <span className="material-symbols-outlined text-base">
                  history
                </span>
                <span className="text-[10px] font-black uppercase">Novos</span>
              </button>
            </div>
          </section>
        </div>

        <TralloButton
          onClick={handleApply}
          className="w-full !h-14"
        >
          Aplicar Filtros
        </TralloButton>
      </div>
    </div>
  );
};

export default OwnProductFilterDrawer;
