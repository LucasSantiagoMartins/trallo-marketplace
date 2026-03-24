import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";

interface CustomReasonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  isLoading?: boolean;
}

const CustomReasonModal: React.FC<CustomReasonModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
}) => {
  const [mounted, setMounted] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [text, setText] = useState("");
  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 1024);
    checkDevice();
    window.addEventListener("resize", checkDevice);

    if (isOpen) {
      setMounted(true);
      setDragY(0);
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
      setTimeout(() => setAnimate(true), 10);
    } else {
      setAnimate(false);
      const timer = setTimeout(() => {
        setMounted(false);
        document.body.style.overflow = "";
        document.body.style.height = "";
      }, 300);
      return () => clearTimeout(timer);
    }
    return () => window.removeEventListener("resize", checkDevice);
  }, [isOpen]);

  const handleClose = () => {
    if (isLoading) return;
    setAnimate(false);
    setDragY(0);
    setTimeout(onClose, 300);
  };

  const handleConfirm = () => {
    if (text.trim() && !isLoading) {
      onConfirm(text);
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    if (!isMobile || isLoading) return;
    touchStart.current = e.targetTouches[0].clientY;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isMobile || touchStart.current === null || isLoading) return;
    const currentTouch = e.targetTouches[0].clientY;
    const diff = currentTouch - touchStart.current;
    if (diff > 0) setDragY(diff);
  };

  const onTouchEnd = () => {
    if (dragY > 100) {
      handleClose();
    } else {
      setDragY(0);
    }
    touchStart.current = null;
  };

  if (!mounted) return null;

  const currentTranslateY = isMobile
    ? animate
      ? dragY
      : "100%"
    : animate
      ? 0
      : "40px";

  const desktopClasses = !isMobile
    ? `transition-all duration-300 ease-out ${animate ? "opacity-100 scale-100" : "opacity-0 scale-95"}`
    : "";

  const modalContent = (
    <div className="fixed inset-0 w-screen h-screen z-[9000] flex items-end lg:items-center justify-center overflow-hidden touch-none">
      <div
        className={`absolute inset-0 w-full h-full bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-in-out cursor-pointer ${
          animate ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      <div
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{
          transform: `translateY(${typeof currentTranslateY === "number" ? currentTranslateY + "px" : currentTranslateY})`,
          transition:
            isMobile && touchStart.current !== null
              ? "none"
              : "all 0.3s ease-out",
        }}
        className={`
          relative w-full lg:max-w-[500px] bg-white dark:bg-[#1c182d] 
          rounded-t-[2.5rem] lg:rounded-[2.5rem] shadow-2xl flex flex-col 
          pointer-events-auto overflow-hidden touch-auto
          h-auto max-h-[85vh] lg:h-auto
          ${desktopClasses}
        `}
      >
        {isMobile ? (
          <div className="w-full pt-4 pb-2 cursor-grab active:cursor-grabbing shrink-0">
            <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto" />
          </div>
        ) : (
          <div className="absolute top-6 right-6 z-[110]">
            <button
              type="button"
              disabled={isLoading}
              onClick={handleClose}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-white/20 transition-all cursor-pointer border-none outline-none active:scale-90 disabled:opacity-50"
            >
              <span className="material-symbols-outlined pointer-events-none">
                close
              </span>
            </button>
          </div>
        )}

        <div className="flex flex-col items-center px-8 pt-8 pb-4 shrink-0 text-center">
          <div className="w-16 h-16 bg-[#6C3EF8]/5 rounded-2xl flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-[#6C3EF8] text-3xl">
              edit_note
            </span>
          </div>

          <h3 className="text-xl font-bold text-[#0F172A] dark:text-white mb-1">
            Motivo Personalizado
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-xs mb-6">
            Descreva detalhadamente a razão da suspensão
          </p>

          <textarea
            value={text}
            disabled={isLoading}
            onChange={(e) => setText(e.target.value)}
            placeholder="Digite aqui o motivo..."
            className="w-full h-32 p-5 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-[24px] text-sm outline-none focus:ring-2 focus:ring-[#6C3EF8]/20 transition-all resize-none mb-6 font-medium text-slate-600 dark:text-slate-200 disabled:opacity-50"
          />

          <div className="flex flex-col gap-2 w-full pb-4">
            <button
              disabled={!text.trim() || isLoading}
              onClick={handleConfirm}
              className="w-full py-4 bg-[#6C3EF8] text-white rounded-2xl text-sm font-bold shadow-lg shadow-[#6C3EF8]/20 disabled:opacity-20 transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="animate-spin material-symbols-outlined text-lg">
                    sync
                  </span>
                  Processando...
                </>
              ) : (
                "Confirmar Detalhes"
              )}
            </button>

            
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default CustomReasonModal;
