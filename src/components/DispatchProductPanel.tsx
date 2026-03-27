import React, { useState, useEffect } from "react";
import { formatPrice } from "@/utils/currency";
import { DispatchStatusResponseDto } from "@/dtos/dispatches";
import { formatDateFriendly } from "@/utils/date";

interface Props {
  dispatchStatus: DispatchStatusResponseDto;
}

const DispatchProductPanel: React.FC<Props> = ({ dispatchStatus }) => {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!dispatchStatus?.nextReductionAt || dispatchStatus.isFinished) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(dispatchStatus.nextReductionAt!).getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft("Reduzindo...");
        clearInterval(interval);
      } else {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const mins = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((difference % (1000 * 60)) / 1000);

        if (hours > 0) {
          setTimeLeft(`${hours}h ${mins}m`);
        } else {
          setTimeLeft(`${mins}m ${secs}s`);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatchStatus?.nextReductionAt, dispatchStatus?.isFinished]);

  const discountPercent = Math.round(
    ((dispatchStatus.initialPrice - dispatchStatus.currentPrice) /
      dispatchStatus.initialPrice) *
      100,
  );

  return (
    <div className="mt-3 overflow-hidden border border-primary/20 rounded-xl bg-white dark:bg-zinc-900 transition-all duration-300 shadow-sm">
      <div
        className="p-4 cursor-pointer transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            
            <span className="text-[10px] font-bold uppercase text-primary tracking-widest">
              Preço em Despacho
            </span>
          </div>
          <span
            className="material-symbols-outlined text-muted-foreground transition-transform duration-300"
            style={{
              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            expand_more
          </span>
        </div>

        <div className="flex items-end justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-primary">
              {formatPrice(dispatchStatus.currentPrice, false)}
            </span>

            {discountPercent > 0 && (
              <span className="ml-2 text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
                {discountPercent}%
              </span>
            )}
          </div>

          {!dispatchStatus.isFinished && (
            <div className="flex flex-col items-end">
              <span className="text-[9px] uppercase font-bold text-muted-foreground tracking-tighter">
                Cai {" "}em
              </span>
              <span className="text-sm  font-bold text-primary">
                {timeLeft}
              </span>
            </div>
          )}
        </div>
      </div>

      <div
        className={`bg-slate-50 dark:bg-zinc-800/30 border-t border-primary/5 transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="p-4 grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <span className="text-[10px] text-muted-foreground uppercase font-bold">
              Preço Inicial
            </span>
            <p className="text-sm font-bold line-through decoration-red-500 text-slate-400">
              {formatPrice(dispatchStatus.initialPrice)}
            </p>
          </div>
          <div className="space-y-1 border-l pl-4">
            <span className="text-[10px] text-muted-foreground uppercase font-bold">
              Queda por Hora
            </span>
            <p className="text-sm font-bold text-red-500">
              {formatPrice(dispatchStatus.reductionAmount)}
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-muted-foreground uppercase font-bold">
              Próximo Preço
            </span>
            <p className="text-sm font-bold">
              {dispatchStatus.nextPrice
                ? formatPrice(dispatchStatus.nextPrice)
                : "Mínimo atingido"}
            </p>
          </div>
          <div className="space-y-1 border-l pl-4">
            <span className="text-[10px] text-muted-foreground uppercase font-bold">
              Término
            </span>
            <p className="text-xs font-bold text-slate-600">
              {formatDateFriendly(dispatchStatus.endsAt)}
            </p>
          </div>
        </div>
      </div>

      {dispatchStatus.isFinished && (
        <div className="bg-slate-100 text-slate-500 text-center py-1 text-[10px] font-bold uppercase">
          Despacho Encerrado
        </div>
      )}
    </div>
  );
};

export default DispatchProductPanel;
