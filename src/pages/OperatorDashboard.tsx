import React from "react";
import { motion, Variants } from "framer-motion";
import PageHeader from "../components/PageHeader";
import BottomNavigation from "../components/BottomNavigation";
import StatCard from "../components/StatCard";
import Sidebar from "@/components/Sidebar";
import { operatorItems } from "@/constants/sidebar-items";
import { useAuth } from "@/context/AuthContext";

const OperatorDashboard: React.FC = () => {
  const { user } = useAuth();

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

  const menuItems =
    user?.role === "ADMIN"
      ? [
          ...operatorItems,
          {
            id: "back-to-admin",
            icon: "admin_panel_settings",
            label: "Área Administrativa",
            path: "/area-administrativa",
          },
        ]
      : operatorItems;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-['Inter'] flex">
      <Sidebar
        title="Painel Operacional"
        items={menuItems}
        activePage="dashboard"
        showSettings={false}
      />
      <motion.main
        className="flex-1 pb-32 lg:pb-10 overflow-x-hidden"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="lg:hidden">
          <PageHeader
            title="Painel Operacional"
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

        <motion.header
          variants={itemVariants}
          className="hidden lg:flex px-8 pt-10 pb-8 justify-between items-end max-w-7xl mx-auto w-full"
        >
          <div>
            <p className="text-[#6C3EF8] font-bold text-[10px] tracking-[0.2em] mb-1 uppercase">
              Operações e Logística
            </p>
            <h1 className="text-3xl font-semibold text-[#0F172A]">
              Visão Geral
            </h1>
          </div>
        </motion.header>

        <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-20 lg:mt-0">
          <section className="mb-8">
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <motion.div variants={itemVariants} className="w-full">
                <StatCard
                  icon="pending_actions"
                  label="Pendentes"
                  value="42"
                  color="primary"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="w-full">
                <StatCard
                  icon="inventory_2"
                  label="Itens em Estoque"
                  value="1.840"
                  color="slate"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="w-full">
                <StatCard
                  icon="verified"
                  label="Validados Hoje"
                  value="128"
                  color="slate"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="w-full">
                <StatCard
                  icon="local_shipping"
                  label="Saídas (24h)"
                  value="85"
                  color="slate"
                />
              </motion.div>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <motion.section
              variants={itemVariants}
              className="lg:col-span-2 bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-sm uppercase tracking-widest text-slate-400">
                  Logs de Operação
                </h3>
                <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-1 rounded-lg font-bold">
                  SNC
                </span>
              </div>

              <div className="space-y-4">
                {[
                  {
                    user: "Produto #882",
                    action: "validado e movido para o estoque",
                    time: "5 min atrás",
                    icon: "inventory_2",
                  },
                  {
                    user: "Estoque",
                    action: "baixa de 12 unidades: SKU-990",
                    time: "22 min atrás",
                    icon: "remove_shopping_cart",
                  },
                  {
                    user: "Verificação",
                    action: "produto #102 recusado (fotos inválidas)",
                    time: "1h atrás",
                    icon: "cancel",
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

            <motion.section
              variants={itemVariants}
              className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden"
            >
              <div className="relative z-10">
                <h3 className="font-bold text-sm uppercase tracking-widest text-slate-400 mb-6">
                  Capacidade de Estoque
                </h3>

                <div className="space-y-5">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm text-slate-400">
                          warehouse
                        </span>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                          Ocupação
                        </span>
                      </div>
                      <span className="text-[11px] font-black text-[#6C3EF8]">
                        82%
                      </span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "82%" }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-[#6C3EF8] rounded-full"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm text-slate-400">
                          priority_high
                        </span>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                          Ruptura (Out of Stock)
                        </span>
                      </div>
                      <span className="text-[11px] font-black text-red-400">
                        12%
                      </span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "12%" }}
                        transition={{ duration: 1, delay: 0.7 }}
                        className="h-full bg-red-400 rounded-full"
                      />
                    </div>
                  </div>
                </div>

                <button className="w-full mt-8 py-3 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 border border-slate-100">
                  Relatório de Inventário
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

export default OperatorDashboard;
