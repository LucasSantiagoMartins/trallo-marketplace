import React from "react";
import { DisputeDto } from "@/dtos/disputes";
import {
  getDisputeStatusLabel,
  getDisputeStatusColor,
  getDisputeReasonLabel,
} from "@/utils/mappers/dispute.mapper";
import { formatDateFriendly } from "@/utils/date";
import TralloButton from "@/components/TralloButton";

interface DisputeDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  dispute: DisputeDto;
}

const DisputeDetailsModal: React.FC<DisputeDetailsModalProps> = ({
  isOpen,
  onClose,
  dispute,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div
        className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-8 pt-8 pb-8">
          <header className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-2xl font-semibold text-[#0F172A]">
                Detalhes da Reclamação
              </h2>
            </div>
            <button
              onClick={onClose}
              className="size-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </header>

          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                  Estado Atual
                </p>
                <span
                  className={`text-[11px] font-black px-3 py-1 rounded-full uppercase ${getDisputeStatusColor(dispute.status)}`}
                >
                  {getDisputeStatusLabel(dispute.status)}
                </span>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                  Data de Abertura
                </p>
                <p className="text-sm font-bold text-slate-700">
                  {formatDateFriendly(dispute.createdAt)}
                </p>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-1">
                Cliente
              </label>
              <div className="flex items-center gap-3 bg-white border border-slate-100 p-3 rounded-2xl">
                <div className="size-10 rounded-full bg-[#6C3EF8]/10 flex items-center justify-center text-[#6C3EF8] font-bold text-xs">
                  {dispute.user.fullName.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    {dispute.user.fullName}
                  </p>
                  <p className="text-xs text-slate-500">
                    {dispute.user.phoneNumber}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-1">
                Motivo e Descrição
              </label>
              <div className="bg-slate-50 rounded-2xl p-4">
                <p className="text-sm font-bold text-[#6C3EF8] mb-2">
                  {getDisputeReasonLabel(dispute.reason)}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {dispute.description ||
                    "Nenhuma descrição detalhada fornecida."}
                </p>
              </div>
            </div>

            {dispute.response && (
              <div>
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-1">
                  Resposta do Administrador
                </label>
                <div className="bg-green-50/50 border border-green-100 rounded-2xl p-4">
                  <p className="text-sm text-green-700 font-medium italic">
                    "{dispute.response}"
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisputeDetailsModal;
