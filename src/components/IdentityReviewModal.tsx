import React, { useState } from "react";
import TralloButton from "@/components/TralloButton";
import TralloInput from "@/components/TralloInput";
import { useIdentityVerification } from "@/hooks/useIdentityVerification";
import { BASE_UPLOAD_URL } from "@/api/endpoints";

const IdentityReviewModal = ({ isOpen, onClose, data, onSuccess }: any) => {
  const { reviewVerification } = useIdentityVerification();
  const [reason, setReason] = useState(data.rejectionReason || "");
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  if (!isOpen) return null;

  const isPending = data.status === "PENDING";

  const handleAction = async (status: "APPROVED" | "REJECTED") => {
    if (status === "APPROVED") setIsApproving(true);
    else setIsRejecting(true);

    try {
      await reviewVerification(data.id, status, reason);
      onSuccess();
      onClose();
    } finally {
      setIsApproving(false);
      setIsRejecting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-[#6C3EF8] font-bold text-[10px] tracking-[0.2em] mb-1 uppercase">
                Verificação de Segurança
              </p>
              <h2 className="text-2xl font-bold text-slate-900">
                Análise de Identidade
              </h2>
            </div>
            <button
              onClick={onClose}
              className="size-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-slate-100 transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: "Frente", url: data.idFrontUrl },
              { label: "Verso", url: data.idBackUrl },
              { label: "Selfie", url: data.selfieUrl },
            ].map((img, idx) => (
              <div key={idx} className="space-y-2">
                <p className="text-[10px] font-black uppercase text-slate-400 ml-1">
                  {img.label}
                </p>
                <a
                  href={BASE_UPLOAD_URL + img.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block group relative"
                >
                  <img
                    src={BASE_UPLOAD_URL + img.url}
                    className="w-full aspect-[3/4] object-cover rounded-2xl border border-slate-100 group-hover:opacity-90 transition-opacity"
                    alt={img.label}
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded-2xl">
                    <span className="material-symbols-outlined text-white">
                      zoom_in
                    </span>
                  </div>
                </a>
              </div>
            ))}
          </div>

          {isPending ? (
            <>
              <TralloInput
                label="Motivo da Rejeição (Obrigatório para reprovar)"
                multiline
                rows={3}
                value={reason}
                onChange={setReason}
                placeholder="Ex: Foto da selfie está tremida ou documentos ilegíveis..."
              />

              <div className="flex gap-4 mt-8">
                <TralloButton
                  variant="outline"
                  fullWidth
                  className="!text-rose-500 !border-rose-200"
                  onClick={() => handleAction("REJECTED")}
                  isLoading={isRejecting}
                  disabled={isApproving}
                >
                  Reprovar
                </TralloButton>
                <TralloButton
                  fullWidth
                  onClick={() => handleAction("APPROVED")}
                  isLoading={isApproving}
                  disabled={isRejecting}
                >
                  Aprovar Usuário
                </TralloButton>
              </div>
            </>
          ) : (
            <div
              className={`p-4 rounded-2xl border flex items-center gap-3 ${
                data.status === "APPROVED"
                  ? "bg-emerald-50 border-emerald-100 text-emerald-700"
                  : "bg-rose-50 border-rose-100 text-rose-700"
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">
                {data.status === "APPROVED" ? "verified" : "block"}
              </span>
              <p className="text-[12px] font-bold uppercase tracking-wider">
                Esta solicitação já foi{" "}
                {data.status === "APPROVED" ? "Aprovada" : "Rejeitada"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IdentityReviewModal;
