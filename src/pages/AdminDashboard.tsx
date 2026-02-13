import React from "react";
import { motion, Variants } from "framer-motion";
import PageHeader from "../components/PageHeader";
import BottomNavigation from "../components/BottomNavigation";
import PerformanceCard from "../components/PerformanceCard";
import StatCard from "../components/StatCard";
import AdminSidebar from "@/components/AdminSidebar";
import { Link } from "react-router-dom";

const AdminDashboard: React.FC = () => {
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

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-['Inter'] flex">
      <AdminSidebar activePage="dashboard" />

      <motion.main
        className="flex-1 pb-32 lg:pb-10 overflow-x-hidden"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header Mobile */}
        <div className="lg:hidden">
          <PageHeader
            title="Visão Geral"
            rightElement={
              <button className="relative size-10 flex items-center justify-center bg-card rounded-full shadow-soft">
                <span className="material-symbols-outlined text-foreground">
                  notifications
                </span>
                <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#6C3EF8] rounded-full border-2 border-white"></div>
              </button>
            }
          />
        </div>

        {/* Header Desktop */}
        <motion.header
          variants={itemVariants}
          className="hidden lg:flex px-8 pt-10 pb-8 justify-between items-end max-w-7xl mx-auto w-full"
        >
          <div>
            <p className="text-[#6C3EF8] font-bold text-[10px] tracking-[0.2em] mb-1 uppercase">
              Admin Central
            </p>
            <h1 className="text-3xl font-semibold text-[#0F172A]">
              Visão Geral
            </h1>
          </div>
        </motion.header>

        <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-20 lg:mt-0">
          {/* Seção de Stats */}
          <section className="mb-8">
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <motion.div variants={itemVariants} className="w-full">
                <StatCard
                  icon="group"
                  label="Total Usuários"
                  value="24.8k"
                  color="primary"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="w-full">
                <StatCard
                  icon="receipt_long"
                  label="Transações"
                  value="1.240"
                  color="slate"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="w-full">
                <StatCard
                  icon="engineering"
                  label="Operadores"
                  value="12"
                  color="slate"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="w-full">
                <StatCard
                  icon="account_balance_wallet"
                  label="Receita Total"
                  value="18.4M KZ"
                  color="slate"
                />
              </motion.div>
            </div>
          </section>

          {/* Grid Principal */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <PerformanceCard />
            </motion.div>

            <motion.section
              variants={itemVariants}
              className="bg-white dark:bg-slate-800/40 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800/50 shadow-sm h-fit"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-sm uppercase tracking-widest text-slate-400">
                  Gestão de Acessos
                </h3>
              </div>

              <div className="flex flex-col gap-3">
                <Link
                  to="/area-administrativa/adicionar-operador"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/50 hover:bg-[#6C3EF8]/10 hover:text-[#6C3EF8] transition-all border border-dashed border-slate-200 dark:border-slate-600 group"
                >
                  <div className="size-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm group-hover:bg-[#6C3EF8] group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined">
                      person_add
                    </span>
                  </div>
                  <div className="text-left">
                    <span className="block text-[12px] font-black uppercase">
                      Novo Operador
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Criar conta de operador
                    </span>
                  </div>
                </Link>

                <Link
                  to="/area-administrativa/adicionar-administrador"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/50 hover:bg-[#6C3EF8]/10 hover:text-[#6C3EF8] transition-all border border-dashed border-slate-200 dark:border-slate-600 group"
                >
                  <div className="size-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm group-hover:bg-[#6C3EF8] group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined">
                      admin_panel_settings
                    </span>
                  </div>
                  <div className="text-left">
                    <span className="block text-[12px] font-black uppercase">
                      Novo Administrador
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Acesso total ao sistema
                    </span>
                  </div>
                </Link>
              </div>
            </motion.section>
          </div>

          {/* NOVAS SEÇÕES PARA PREENCHER O FUNDO */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            {/* Logs de Atividade Recente */}
            <motion.section
              variants={itemVariants}
              className="lg:col-span-2 bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-sm uppercase tracking-widest text-slate-400">
                  Atividade do Sistema
                </h3>
                <span className="text-[10px] bg-green-100 text-green-600 px-2 py-1 rounded-lg font-bold">
                  LIVE
                </span>
              </div>

              <div className="space-y-4">
                {[
                  {
                    user: "Admin Marcos",
                    action: "aprovou saque de 450.000 KZ",
                    time: "2 min atrás",
                    icon: "check_circle",
                  },
                  {
                    user: "Sistema",
                    action: "backup diário concluído com sucesso",
                    time: "15 min atrás",
                    icon: "cloud_done",
                  },
                  {
                    user: "Operador Sílvia",
                    action: "redefiniu senha de usuário",
                    time: "1h atrás",
                    icon: "lock_reset",
                  },
                ].map((log, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                        <span className="material-symbols-outlined text-lg">
                          {log.icon}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs font-bold">{log.user}</p>
                        <p className="text-[10px] text-slate-500">
                          {log.action}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {log.time}
                    </span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Status de Servidores / Segurança */}
            <motion.section
              variants={itemVariants}
              className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden"
            >
              <div className="relative z-10">
                <h3 className="font-bold text-sm uppercase tracking-widest text-slate-400 mb-6">
                  Acessos por Dispositivo
                </h3>

                <div className="space-y-5">
                  {/* Desktop */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm text-slate-400">
                          desktop_windows
                        </span>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                          Desktop
                        </span>
                      </div>
                      <span className="text-[11px] font-black text-[#6C3EF8]">
                        75%
                      </span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "75%" }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-[#6C3EF8] rounded-full"
                      />
                    </div>
                  </div>

                  {/* Mobile */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm text-slate-400">
                          smartphone
                        </span>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                          Mobile
                        </span>
                      </div>
                      <span className="text-[11px] font-black text-slate-400">
                        25%
                      </span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "25%" }}
                        transition={{ duration: 1, delay: 0.7 }}
                        className="h-full bg-slate-300 rounded-full"
                      />
                    </div>
                  </div>
                </div>

                <button className="w-full mt-8 py-3 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 border border-slate-100">
                  Ver Detalhes Técnicos
                </button>
              </div>

              <div className="absolute -right-10 -bottom-10 size-40 bg-[#6C3EF8]/5 rounded-full blur-3xl"></div>
            </motion.section>
          </div>
        </div>
      </motion.main>

      <BottomNavigation />
    </div>
  );
};

export default AdminDashboard;
