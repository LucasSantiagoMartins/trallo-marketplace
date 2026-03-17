import React, { useState, useEffect, useRef } from "react";
import TralloButton from "./TralloButton";
import { ProductCategory } from "@/enums/product-category.enum";
import { productCategoryLabel } from "@/utils/mappers/product-category.mapper";

interface CategoryDrawerProps {
  isOpen: boolean;
  isOpening: boolean;
  isClosing: boolean;
  selectedCategory: ProductCategory | "";
  onClose: () => void;
  onSelect: (value: ProductCategory) => void;
}

const CategoryDrawer: React.FC<CategoryDrawerProps> = ({
  isOpen,
  isOpening,
  isClosing,
  selectedCategory,
  onClose,
  onSelect,
}) => {
  const [tempSelection, setTempSelection] = useState<ProductCategory | "">(
    selectedCategory,
  );

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchTranslation, setTouchTranslation] = useState(0);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTempSelection(selectedCategory);
      setTouchTranslation(0);
    }
  }, [isOpen, selectedCategory]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const currentTouch = e.targetTouches[0].clientX;
    const diff = currentTouch - touchStart;
    if (diff > 0) {
      setTouchTranslation(diff);
    }
  };

  const handleTouchEnd = () => {
    if (touchTranslation > 80) {
      onClose();
    } else {
      setTouchTranslation(0);
    }
    setTouchStart(null);
  };

  if (!isOpen) return null;

  const categories = Object.values(ProductCategory);

  const handleConfirm = () => {
    if (tempSelection !== "") {
      onSelect(tempSelection as ProductCategory);
    }
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex justify-end transition-opacity duration-150 ${
        isClosing || isOpening ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div
        ref={drawerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: `translateX(${isClosing || isOpening ? "100%" : `${touchTranslation}px`})`,
          transition: touchStart !== null ? "none" : "transform 0.2s ease-out",
        }}
        className="relative w-[85%] md:w-[400px] h-full bg-card shadow-2xl flex flex-col p-6 rounded-t-[20px] rounded-b-[20px] will-change-transform"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold tracking-tight">Categorias</h3>
          <button
            onClick={onClose}
            className="hidden md:flex w-8 h-8 items-center justify-center rounded-full bg-muted/50 text-muted-foreground"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>

          <div className="md:hidden w-12 h-1.5 bg-muted rounded-full absolute left-1/2 -translate-x-1/2 top-3 opacity-30" />
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 pr-1 overscroll-contain">
          {categories.map((category) => {
            const isSelected = tempSelection === category;
            const label = productCategoryLabel[category] || category;

            return (
              <div
                key={category}
                onClick={() => setTempSelection(category)}
                className={`relative p-3.5 rounded-xl cursor-pointer border transition-colors duration-75 ${
                  isSelected
                    ? "bg-primary/10 border-primary text-primary"
                    : "bg-muted/10 border-transparent text-muted-foreground"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-sm ${isSelected ? "font-semibold" : "font-medium"}`}
                  >
                    {label}
                  </span>

                  <div
                    className={`flex items-center ${
                      isSelected ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <span className="material-symbols-outlined text-lg">
                      check_circle
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-2 border-t border-border/50">
          <TralloButton
            onClick={handleConfirm}
            fullWidth
            disabled={tempSelection === ""}
          >
            Confirmar
          </TralloButton>
        </div>
      </div>
    </div>
  );
};

export default CategoryDrawer;
