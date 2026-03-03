import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AdminTransaction } from "@/dtos/admin-management";
import {
  getTransactionStatusColor,
  getTransactionStatusLabel,
  getTransactionTypeColor,
  getTransactionTypeLabel,
} from "@/utils/mappers/transaction.mappers";
import { formatPrice } from "@/utils/currency";

interface TransactionCardProps {
  transaction: AdminTransaction;
}

const TransactionCard: React.FC<TransactionCardProps> = ({ transaction }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formattedAmount = formatPrice(transaction.amount, false);
  const formattedDate = new Date(transaction.createdAt).toLocaleDateString(
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
              {formattedAmount}{" "}
              <span className="text-xs font-medium text-slate-400">AOA</span>
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
                  Detalhes da Transação
                </p>
                <h3 className="text-2xl font-black text-[#0F172A]">
                  {formattedAmount}{" "}
                  <span className="text-sm font-medium">AOA</span>
                </h3>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between py-3 border-b border-slate-50">
                  <span className="text-xs font-bold text-slate-400 uppercase">
                    Estado
                  </span>
                  <span
                    className={`text-xs font-black uppercase ${getTransactionStatusColor(transaction.status)} bg-transparent p-0`}
                  >
                    {getTransactionStatusLabel(transaction.status)}
                  </span>
                </div>

                <div className="flex justify-between py-3 border-b border-slate-50">
                  <span className="text-xs font-bold text-slate-400 uppercase">
                    Tipo
                  </span>
                  <span
                    className={`text-xs font-black uppercase ${getTransactionTypeColor(transaction.type)} bg-transparent p-0`}
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
                      {transaction.wallet.ownerRole}
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

export default TransactionCard;
