import React from "react";
import { motion } from "framer-motion";
import StatCard from "./StatCard";
import { PaymentMetricsResponse } from "@/dtos/admin-metrics.dto";
import { formatPrice } from "@/utils/currency";

interface Props {
  activeTab: string;
  data: PaymentMetricsResponse;
}

const PaymentsGrid: React.FC<Props> = ({ activeTab, data }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="space-y-6"
  >
    {activeTab === "stats" && (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon="payments"
          label="Total Confirmado"
          value={formatPrice(data.stats.totalConfirmedAmount)}
          color="success"
        />
        <StatCard
          icon="hourglass_empty"
          label="Em Processamento"
          value={formatPrice(data.stats.totalProcessingAmount)}
          color="warning"
        />
        <StatCard
          icon="sync_problem"
          label="Taxa de Sucesso"
          value={`${data.stats.successRate}%`}
          color="primary"
        />
        <StatCard
          icon="cancel"
          label="Total Falhas"
          value={formatPrice(data.stats.totalFailedAmount)}
          color="danger"
        />
      </div>
    )}

    {activeTab === "performance" && (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          icon="calendar_today"
          label="Confirmado Hoje"
          value={formatPrice(data.performance.confirmedToday)}
          color="info"
        />
        <StatCard
          icon="trending_up"
          label="Crescimento Mês"
          value={`+${data.performance.growthVsLastMonth}%`}
          color="success"
        />
        <StatCard
          icon="show_chart"
          label="Crescimento Ano"
          value={`+${data.performance.growthVsLastYear}%`}
          color="primary"
        />
      </div>
    )}

    {activeTab === "alerts" && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className={`flex items-start gap-4 p-6 rounded-2xl bg-white border transition-all ${
            data.alerts.highFailureRate
              ? "border-purple-100 shadow-sm"
              : "border-slate-100"
          }`}
        >
          <div
            className={`p-3 rounded-xl ${data.alerts.highFailureRate ? "bg-purple-50 text-purple-600" : "bg-[#6C3EF8]/10 text-[#6C3EF8]"}`}
          >
            <span className="material-symbols-outlined block">
              {data.alerts.highFailureRate ? "error" : "verified_user"}
            </span>
          </div>

          <div>
            <h3 className="font-bold text-slate-800 text-[20px] leading-tight mb-1">
              Taxa de Falha Crítica
            </h3>
            <p
              className={`text-sm font-medium ${data.alerts.highFailureRate ? "text-purple-600" : "text-[#6C3EF8]"}`}
            >
              {data.alerts.highFailureRate
                ? "Taxa de falhas acima do normal"
                : "Sistema operando com estabilidade."}
            </p>
          </div>
        </div>

        <StatCard
          icon="emergency"
          label="Pagamentos Presos"
          value={data.alerts.stuckProcessingPayments.toString()}
          color="warning"
        />
      </div>
    )}
  </motion.div>
);

export default PaymentsGrid;
