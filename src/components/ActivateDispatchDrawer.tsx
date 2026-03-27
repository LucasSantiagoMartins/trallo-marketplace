import React, { useState, useEffect, useMemo } from "react";
import { X } from "lucide-react";
import TralloInput from "@/components/TralloInput";
import TralloButton from "@/components/TralloButton";
import { formatPrice } from "@/utils/currency";

interface ActivateDispatchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string;
  productName: string;
  currentPrice: number;
  onConfirm: (data: {
    productId: string;
    minPrice: number;
    durationInMinutes: number;
  }) => Promise<void>;
}

const ActivateDispatchDrawer: React.FC<ActivateDispatchDrawerProps> = ({
  isOpen,
  onClose,
  productId,
  productName,
  currentPrice,
  onConfirm,
}) => {
  const recommendation = useMemo(() => currentPrice * 0.9, [currentPrice]);

  const [minPrice, setMinPrice] = useState("");
  const [duration, setDuration] = useState(4320);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentY, setCurrentY] = useState(0);
  const [startY, setStartY] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      setMinPrice(Math.round(recommendation).toString());
      document.body.style.overflow = "hidden";
    } else {
      setMounted(false);
      document.body.style.overflow = "unset";
    }
  }, [isOpen, recommendation]);

  const handleClose = () => {
    setMounted(false);
    setTimeout(() => {
      onClose();
      setCurrentY(0);
    }, 400);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onConfirm({
        productId,
        minPrice: Number(minPrice),
        durationInMinutes: duration,
      });
      handleClose();
    } catch (error) {
      console.error("Falha ao ativar despacho:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
    setIsDragging(true);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (startY === null) return;
    const deltaY = e.touches[0].clientY - startY;
    if (deltaY > 0) window.requestAnimationFrame(() => setCurrentY(deltaY));
  };

  const onTouchEnd = () => {
    setIsDragging(false);
    if (currentY > 120) handleClose();
    else setCurrentY(0);
    setStartY(null);
  };

  const durationOptions = [
    { label: "3 dias", value: 4320 },
    { label: "1 sem", value: 10080 },
    { label: "2 sem", value: 20160 },
    { label: "3 sem", value: 30240 },
    { label: "1 mês", value: 43200 },
  ];

  if (!isOpen && !mounted) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center overflow-hidden touch-none">
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`}
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
        className={`relative w-full max-w-lg bg-card rounded-t-[2.5rem] sm:rounded-[2.5rem] p-8 shadow-2xl border-t border-border sm:border filter-none will-change-transform ${mounted ? "opacity-100" : "opacity-0"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-3 left-0 right-0 sm:hidden">
          <div className="w-12 h-1.5 bg-muted-foreground/20 rounded-full mx-auto" />
        </div>

        <button
          type="button"
          onClick={handleClose}
          className="hidden sm:flex absolute right-6 top-6 size-10 items-center justify-center rounded-full bg-muted/50 text-muted-foreground hover:bg-muted transition-colors z-10"
        >
          <X size={20} />
        </button>

        <header className="mb-8 mt-2 sm:mt-0 text-center sm:text-left">
          <div className="size-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4 mx-auto sm:mx-0">
            <span className="material-symbols-outlined text-4xl">speed</span>
          </div>
          <h3 className="text-2xl font-black tracking-tight text-foreground">
            Ativar Despacho
          </h3>
          <p className="text-muted-foreground text-sm font-medium mt-1">
            O preço atual é{" "}
            <strong className="text-foreground">
              {formatPrice(currentPrice)}
            </strong>
            . Recomendamos descer 10% para{" "}
            <strong className="text-primary">
              {formatPrice(recommendation)}
            </strong>
            .
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <TralloInput
            label="Preço Mínimo Aceitável"
            type="number"
            placeholder="0.00"
            value={minPrice}
            onChange={(val) => setMinPrice(val)}
            icon="trending_down"
          />

          <div className="space-y-3">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-tight ml-1">
              Duração do Despacho
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {durationOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setDuration(opt.value)}
                  className={`h-11 rounded-full text-[10px] font-black transition-all border-2 ${
                    duration === opt.value
                      ? "border-primary bg-primary/5 text-primary shadow-sm"
                      : "border-transparent bg-muted text-muted-foreground"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <TralloButton
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isSubmitting}
              icon="bolt"
            >
              Confirmar e Ativar
            </TralloButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActivateDispatchDrawer;
