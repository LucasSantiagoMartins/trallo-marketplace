import React from "react";
import TralloButton from "./TralloButton";
import { PRODUCT_CATEGORIES } from "@/constants/product-options";

interface CategoryDrawerProps {
  isOpen: boolean;
  isOpening: boolean;
  isClosing: boolean;
  selectedCategory: string;
  onClose: () => void;
  onSelect: (value: string) => void;
}

const CategoryDrawer: React.FC<CategoryDrawerProps> = ({
  isOpen,
  isOpening,
  isClosing,
  selectedCategory,
  onClose,
  onSelect,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex justify-end transition-opacity duration-500 ${isClosing || isOpening ? "opacity-0" : "opacity-100"}`}
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-[4px]"
        onClick={onClose}
      />
      <div
        className={`relative w-[85%] md:w-[400px] h-full bg-card shadow-2xl flex flex-col p-6 transition-transform duration-500 ${isClosing || isOpening ? "translate-x-full" : "translate-x-0"}`}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold">Categorias</h3>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-muted/50 hover:bg-muted text-muted-foreground transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
          {PRODUCT_CATEGORIES.map((cat) => (
            <div
              key={cat.value}
              onClick={() => onSelect(cat.value)}
              className={`p-5 rounded-2xl cursor-pointer border flex items-center justify-between transition-all duration-200 ${selectedCategory === cat.value ? "bg-primary/10 border-primary text-primary" : "bg-muted/30 border-transparent hover:bg-muted/50"}`}
            >
              <span className="font-bold">{cat.label}</span>
              {selectedCategory === cat.value && (
                <span className="material-symbols-outlined">check_circle</span>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4">
          <TralloButton onClick={onClose} fullWidth>
            Confirmar
          </TralloButton>
        </div>
      </div>
    </div>
  );
};

export default CategoryDrawer;
