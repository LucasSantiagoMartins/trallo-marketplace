import React, { useState } from "react";
import TralloButton from "@/components/TralloButton";
import TralloInput from "@/components/TralloInput";
import { useIdentityVerification } from "@/hooks/useIdentityVerification";
import { IdentityVerificationStatus } from "@/enums/identity-verification.enums";

const IdentityReviewModal = ({ isOpen, onClose, data, onSuccess }: any) => {
  const { reviewVerification, loading } = useIdentityVerification();
  const [reason, setReason] = useState("");

  if (!isOpen) return null;

  const handleAction = async (status:  "APPROVED" | "REJECTED") => {
    await reviewVerification(data.id, status, reason);
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95">
        <div className="p-8">
          <div className="flex justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">
              Revisão de KYC
            </h2>
            <button
              onClick={onClose}
              className="material-symbols-outlined text-slate-400"
            >
              close
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase text-slate-400">
                Frente
              </p>
              <img
                src={data.idFrontUrl}
                className="w-full aspect-[3/2] object-cover rounded-xl border"
                alt="Front"
              />
            </div>
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase text-slate-400">
                Verso
              </p>
              <img
                src={data.idBackUrl}
                className="w-full aspect-[3/2] object-cover rounded-xl border"
                alt="Back"
              />
            </div>
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase text-slate-400">
                Selfie
              </p>
              <img
                src={data.selfieUrl}
                className="w-full aspect-[3/2] object-cover rounded-xl border"
                alt="Selfie"
              />
            </div>
          </div>

          <TralloInput
            label="Motivo da Rejeição (Obrigatório para reprovar)"
            multiline
            rows={3}
            value={reason}
            onChange={setReason}
          />

          <div className="flex gap-4 mt-8">
            <TralloButton
              variant="outline"
              fullWidth
              className="!text-rose-500 !border-rose-200"
              onClick={() => handleAction("REJECTED")}
              isLoading={loading}
            >
              Reprovar
            </TralloButton>
            <TralloButton
              fullWidth
              onClick={() => handleAction("APPROVED")}
              isLoading={loading}
            >
              Aprovar Usuário
            </TralloButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdentityReviewModal;
