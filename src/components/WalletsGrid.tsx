import React from "react";
import { motion } from "framer-motion";
import StatCard from "./StatCard";
import { WalletMetricsResponse } from "@/dtos/admin-metrics.dto";
import { formatPrice } from "@/utils/currency";

interface Props {
  activeTab: string;
  data: WalletMetricsResponse;
}

const WalletsGrid: React.FC<Props> = ({ activeTab, data }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="space-y-6"
  >
    {activeTab === "stats" && (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard
          icon="account_balance_wallet"
          label="Saldo Vendedores"
          value={formatPrice(data.stats.totalSellersBalance)}
          color="primary"
        />
        <StatCard
          icon="lock"
          label="Saldo Cativo (Hold)"
          value={formatPrice(data.stats.totalSellersHoldBalance)}
          color="warning"
        />
        <StatCard
          icon="admin_panel_settings"
          label="Saldo Plataforma"
          value={formatPrice(data.stats.platformBalance)}
          color="info"
        />
      </div>
    )}

    {activeTab === "health" && (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          icon="person_off"
          label="Carteiras Inativas"
          value={data.health.inactiveWalletsCount.toString()}
          color="slate"
        />
        <StatCard
          icon="dangerous"
          label="Saldos Negativos"
          value={data.health.negativeWalletsCount.toString()}
          color="danger"
        />
        <StatCard
          icon="priority_high"
          label="Saldos Elevados"
          value={data.health.highBalanceWalletsCount.toString()}
          color="warning"
        />
      </div>
    )}

    {activeTab === "flow" && (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          icon="outbox"
          label="Retirado no Mês"
          value={formatPrice(data.flow.totalWithdrawnThisMonth)}
          color="primary"
        />
        <StatCard
          icon="pending_actions"
          label="Saques Pendentes"
          value={data.flow.totalPendingWithdrawal.toString()}
          color="warning"
        />
        <StatCard
          icon="payments"
          label="Volume Total Saques"
          value={formatPrice(data.flow.withdrawalTransactionsAmount)}
          color="success"
        />
      </div>
    )}
  </motion.div>
);

export default WalletsGrid;
