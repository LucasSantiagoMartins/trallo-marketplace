import React, { useState } from "react";
import { DisputeDto, DisputeStatus } from "@/dtos/disputes";
import { getDisputeStatusLabel } from "@/utils/mappers/dispute.mapper";
import { disputeService } from "@/services/dispute.service";

interface DisputeResponseModalProps {
  isOpen: boolean;
  onClose: () => void;
  dispute: DisputeDto;
  onSuccess: () => void;
}

const DisputeResponseModal: React.FC<DisputeResponseModalProps> = ({
  isOpen,
  onClose,
  dispute,
  onSuccess,
}) => {
  const [status, setStatus] = useState<DisputeStatus>(dispute.status);
  const [response, setResponse] = useState(dispute.adminResponse || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await disputeService.respondDispute(dispute.id, {
        response: response,
        action: status,
      });
      if (result.success) {
        onSuccess();
        onClose();
      }
    } catch (error) {
      console.error("Erro ao responder disputa:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div
        className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-8 pt-8 pb-6">
          <header className="flex justify-between items-start mb-6">
            <div>
              <p className="text-[#6C3EF8] font-bold text-[10px] tracking-[0.2em] mb-1 uppercase">
                Ações Administrativas
              </p>
              <h2 className="text-2xl font-semibold text-[#0F172A]">
                Responder Disputa
              </h2>
            </div>
            <button
              onClick={onClose}
              className="size-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">
                Alterar Estado
              </label>
              <div className="relative">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as DisputeStatus)}
                  className="w-full bg-slate-50 border-none rounded-2xl py-4 px-4 text-sm font-semibold text-slate-700 appearance-none focus:ring-2 focus:ring-[#6C3EF8]/20 transition-all outline-none"
                >
                  {Object.values(DisputeStatus).map((s) => (
                    <option key={s} value={s}>
                      {getDisputeStatusLabel(s)}
                    </option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  unfold_more
                </span>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">
                Sua Resposta
              </label>
              <textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="Descreva a resolução ou o motivo da análise..."
                rows={4}
                className="w-full bg-slate-50 border-none rounded-2xl py-4 px-4 text-sm font-medium text-slate-700 focus:ring-2 focus:ring-[#6C3EF8]/20 transition-all outline-none resize-none"
                required
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-4 px-6 rounded-2xl text-sm font-bold text-slate-400 hover:bg-slate-50 transition-all"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-[1.5] py-4 px-6 rounded-2xl bg-[#6C3EF8] text-white text-sm font-bold shadow-[0_10px_20px_-5px_rgba(108,62,248,0.4)] hover:shadow-[0_15px_25px_-5px_rgba(108,62,248,0.5)] active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none"
              >
                {isSubmitting ? "Enviando..." : "Salvar Alterações"}
              </button>
            </div>
          </form>
        </div>

        <div className="bg-slate-50 px-8 py-4">
          <p className="text-[10px] text-slate-400 font-medium italic text-center">
            Esta ação notificará o usuário e atualizará o status do pedido #
            {dispute.orderId.substring(0, 8)}.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DisputeResponseModal;
