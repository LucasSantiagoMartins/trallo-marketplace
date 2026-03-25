import React, { useEffect, useState, useRef } from "react";
import { AdminTransaction } from "@/dtos/admin-management";
import {
  getTransactionStatusColor,
  getTransactionStatusLabel,
  getTransactionTypeColor,
  getTransactionTypeLabel,
} from "@/utils/mappers/transaction.mappers";
import { getUserRoleLabel, userRoleLabel } from "@/utils/mappers/user.mapper";

interface TransactionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: AdminTransaction;
  formattedAmount: string;
  formattedDate: string;
}

const TransactionDetailsModal: React.FC<TransactionDetailsModalProps> = ({
  isOpen,
  onClose,
  transaction,
  formattedAmount,
  formattedDate,
}) => {
  const [isRendered, setIsRendered] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchTranslation, setTouchTranslation] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      document.body.style.overflow = "hidden";
    } else {
      const timer = setTimeout(() => setIsRendered(false), 300);
      document.body.style.overflow = "unset";
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const currentTouch = e.targetTouches[0].clientY;
    const diff = currentTouch - touchStart;
    if (diff > 0) setTouchTranslation(diff);
  };

  const handleTouchEnd = () => {
    if (touchTranslation > 100) {
      onClose();
    }
    setTouchTranslation(0);
    setTouchStart(null);
  };

  if (!isRendered) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-end md:items-center justify-center transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ transform: `translateY(${touchTranslation}px)` }}
        className={`bg-white w-full md:max-w-md rounded-t-[2.5rem] md:rounded-[2.5rem] p-8 shadow-2xl relative z-10 transition-all duration-300 ease-out ${
          isOpen
            ? "translate-y-0 scale-100"
            : "translate-y-full md:scale-90 md:translate-y-4"
        }`}
      >
        <div className="md:hidden flex justify-center mb-6 -mt-2">
          <div className="w-12 h-1.5 bg-slate-200 rounded-full" />
        </div>

        <button
          onClick={onClose}
          className="hidden md:flex absolute right-6 top-6 size-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        <div className="text-center mb-8">
          <p className="text-[#6C3EF8] font-black text-[10px] tracking-[0.2em] uppercase mb-2">
            Detalhes da Transação
          </p>
          <h3 className="text-2xl font-black text-[#0F172A]">
            {formattedAmount}
          </h3>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between py-3 border-b border-slate-50">
            <span className="text-xs font-bold text-slate-400 uppercase">
              Estado
            </span>
            <span
              className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${getTransactionStatusColor(transaction.status)}`}
            >
              {getTransactionStatusLabel(transaction.status)}
            </span>
          </div>

          <div className="flex justify-between py-3 border-b border-slate-50">
            <span className="text-xs font-bold text-slate-400 uppercase">
              Tipo
            </span>
            <span
              className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${getTransactionTypeColor(transaction.type)}`}
            >
              {getTransactionTypeLabel(transaction.type)}
            </span>
          </div>

          <div className="flex justify-between py-3 border-b border-slate-50">
            <span className="text-xs font-bold text-slate-400 uppercase">
              Proprietário
            </span>
            <div className="text-right">
              <p className="text-xs font-bold text-slate-900">
                {transaction.wallet.ownerName}
              </p>
              <p className="text-[10px] font-medium text-slate-400">
                {getUserRoleLabel(transaction.wallet.ownerRole)}
              </p>
            </div>
          </div>

          {transaction.order && (
            <div className="flex justify-between py-3 border-b border-slate-50">
              <span className="text-xs font-bold text-slate-400 uppercase">
                Pedido
              </span>
              <span className="text-xs font-mono font-bold text-[#6C3EF8]">
                #{transaction.order.orderNumber}
              </span>
            </div>
          )}

          <div className="flex justify-between py-3 border-b border-slate-50">
            <span className="text-xs font-bold text-slate-400 uppercase">
              ID Interno
            </span>
            <span className="text-[9px] font-mono text-slate-400 select-all">
              {transaction.id}
            </span>
          </div>

          <div className="flex justify-between py-3">
            <span className="text-xs font-bold text-slate-400 uppercase">
              Data e Hora
            </span>
            <span className="text-xs font-bold text-slate-900">
              {formattedDate}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailsModal;
