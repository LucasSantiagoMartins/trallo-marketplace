import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    if (isOpen) {
      setTempSelection(selectedCategory);
    }
  }, [isOpen, selectedCategory]);

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
      className={`fixed inset-0 z-[100] flex justify-end transition-opacity duration-300 ease-in-out ${
        isClosing || isOpening ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300"
        onClick={onClose}
      />

      <div
        className={`relative w-[85%] md:w-[400px] h-full bg-card shadow-2xl flex flex-col p-6 transform-gpu transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform ${
          isClosing || isOpening ? "translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold tracking-tight">Categorias</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-muted/50 text-muted-foreground active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
          {categories.map((category) => {
            const isSelected = tempSelection === category;
            const label = productCategoryLabel[category] || category;

            return (
              <div
                key={category}
                onClick={() => setTempSelection(category)}
                className={`relative p-3.5 rounded-xl cursor-pointer border transform-gpu transition-all duration-200 ease-out active:scale-[0.97] ${
                  isSelected
                    ? "bg-primary/10 border-primary text-primary shadow-sm"
                    : "bg-muted/20 border-transparent text-muted-foreground hover:bg-muted/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-sm transition-transform duration-200 ${
                      isSelected ? "font-semibold translate-x-1" : "font-medium"
                    }`}
                  >
                    {label}
                  </span>

                  <div
                    className={`flex items-center transition-all duration-200 transform-gpu ${
                      isSelected
                        ? "scale-100 opacity-100 rotate-0"
                        : "scale-50 opacity-0 -rotate-12"
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
