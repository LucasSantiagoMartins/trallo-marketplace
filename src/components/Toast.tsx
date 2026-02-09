import React, { useEffect, useState, useRef } from "react";
import type { ToastData } from "@/context/ToastContext";
import { useAppToast } from "@/hooks/useAppToast";

const TOAST_DURATION = 3500;

const iconMap: Record<string, string> = {
  success: "check_circle",
  error: "cancel",
  info: "info",
};

const toastStyles: Record<string, { bg: string; bar: string; icon: string }> = {
  success: {
    bg: "from-emerald-500/10 via-emerald-500/5 to-transparent",
    bar: "from-emerald-400 to-emerald-600",
    icon: "from-emerald-400 to-emerald-600",
  },
  error: {
    bg: "from-rose-500/10 via-rose-500/5 to-transparent",
    bar: "from-rose-400 to-rose-600",
    icon: "from-rose-400 to-rose-600",
  },
  info: {
    bg: "from-sky-500/10 via-sky-500/5 to-transparent",
    bar: "from-sky-400 to-sky-600",
    icon: "from-sky-400 to-sky-600",
  },
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
      className={`relative overflow-hidden bg-gradient-to-r ${toastStyles[toast.type].bg} bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/40 transition-all duration-300 ${
        visible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-8 scale-95"
      }`}
    >
      <div className="flex items-center gap-3 px-4 py-3.5">
        <div
          className={`w-10 h-10 rounded-xl bg-gradient-to-br ${toastStyles[toast.type].icon} flex items-center justify-center shrink-0 shadow-md`}
        >
          <span className="material-symbols-outlined text-white text-xl font-medium">
            {iconMap[toast.type]}
          </span>
        </div>
        <span className="flex-1 text-sm font-semibold text-zinc-800 leading-snug">{toast.message}</span>
        <button
          onClick={() => onRemove(toast.id)}
          className="text-zinc-300 hover:text-zinc-500 transition-colors p-1"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
      </div>
      <div className="h-1 w-full bg-zinc-100/50">
        <div
          className={`h-full bg-gradient-to-r ${toastStyles[toast.type].bar} rounded-full transition-none`}
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
