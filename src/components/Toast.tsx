import React, { useEffect, useState, useRef } from "react";
import type { ToastData } from "@/context/ToastContext";
import { useAppToast } from "@/hooks/useAppToast";

const TOAST_DURATION = 3500;

const iconMap: Record<string, string> = {
  success: "check_circle",
  error: "cancel",
  info: "info",
};

const toastStyles: Record<
  string,
  { bg: string; bar: string; iconColor: string }
> = {
  success: {
    bg: "from-emerald-500/15 via-emerald-500/5 to-transparent",
    bar: "bg-emerald-500",
    iconColor: "text-emerald-500",
  },
  error: {
    bg: "from-rose-500/15 via-rose-500/5 to-transparent",
    bar: "bg-rose-500",
    iconColor: "text-rose-500",
  },
  info: {
    bg: "from-sky-500/15 via-sky-500/5 to-transparent",
    bar: "bg-sky-500",
    iconColor: "text-sky-500",
  },
};

const SingleToast: React.FC<{
  toast: ToastData;
  onRemove: (id: number) => void;
}> = ({ toast, onRemove }) => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(100);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));

    const step = 100 / (TOAST_DURATION / 50);
    intervalRef.current = setInterval(() => {
      setProgress((prev) => (prev <= 0 ? 0 : prev - step));
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
      className={`relative overflow-hidden bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl rounded-xl shadow-lg border border-zinc-200/50 dark:border-zinc-800/50 transition-all duration-400 ease-out ${
        visible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 -translate-y-4 scale-95"
      }`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-r ${toastStyles[toast.type].bg} pointer-events-none`}
      />

      <div className="relative flex items-center gap-3 px-4 py-3">
        <span
          className={`material-symbols-outlined text-2xl font-light ${toastStyles[toast.type].iconColor}`}
        >
          {iconMap[toast.type]}
        </span>

        <span className="flex-1 text-sm font-medium text-zinc-600 dark:text-zinc-300 leading-snug">
          {toast.message}
        </span>

        <button
          onClick={() => onRemove(toast.id)}
          className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors p-1"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
      </div>

      <div className="h-1 w-full bg-zinc-100 dark:bg-zinc-800/30">
        <div
          className={`h-full ${toastStyles[toast.type].bar} transition-none`}
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
    <div className="fixed top-4 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 z-[9999] flex flex-col gap-2 w-[calc(100%-2rem)] max-w-[320px] pointer-events-auto">
      {toasts.map((t) => (
        <SingleToast key={t.id} toast={t} onRemove={removeToast} />
      ))}
    </div>
  );
};

export default ToastContainer;
