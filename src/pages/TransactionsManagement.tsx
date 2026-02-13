import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import PageHeader from "../components/PageHeader";
import Pagination from "../components/Pagination";
import TransactionCard from "../components/TransactionCard";
import AdminSidebar from "@/components/AdminSidebar";
import BottomNavigation from "../components/BottomNavigation";

const TransactionsManagement: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("Tudo");

  // Configurações de animação consistentes com o Dashboard
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const transactions = [
    {
      id: "#TRL-99821",
      sender: "Ana Paula",
      receiver: "Loja X",
      amount: "15.400,00",
      date: "Hoje, 14:32",
      status: "Concluído",
      image: "https://i.pravatar.cc/150?u=11",
    },
    {
      id: "#TRL-99819",
      sender: "Carlos B.",
      receiver: "TechHub",
      amount: "89.900,00",
      date: "Hoje, 13:15",
      status: "Falhou",
      image: "https://i.pravatar.cc/150?u=12",
    },
    {
      id: "#TRL-99805",
      sender: "Marta S.",
      receiver: "Boutique Lu",
      amount: "4.200,00",
      date: "Ontem, 21:05",
      status: "Reembolsado",
      image: "https://i.pravatar.cc/150?u=13",
    },
    {
      id: "#TRL-99788",
      sender: "João V.",
      receiver: "Maria K.",
      amount: "210.000,00",
      date: "Ontem, 18:40",
      status: "Concluído",
      image: "https://i.pravatar.cc/150?u=14",
    },
    {
      id: "#TRL-99780",
      sender: "Helena M.",
      receiver: "Supermercado",
      amount: "25.000,00",
      date: "10 Fev, 10:20",
      status: "Concluído",
      image: "https://i.pravatar.cc/150?u=15",
    },
    {
      id: "#TRL-99775",
      sender: "Pedro F.",
      receiver: "Farmácia",
      amount: "12.300,00",
      date: "09 Fev, 16:45",
      status: "Concluído",
      image: "https://i.pravatar.cc/150?u=16",
    },
  ] as const;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-['Inter']">
      <AdminSidebar activePage="transacoes" />

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

          <motion.section
            variants={itemVariants}
            className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            <div className="lg:col-span-2 bg-[#6C3EF8] rounded-[2.5rem] p-8 text-white shadow-xl shadow-[#6C3EF8]/20 relative overflow-hidden flex flex-col justify-center">
              <div className="relative z-10">
                <p className="text-white/70 text-[10px] font-black uppercase tracking-[0.2em]">
                  Total Processado (Hoje)
                </p>
                <h2 className="text-3xl font-bold mt-2 tracking-tight">
                  450.250,00{" "}
                  <span className="text-base font-medium opacity-80">AOA</span>
                </h2>
                <div className="flex items-center gap-2 mt-4 text-[9px] font-black bg-white/15 w-fit px-3 py-1.5 rounded-full uppercase tracking-widest backdrop-blur-md">
                  <span className="material-symbols-outlined text-xs">
                    trending_up
                  </span>
                  <span>+12.5% em relação a ontem</span>
                </div>
              </div>
              <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col justify-center">
              <div className="size-10 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] flex items-center justify-center text-white mb-3 shadow-lg shadow-purple-500/20">
                <span className="material-symbols-outlined text-xl">
                  lock_clock
                </span>
              </div>
              <h4 className="font-black text-base mb-1 tracking-tight">
                Por que o saldo está retido?
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Este montante corresponde a pedidos já pagos e aguardando apenas
                a entrega ao cliente.
              </p>
            </div>
          </motion.section>

          <motion.div
            variants={itemVariants}
            className="flex flex-col lg:flex-row lg:items-end gap-6 mb-8"
          >
            <div className="relative flex-1">
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">
                Pesquisar transação
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Buscar ID, comprador ou vendedor..."
                  className="w-full bg-white border-none rounded-2xl py-4 pl-12 pr-4 shadow-sm focus:ring-2 focus:ring-[#6C3EF8]/20 transition-all text-sm outline-none font-medium"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 ml-1 lg:text-right">
                Período
              </label>
              <div className="flex gap-3 overflow-visible py-4 px-2 -my-2 no-scrollbar">
                {["Tudo", "Hoje", "Esta Semana"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] whitespace-nowrap transition-all duration-300 ${
                      activeFilter === filter
                        ? "bg-[#6C3EF8] text-white shadow-[0_10px_20px_-5px_rgba(108,62,248,0.4)] -translate-y-1"
                        : "bg-white text-slate-400 border border-slate-100 hover:shadow-md hover:text-slate-600 active:scale-95"
                    }`}
                  >
                    {filter}
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
                Transações Recentes
              </h3>
              <button className="text-[11px] text-[#6C3EF8] font-black uppercase tracking-widest hover:underline">
                Relatórios
              </button>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {transactions.map((tx, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <TransactionCard {...tx} />
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div variants={itemVariants}>
            <Pagination
              currentPage={currentPage}
              totalPages={3}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </motion.div>
        </motion.main>

        <div className="fixed bottom-32 left-1/2 -translate-x-1/2 z-50 lg:hidden">
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="w-16 h-16 bg-[#6C3EF8] text-white rounded-full shadow-2xl shadow-[#6C3EF8]/40 flex items-center justify-center border-4 border-[#F8FAFC]"
          >
            <span className="material-symbols-outlined text-4xl font-light">
              add
            </span>
          </motion.button>
        </div>

        <BottomNavigation />
      </div>
    </div>
  );
};

export default TransactionsManagement;
