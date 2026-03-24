import React, { useState, useEffect, useRef } from "react";
import { AdminPayment } from "@/dtos/admin-management";
import {
  getPaymentStatusLabel,
  getPaymentStatusColor,
  getPaymentMethodLabel,
} from "@/utils/mappers/payment.mappers";
import { formatPrice } from "@/utils/currency";

interface PaymentCardProps {
  payment: AdminPayment;
}

const PaymentCard: React.FC<PaymentCardProps> = ({ payment }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [dragY, setDragY] = useState(0);
  const startY = useRef(0);

  const formattedAmount = formatPrice(payment.amount, false);
  const formattedDate = new Date(payment.createdAt).toLocaleDateString(
    "pt-AO",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  );

  useEffect(() => {
    if (isModalOpen) {
      setIsRendered(true);
      document.body.style.overflow = "hidden";
    } else {
      const timer = setTimeout(() => setIsRendered(false), 400);
      document.body.style.overflow = "unset";
      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentY = e.touches[0].clientY;
    const diff = currentY - startY.current;
    if (diff > 0) setDragY(diff);
  };

  const handleTouchEnd = () => {
    if (dragY > 150) {
      setIsModalOpen(false);
    }
    setDragY(0);
  };

  return (
    <>
      <div className="bg-white p-5 rounded-[1.5rem] border border-slate-100 hover:border-[#6C3EF8]/20 transition-all group">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-full bg-slate-100 flex items-center justify-center border border-slate-100 shadow-sm text-[#6C3EF8] font-bold text-xs">
              {payment.seller.fullName.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 line-clamp-1">
                {payment.seller.fullName}
              </h4>
              <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                {new Date(payment.createdAt).toLocaleDateString("pt-AO")}
              </p>
            </div>
          </div>
          <div
            className={`text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-tighter ${getPaymentStatusColor(payment.status)}`}
          >
            {getPaymentStatusLabel(payment.status)}
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-0.5 tracking-tight">
              Valor da Operação
            </p>
            <p className="text-lg font-black text-[#0F172A] leading-none">
              {formattedAmount}{" "}
              <span className="text-xs font-medium text-slate-400">AOA</span>
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="size-8 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 group-hover:bg-[#6C3EF8] group-hover:text-white transition-all active:scale-90"
            >
              <span className="material-symbols-outlined text-sm">
                visibility
              </span>
            </button>
          </div>
        </div>
      </div>

      {isRendered && (
        <div
          className={`fixed inset-0 z-[100] flex items-end lg:items-center justify-center transition-all duration-500 ease-out ${isModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity duration-500"
            onClick={() => setIsModalOpen(false)}
          />

          <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              transform: isModalOpen
                ? `translateY(${dragY}px)`
                : "translateY(100%)",
              transition:
                dragY === 0
                  ? "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
                  : "none",
            }}
            className="bg-white w-full lg:max-w-md rounded-t-[2.5rem] lg:rounded-[2.5rem] p-8 shadow-2xl relative z-10 touch-none"
          >
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6 lg:mb-4" />

            <div className="text-center mb-8">
              <p className="text-[#6C3EF8] font-black text-[10px] tracking-[0.2em] uppercase mb-2">
                Detalhes do Pagamento
              </p>
              <h3 className="text-2xl font-black text-[#0F172A]">
                {formattedAmount}{" "}
                <span className="text-sm font-medium uppercase">AOA</span>
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-slate-50">
                <span className="text-xs font-bold text-slate-400 uppercase">
                  Estado
                </span>
                <span
                  className={`text-xs font-black uppercase ${getPaymentStatusColor(payment.status)} bg-transparent p-0`}
                >
                  {getPaymentStatusLabel(payment.status)}
                </span>
              </div>

              <div className="flex justify-between py-3 border-b border-slate-50">
                <span className="text-xs font-bold text-slate-400 uppercase">
                  Vendedor
                </span>
                <span className="text-xs font-bold text-slate-900">
                  {payment.seller.fullName}
                </span>
              </div>

              <div className="flex justify-between py-3 border-b border-slate-50">
                <span className="text-xs font-bold text-slate-400 uppercase">
                  Comprador
                </span>
                <span className="text-xs font-bold text-slate-900">
                  {payment.order.buyerName}
                </span>
              </div>

              <div className="flex justify-between py-3 border-b border-slate-50">
                <span className="text-xs font-bold text-slate-400 uppercase">
                  Método
                </span>
                <span className="text-xs font-bold text-slate-900">
                  {getPaymentMethodLabel(payment.method)}
                </span>
              </div>

              <div className="flex justify-between py-3 border-b border-slate-50">
                <span className="text-xs font-bold text-slate-400 uppercase">
                  ID Pedido
                </span>
                <span className="text-xs font-mono font-bold text-[#6C3EF8]">
                  {payment.order.orderNumber}
                </span>
              </div>

              <div className="flex justify-between py-3 border-b border-slate-50">
                <span className="text-xs font-bold text-slate-400 uppercase">
                  ID pagamento
                </span>
                <span className="text-xs font-bold text-[#6C3EF8]">
                  {payment.id}
                </span>
              </div>

              <div className="flex justify-between py-3">
                <span className="text-xs font-bold text-slate-400 uppercase">
                  Data/Hora
                </span>
                <span className="text-xs font-bold text-slate-900">
                  {formattedDate}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentCard;
