import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
              className="size-8 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 group-hover:bg-[#6C3EF8] group-hover:text-white transition-all"
            >
              <span className="material-symbols-outlined text-sm">
                visibility
              </span>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl relative z-10"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute right-6 top-6 size-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>

              <div className="text-center mb-8">
                <p className="text-[#6C3EF8] font-black text-[10px] tracking-[0.2em] uppercase mb-2">
                  Detalhes do Pagamento
                </p>
                <h3 className="text-2xl font-black text-[#0F172A]">
                  {formattedAmount}{" "}
                  <span className="text-sm font-medium">AOA</span>
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

              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full mt-8 py-4 bg-[#6C3EF8] text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-[#5a32d1] shadow-lg shadow-[#6C3EF8]/20 transition-all active:scale-[0.98]"
              >
                Fechar Detalhes
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PaymentCard;
