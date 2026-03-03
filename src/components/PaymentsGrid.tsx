import React from "react";
import { motion } from "framer-motion";
import StatCard from "./StatCard";
import { PaymentMetricsResponse } from "@/dtos/admin-metrics.dto";

interface Props {
  activeTab: string;
  data: PaymentMetricsResponse;
  formatKz: (v: number) => string;
}

const PaymentsGrid: React.FC<Props> = ({ activeTab, data, formatKz }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
    {activeTab === "stats" && (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon="payments" label="Total Confirmado" value={formatKz(data.stats.totalConfirmedAmount)} color="success" />
        <StatCard icon="hourglass_empty" label="Em Processamento" value={formatKz(data.stats.totalProcessingAmount)} color="warning" />
        <StatCard icon="sync_problem" label="Taxa de Sucesso" value={`${data.stats.successRate}%`} color="primary" />
        <StatCard icon="cancel" label="Total Falhas" value={formatKz(data.stats.totalFailedAmount)} color="danger" />
      </div>
    )}

    {activeTab === "performance" && (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard icon="calendar_today" label="Confirmado Hoje" value={formatKz(data.performance.confirmedToday)} color="info" />
        <StatCard icon="trending_up" label="Crescimento Mês" value={`+${data.performance.growthVsLastMonth}%`} color="success" />
        <StatCard icon="show_chart" label="Crescimento Ano" value={`+${data.performance.growthVsLastYear}%`} color="primary" />
      </div>
    )}

    {activeTab === "alerts" && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={`p-6 rounded-2xl border ${data.alerts.highFailureRate ? "bg-rose-50 border-rose-100" : "bg-emerald-50 border-emerald-100"}`}>
          <p className="font-bold text-slate-900">Taxa de Falha Crítica</p>
          <p className={data.alerts.highFailureRate ? "text-rose-600" : "text-emerald-600"}>
            {data.alerts.highFailureRate ? "Alerta: Taxa de falhas acima do normal!" : "Sistema operando com estabilidade."}
          </p>
        </div>
        <StatCard icon="emergency" label="Pagamentos Presos" value={data.alerts.stuckProcessingPayments.toString()} color="warning" />
      </div>
    )}
  </motion.div>
);

export default PaymentsGrid;