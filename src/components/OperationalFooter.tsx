import React from "react";
import { Link, useNavigate } from "react-router-dom";

interface OperationalFooterProps {
  loading: boolean;
  inconsistentCount?: number;
  onAddOperator?: () => void;
}

const OperationalFooter: React.FC<OperationalFooterProps> = ({
  loading,
  inconsistentCount = 0,
  onAddOperator,
}) => {
  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate("/area-administrativa/adicionar-operador");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 w-full mb-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
        {/* Seção de Resumo Operacional */}
        <section className="lg:col-span-2 bg-white/70 backdrop-blur-md p-8 rounded-[2rem] border border-slate-200/60 shadow-sm flex flex-col justify-between group hover:shadow-md transition-all duration-500">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-100 rounded-lg text-slate-500">
                <span className="material-symbols-outlined text-xl block">
                  monitoring
                </span>
              </div>
              <h3 className="font-bold text-[11px] uppercase tracking-[0.15em] text-slate-400">
                Resumo Operacional
              </h3>
            </div>

            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-500 ${
                inconsistentCount > 0
                  ? "bg-rose-50 border-rose-100 text-rose-600 shadow-sm shadow-rose-100"
                  : "bg-emerald-50 border-emerald-100 text-emerald-600"
              }`}
            >
              <span
                className={`material-symbols-outlined text-lg ${inconsistentCount > 0 ? "animate-pulse" : ""}`}
              >
                {inconsistentCount > 0 ? "report" : "check_circle"}
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider">
                {loading
                  ? "Sincronizando..."
                  : `Inconsistências: ${inconsistentCount}`}
              </span>
            </div>
          </div>

          <div className="bg-slate-50/50 p-4 rounded-2xl border border-dashed border-slate-200">
            <p className="text-slate-500 text-[11px] leading-relaxed flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-indigo-500">
                info
              </span>
              O motor de IA está monitorando as métricas de{" "}
              <span className="font-bold text-slate-700">LTV</span> e{" "}
              <span className="font-bold text-slate-700">Churn</span> em tempo
              real para prevenção de perdas.
            </p>
          </div>
        </section>

        {/* Seção de Gestão de Equipe */}
        <div className="p-8 bg-white/70 backdrop-blur-md border border-slate-200/60 rounded-[2rem] shadow-sm flex flex-col gap-6 hover:shadow-md transition-all duration-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-slate-800 text-lg tracking-tight">
                Equipe
              </p>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-[0.1em]">
                Gestão de Acessos
              </p>
            </div>
            <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
              <span className="material-symbols-outlined text-xl">group</span>
            </div>
          </div>

          <button
            onClick={handleAddClick}
            className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center gap-3 text-slate-500 hover:border-[#6C3EF8] hover:text-[#6C3EF8] hover:bg-[#6C3EF8]/5 transition-all duration-300 group"
          >
            <span className="material-symbols-outlined text-xl group-hover:rotate-90 transition-transform duration-500">
              person_add
            </span>
            <span className="text-xs font-bold uppercase tracking-wider">
              Novo Operador
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OperationalFooter;
