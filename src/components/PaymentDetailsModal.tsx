import React, { useEffect, useState } from "react";
import { AdminPayment } from "@/dtos/admin-management";
import {
  getPaymentStatusLabel,
  getPaymentStatusColor,
  getPaymentMethodLabel,
} from "@/utils/mappers/payment.mappers";

interface PaymentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  payment: AdminPayment;
  formattedAmount: string;
  formattedDate: string;
}

const PaymentDetailsModal: React.FC<PaymentDetailsModalProps> = ({
  isOpen,
  onClose,
  payment,
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
    if (touchTranslation > 100) onClose();
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
          isOpen ? "translate-y-0 scale-100" : "translate-y-full md:scale-90 md:translate-y-4"
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
            Detalhes do Pagamento
          </p>
          <h3 className="text-2xl font-black text-[#0F172A]">
            {formattedAmount}
          </h3>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between py-3 border-b border-slate-50">
            <span className="text-xs font-bold text-slate-400 uppercase">Estado</span>
            <span
              className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${getPaymentStatusColor(payment.status)}`}
            >
              {getPaymentStatusLabel(payment.status)}
            </span>
          </div>

          <div className="flex justify-between py-3 border-b border-slate-50">
            <span className="text-xs font-bold text-slate-400 uppercase">Vendedor</span>
            <span className="text-xs font-bold text-slate-900">{payment.seller.fullName}</span>
          </div>

          <div className="flex justify-between py-3 border-b border-slate-50">
            <span className="text-xs font-bold text-slate-400 uppercase">Comprador</span>
            <span className="text-xs font-bold text-slate-900">{payment.order.buyerName}</span>
          </div>

          <div className="flex justify-between py-3 border-b border-slate-50">
            <span className="text-xs font-bold text-slate-400 uppercase">Método</span>
            <span className="text-xs font-bold text-slate-900">{getPaymentMethodLabel(payment.method)}</span>
          </div>

          <div className="flex justify-between py-3 border-b border-slate-50">
            <span className="text-xs font-bold text-slate-400 uppercase">Pedido</span>
            <span className="text-xs font-mono font-bold text-[#6C3EF8]">#{payment.order.orderNumber}</span>
          </div>

          <div className="flex justify-between py-3">
            <span className="text-xs font-bold text-slate-400 uppercase">Data e Hora</span>
            <span className="text-xs font-bold text-slate-900">{formattedDate}</span>
          </div>
        </div>


      </div>
    </div>
  );
};

export default PaymentDetailsModal;