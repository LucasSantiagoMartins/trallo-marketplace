import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, Variants } from "framer-motion";
import Pagination from "../components/Pagination";
import TransactionCard from "../components/TransactionCard";
import BottomNavigation from "../components/BottomNavigation";
import Sidebar from "@/components/Sidebar";
import { adminItems } from "@/constants/sidebar-items";
import { getAdminTransactions } from "@/services/admin.service";
import { AdminTransaction } from "@/dtos/admin-management";
import { TransactionType } from "@/enums/transaction";

const TransactionsManagement: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<TransactionType | "Tudo">(
    "Tudo",
  );
  const [transactions, setTransactions] = useState<AdminTransaction[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const ITEMS_PER_PAGE = 10;

  const fetchTransactions = useCallback(async (page: number) => {
    setIsLoading(true);
    try {
      const response = await getAdminTransactions(page, ITEMS_PER_PAGE);
      if (response.success) {
        setTransactions(response.data.transactions);
        setTotalPages(response.data.pagination.totalPages);
      }
    } catch (error) {
      console.error("Erro ao carregar transações:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions(currentPage);
  }, [currentPage, fetchTransactions]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        tx.wallet.ownerName.toLowerCase().includes(searchLower) ||
        tx.order?.orderNumber.toLowerCase().includes(searchLower) ||
        tx.id.toLowerCase().includes(searchLower);

      const matchesType = activeFilter === "Tudo" || tx.type === activeFilter;

      return matchesSearch && matchesType;
    });
  }, [transactions, searchQuery, activeFilter]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const filterOptions = [
    { label: "Tudo", value: "Tudo" },
    { label: "Venda", value: TransactionType.SALE },
    { label: "Saque", value: TransactionType.WITHDRAWAL },
    { label: "Estorno", value: TransactionType.REFUND },
    { label: "Comissão", value: TransactionType.COMMISSION },
    { label: "Saque Plataforma", value: TransactionType.PLATFORM_WITHDRAWAL },
    { label: "Débito Plataforma", value: TransactionType.PLATFORM_DEBIT },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-['Inter']">
      <Sidebar
        title="Painel Administrativo"
        items={adminItems}
        activePage="transacoes"
        showSettings={true}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <motion.main
          className="flex-1 px-4 lg:px-12 pt-12 pb-44 max-w-7xl mx-auto w-full"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.header variants={itemVariants} className="mb-8">
            <p className="text-[#6C3EF8] font-bold text-[10px] tracking-[0.2em] mb-1 uppercase">
              Financeiro
            </p>
            <h1 className="text-3xl font-semibold text-[#0F172A]">
              Histórico de Transações
            </h1>
          </motion.header>

          <motion.div
            variants={itemVariants}
            className="flex flex-col xl:flex-row xl:items-end gap-6 mb-12"
          >
            <div className="flex-1 w-full">
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">
                Pesquisar Beneficiário
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ID, nome do vendedor ou pedido..."
                  className="w-full bg-white border-none rounded-2xl py-4 pl-12 pr-4 shadow-sm focus:ring-2 focus:ring-[#6C3EF8]/20 transition-all text-sm outline-none font-medium"
                />
              </div>
            </div>

            <div className="flex flex-col shrink-0 xl:min-w-[400px]">
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1 xl:text-right">
                Tipo de Transação
              </label>
              <div className="flex flex-wrap gap-2 xl:justify-end">
                {filterOptions.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setActiveFilter(filter.value as any)}
                    className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.05em] transition-all duration-300 ${
                      activeFilter === filter.value
                        ? "bg-[#6C3EF8] text-white shadow-[0_8px_15px_-3px_rgba(108,62,248,0.3)] -translate-y-0.5"
                        : "bg-white text-slate-400 border border-slate-100 hover:border-slate-200 hover:text-slate-600 active:scale-95"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="space-y-4">
            <motion.div
              variants={itemVariants}
              className="flex justify-between items-center px-1"
            >
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                {isLoading
                  ? "Carregando..."
                  : `Mostrando ${filteredTransactions.length} transações`}
              </h3>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {!isLoading &&
                filteredTransactions.map((tx) => (
                  <motion.div key={tx.id} variants={itemVariants}>
                    <TransactionCard transaction={tx} />
                  </motion.div>
                ))}

              {isLoading &&
                Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-40 bg-slate-200 animate-pulse rounded-[2rem]"
                  />
                ))}
            </div>

            {!isLoading && filteredTransactions.length === 0 && (
              <div className="py-20 text-center text-slate-400 font-medium italic">
                Nenhum registro encontrado para os filtros selecionados.
              </div>
            )}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </motion.main>

        <BottomNavigation />
      </div>
    </div>
  );
};

export default TransactionsManagement;
