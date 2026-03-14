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
import { formatDateFriendly } from "@/utils/date";

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
    currentType === TransactionType.COMMISSION;

  return (
    <div className="bg-white dark:bg-gray-900/40 p-4 sm:p-5 rounded-[1.8rem] border border-gray-100 dark:border-gray-800/60 flex items-center justify-between transition-all duration-300 group relative overflow-hidden lg:hover:border-primary/30 lg:hover:shadow-xl lg:hover:shadow-primary/5">
      <div className="flex items-center gap-3 sm:gap-4">
        <div
          className={`size-11 sm:size-14 rounded-2xl flex items-center justify-center ring-4 ring-gray-50 dark:ring-gray-800/30 ${getTransactionTypeColor(currentType)} transition-transform lg:group-hover:scale-105 duration-500`}
        >
          <span className="material-symbols-outlined text-xl sm:text-2xl">
            {currentType === TransactionType.SALE
              ? "payments"
              : currentType === TransactionType.WITHDRAWAL
                ? "account_balance_wallet"
                : "sync_alt"}
          </span>
        </div>

        <div className="flex flex-col gap-0.5 sm:gap-1">
          <h4 className="font-black text-xs sm:text-sm text-gray-800 dark:text-gray-100 lg:group-hover:text-primary transition-colors line-clamp-1">
            {getTransactionTypeLabel(currentType)}
          </h4>

          <div className="flex flex-col sm:flex-row sm:items-center gap-x-3 gap-y-0.5 text-gray-400 dark:text-gray-500">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px] sm:text-[14px]">
                calendar_today
              </span>
              <p className="text-[9px] sm:text-[10px] font-bold tracking-tight">
                {fullDate}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px] sm:text-[14px]">
                schedule
              </span>
              <p className="text-[9px] sm:text-[10px] font-bold tracking-tight">
                {time}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-right flex flex-col items-end gap-1.5 sm:gap-2">
        <span
          className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[7px] sm:text-[8px] font-black uppercase tracking-tighter shadow-sm ${getTransactionStatusColor(status)}`}
        >
          {getTransactionStatusLabel(status)}
        </span>

        <p
          className={`font-black text-sm sm:text-base md:text-lg tracking-tighter ${
            isNegative
              ? "text-red-400/90 dark:text-red-400/80"
              : "text-emerald-500"
          }`}
        >
          {isNegative ? "-" : "+"} {formatPrice(amount, true)}
        </p>
      </div>
    </div>
  );
};

export default MyTransactionCard;