import React, { useEffect, useState, useRef } from "react";
import type { ToastData } from "@/context/ToastContext";
import { useAppToast } from "@/hooks/useAppToast";

const TOAST_DURATION = 3500;

const iconMap: Record<string, string> = {
  success: "check",
  error: "close",
  info: "info",
};

const gradientMap: Record<string, string> = {
  success: "bg-gradient-to-br from-green-400 to-green-600",
  error: "bg-gradient-to-br from-red-400 to-red-600",
  info: "bg-gradient-to-br from-blue-400 to-blue-600",
};

const barColorMap: Record<string, string> = {
  success: "bg-green-500",
  error: "bg-red-500",
  info: "bg-blue-500",
};

const SingleToast: React.FC<{ toast: ToastData; onRemove: (id: number) => void }> = ({
  toast,
  onRemove,
}) => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(100);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));

    const step = 100 / (TOAST_DURATION / 50);
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) return 0;
        return prev - step;
      });
    }, 50);

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onRemove(toast.id), 300);
    }, TOAST_DURATION);

    return () => {
      clearTimeout(timer);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [toast.id, onRemove]);

  return (
    <div
      className={`relative overflow-hidden bg-white/80 backdrop-blur-md rounded-xl shadow-lg transition-all duration-300 ${
        visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
      }`}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <div
          className={`w-9 h-9 rounded-full ${gradientMap[toast.type]} flex items-center justify-center shrink-0`}
        >
          <span className="material-symbols-outlined text-white text-lg">
            {iconMap[toast.type]}
          </span>
        </div>
        <span className="flex-1 text-sm font-medium text-zinc-800">{toast.message}</span>
        <button
          onClick={() => onRemove(toast.id)}
          className="text-zinc-400 hover:text-zinc-600 transition-colors"
        >
          <span className="material-symbols-outlined text-base">close</span>
        </button>
      </div>
      {/* Progress bar */}
      <div className="h-1 w-full bg-zinc-100">
        <div
          className={`h-full ${barColorMap[toast.type]} transition-none`}
          style={{ width: `${Math.max(progress, 0)}%` }}
        />
      </div>
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
