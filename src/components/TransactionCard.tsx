import React, { useState } from "react";
import { AdminTransaction } from "@/dtos/admin-management";
import {
  getTransactionStatusColor,
  getTransactionStatusLabel,
  getTransactionTypeColor,
  getTransactionTypeLabel,
} from "@/utils/mappers/transaction.mappers";
import { formatPrice } from "@/utils/currency";
import TransactionDetailsModal from "./TransactionDetailsModal";
import { formatDateFriendly } from "@/utils/date";

interface TransactionCardProps {
  transaction: AdminTransaction;
}

const TransactionCard: React.FC<TransactionCardProps> = ({ transaction }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formattedAmount = formatPrice(transaction.amount, true);
  const formattedDate = formatDateFriendly(transaction.createdAt, true)

  return (
    <>
      <div className="bg-white p-5 rounded-[2rem] border border-slate-100 hover:border-[#6C3EF8]/20 transition-all group relative overflow-hidden">
        <span className="material-symbols-outlined absolute -right-2 -bottom-2 text-slate-50 text-7xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          visibility
        </span>

        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-full bg-slate-100 flex items-center justify-center border border-slate-100 shadow-sm text-[#6C3EF8] font-bold text-xs">
              {transaction.wallet.ownerName.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 line-clamp-1">
                {transaction.wallet.ownerName}
              </h4>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                {transaction.wallet.ownerRole}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div
              className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter ${getTransactionStatusColor(transaction.status)}`}
            >
              {getTransactionStatusLabel(transaction.status)}
            </div>
            <div
              className={`text-[8px] font-bold px-2 py-0.5 rounded-md uppercase ${getTransactionTypeColor(transaction.type)}`}
            >
              {getTransactionTypeLabel(transaction.type)}
            </div>
          </div>
        </div>

        <div className="flex items-end justify-between relative z-10">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-0.5 tracking-tight">
              Valor da Transação
            </p>
            <p className="text-lg font-black text-[#0F172A] leading-none">
              {formattedAmount}
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="size-9 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 group-hover:bg-[#6C3EF8] group-hover:text-white transition-all shadow-sm active:scale-90"
          >
            <span className="material-symbols-outlined text-lg">
              visibility
            </span>
          </button>
        </div>
      </div>

      <TransactionDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        transaction={transaction}
        formattedAmount={formattedAmount}
        formattedDate={formattedDate}
      />
    </>
  );
};

export default TransactionCard;
