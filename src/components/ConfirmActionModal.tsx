import React from "react";

interface ConfirmActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  title: string;
  description: string;
  confirmText: string;
  cancelText?: string;
  icon?: string;
  variant?: "danger" | "primary" | "warning";
}

const ConfirmAction: React.FC<ConfirmActionModalProps> = ({
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
}) => {
  if (!isOpen) return null;

  const variantStyles = {
    danger: "bg-red-500 hover:bg-red-600 text-white shadow-red-500/20",
    primary: "bg-primary hover:bg-primary/90 text-white shadow-primary/20",
    warning: "bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20",
  };

  const iconStyles = {
    danger: "bg-red-50 dark:bg-red-900/20 text-red-500",
    primary: "bg-blue-50 dark:bg-blue-900/20 text-primary",
    warning: "bg-amber-50 dark:bg-amber-900/20 text-amber-500",
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={!isLoading ? onClose : undefined}
      />

      <div className="relative bg-white dark:bg-gray-800 rounded-[2.5rem] p-8 w-full max-w-sm shadow-2xl border border-gray-100 dark:border-gray-700 animate-in fade-in zoom-in duration-300">
        <div className="flex flex-col items-center text-center">
          <div
            className={`size-16 ${iconStyles[variant]} rounded-3xl flex items-center justify-center mb-6`}
          >
            <span className="material-symbols-outlined text-3xl">{icon}</span>
          </div>

          <h3 className="text-xl font-black mb-2 text-foreground dark:text-white">
            {title}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-8 leading-relaxed">
            {description}
          </p>

          <div className="flex flex-col w-full gap-3">
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className={`w-full py-4 ${variantStyles[variant]} disabled:opacity-70 font-bold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95`}
            >
              {isLoading ? (
                <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                confirmText
              )}
            </button>

            <button
              onClick={onClose}
              disabled={isLoading}
              className="w-full py-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-white font-bold rounded-2xl transition-all active:scale-95"
            >
              {cancelText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmAction;
