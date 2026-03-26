import React, { useState } from "react";
import { DisputeDto, DisputeStatus } from "@/dtos/disputes";
import { getDisputeStatusLabel } from "@/utils/mappers/dispute.mapper";
import { disputeService } from "@/services/dispute.service";
import TralloInput from "@/components/TralloInput";
import TralloButton from "@/components/TralloButton";

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
  const [response, setResponse] = useState(dispute.response || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await disputeService.respondDispute(dispute.id, {
        message: response,
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

  const statusOptions = Object.values(DisputeStatus).map((s) => ({
    label: getDisputeStatusLabel(s),
    value: s,
  }));

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
            <TralloInput
              label="Alterar Estado"
              isSelect
              options={statusOptions}
              value={status}
              onChange={(val) => setStatus(val as DisputeStatus)}
            />

            <TralloInput
              label="Sua Resposta"
              multiline
              rows={4}
              placeholder="Descreva a resolução ou o motivo da análise..."
              value={response}
              onChange={setResponse}
            />

            <div className="flex gap-3 pt-2">
              <TralloButton
                variant="secondary"
                className="flex-1"
                onClick={onClose}
              >
                Cancelar
              </TralloButton>
              <TralloButton
                type="submit"
                className="flex-[1.5]"
                isLoading={isSubmitting}
              >
                Salvar Alterações
              </TralloButton>
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
