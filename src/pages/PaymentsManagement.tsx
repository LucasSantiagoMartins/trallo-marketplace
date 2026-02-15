import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import PageHeader from "../components/PageHeader";
import Pagination from "../components/Pagination";
import BottomNavigation from "../components/BottomNavigation";
import PaymentCard from "@/components/PaymentCard";
import Sidebar from "@/components/Sidebar";
import { adminItems } from "@/constants/sidebar-items";

const PaymentsManagement: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("Tudo");

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

  const payments = [
    {
      id: "#PAY-88210",
      sender: "Trallo Corp",
      receiver: "Mercado Central",
      amount: "150.000,00",
      date: "Hoje, 09:15",
      status: "Concluído",
      image: "https://i.pravatar.cc/150?u=20",
    },
    {
      id: "#PAY-88211",
      sender: "Trallo Corp",
      receiver: "Loja de Conveniência",
      amount: "45.200,00",
      date: "Hoje, 11:30",
      status: "Processando",
      image: "https://i.pravatar.cc/150?u=21",
    },
    {
      id: "#PAY-88212",
      sender: "Trallo Corp",
      receiver: "João Manuel",
      amount: "12.000,00",
      date: "Ontem, 16:40",
      status: "Agendado",
      image: "https://i.pravatar.cc/150?u=7",
    },
    {
      id: "#PAY-88213",
      sender: "Trallo Corp",
      receiver: "Ana Sofia",
      amount: "8.500,00",
      date: "10 Fev, 14:20",
      status: "Concluído",
      image: "https://i.pravatar.cc/150?u=8",
    },
    {
      id: "#PAY-88214",
      sender: "Trallo Corp",
      receiver: "Ricardo Costa",
      amount: "120.000,00",
      date: "09 Fev, 10:00",
      status: "Falhou",
      image: "https://i.pravatar.cc/150?u=9",
    },
    {
      id: "#PAY-88215",
      sender: "Trallo Corp",
      receiver: "Maria Luísa",
      amount: "32.000,00",
      date: "08 Fev, 09:15",
      status: "Concluído",
      image: "https://i.pravatar.cc/150?u=10",
    },
  ] as const;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-['Inter']">
      <Sidebar
        title="Painel Administrativo"
        items={adminItems}
        activePage="pagamentos"
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
              Operações
            </p>
            <h1 className="text-3xl font-semibold text-[#0F172A]">
              Gestão de Pagamentos
            </h1>
          </motion.header>

          <motion.section
            variants={itemVariants}
            className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            <div className="lg:col-span-2 bg-[#6C3EF8] rounded-[2.5rem] p-8 text-white shadow-xl shadow-[#6C3EF8]/20 relative overflow-hidden flex flex-col justify-center">
              <div className="relative z-10">
                <p className="text-white/70 text-[10px] font-black uppercase tracking-[0.2em]">
                  Disponível para Liquidação
                </p>
                <h2 className="text-3xl font-bold mt-2 tracking-tight">
                  1.250.000,00{" "}
                  <span className="text-base font-medium opacity-80">AOA</span>
                </h2>
                <div className="flex items-center gap-2 mt-4 text-[9px] font-black bg-white/15 w-fit px-3 py-1.5 rounded-full uppercase tracking-widest backdrop-blur-md">
                  <span className="material-symbols-outlined text-xs">
                    account_balance_wallet
                  </span>
                  <span>Próximo ciclo: Amanhã</span>
                </div>
              </div>
              <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
            </div>

            <div className="p-6 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col justify-center">
              <div className="size-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-xl">
                  pending_actions
                </span>
              </div>
              <h4 className="font-black text-base mb-1 tracking-tight">
                Controle Financeiro
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Acompanhe e gerencie todas as operações financeiras da
                plataforma.
              </p>
            </div>
          </motion.section>

          <motion.div
            variants={itemVariants}
            className="flex flex-col lg:flex-row lg:items-end gap-6 mb-8"
          >
            <div className="relative flex-1">
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">
                Pesquisar Beneficiário
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  search
                </span>
                <input
                  type="text"
                  placeholder="ID do pagamento, nome do vendedor..."
                  className="w-full bg-white border-none rounded-2xl py-4 pl-12 pr-4 shadow-sm focus:ring-2 focus:ring-[#6C3EF8]/20 transition-all text-sm outline-none font-medium"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 ml-1 lg:text-right">
                Estado
              </label>
              <div className="flex gap-3 overflow-visible py-4 px-2 -my-2 no-scrollbar">
                {["Tudo", "Concluído", "Processando", "Falhou"].map(
                  (filter) => (
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
                  ),
                )}
              </div>
            </div>
          </motion.div>

          <div className="space-y-4">
            <motion.div
              variants={itemVariants}
              className="flex justify-between items-center px-1"
            >
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                Fluxo de Saída Recente
              </h3>
              <button className="text-[11px] text-[#6C3EF8] font-black uppercase tracking-widest hover:underline">
                Nova Transferência
              </button>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {payments.map((pay, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <PaymentCard {...pay} />
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div variants={itemVariants}>
            <Pagination
              currentPage={currentPage}
              totalPages={5}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </motion.div>
        </motion.main>

        <div className="fixed bottom-32 left-1/2 -translate-x-1/2 z-50 lg:hidden">
          <button className="w-16 h-16 bg-[#0F172A] text-white rounded-full shadow-2xl flex items-center justify-center border-4 border-[#F8FAFC] active:scale-90 transition-transform">
            <span className="material-symbols-outlined text-4xl font-light">
              send_money
            </span>
          </button>
        </div>

        <BottomNavigation />
      </div>
    </div>
  );
};

export default PaymentsManagement;
