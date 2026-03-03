import React from "react";
import { useNavigate } from "react-router-dom";

interface OperationalFooterProps {
  loading: boolean;
  inconsistentCount?: number;
  onAddOperator?: () => void; // Opcional, caso queira customizar o comportamento
}

const OperationalFooter: React.FC<OperationalFooterProps> = ({ 
  loading, 
  inconsistentCount,
  onAddOperator 
}) => {
  const navigate = useNavigate();

  // Função para lidar com o clique
  const handleAddClick = () => {
    if (onAddOperator) {
      onAddOperator();
    } else {
      // Rota padrão definida no seu App.tsx
      navigate("/area-administrativa/adicionar-operador");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
      {/* Seção de Resumo */}
      <section className="lg:col-span-2 bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-sm uppercase tracking-widest text-slate-400">
            Resumo Operacional
          </h3>
          <span
            className={`text-[10px] px-3 py-1 rounded-full font-black transition-colors duration-300 ${
              inconsistentCount && inconsistentCount > 0 
                ? "bg-red-100 text-red-600" 
                : "bg-blue-100 text-blue-600"
            }`}
          >
            {loading
              ? "A VERIFICAR..."
              : `TRANSAÇÕES INCONSISTENTES: ${inconsistentCount ?? 0}`}
          </span>
        </div>
        <p className="text-slate-400 text-xs italic">
          O sistema está monitorando as métricas de LTV e Churn em tempo real.
        </p>
      </section>

      {/* Seção de Ação: Adicionar Operador */}
      <div className="p-7 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm flex flex-col gap-5">
        <div>
          <p className="font-bold text-slate-800 text-lg leading-tight tracking-tight">Equipe</p>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">
            Gestão de Operadores
          </p>
        </div>
        
        <button
          onClick={handleAddClick}
          className="flex-1 min-h-[100px] border-2 border-dashed border-slate-200 rounded-[1.5rem] flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300 group"
        >
          <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">
            person_add
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest">
            Novo Operador
          </span>
        </button>
      </div>
    </div>
  );
};

export default OperationalFooter;