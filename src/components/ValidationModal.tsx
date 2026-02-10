import React, { useState, useEffect } from "react";

interface ValidationModalProps {
  isOpen: boolean;
  onClose: () => void;
  translateY: number;
  touchStart: number | null;
  handlers: {
    onStart: (e: React.TouchEvent) => void;
    onMove: (e: React.TouchEvent) => void;
    onEnd: () => void;
  };
}

const ValidationModal: React.FC<ValidationModalProps> = ({
  isOpen,
  onClose,
  translateY,
  touchStart,
  handlers,
}) => {
  const [selectedType, setSelectedType] = useState<
    "online" | "presencial" | null
  >(null);
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => setIsAnimating(true), 10);
      setSelectedType(null);
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  const handleConfirm = () => {
    if (selectedType) {
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[110] flex items-end sm:items-center justify-center p-0 sm:p-4 transition-opacity duration-300 ease-out ${
        isAnimating ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        onTouchStart={handlers.onStart}
        onTouchMove={handlers.onMove}
        onTouchEnd={handlers.onEnd}
        style={{
          transform:
            translateY > 0
              ? `translateY(${translateY}px)`
              : !isAnimating
                ? "translateY(100%)"
                : "translateY(0)",
          transition:
            touchStart === null
              ? "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
              : "none",
        }}
        className={`relative w-full sm:max-w-md bg-white dark:bg-slate-900 rounded-t-[2.5rem] sm:rounded-[2.5rem] p-8 shadow-2xl touch-none transition-transform duration-300 ease-out
          ${!isAnimating ? "sm:scale-95 sm:opacity-0" : "sm:scale-100 sm:opacity-100"}
        `}
      >
        <div className="absolute top-0 left-0 right-0 h-8 flex items-center justify-center sm:hidden">
          <div className="w-12 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full" />
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 size-14 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        <div className="mt-4">
          <h3 className="text-xl font-black mb-2 tracking-tight">
            Tipo de Validação
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
            Como deseja finalizar este processo de análise para o vendedor?
          </p>

          <div className="grid gap-4 mb-8">
            <button
              onClick={() => setSelectedType("online")}
              className={`flex items-center gap-4 p-5 rounded-3xl border-2 transition-all group text-left ${
                selectedType === "online"
                  ? "bg-primary/5 border-primary"
                  : "bg-slate-50 dark:bg-white/5 border-transparent"
              }`}
            >
              <div
                className={`size-12 rounded-2xl flex items-center justify-center transition-colors ${
                  selectedType === "online"
                    ? "bg-primary text-white"
                    : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"
                }`}
              >
                <span className="material-symbols-outlined">language</span>
              </div>
              <div className="flex-1">
                <p className="font-bold">Online</p>
                <p className="text-xs text-slate-500">
                  Aprovação digital imediata
                </p>
              </div>
              {selectedType === "online" && (
                <span className="material-symbols-outlined text-primary">
                  check_circle
                </span>
              )}
            </button>

            <button
              onClick={() => setSelectedType("presencial")}
              className={`flex items-center gap-4 p-5 rounded-3xl border-2 transition-all group text-left ${
                selectedType === "presencial"
                  ? "bg-primary/5 border-primary"
                  : "bg-slate-50 dark:bg-white/5 border-transparent"
              }`}
            >
              <div
                className={`size-12 rounded-2xl flex items-center justify-center transition-colors ${
                  selectedType === "presencial"
                    ? "bg-primary text-white"
                    : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"
                }`}
              >
                <span className="material-symbols-outlined">
                  person_pin_circle
                </span>
              </div>
              <div className="flex-1">
                <p className="font-bold">Presencial</p>
                <p className="text-xs text-slate-500">
                  Agendar verificação física
                </p>
              </div>
              {selectedType === "presencial" && (
                <span className="material-symbols-outlined text-primary">
                  check_circle
                </span>
              )}
            </button>
          </div>

          <button
            onClick={handleConfirm}
            disabled={!selectedType}
            className={`w-full py-4 rounded-2xl font-bold transition-all ${
              selectedType
                ? "bg-primary text-white shadow-lg shadow-primary/25 active:scale-[0.98]"
                : "bg-slate-100 dark:bg-white/5 text-slate-400 cursor-not-allowed"
            }`}
          >
            Concluir Verificação
          </button>
        </div>
      </div>
    </div>
  );
};

export default ValidationModal;
