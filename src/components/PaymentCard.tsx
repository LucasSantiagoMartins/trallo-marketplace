import React from "react";

interface PaymentCardProps {
  id: string;
  receiver: string; // Beneficiário (quem recebe o dinheiro)
  amount: string;
  date: string;
  status: "Concluído" | "Falhou" | "Processando" | "Agendado";
  image: string;
}

const PaymentCard: React.FC<PaymentCardProps> = ({
  receiver,
  amount,
  date,
  status,
  image,
}) => {
  const statusColors = {
    Concluído: "text-emerald-500 bg-emerald-50",
    Falhou: "text-rose-500 bg-rose-50",
    Processando: "text-blue-500 bg-blue-50",
    Agendado: "text-slate-500 bg-slate-100",
  };

  return (
    <div className="bg-white p-5 rounded-[1.5rem] border border-slate-100 hover:border-[#6C3EF8]/20 transition-all group">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={image}
            alt=""
            className="size-11 rounded-full object-cover border border-slate-100 shadow-sm"
          />
          <div>
            <h4 className="text-sm font-bold text-slate-900 line-clamp-1">
              {receiver}
            </h4>
            <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
              {date}
            </p>
          </div>
        </div>
        <div
          className={`text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-tighter ${statusColors[status]}`}
        >
          {status}
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase mb-0.5 tracking-tight">
            Valor Liquidado
          </p>
          <p className="text-lg font-black text-[#0F172A] leading-none">
            {amount}{" "}
            <span className="text-xs font-medium text-slate-400">AOA</span>
          </p>
        </div>

        <div className="flex gap-2">
          {/* Botão de Detalhes */}
          <button className="size-8 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 group-hover:bg-[#6C3EF8] group-hover:text-white transition-all">
            <span className="material-symbols-outlined text-sm">
              visibility
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
