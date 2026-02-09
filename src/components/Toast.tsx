import React, { useEffect, useState } from "react";
import type { ToastData } from "@/context/ToastContext";
import { useAppToast } from "@/hooks/useAppToast";

const iconMap: Record<string, string> = {
  success: "check_circle",
  error: "error",
  info: "info",
};

const colorMap: Record<string, string> = {
  success: "bg-green-500",
  error: "bg-destructive",
  info: "bg-primary",
};

const SingleToast: React.FC<{ toast: ToastData; onRemove: (id: number) => void }> = ({
  toast,
  onRemove,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onRemove(toast.id), 300);
    }, 3200);
    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-white text-sm font-medium transition-all duration-300 ${
        colorMap[toast.type]
      } ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
    >
      <span className="material-symbols-outlined text-lg">{iconMap[toast.type]}</span>
      <span className="flex-1">{toast.message}</span>
      <button onClick={() => onRemove(toast.id)} className="opacity-70 hover:opacity-100">
        <span className="material-symbols-outlined text-base">close</span>
      </button>
    </div>
  );
};

const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useAppToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 max-w-sm w-full pointer-events-auto">
      {toasts.map((t) => (
        <SingleToast key={t.id} toast={t} onRemove={removeToast} />
      ))}
    </div>
  );
};

export default ToastContainer;
