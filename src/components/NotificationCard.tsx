import { Notification } from "@/types/notification";
import React, { useRef, useState } from "react";

interface Props {
  notification: Notification;
  onDelete: () => void;
  onRead: () => void;
}

const NotificationCard: React.FC<Props> = ({
  notification,
  onDelete,
  onRead,
}) => {
  const { title, description, time, type, isRead, highlightText, amount } =
    notification;

  const containerRef = useRef<HTMLDivElement>(null);
  const [offsetX, setOffsetX] = useState(0);

  const startX = useRef(0);
  const currentX = useRef(0);
  const threshold = 100;
  const maxPull = 120;

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    if (containerRef.current) {
      containerRef.current.style.transition = "none";
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    currentX.current = e.touches[0].clientX;
    const diff = currentX.current - startX.current;
    const clampedDiff = Math.max(-maxPull, Math.min(maxPull, diff));
    setOffsetX(clampedDiff);
  };

  const handleTouchEnd = () => {
    if (containerRef.current) {
      containerRef.current.style.transition =
        "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
    }

    if (offsetX >= threshold) {
      onRead();
      setOffsetX(0);
    } else if (offsetX <= -threshold) {
      // APENAS CHAMA A FUNÇÃO (VAI ABRIR O MODAL)
      // O CARD VOLTA PARA O LUGAR ATÉ QUE SEJA CONFIRMADO
      onDelete();
      setOffsetX(0);
    } else {
      setOffsetX(0);
    }
  };

  const config = {
    order: {
      icon: "package_2",
      color:
        "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400",
    },
    payment: {
      icon: "payments",
      color:
        "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
    },
    support: {
      icon: "support_agent",
      color:
        "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
    },
    shipping: {
      icon: "local_shipping",
      color:
        "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400",
    },
  };

  const currentConfig = config[type as keyof typeof config] || config.order;

  return (
    <div className="relative overflow-hidden h-auto mb-4 transition-all duration-300">
      <div className="absolute inset-0 flex items-center justify-between rounded-2xl overflow-hidden">
        <div
          className={`flex items-center justify-start pl-8 w-1/2 h-full bg-emerald-500 text-white transition-opacity ${offsetX > 20 ? "opacity-100" : "opacity-0"}`}
        >
          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined">done_all</span>
            <span className="text-[10px] font-bold uppercase tracking-wider">
              Lida
            </span>
          </div>
        </div>

        <div
          className={`flex items-center justify-end pr-8 w-1/2 h-full bg-rose-500 text-white transition-opacity ${offsetX < -20 ? "opacity-100" : "opacity-0"}`}
        >
          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined">delete</span>
            <span className="text-[10px] font-bold uppercase tracking-wider">
              Apagar
            </span>
          </div>
        </div>
      </div>

      <div
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ transform: `translateX(${offsetX}px)` }}
        className="relative z-10 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4 items-start touch-pan-y shadow-sm select-none"
      >
        <div
          className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center ${currentConfig.color}`}
        >
          <span className="material-symbols-outlined text-2xl">
            {currentConfig.icon}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">
              {title}
            </p>
            <div className="flex items-center gap-1.5 text-slate-400 shrink-0">
              <span className="material-symbols-outlined text-sm">
                schedule
              </span>
              <span className="text-[10px] sm:text-xs font-black uppercase">
                {time}
              </span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {description}
            {highlightText && (
              <span className="font-bold text-indigo-600 ml-1">
                {highlightText}
              </span>
            )}
            {amount && (
              <span className="font-bold text-slate-900 dark:text-white ml-1">
                {amount}
              </span>
            )}
          </p>
        </div>

        {!isRead && (
          <div className="absolute top-3 left-3 w-2.5 h-2.5 rounded-full bg-indigo-600 border-2 border-white dark:border-slate-900"></div>
        )}
      </div>
    </div>
  );
};

export default NotificationCard;
