import React from "react";
import { motion } from "framer-motion";
import StatCard from "./StatCard";
import { DashboardOverviewResponse } from "@/dtos/admin-metrics.dto";
import { formatPrice } from "@/utils/currency";

interface Props {
  activeTab: string;
  stats: DashboardOverviewResponse;
}

const OverviewGrid: React.FC<Props> = ({ activeTab, stats }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.3 }}
    >
      {/* Financeiro / Financial */}
      {activeTab === "financial" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            icon="payments"
            label="Volume Bruto (GMV)"
            value={formatPrice(stats?.financial?.grossMerchandiseVolume)}
            color="primary"
          />
          <StatCard
            icon="account_tree"
            label="Receita Plataforma"
            value={formatPrice(stats?.financial?.totalPlatformRevenue)}
            color="info"
          />
          <StatCard
            icon="wallet"
            label="Saldo plataforma"
            value={formatPrice(stats?.financial?.platformWalletBalance)}
            color="slate"
          />
          <StatCard
            icon="store"
            label="Saldo Vendedores"
            value={formatPrice(stats?.financial?.sellersTotalBalance)}
            color="slate"
          />
        </div>
      )}

      {/* Pedidos / Orders */}
      {activeTab === "orders" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
        </div>
      )}

      {/* Pagamentos / Payments */}
      {activeTab === "payments" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
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
        </div>
      )}

      {/* Performance */}
      {activeTab === "performance" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            icon="today"
            label="Receita Hoje"
            value={formatPrice(stats?.performance?.revenueToday)}
            color="success"
          />
          <StatCard
            icon="calendar_month"
            label="Receita Mês"
            value={formatPrice(stats?.performance?.revenueThisMonth)}
            color="info"
          />
          <StatCard
            icon="trending_up"
            label="Crescimento Mês"
            value={`+${stats?.performance?.growthVsLastMonth}%`}
            color="primary"
          />
          <StatCard
            icon="show_chart"
            label="Crescimento Ano"
            value={`+${stats?.performance?.growthVsLastYear}%`}
            color="primary"
          />
        </div>
      )}

      {/* Crescimento / Growth */}
      {activeTab === "growth" && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            icon="group"
            label="Usuários Ativos (Fin)"
            value={stats?.growth?.monthlyActiveFinancialUsers?.toString()}
            color="info"
          />
          <StatCard
            icon="confirmation_number"
            label="Ticket Médio"
            value={formatPrice(stats?.growth?.averageTicket)}
            color="primary"
          />
          <StatCard
            icon="person_pin"
            label="Receita por Vendedor"
            value={formatPrice(stats?.growth?.revenuePerActiveSeller)}
            color="success"
          />
        </div>
      )}

      {/* Risco / Risk */}
      {activeTab === "risk" && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            icon="shield"
            label="Margem de Segurança"
            value={`${stats?.risk?.liquiditySafetyMargin}%`}
            color="success"
          />
          <StatCard
            icon="warning"
            label="Exposição ao Risco"
            value={`${stats?.risk?.riskExposureRatio}%`}
            color="danger"
          />
          <StatCard
            icon="gpp_maybe"
            label="Índice Falha Pag."
            value={`${stats?.risk?.paymentFailureRiskIndex}%`}
            color="warning"
          />
        </div>
      )}
    </motion.div>
  );
};

export default OverviewGrid;
