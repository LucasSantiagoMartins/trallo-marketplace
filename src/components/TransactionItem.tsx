import React from "react";

export type TransactionType = "compra" | "venda" | "levantamento";

interface TransactionItemProps {
  type: TransactionType;
  title: string;
  date: string;
  amount: number;
  status: "Concluído" | "Pendente" | "Cancelado";
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  type,
  title,
  date,
  amount,
  status,
}) => {
  const isPositive = amount > 0;

  const typeConfig = {
    compra: {
      icon: "shopping_bag",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      textColor: "text-blue-500",
    },
    venda: {
      icon: "sell",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      textColor: "text-green-500",
    },
    levantamento: {
      icon: "payments",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      textColor: "text-orange-500",
    },
  };

  const { icon, bgColor, textColor } = typeConfig[type];

  const statusColors = {
    Concluído:
      "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400",
    Pendente:
      "bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400",
    Cancelado: "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400",
  };

  return (
    <div className="flex items-center gap-4 bg-white dark:bg-[#1a1a24] p-4 rounded-2xl border border-gray-100 dark:border-gray-800/50 transition-all duration-200 cursor-pointer hover:bg-gray-50 dark:hover:bg-[#1e1e2b] hover:border-gray-200 dark:hover:border-gray-700 active:scale-[0.98]">
      <div
        className={`size-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 ${bgColor} ${textColor}`}
      >
        <span className="material-symbols-outlined text-[24px]">{icon}</span>
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-bold text-sm text-gray-700 dark:text-gray-200 truncate">
          {title}
        </p>
        <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5 font-medium">
          {date}
        </p>
      </div>

      <div className="text-right shrink-0">
        <p
          className={`font-bold text-sm tracking-tight ${isPositive ? "text-green-500" : "text-[#FF5F40]"}`}
        >
          {isPositive ? "+" : "-"} {Math.abs(amount).toLocaleString("pt-AO")} Kz
        </p>

        <div className="flex justify-end mt-1">
          <span
            className={`text-[9px] px-2 py-0.5 rounded-md font-extrabold uppercase tracking-wider ${statusColors[status]}`}
          >
            {status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;
