import React from "react";
import { TransactionDTO } from "@/dtos/transaction";
import {
  getTransactionTypeLabel,
  getTransactionTypeColor,
  getTransactionStatusLabel,
  getTransactionStatusColor,
} from "@/utils/mappers/transaction.mappers";
import { TransactionType } from "@/enums/transaction";
import { formatPrice } from "@/utils/currency";
import { formatDateFriendly } from "@/utils/date"; // ajuste o path conforme seu projeto

const MyTransactionCard: React.FC<TransactionDTO> = ({
  amount,
  type,
  status,
  createdAt,
}) => {
  const time = formatDateFriendly(createdAt, true);
  const fullDate = formatDateFriendly(createdAt);

  const currentType = type as unknown as TransactionType;

  const isNegative =
    currentType === TransactionType.WITHDRAWAL ||
    currentType === TransactionType.FEE;

  return (
    <div className="bg-white dark:bg-gray-900/40 p-5 rounded-[2rem] border border-gray-100 dark:border-gray-800/60 flex items-center justify-between hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group relative overflow-hidden">
      
      <div className="flex items-center gap-4">
        {/* Icon Container */}
        <div
          className={`size-14 rounded-2xl flex items-center justify-center ring-4 ring-gray-50 dark:ring-gray-800/30 ${getTransactionTypeColor(currentType)} transition-transform group-hover:scale-110 duration-500`}
        >
          <span className="material-symbols-outlined text-2xl">
            {currentType === TransactionType.SALE
              ? "payments"
              : currentType === TransactionType.WITHDRAWAL
                ? "account_balance_wallet"
                : "sync_alt"}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <h4 className="font-black text-sm text-gray-800 dark:text-gray-100 group-hover:text-primary transition-colors">
            {getTransactionTypeLabel(currentType)}
          </h4>
          
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-gray-400 dark:text-gray-500">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">calendar_today</span>
              <p className="text-[10px] font-bold tracking-tight">{fullDate}</p>
            </div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">schedule</span>
              <p className="text-[10px] font-bold tracking-tight">{time}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-right flex flex-col items-end gap-2">
        <span
          className={`px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-tighter shadow-sm ${getTransactionStatusColor(status)}`}
        >
          {getTransactionStatusLabel(status)}
        </span>
        
        <p
          className={`font-black text-base md:text-xl tracking-tighter ${isNegative ? "text-rose-500" : "text-emerald-500"}`}
        >
          {isNegative ? "-" : "+"} {formatPrice(amount, true)}
        </p>
      </div>
    </div>
  );
};

export default MyTransactionCard;