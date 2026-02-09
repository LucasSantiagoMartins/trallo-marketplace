import React, { useState, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import TransactionItem, { TransactionType } from "./TransactionItem";
import BottomNavigation from "./BottomNavigation";
import PageHeader from "./PageHeader";
import SummaryCard from "./SummaryCard";
import FilterModal from "./FilterModal";

interface Transaction {
  id: number;
  type: TransactionType;
  title: string;
  date: string;
  fullDate: Date;
  amount: number;
  status: "Concluído" | "Pendente" | "Cancelado";
  day: string;
}

const TRANSACTIONS_DATA: Transaction[] = [
  {
    id: 1,
    type: "venda",
    title: "Venda de iPhone 13",
    date: "14:20 • Saldo Trallo",
    fullDate: new Date(),
    amount: 250000,
    status: "Concluído",
    day: "Hoje",
  },
  {
    id: 2,
    type: "compra",
    title: "Restaurante Pooke",
    date: "12:15 • Cartão Débito",
    fullDate: new Date(),
    amount: -8500,
    status: "Concluído",
    day: "Hoje",
  },
  {
    id: 3,
    type: "levantamento",
    title: "Levantamento Banco BAI",
    date: "18:45 • Multicaixa",
    fullDate: new Date(new Date().setDate(new Date().getDate() - 1)),
    amount: -50000,
    status: "Pendente",
    day: "Ontem",
  },
  {
    id: 4,
    type: "venda",
    title: "Venda Tênis Nike Air",
    date: "09:30 • Saldo Trallo",
    fullDate: new Date(new Date().setDate(new Date().getDate() - 1)),
    amount: 45000,
    status: "Concluído",
    day: "Ontem",
  },
];

const HistoryScreen: React.FC = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    type: "todas",
    period: "todos",
    status: "todos",
  });

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

  const filteredTransactions = useMemo(() => {
    return TRANSACTIONS_DATA.filter((t) => {
      const matchType =
        activeFilters.type === "todas" || t.type === activeFilters.type;
      const matchStatus =
        activeFilters.status === "todos" || t.status === activeFilters.status;

      let matchPeriod = true;
      const now = new Date();
      if (activeFilters.period === "semana") {
        const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        matchPeriod = t.fullDate >= lastWeek;
      } else if (activeFilters.period === "mes") {
        matchPeriod =
          t.fullDate.getMonth() === now.getMonth() &&
          t.fullDate.getFullYear() === now.getFullYear();
      } else if (activeFilters.period === "ano") {
        matchPeriod = t.fullDate.getFullYear() === now.getFullYear();
      }
      return matchType && matchStatus && matchPeriod;
    });
  }, [activeFilters]);

  const stats = useMemo(() => {
    const getSum = (type: string) =>
      TRANSACTIONS_DATA.filter((t) => t.type === type).reduce(
        (acc, curr) => acc + Math.abs(curr.amount),
        0,
      );
    return {
      venda: getSum("venda"),
      compra: getSum("compra"),
      levantamento: getSum("levantamento"),
    };
  }, []);

  return (
    <div className="bg-[#F8F9FD] dark:bg-[#0D0D12] min-h-screen font-display text-[#121118] dark:text-white antialiased">
      <PageHeader
        title="Histórico"
        backTo={-1}
      />

      <main className="max-w-6xl mx-auto px-4 md:px-6 pt-24 pb-32">
        <section className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 mb-10">
          <SummaryCard
            title="Vendas"
            value={stats.venda.toLocaleString()}
            color="from-emerald-400 via-emerald-500 to-teal-700" // 3 cores
            icon="payments"
          />
          <SummaryCard
            title="Compras"
            value={stats.compra.toLocaleString()}
            color="from-orange-400 via-red-500 to-red-700" // 3 cores
            icon="shopping_basket"
          />
          <div className="col-span-2 md:col-span-1">
            {/* Este usará o padrão Índigo de 3 cores definido no componente */}
            <SummaryCard
              title="Levantamentos"
              value={stats.levantamento.toLocaleString()}
              icon="account_balance"
            />
          </div>
        </section>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-1 w-full lg:max-w-[65%]">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl md:text-2xl font-black tracking-tight">
                Movimentações
              </h2>
              <button
                onClick={toggleFilter}
                className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-xl font-bold text-sm shadow-sm border border-gray-100 dark:border-gray-700 active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-lg text-primary">
                  tune
                </span>
                <span>Filtrar</span>
              </button>
            </div>

            <div className="space-y-8">
              {["Hoje", "Ontem"].map((day) => {
                const dayTransactions = filteredTransactions.filter(
                  (t) => t.day === day,
                );
                if (dayTransactions.length === 0) return null;
                return (
                  <TransactionGroup key={day} label={day}>
                    {dayTransactions.map((t) => (
                      <TransactionItem key={t.id} {...t} />
                    ))}
                  </TransactionGroup>
                );
              })}
              {filteredTransactions.length === 0 && (
                <div className="py-20 text-center opacity-50 font-medium bg-white dark:bg-gray-900/50 rounded-[2.5rem] border border-dashed border-gray-200 dark:border-gray-800">
                  Nenhuma movimentação encontrada.
                </div>
              )}
            </div>
          </div>

          <aside className="hidden lg:block lg:w-[35%] sticky top-24">
            <div className="p-8 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm relative overflow-hidden">
              <div className="size-12 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] flex items-center justify-center text-white mb-6 shadow-lg shadow-purple-500/20">
                <span className="material-symbols-outlined">lock_clock</span>
              </div>

              <h4 className="font-black text-lg mb-3 tracking-tight text-[#181112] dark:text-white">
                Por que existem movimentações pendentes?
              </h4>

              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Algumas vendas e levantamentos podem levar um tempo para serem
                processados. O valor é liberado automaticamente após{" "}
                <span className="text-[#7C3AED] dark:text-[#A78BFA] font-bold">
                  24h
                </span>{" "}
                se não houver contestações.
              </p>

              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#8B5CF6]/10 to-[#6D28D9]/10 border border-[#8B5CF6]/20">
                  <span className="material-symbols-outlined text-sm text-[#7C3AED]">
                    verified_user
                  </span>
                  <p className="text-[10px] font-black text-[#7C3AED] uppercase tracking-wider">
                    Transações Seguras
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <BottomNavigation />

      <AnimatePresence>
        {isFilterOpen && (
          <FilterModal
            currentFilters={activeFilters}
            onApply={(newFilters: any) => {
              setActiveFilters(newFilters);
              toggleFilter();
            }}
            onClose={toggleFilter}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const TransactionGroup = ({ label, children }: any) => (
  <div className="w-full">
    <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-3">
      <span className="w-8 h-px bg-gray-200 dark:bg-gray-800"></span>
      {label}
    </h4>
    <div className="space-y-4">{children}</div>
  </div>
);

export default HistoryScreen;
