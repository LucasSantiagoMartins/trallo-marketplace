import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../components/Sidebar";
import BottomNavigation from "../components/BottomNavigation";
import OperationalFooter from "@/components/OperationalFooter";

import { adminItems } from "@/constants/sidebar-items";
import {
  getDashboardOverview,
  getPaymentMetrics,
  getTransactionMetrics,
  getWalletMetrics,
} from "@/services/admin.service";
import TabContainer from "@/components/TabContainer";
import DashboardGrid from "@/components/DashBoardGrid";

type MetricContext = "overview" | "payments" | "transactions" | "wallets";

const AdminDashboard: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [context, setContext] = useState<MetricContext>("overview");
  const [activeTab, setActiveTab] = useState<string>("financial");

  const contextTabs: Record<MetricContext, { id: string; label: string }[]> = {
    overview: [
      { id: "financial", label: "Financeiro" },
      { id: "orders", label: "Pedidos" },
      { id: "payments", label: "Pagamentos" },
      { id: "performance", label: "Performance" },
      { id: "growth", label: "Crescimento" },
      { id: "risk", label: "Risco" },
    ],
    payments: [
      { id: "stats", label: "Estatísticas" },
      { id: "performance", label: "Performance" },
      { id: "alerts", label: "Alertas" },
    ],
    transactions: [
      { id: "stats", label: "Estatísticas" },
      { id: "distribution", label: "Distribuição" },
      { id: "alerts", label: "Alertas" },
    ],
    wallets: [
      { id: "stats", label: "Estatísticas" },
      { id: "health", label: "Saúde" },
      { id: "flow", label: "Fluxo de Saída" },
    ],
  };

  const fetchStats = async () => {
    try {
      setLoading(true);
      let res;
      switch (context) {
        case "payments":
          res = await getPaymentMetrics();
          break;
        case "transactions":
          res = await getTransactionMetrics();
          break;
        case "wallets":
          res = await getWalletMetrics();
          break;
        default:
          res = await getDashboardOverview();
      }

      if (res && res.data) {
        setData(res.data);
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setActiveTab(contextTabs[context][0].id);
    fetchStats();
  }, [context]);

  const contextCards = [
    { id: "overview", label: "Geral", icon: "grid_view" },
    { id: "payments", label: "Pagamentos", icon: "payments" },
    { id: "transactions", label: "Transações", icon: "sync_alt" },
    { id: "wallets", label: "Carteiras", icon: "account_balance_wallet" },
  ];

  const getInconsistentCount = () => {
    if (!data?.alerts) return 0;
    switch (context) {
      case "overview":
        return data.alerts.inconsistentTransactions || 0;
      case "payments":
        return data.alerts.stuckProcessingPayments || 0;
      case "transactions":
        return data.alerts.inconsistentBalances || 0;
      case "wallets":
        return data.alerts.negativeWallets || 0;
      default:
        return 0;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-['Inter'] flex">
      <Sidebar
        title="Painel Administrativo"
        items={adminItems}
        activePage="dashboard"
        showSettings
      />

      <motion.main
        className="flex-1 pb-32 lg:pb-24 overflow-x-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <header className="px-4 lg:px-8 pt-10 pb-6 max-w-7xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
            <div>
              <p className="text-[#6C3EF8] font-bold text-[10px] tracking-[0.2em] mb-1 uppercase">
                Gestão Central
              </p>
              <h1 className="text-3xl font-semibold">
                {contextCards.find((c) => c.id === context)?.label}
              </h1>
            </div>

            <TabContainer
              tabs={contextTabs[context]}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {contextCards.map((item) => (
              <button
                key={item.id}
                onClick={() => setContext(item.id as MetricContext)}
                className={`group p-3 rounded-xl border transition-all flex items-center gap-3 ${
                  context === item.id
                    ? "bg-white border-[#6C3EF8] shadow-sm ring-1 ring-[#6C3EF8]/10"
                    : "bg-white/50 border-slate-200 hover:border-slate-300"
                }`}
              >
                <div
                  className={`p-2 rounded-lg transition-colors ${
                    context === item.id
                      ? "bg-[#6C3EF8] text-white"
                      : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px] block">
                    {item.icon}
                  </span>
                </div>
                <span
                  className={`text-[11px] font-bold uppercase tracking-wider ${
                    context === item.id ? "text-[#6C3EF8]" : "text-slate-500"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab}-${context}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <DashboardGrid
                activeTab={activeTab}
                context={context}
                stats={data}
                loading={loading}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <OperationalFooter
          loading={loading}
          inconsistentCount={getInconsistentCount()}
          onAddOperator={() => console.log("Adicionar operador")}
        />
      </motion.main>
      <BottomNavigation />
    </div>
  );
};

export default AdminDashboard;
