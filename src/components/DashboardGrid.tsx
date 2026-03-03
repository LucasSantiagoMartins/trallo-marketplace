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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-slate-100 rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full space-y-4 md:space-y-6"
    >
      <AnimatePresence mode="wait">
        {activeTab === "financeiro" && (
          <motion.div
            key="fin"
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
          >
            <StatCard
              icon="payments"
              label="Volume Bruto (GMV)"
              value={formatKz(stats?.financial?.grossMerchandiseVolume)}
              color="primary"
            />
            <StatCard
              icon="account_tree"
              label="Receita Plataforma"
              value={formatKz(stats?.financial?.totalPlatformRevenue)}
              color="info"
            />
            <StatCard
              icon="wallet"
              label="Saldo Wallet"
              value={formatKz(stats?.financial?.platformWalletBalance)}
              color="slate"
            />
            <StatCard
              icon="store"
              label="Saldo Vendedores"
              value={formatKz(stats?.financial?.sellersTotalBalance)}
              color="slate"
            />
          </motion.div>
        )}

        {activeTab === "pedidos" && (
          <motion.div
            key="ped"
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <StatCard
              icon="inventory_2"
              label="Total Pedidos"
              value={stats?.orders?.totalOrders?.toString()}
              color="primary"
            />
            <StatCard
              icon="pending"
              label="Aguardando"
              value={stats?.orders?.awaitingPayment?.toString()}
              color="warning"
            />
            <StatCard
              icon="verified"
              label="Pagos"
              value={stats?.orders?.paid?.toString()}
              color="success"
            />
            <StatCard
              icon="block"
              label="Cancelados"
              value={stats?.orders?.cancelled?.toString()}
              color="danger"
            />
          </motion.div>
        )}

        {activeTab === "pagamentos" && (
          <motion.div
            key="pay"
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
          >
            <StatCard
              icon="check_circle"
              label="Confirmados"
              value={stats?.payments?.confirmed?.toString()}
              color="success"
            />
            <StatCard
              icon="hourglass_top"
              label="Em Processamento"
              value={stats?.payments?.processing?.toString()}
              color="warning"
            />
            <StatCard
              icon="schedule"
              label="Pendentes"
              value={stats?.payments?.pending?.toString()}
              color="slate"
            />
            <StatCard
              icon="error"
              label="Falhas"
              value={stats?.payments?.failed?.toString()}
              color="danger"
            />
          </motion.div>
        )}

        {activeTab === "performance" && (
          <motion.div
            key="perf"
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <div className="md:col-span-2 bg-[#6C3EF8] p-6 md:p-8 rounded-3xl text-white shadow-xl relative overflow-hidden flex flex-col justify-center min-h-[160px]">
              <p className="text-indigo-100 text-xs font-bold uppercase tracking-widest mb-2">
                Receita Mensal
              </p>
              <h3 className="text-3xl md:text-5xl font-black mb-4">
                {formatKz(stats?.performance?.revenueThisMonth)}
              </h3>
              <div className="flex flex-wrap gap-2">
                <div className="bg-emerald-400/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-bold border border-emerald-400/30">
                  +{stats?.performance?.growthVsLastMonth}% MoM
                </div>
                <div className="bg-blue-400/20 text-blue-300 px-3 py-1 rounded-full text-xs font-bold border border-blue-400/30">
                  +{stats?.performance?.growthVsLastYear}% YoY
                </div>
              </div>
              <span className="material-symbols-outlined absolute -right-6 -bottom-6 opacity-10 !text-[120px] md:!text-[150px]">
                trending_up
              </span>
            </div>
            <StatCard
              icon="today"
              label="Receita Hoje"
              value={formatKz(stats?.performance?.revenueToday)}
              color="info"
            />
            <StatCard
              icon="query_stats"
              label="Crescimento Anual"
              value={`${stats?.performance?.growthVsLastYear}%`}
              color="success"
            />
          </motion.div>
        )}

        {activeTab === "crescimento" && (
          <motion.div
            key="growth"
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
          >
            <StatCard
              icon="confirmation_number"
              label="Ticket Médio"
              value={formatKz(stats?.growth?.averageTicket)}
              color="success"
            />
            <StatCard
              icon="group"
              label="Usuários Ativos"
              value={stats?.growth?.monthlyActiveFinancialUsers?.toString()}
              color="primary"
            />
            <StatCard
              icon="percent"
              label="Platform Take Rate"
              value={`${stats?.sustainability?.platformTakeRate}%`}
              color="info"
            />
            <StatCard
              icon="moving"
              label="LTV Vendedor"
              value={formatKz(stats?.sustainability?.averageSellerLifetimeRevenue)}
              color="slate"
            />
            <StatCard
              icon="person_celebrate"
              label="LTV Cliente"
              value={formatKz(stats?.sustainability?.averageCustomerFinancialLifetimeValue)}
              color="slate"
            />
          </motion.div>
        )}

        {activeTab === "risco" && (
          <motion.div
            key="risk"
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-slate-900 font-bold text-base">
                  Saúde Operacional
                </h3>
                <span className="material-symbols-outlined text-rose-500 bg-rose-50 p-1.5 rounded-lg">
                  shield_with_heart
                </span>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-2xl md:text-3xl font-black text-slate-900">
                      {stats?.risk?.paymentFailureRiskIndex}%
                    </span>
                    <span className="text-slate-400 text-[10px] font-bold uppercase">
                      Índice de Falha
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${Math.min(stats?.risk?.paymentFailureRiskIndex || 0, 100)}%`,
                      }}
                      className={`h-full ${
                        (stats?.risk?.paymentFailureRiskIndex || 0) > 2.5
                          ? "bg-rose-500"
                          : "bg-emerald-500"
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                  <div>
                    <p className="text-slate-400 text-[10px] font-bold uppercase mb-1">
                      Rácio de Exposição
                    </p>
                    <p className="text-lg font-bold text-slate-800">
                      {((stats?.risk?.riskExposureRatio || 0) * 100).toFixed(1)}
                      %
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-[10px] font-bold uppercase mb-1">
                      Inconsistências
                    </p>
                    <p
                      className={`text-lg font-bold ${(stats?.alerts?.inconsistentTransactions || 0) > 0 ? "text-rose-500" : "text-emerald-500"}`}
                    >
                      {stats?.alerts?.inconsistentTransactions || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-col gap-4">
              <StatCard
                icon="Eco"
                label="Score de Sustentabilidade"
                value={`${stats?.sustainability?.financialSustainabilityScore}/100`}
                color="primary"
              />
              <StatCard
                icon="Gpp_Good"
                label="Margem de Segurança"
                value={`${stats?.risk?.liquiditySafetyMargin}%`}
                color="info"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DashboardGrid;