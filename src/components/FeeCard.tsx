import React from "react";
import { Fee } from "@/dtos/fee.dtos";
import { FeeType } from "@/enums/fee-type.enum";
import { getFeeTypeColor, getFeeTypeLabel } from "@/utils/mappers/fee.mapper";

interface FeeCardProps {
  fee: Fee;
  onToggle: (id: string) => void;
  onEdit: (fee: Fee) => void;
}

const FeeCard: React.FC<FeeCardProps> = ({ fee, onToggle, onEdit }) => {
  return (
    <div className="bg-white p-5 rounded-[1.5rem] border border-slate-100 hover:border-[#6C3EF8]/20 transition-all group">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`size-11 rounded-full flex items-center justify-center border shadow-sm transition-colors ${getFeeTypeColor(fee.type)}`}
          >
            <span className="material-symbols-outlined text-xl">
              {fee.type === FeeType.SERVICE_FEE
                ? "settings_input_component"
                : "payments"}
            </span>
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 leading-tight">
              {getFeeTypeLabel(fee.type)}
            </h4>
            <span
              className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter ${
                fee.active
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-slate-100 text-slate-400"
              }`}
            >
              {fee.active ? "Ativa" : "Inativa"}
            </span>
          </div>
        </div>

        <button
          onClick={() => onToggle(fee.id)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
            fee.active ? "bg-[#6C3EF8]" : "bg-slate-200"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              fee.active ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase mb-0.5 tracking-tight">
            Valor Atual
          </p>
          <p className="text-lg font-black text-[#0F172A] leading-none">
            {fee.value}%
          </p>
        </div>

        <button
          onClick={() => onEdit(fee)}
          className="size-8 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-[#6C3EF8] hover:text-white transition-all active:scale-90"
        >
          <span className="material-symbols-outlined text-sm">edit</span>
        </button>
      </div>
    </div>
  );
};

export default FeeCard;
