import React, { useState } from "react";
import TralloButton from "./TralloButton";
import { PRODUCT_CONDITIONS } from "@/constants/product-options";

interface ConditionModalProps {
  isOpen: boolean;
  isOpening: boolean;
  isClosing: boolean;
  selectedCondition: string;
  onClose: () => void;
  onSelect: (value: string) => void;
}

const ConditionModal: React.FC<ConditionModalProps> = ({
  isOpen,
  isOpening,
  isClosing,
  selectedCondition,
  onClose,
  onSelect,
}) => {
  const [touchStart, setTouchStart] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const currentTouch = e.targetTouches[0].clientY;
    const diff = currentTouch - touchStart;

    // Se deslizar mais de 100px para baixo, fecha
    if (diff > 100) {
      onClose();
      setTouchStart(null);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4 bg-black/60 backdrop-blur-[4px] transition-opacity duration-500 ${isClosing || isOpening ? "opacity-0" : "opacity-100"}`}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        className={`bg-card w-full max-w-sm rounded-t-[32px] md:rounded-[32px] p-6 pt-3 space-y-6 shadow-2xl transition-all duration-500 ${isClosing || isOpening ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"}`}
      >
        <div className="flex flex-col items-center w-full md:hidden mb-2">
          <div className="w-12 h-1.5 rounded-full bg-muted-foreground/20" />
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-muted/50 hover:bg-muted text-muted-foreground transition-colors z-10"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        <div className="text-center pt-2">
          <h3 className="text-xl font-bold">Estado do Artigo</h3>
          <p className="text-sm text-muted-foreground">
            Como classificas a conservação?
          </p>
        </div>

        <div className="grid gap-3">
          {PRODUCT_CONDITIONS.map((opt) => (
            <div
              key={opt.value}
              onClick={() => onSelect(opt.value)}
              className={`p-4 rounded-2xl cursor-pointer border flex items-center justify-between transition-all duration-200 ${selectedCondition === opt.value ? "bg-primary/10 border-primary text-primary" : "bg-muted/30 border-transparent hover:bg-muted/50"}`}
            >
              <span className="font-bold">{opt.label}</span>
              {selectedCondition === opt.value && (
                <span className="material-symbols-outlined text-primary">
                  check_circle
                </span>
              )}
            </div>
          ))}
        </div>

        <TralloButton onClick={onClose} fullWidth>
          Confirmar
        </TralloButton>
      </div>
    </div>
  );
};

export default ConditionModal;
