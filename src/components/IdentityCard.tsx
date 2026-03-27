import React, { useState } from "react";
import { formatDateFriendly } from "@/utils/date";
import IdentityReviewModal from "./IdentityReviewModal";
import {
  getIdentityStatusLabel,
  getIdentityStatusColor,
} from "@/utils/mappers/identity-verification.mappers";
import { BASE_UPLOAD_URL } from "@/api/endpoints";

const IdentityCard = ({ data, onRefresh }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isPending = data.status === "PENDING";

  return (
    <>
      <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:border-[#6C3EF8]/20 transition-all group">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <img
              src={
                data.selfieUrl 
                  ? BASE_UPLOAD_URL + data.selfieUrl 
                  : `https://ui-avatars.com/api/?name=${encodeURIComponent(data.user.fullName)}&background=6C3EF8&color=fff`
              }
              className="size-14 rounded-2xl object-cover border-2 border-slate-50 shadow-sm"
              alt="Selfie"
            />
            {data.status === "APPROVED" && (
              <div className="absolute -bottom-1 -right-1 size-5 bg-white rounded-full flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-[12px] text-emerald-500 font-bold">
                  verified
                </span>
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-slate-900 truncate text-sm">
              {data.user.fullName}
            </h4>
            <span className={`text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${getIdentityStatusColor(data.status)}`}>
              {getIdentityStatusLabel(data.status)}
            </span>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <span>Enviado em</span>
            <span className="text-slate-600 bg-slate-50 px-2 py-0.5 rounded-md font-mono">
              {formatDateFriendly(data.createdAt)}
            </span>
          </div>

          {data.rejectionReason && data.status === "REJECTED" && (
            <div className="mt-2 p-3 bg-rose-50/50 rounded-xl border border-rose-100">
              <p className="text-[9px] font-bold text-rose-400 uppercase mb-1">Motivo da Rejeição</p>
              <p className="text-[11px] text-rose-700 italic line-clamp-2 leading-relaxed">
                "{data.rejectionReason}"
              </p>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className={`w-full py-3 rounded-xl font-bold text-[10px] transition-all uppercase tracking-[0.15em] active:scale-[0.98] ${
            isPending 
              ? "bg-[#6C3EF8] text-white shadow-md shadow-[#6C3EF8]/20 hover:bg-[#5a32d1]" 
              : "bg-slate-50 text-slate-500 hover:bg-slate-100"
          }`}
        >
          {isPending ? "Analisar Documentos" : "Visualizar Detalhes"}
        </button>
      </div>

      <IdentityReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={data}
        onSuccess={onRefresh}
      />
    </>
  );
};

export default IdentityCard;