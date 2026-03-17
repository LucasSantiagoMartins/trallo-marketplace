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
  const threshold = 100;
  const maxPull = 120;

  const onStart = (clientX: number) => {
    startX.current = clientX - offsetX;
    setIsDragging(true);
    if (containerRef.current) containerRef.current.style.transition = "none";
  };

  const onMove = (clientX: number) => {
    if (!isDragging) return;
    const diff = clientX - startX.current;
    
    const minLimit = -maxPull;
    const maxLimit = read ? 0 : maxPull;
    
    const clampedDiff = Math.max(minLimit, Math.min(maxLimit, diff));
    setOffsetX(clampedDiff);
  };

  const onEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (containerRef.current) {
      containerRef.current.style.transition =
        "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
    }

    if (offsetX >= threshold && !read) {
      onRead();
      setOffsetX(0);
    } else if (offsetX <= -threshold) {
      onDelete();
      setOffsetX(0);
    } else {
      setOffsetX(0);
    }
  };

  return (
    <div
      className="relative overflow-hidden h-auto mb-4 select-none"
      onMouseMove={(e) => onMove(e.clientX)}
      onMouseUp={onEnd}
      onMouseLeave={onEnd}
    >
      <div className="absolute inset-0 flex items-center justify-between rounded-2xl overflow-hidden pointer-events-none">
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
        onMouseDown={(e) => onStart(e.clientX)}
        onTouchStart={(e) => onStart(e.touches[0].clientX)}
        onTouchMove={(e) => onMove(e.touches[0].clientX)}
        onTouchEnd={onEnd}
        style={{ transform: `translateX(${offsetX}px)` }}
        className={`relative z-10 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4 items-start cursor-grab active:cursor-grabbing shadow-sm transition-colors`}
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
      </div>
    </div>
  );
};

export default NotificationCard;