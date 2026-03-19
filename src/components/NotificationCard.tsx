import { Notification } from "@/types/notification";
import { getNotificationVisual } from "@/utils/mappers/notification.mapper";
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
  const { title, message, createdAt, type, read } = notification;
  const visual = getNotificationVisual(type);

  const time = new Date(createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const [offsetX, setOffsetX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const startX = useRef(0);
  const startY = useRef(0);
  const isScroll = useRef(false);
  const threshold = 100;
  const maxPull = 120;

  const onStart = (clientX: number, clientY: number) => {
    startX.current = clientX;
    startY.current = clientY;
    isScroll.current = false;
    setIsDragging(true);
    if (containerRef.current) containerRef.current.style.transition = "none";
  };

  const onMove = (clientX: number, clientY: number) => {
    if (!isDragging || isScroll.current) return;

    const diffX = clientX - startX.current;
    const diffY = clientY - startY.current;

    if (!isScroll.current && Math.abs(diffY) > Math.abs(diffX)) {
      isScroll.current = true;
      setOffsetX(0);
      return;
    }

    const minLimit = -maxPull;
    const maxLimit = read ? 0 : maxPull;
    const clampedDiff = Math.max(minLimit, Math.min(maxLimit, diffX));

    setOffsetX(clampedDiff);
  };

  const onEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (containerRef.current) {
      containerRef.current.style.transition =
        "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
    }

    if (!isScroll.current) {
      if (offsetX >= threshold && !read) {
        onRead();
      } else if (offsetX <= -threshold) {
        onDelete();
      }
    }
    setOffsetX(0);
  };

  return (
    <div
      className="relative overflow-hidden h-auto mb-4 select-none group"
      onMouseMove={(e) => onMove(e.clientX, e.clientY)}
      onMouseUp={onEnd}
      onMouseLeave={onEnd}
    >
      <div className="lg:hidden absolute inset-0 flex items-center justify-between rounded-2xl overflow-hidden pointer-events-none">
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
        onMouseDown={(e) => onStart(e.clientX, e.clientY)}
        onTouchStart={(e) =>
          onStart(e.touches[0].clientX, e.touches[0].clientY)
        }
        onTouchMove={(e) => onMove(e.touches[0].clientX, e.touches[0].clientY)}
        onTouchEnd={onEnd}
        style={{ transform: `translateX(${offsetX}px)` }}
        className={`relative z-10 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4 items-start lg:cursor-default cursor-grab active:cursor-grabbing shadow-sm transition-colors lg:!transform-none`}
      >
        <div
          className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center ${visual.color}`}
        >
          <span className="material-symbols-outlined text-2xl">
            {visual.icon}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <p
              className={`text-sm sm:text-base font-bold truncate ${read ? "text-slate-500 dark:text-slate-400" : "text-slate-900 dark:text-white"}`}
            >
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
          <p
            className={`text-xs sm:text-sm leading-relaxed ${read ? "text-slate-400" : "text-slate-600 dark:text-slate-400"}`}
          >
            {message}
          </p>
        </div>

        <div className="hidden lg:flex items-center gap-3 ml-4">
          {!read && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRead();
              }}
              className="w-10 h-10 rounded-full flex items-center justify-center text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors"
              title="Marcar como lida"
            >
              <span className="material-symbols-outlined text-2xl">
                done_all
              </span>
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="w-10 h-10 rounded-full flex items-center justify-center text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
            title="Apagar"
          >
            <span className="material-symbols-outlined text-2xl">delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
