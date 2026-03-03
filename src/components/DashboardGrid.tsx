import React from "react";
import StatCard from "./StatCard";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardOverviewData } from "@/dtos/dashboard-overview-data.dto";

export interface DashboardGridProps {
  activeTab: string;
  stats: DashboardOverviewData | undefined | null;
  loading: boolean;
}

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

const DashboardGrid: React.FC<DashboardGridProps> = ({
  activeTab,
  stats,
  loading,
}) => {
  const formatKz = (value: number | undefined) => {
    if (value === undefined || value === null) return "0,00 KZ";
    return (
      new Intl.NumberFormat("pt-AO", {
        style: "decimal",
        minimumFractionDigits: 2,
      }).format(value) + " KZ"
    );
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-40 bg-slate-100 rounded-[2rem]" />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full space-y-6"
    >
      <AnimatePresence mode="wait">
        {/* ABA FINANCEIRO */}
        {activeTab === "financeiro" && (
          <motion.div key="fin" variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard icon="payments" label="Volume Bruto (GMV)" value={formatKz(stats?.financial?.grossMerchandiseVolume)} color="primary" />
            <StatCard icon="account_tree" label="Receita Plataforma" value={formatKz(stats?.financial?.totalPlatformRevenue)} color="info" />
            <StatCard icon="wallet" label="Saldo Wallet" value={formatKz(stats?.financial?.platformWalletBalance)} color="slate" />
            <StatCard icon="store" label="Saldo Vendedores" value={formatKz(stats?.financial?.sellersTotalBalance)} color="slate" />
          </motion.div>
        )}

        {/* ABA PEDIDOS */}
        {activeTab === "pedidos" && (
          <motion.div key="ped" variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon="inventory_2" label="Total Pedidos" value={stats?.orders?.totalOrders?.toString()} color="primary" />
            <StatCard icon="pending" label="Aguardando" value={stats?.orders?.awaitingPayment?.toString()} color="warning" />
            <StatCard icon="verified" label="Pagos" value={stats?.orders?.paid?.toString()} color="success" />
            <StatCard icon="block" label="Cancelados" value={stats?.orders?.cancelled?.toString()} color="danger" />
          </motion.div>
        )}

        {/* ABA PAGAMENTOS */}
        {activeTab === "pagamentos" && (
          <motion.div key="pay" variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard icon="check_circle" label="Confirmados" value={stats?.payments?.confirmed?.toString()} color="success" />
            <StatCard icon="hourglass_top" label="Em Processamento" value={stats?.payments?.processing?.toString()} color="warning" />
            <StatCard icon="schedule" label="Pendentes" value={stats?.payments?.pending?.toString()} color="slate" />
            <StatCard icon="error" label="Falhas" value={stats?.payments?.failed?.toString()} color="danger" />
          </motion.div>
        )}

        {/* ABA PERFORMANCE */}
        {activeTab === "performance" && (
          <motion.div key="perf" variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-gradient-to-br from-[#6C3EF8] to-[#4F26D9] p-8 rounded-[3rem] text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-indigo-100 text-xs font-bold uppercase tracking-widest mb-2">Receita Mensal</p>
                <h3 className="text-4xl font-black mb-6">{formatKz(stats?.performance?.revenueThisMonth)}</h3>
                <div className="flex gap-4">
                  <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium">MoM +{stats?.performance?.growthVsLastMonth}%</span>
                </div>
              </div>
              <span className="material-symbols-outlined absolute -right-10 -bottom-10 opacity-10 !text-[200px]">trending_up</span>
            </div>
            <StatCard icon="today" label="Receita Hoje" value={formatKz(stats?.performance?.revenueToday)} color="info" />
          </motion.div>
        )}

        {/* ABA CRESCIMENTO */}
        {activeTab === "crescimento" && (
          <motion.div key="growth" variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard icon="confirmation_number" label="Ticket Médio" value={formatKz(stats?.growth?.averageTicket)} color="success" />
            <StatCard icon="group" label="Usuários Ativos" value={stats?.growth?.monthlyActiveFinancialUsers?.toString()} color="primary" />
            <StatCard icon="person_celebrate" label="Receita p/ Vendedor" value={formatKz(stats?.growth?.revenuePerActiveSeller)} color="info" />
          </motion.div>
        )}

        {/* ABA RISCO E SUSTENTABILIDADE */}
        {activeTab === "risco" && (
          <motion.div key="risk" variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden group">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-slate-900 font-bold text-lg">Índice de Risco</h3>
                  <p className="text-slate-400 text-xs font-medium">Falha de Pagamento Atual</p>
                </div>
                <div className="bg-red-50 p-3 rounded-2xl text-red-500">
                  <span className="material-symbols-outlined">warning</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-3xl font-black text-slate-900">{stats?.risk?.paymentFailureRiskIndex?.toFixed(2)}%</span>
                  <span className="text-red-500 text-xs font-bold mb-1">Limite: 5.00%</span>
                </div>
                <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden p-1">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(stats?.risk?.paymentFailureRiskIndex || 0, 100)}%` }}
                    className="h-full bg-gradient-to-r from-red-400 to-red-600 rounded-full"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#0F172A] p-6 rounded-[2.5rem] text-white flex flex-col justify-between">
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-tighter">Score Sustentabilidade</p>
                <p className="text-3xl font-black text-emerald-400">{stats?.sustainability?.financialSustainabilityScore}</p>
              </div>
              <StatCard icon="security" label="Margem Segur." value={`${stats?.risk?.liquiditySafetyMargin}%`} color="primary" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DashboardGrid;