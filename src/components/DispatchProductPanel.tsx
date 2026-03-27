import React, { useState, useEffect } from "react";
import { formatPrice } from "@/utils/currency";
import { DispatchStatusResponseDto } from "@/dtos/dispatches";
import { formatDateFriendly } from "@/utils/date";

interface Props {
  dispatchStatus: DispatchStatusResponseDto;
}

const DispatchProductPanel: React.FC<Props> = ({ dispatchStatus }) => {
  const [timeLeft, setTimeLeft] = useState<string>("");

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
    <div className="mt-3 overflow-hidden border border-border rounded-xl bg-white dark:bg-zinc-900 shadow-sm">
      <div className="p-3 sm:p-4 select-none">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[9px] sm:text-[10px] font-bold uppercase text-primary tracking-widest text-nowrap">
              Preço em Despacho
            </span>
          </div>
        </div>

        <div className="flex items-end justify-between gap-2">
          <div className="flex items-baseline gap-1 min-w-0">
            <span className="text-2xl sm:text-4xl font-black text-primary truncate">
              {formatPrice(dispatchStatus.currentPrice, true)}
            </span>

            {discountPercent > 0 && (
              <span className="text-[10px] sm:text-xs font-bold text-red-500 bg-red-50 px-1.5 sm:px-2 py-0.5 rounded-full text-nowrap">
                {discountPercent}%
              </span>
            )}
          </div>

          {!dispatchStatus.isFinished && (
            <div className="flex flex-col items-end flex-shrink-0">
              <span className="text-[8px] sm:text-[10px] text-muted-foreground uppercase font-bold leading-none mb-0.5">
                Cai em
              </span>
              <span className="text-xs sm:text-sm font-bold text-primary tabular-nums">
                {timeLeft}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Área de Detalhes - Otimizada para Mobile */}
      <div className="border-t border-border">
        <div className="p-3 sm:p-4 grid grid-cols-2 gap-x-2 gap-y-3 bg-slate-50/50 dark:bg-zinc-800/30">
          <div className="space-y-0.5">
            <span className="text-[8px] sm:text-[10px] text-muted-foreground uppercase font-bold block">
              Preço Inicial
            </span>
            <p className="text-xs sm:text-sm font-bold line-through decoration-red-500 text-slate-400">
              {formatPrice(dispatchStatus.initialPrice)}
            </p>
          </div>
          <div className="space-y-0.5 border-l pl-3 border-border">
            <span className="text-[8px] sm:text-[10px] text-muted-foreground uppercase font-bold block">
              Queda / Hora
            </span>
            <p className="text-xs sm:text-sm font-bold text-red-500">
              {formatPrice(dispatchStatus.reductionAmount)}
            </p>
          </div>
          <div className="space-y-0.5">
            <span className="text-[8px] sm:text-[10px] text-muted-foreground uppercase font-bold block">
              Próximo Preço
            </span>
            <p className="text-xs sm:text-sm font-bold truncate">
              {dispatchStatus.nextPrice
                ? formatPrice(dispatchStatus.nextPrice)
                : "Mínimo atingido"}
            </p>
          </div>
          <div className="space-y-0.5 border-l pl-3 border-border">
            <span className="text-[8px] sm:text-[10px] text-muted-foreground uppercase font-bold block">
              Término
            </span>
            <p className="text-[10px] sm:text-xs font-bold text-slate-600 leading-tight">
              {formatDateFriendly(dispatchStatus.endsAt, true)}
            </p>
          </div>
        </div>
      </div>

      {dispatchStatus.isFinished && (
        <div className="bg-slate-100 text-slate-500 text-center py-1 text-[9px] sm:text-[10px] font-bold uppercase border-t border-border">
          Despacho Encerrado
        </div>
      )}
    </div>
  );
};

export default DispatchProductPanel;