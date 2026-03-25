import React, { useState } from "react";
import { AdminPayment } from "@/dtos/admin-management";
import {
  getPaymentStatusLabel,
  getPaymentStatusColor,
} from "@/utils/mappers/payment.mappers";
import { formatPrice } from "@/utils/currency";
import PaymentDetailsModal from "./PaymentDetailsModal";
import { formatDateFriendly } from "@/utils/date";

interface PaymentCardProps {
  payment: AdminPayment;
}

const PaymentCard: React.FC<PaymentCardProps> = ({ payment }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formattedAmount = formatPrice(payment.amount, true);
  const formattedDate = formatDateFriendly(payment.createdAt, true)
  return (
    <>
      <div className="bg-white p-5 rounded-[1.5rem] border border-slate-100 hover:border-[#6C3EF8]/20 transition-all group">
        <div className="flex items-center justify-between mb-4 gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="size-11 shrink-0 rounded-full bg-slate-100 flex items-center justify-center border border-slate-100 shadow-sm text-[#6C3EF8] font-bold text-xs">
              {payment.seller.fullName.substring(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-slate-900 truncate">
                {payment.seller.fullName}
              </h4>
              <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                {new Date(payment.createdAt).toLocaleDateString("pt-AO")}
              </p>
            </div>
          </div>
          <div
            className={`shrink-0 text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-tighter ${getPaymentStatusColor(payment.status)}`}
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
              {formattedAmount}
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="size-8 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 group-hover:bg-[#6C3EF8] group-hover:text-white transition-all active:scale-90"
          >
            <span className="material-symbols-outlined text-sm">visibility</span>
          </button>
        </div>
      </div>

      <PaymentDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        payment={payment}
        formattedAmount={formattedAmount}
        formattedDate={formattedDate}
      />
    </>
  );
};

export default PaymentCard;