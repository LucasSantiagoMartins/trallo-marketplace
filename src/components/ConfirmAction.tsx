import React, { useEffect } from "react";

interface ConfirmActionProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  title: string;
  description: string;
  confirmText: string;
  cancelText?: string;
  icon?: string;
  variant?: "danger" | "primary";
  details?: string;
}

const ConfirmAction: React.FC<ConfirmActionProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
  title,
  description,
  confirmText,
  cancelText = "Cancelar",
  icon = "warning",
  variant = "danger",
  details,
}) => {
  // Bloqueia o scroll da página quando o modal está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6 w-screen h-screen">
      <div
        onClick={!isLoading ? onClose : undefined}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
      />

      <div className="relative bg-white dark:bg-gray-900 w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        <div
          className={`size-16 rounded-3xl flex items-center justify-center mx-auto mb-6 ${
            variant === "danger"
              ? "bg-red-50 dark:bg-red-500/10 text-red-500"
              : "bg-primary/10 text-primary"
          }`}
        >
          <span className="material-symbols-outlined text-3xl">{icon}</span>
        </div>

        <div className="text-center mb-8">
          <h3 className="text-xl font-black mb-2">{title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
          {details && (
            <div className="mt-4 p-3 bg-gray-50 dark:bg-white/5 rounded-2xl text-[11px] font-mono break-all opacity-60">
              {details}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="h-14 rounded-2xl font-bold text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-all"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`h-14 rounded-2xl font-bold text-white shadow-lg active:scale-95 transition-all disabled:opacity-50 ${
              variant === "danger"
                ? "bg-red-500 shadow-red-500/20"
                : "bg-primary shadow-primary/20"
            }`}
          >
            {isLoading ? (
              <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmAction;
