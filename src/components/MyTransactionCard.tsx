import React from "react";
import { Wallet, Banknote, Repeat, Calendar, Clock } from "lucide-react";
import { TransactionDTO } from "@/dtos/transaction";
import {
  getTransactionTypeLabel,
  getTransactionTypeColor,
  getTransactionStatusLabel,
  getTransactionStatusColor,
} from "@/utils/mappers/transaction.mappers";
import { TransactionType } from "@/enums/transaction";
import { formatPrice } from "@/utils/currency";

const MyTransactionCard: React.FC<TransactionDTO> = ({
  amount,
  type,
  status,
  createdAt,
}) => {
  const dateObj = new Date(createdAt);

  const fullDate = dateObj.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const time = dateObj.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const currentType = type as unknown as TransactionType;

  const isNegative =
    currentType === TransactionType.WITHDRAWAL ||
    currentType === TransactionType.COMMISSION;

  const renderIcon = () => {
    const iconProps = { className: "size-5 sm:size-7" };

    switch (currentType) {
      case TransactionType.SALE:
        return <Banknote {...iconProps} />;
      case TransactionType.WITHDRAWAL:
        return <Wallet {...iconProps} />;
      default:
        return <Repeat {...iconProps} />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900/40 p-4 sm:p-5 rounded-[1.8rem] border border-gray-100 dark:border-gray-800/60 flex items-center justify-between transition-all duration-300 relative overflow-hidden">
      <div className="flex items-center gap-3 sm:gap-4">
        <div
          className={`size-11 sm:size-14 rounded-2xl flex items-center justify-center ring-4 ring-gray-50 dark:ring-gray-800/30 ${getTransactionTypeColor(currentType)} transition-transform duration-500`}
        >
          {renderIcon()}
        </div>

        <div className="flex flex-col gap-0.5 sm:gap-1">
          <h4 className="font-black text-xs sm:text-sm text-gray-800 dark:text-gray-100 transition-colors line-clamp-1">
            {getTransactionTypeLabel(currentType)}
          </h4>

          <div className="flex flex-col sm:flex-row sm:items-center gap-x-3 gap-y-0.5 text-gray-400 dark:text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="size-3 sm:size-3.5" />
              <p className="text-[9px] sm:text-[10px] font-bold tracking-tight">
                {fullDate}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="size-3 sm:size-3.5" />
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
