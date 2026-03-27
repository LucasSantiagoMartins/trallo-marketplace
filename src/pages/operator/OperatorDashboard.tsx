import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import { operatorItems } from "@/constants/sidebar-items";
import { useAuth } from "@/context/AuthContext";
import { InventoryDashboardDTO } from "@/dtos/wharehouse-invetory.dto";
import { getDashboard } from "@/services/warehouse-inventory.service";
import { formatPrice } from "@/utils/currency";
import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import BottomNavigation from "@/components/BottomNavigation";

const OperatorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [data, setData] = useState<InventoryDashboardDTO | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const response = await getDashboard();
        setData(response.data);
      } catch (error) {
        console.error("Erro ao carregar dados do dashboard:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  const getOccupancyColor = (rate: number) => {
    if (rate < 50) return "#22C55E"; // Verde
    if (rate < 85) return "#6C3EF8"; // Azul/Roxo principal
    return "#EF4444"; // Vermelho
  };

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6C3EF8]"></div>
      </div>
    );
  }

  const occupancyRate = data?.occupancyRate || 0;
  const occupancyColor = getOccupancyColor(occupancyRate);

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
                  icon="inventory_2"
                  label="Itens em Estoque"
                  value={
                    data?.totalProductsInStock.toLocaleString("pt-BR") || "0"
                  }
                  color="primary"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="w-full">
                <StatCard
                  icon="login"
                  label="Entradas Hoje"
                  value={data?.entriesToday.toString() || "0"}
                  color="slate"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="w-full">
                <StatCard
                  icon="logout"
                  label="Saídas Hoje"
                  value={data?.exitsToday.toString() || "0"}
                  color="slate"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="w-full">
                <StatCard
                  icon="trending_up"
                  label="Giro de Estoque"
                  value={`${data?.dailyStockTurnover.toFixed(2)}%` || "0%"}
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
                  Infraestrutura do Armazém
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50">
                  <div className="size-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-[#6C3EF8]">
                      grid_view
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">
                      Total de Prateleiras
                    </p>
                    <p className="text-xl font-bold">
                      {data?.totalShelves || 0}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50">
                  <div className="size-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-[#6C3EF8]">
                      reorder
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">
                      Total de Fileiras
                    </p>
                    <p className="text-xl font-bold">{data?.totalRows || 0}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 rounded-3xl bg-[#6C3EF8]/5 border border-[#6C3EF8]/10">
                <p className="text-xs font-bold text-[#6C3EF8] uppercase tracking-tighter mb-1">
                  Valor Total em Estoque
                </p>
                <p className="text-3xl font-black text-[#0F172A]">
                  {formatPrice(data?.totalStockValue || 0)}
                </p>
              </div>
            </motion.section>

            <motion.section
              variants={itemVariants}
              className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden flex flex-col justify-center"
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
                          Taxa de Ocupação
                        </span>
                      </div>
                      <span
                        className="text-[11px] font-black"
                        style={{ color: occupancyColor }}
                      >
                        {occupancyRate.toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${occupancyRate}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: occupancyColor }}
                      />
                    </div>
                  </div>
                </div>
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
