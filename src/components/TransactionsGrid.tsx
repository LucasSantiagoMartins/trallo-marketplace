import React from "react";
import { motion } from "framer-motion";
import StatCard from "./StatCard";
import { TransactionMetricsResponse } from "@/dtos/admin-metrics.dto";
import { formatPrice } from "@/utils/currency";

interface Props {
  activeTab: string;
  data: TransactionMetricsResponse;
}

const TransactionsGrid: React.FC<Props> = ({ activeTab, data }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="space-y-6"
  >
    {activeTab === "stats" && (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            icon="account_balance"
            label="Créditos Totais"
            value={formatPrice(data.stats.totalCredits)}
            color="primary"
          />
          <StatCard
            icon="payments"
            label="Débitos Totais"
            value={formatPrice(data.stats.totalDebits)}
            color="danger"
          />
          <StatCard
            icon="star"
            label="Comissão Total"
            value={formatPrice(data.stats.totalCommissionAmount)}
            color="info"
          />
          <StatCard
            icon="analytics"
            label="Comissão Média"
            value={formatPrice(data.stats.averageCommissionPerOrder)}
            color="slate"
          />
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 flex justify-between items-center">
          <div>
            <p className="text-slate-400 text-[10px] font-bold uppercase">
              Créditos Plataforma
            </p>
            <p className="text-xl font-bold text-slate-900">
              {formatPrice(data.stats.platformCredits)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-slate-400 text-[10px] font-bold uppercase">
              Créditos Vendedores
            </p>
            <p className="text-xl font-bold text-indigo-600">
              {formatPrice(data.stats.sellersCredits)}
            </p>
          </div>
        </div>
      </>
    )}

    {activeTab === "distribution" && (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          icon="person"
          label="Transações Vendedores"
          value={data.distribution.sellerTransactionsCount.toString()}
          color="primary"
        />
        <StatCard
          icon="hub"
          label="Transações Plataforma"
          value={data.distribution.platformTransactionsCount.toString()}
          color="info"
        />
        <StatCard
          icon="keyboard_return"
          label="Reembolsos"
          value={data.distribution.refundTransactionsCount.toString()}
          color="danger"
        />
      </div>
    )}

    {activeTab === "alerts" && (
      <div className="bg-rose-50 p-6 rounded-2xl border border-rose-100 flex items-center gap-4">
        <span className="material-symbols-outlined text-rose-600">warning</span>
        <div>
          <p className="text-rose-900 font-bold text-sm">Alertas de Balanço</p>
          <p className="text-rose-700 text-xs">
            {data.alerts.negativeWallets} Carteiras Negativas |{" "}
            {data.alerts.inconsistentBalances} Inconsistências Detectadas
          </p>
        </div>
      </div>
    )}
  </motion.div>
);

export default TransactionsGrid;
