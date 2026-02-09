import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import TransactionItem, { TransactionType } from "./TransactionItem";
import BottomNavigation from "./BottomNavigation";
import PageHeader from "./PageHeader";

interface Transaction {
  id: number;
  type: TransactionType;
  title: string;
  date: string;
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
    amount: 250000,
    status: "Concluído",
    day: "Hoje",
  },
  {
    id: 2,
    type: "compra",
    title: "Restaurante Pooke",
    date: "12:15 • Cartão Débito",
    amount: -8500,
    status: "Concluído",
    day: "Hoje",
  },
  {
    id: 3,
    type: "levantamento",
    title: "Levantamento Banco BAI",
    date: "18:45 • Multicaixa",
    amount: -50000,
    status: "Pendente",
    day: "Ontem",
  },
  {
    id: 4,
    type: "venda",
    title: "Venda Tênis Nike Air",
    date: "09:30 • Saldo Trallo",
    amount: 45000,
    status: "Concluído",
    day: "Ontem",
  },
];

const HistoryScreen: React.FC = () => {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("todas");

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

  const filteredTransactions = useMemo(() => {
    if (activeFilter === "todas") return TRANSACTIONS_DATA;
    return TRANSACTIONS_DATA.filter((t) => t.type === activeFilter);
  }, [activeFilter]);

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
        rightElement={
          <button className="size-10 flex items-center justify-center rounded-2xl bg-primary/10 relative">
            <span className="material-symbols-outlined text-xl text-primary">
              notifications
            </span>
            <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-[#111118]"></span>
          </button>
        }
      />

      <main className="max-w-6xl mx-auto px-4 md:px-6 pt-24 pb-32">
        <section className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 mb-10">
          <SummaryCard
            title="Vendas"
            value={stats.venda.toLocaleString()}
            color="from-emerald-500 to-teal-600"
            icon="payments"
            trendValue="12%"
            trendUp={true}
          />
          <SummaryCard
            title="Compras"
            value={stats.compra.toLocaleString()}
            color="from-orange-400 to-red-500"
            icon="shopping_basket"
            trendValue="0.2%"
            trendUp={false}
          />
          <div className="col-span-2 md:col-span-1">
            <SummaryCard
              title="Levantamentos"
              value={stats.levantamento.toLocaleString()}
              color="from-blue-500 to-indigo-600"
              icon="account_balance"
              trendValue="10%"
              trendUp={true}
            />
          </div>
        </section>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1 lg:max-w-[70%]">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl md:text-2xl font-black tracking-tight">
                Movimentações
              </h2>
              <button
                onClick={toggleFilter}
                className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 md:px-5 md:py-2.5 rounded-2xl font-bold text-sm shadow-sm border border-gray-100 dark:border-gray-700 active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-lg text-primary">
                  tune
                </span>
                <span>
                  {activeFilter === "todas" ? (
                    "Filtrar"
                  ) : (
                    <span className="capitalize">{activeFilter}</span>
                  )}
                </span>
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
                      <TransactionItem
                        key={t.id}
                        type={t.type}
                        title={t.title}
                        date={t.date}
                        amount={t.amount}
                        status={t.status}
                      />
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

          <div className="hidden lg:block lg:w-[30%]">
            <div className="sticky top-28 p-8 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="size-12 rounded-2xl bg-primary flex items-center justify-center text-white mb-6">
                <span className="material-symbols-outlined">info</span>
              </div>
              <h4 className="font-black text-lg mb-2">Resumo de Filtros</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Você está visualizando{" "}
                {activeFilter === "todas"
                  ? "todas as transações"
                  : `apenas ${activeFilter}s`}
                .
              </p>
            </div>
          </div>
        </div>
      </main>

      <BottomNavigation />

      {isFilterOpen && (
        <FilterComponent
          activeFilter={activeFilter}
          setFilter={setActiveFilter}
          onClose={toggleFilter}
        />
      )}
    </div>
  );
};

const SummaryCard = ({
  title,
  value,
  color,
  icon,
  trendValue,
  trendUp,
}: any) => (
  <div
    className={`p-4 md:p-6 rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-br ${color} text-white shadow-xl shadow-inherit/10 relative overflow-hidden h-32 md:h-44 flex flex-col justify-between transition-all hover:scale-[1.02]`}
  >
    <div className="absolute -right-6 -top-6 size-24 md:size-32 bg-white/10 rounded-full blur-2xl md:blur-3xl" />

    <div className="flex justify-between items-start relative z-10">
      <div className="size-8 md:size-12 rounded-xl md:rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
        <span className="material-symbols-outlined text-lg md:text-2xl">
          {icon}
        </span>
      </div>

      <div className="flex items-center gap-1 bg-gradient-to-tr from-white/20 to-white/5 backdrop-blur-md px-2 py-1 md:px-3 md:py-1.5 rounded-xl border border-white/20 shadow-lg">
        <span className="material-symbols-outlined text-[10px] md:text-xs text-white">
          {trendUp ? "trending_up" : "trending_down"}
        </span>
        <span className="text-[9px] md:text-[11px] font-black tracking-tight">
          {trendUp ? "" : "-"}
          {trendValue}
        </span>
      </div>
    </div>

    <div className="relative z-10">
      <p className="text-white/80 text-[10px] md:text-xs font-bold uppercase tracking-wider">
        {title}
      </p>
      <div className="flex items-baseline gap-1">
        <span className="text-xs md:text-lg font-bold opacity-80">Kz</span>
        <h3 className="text-lg md:text-3xl font-black tracking-tight truncate">
          {value}
        </h3>
      </div>
      <p className="text-[8px] md:text-[10px] font-medium opacity-60 mt-0.5">
        este mês
      </p>
    </div>
  </div>
);

const TransactionGroup = ({ label, children }: any) => (
  <div>
    <h4 className="text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-3">
      <span className="w-8 md:w-12 h-px bg-gray-200 dark:bg-gray-800"></span>
      {label}
    </h4>
    <div className="space-y-4">{children}</div>
  </div>
);

const FilterComponent = ({ onClose, activeFilter, setFilter }: any) => {
  const options = [
    { id: "todas", label: "Todas" },
    { id: "venda", label: "Vendas" },
    { id: "compra", label: "Compras" },
    { id: "levantamento", label: "Levantamentos" },
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-end lg:items-center lg:justify-center p-0 lg:p-6">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in"
        onClick={onClose}
      ></div>
      <div className="relative w-full lg:max-w-md bg-white dark:bg-[#16161E] rounded-t-[3rem] lg:rounded-[2.5rem] p-8 shadow-2xl animate-in slide-in-from-bottom lg:zoom-in-95 duration-300">
        <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-700 mx-auto rounded-full mb-8 lg:hidden"></div>
        <h3 className="text-2xl font-black mb-8 tracking-tight">
          Filtrar Histórico
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => {
                setFilter(opt.id);
                onClose();
              }}
              className={`py-5 rounded-2xl text-sm font-bold transition-all border-2 ${
                activeFilter === opt.id
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-gray-50 dark:border-gray-800 text-gray-400"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <button
          onClick={onClose}
          className="w-full py-5 bg-primary text-white font-black rounded-2xl mt-8 active:scale-95 transition-all"
        >
          Aplicar
        </button>
      </div>
    </div>
  );
};

export default HistoryScreen;
