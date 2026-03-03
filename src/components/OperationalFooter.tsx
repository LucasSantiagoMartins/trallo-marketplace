import React from "react";
import { Link } from "react-router-dom";

interface OperationalFooterProps {
  loading: boolean;
  inconsistentCount?: number;
}

const OperationalFooter: React.FC<OperationalFooterProps> = ({ loading, inconsistentCount }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
      <section className="lg:col-span-2 bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-sm uppercase tracking-widest text-slate-400">
            Resumo Operacional
          </h3>
          <span
            className={`text-[10px] px-3 py-1 rounded-full font-black ${
              inconsistentCount && inconsistentCount > 0 
                ? "bg-red-100 text-red-600" 
                : "bg-blue-100 text-blue-600"
            }`}
          >
            {loading
              ? "CHECKING..."
              : `TRANSAÇÕES INCONSISTENTES: ${inconsistentCount ?? 0}`}
          </span>
        </div>
        <p className="text-slate-400 text-xs italic">
          O sistema está monitorando as métricas de LTV e Churn em tempo real.
        </p>
      </section>

      <Link
        to="/admin/risk-report"
        className="p-7 bg-[#0F172A] text-white rounded-[2.5rem] hover:bg-[#1e293b] transition-all flex flex-col justify-between group"
      >
        <span className="material-symbols-outlined text-3xl group-hover:rotate-12 transition-transform">
          analytics
        </span>
        <div>
          <p className="font-bold text-lg leading-tight">Relatório de Risco</p>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">
            Análise de Sustentabilidade
          </p>
        </div>
      </Link>
    </div>
  );
};

export default OperationalFooter;