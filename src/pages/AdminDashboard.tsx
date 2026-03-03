import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../components/Sidebar";
import BottomNavigation from "../components/BottomNavigation";
import OperationalFooter from "@/components/OperationalFooter";

import { adminItems } from "@/constants/sidebar-items";
import { getDashboardOverview } from "@/services/admin.service";
import { DashboardOverviewResponse } from "@/dtos/dashboard-overview-data.dto";
import TabContainer from "@/components/TabContainer";
import DashboardGrid from "@/components/DashBoardGrid";

type TabType =
  | "financeiro"
  | "pedidos"
  | "pagamentos"
  | "performance"
  | "crescimento"
  | "risco";

const AdminDashboard: React.FC = () => {
  const [data, setData] = useState<DashboardOverviewResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("financeiro");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await getDashboardOverview();

        if (res) {
          const apiData = res.data?.data || res.data || res;
          const formattedResponse = {
            success: true,
            message: "Loaded",
            data: apiData,
          } as unknown as DashboardOverviewResponse;

          setData(formattedResponse);
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-['Inter'] flex">
      <Sidebar
        title="Painel Administrativo"
        items={adminItems}
        activePage="dashboard"
        showSettings
      />

      <motion.main
        className="flex-1 pb-32 lg:pb-10 overflow-x-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <header className="px-4 lg:px-8 pt-10 pb-6 max-w-7xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <p className="text-[#6C3EF8] font-bold text-[10px] tracking-[0.2em] mb-1 uppercase">
                Gestão Central
              </p>
              <h1 className="text-3xl font-semibold">Visão Geral</h1>
            </div>
            <TabContainer activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <DashboardGrid
                activeTab={activeTab as string}
                stats={data?.data}
                loading={loading}
              />
            </motion.div>
          </AnimatePresence>

          <OperationalFooter
            loading={loading}
            inconsistentCount={data?.data?.alerts?.inconsistentTransactions}
          />
        </div>
      </motion.main>
      <BottomNavigation />
    </div>
  );
};

export default AdminDashboard;
