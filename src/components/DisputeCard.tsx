import React, { useState } from "react";
import {
  getDisputeStatusLabel,
  getDisputeStatusColor,
  getDisputeReasonLabel,
} from "@/utils/mappers/dispute.mapper";
import { formatDateFriendly } from "@/utils/date";
import { DisputeDto } from "@/dtos/disputes";
import DisputeResponseModal from "./DisputeResponseModal";
import DisputeDetailsModal from "./DisputeDetailsModal";

interface DisputeCardProps {
  dispute: DisputeDto;
  onSuccess: () => void;
}

const DisputeCard: React.FC<DisputeCardProps> = ({ dispute, onSuccess }) => {
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white p-5 rounded-[1.5rem] border border-slate-100 hover:border-[#6C3EF8]/20 transition-all group shadow-sm">
        <div className="flex items-center justify-between mb-4 gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="size-11 shrink-0 rounded-full bg-slate-100 flex items-center justify-center border border-slate-100 text-[#6C3EF8] font-bold text-xs">
              {dispute.user.fullName.substring(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-slate-900 truncate">
                {dispute.user.fullName}
              </h4>
              <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                Pedido: #{dispute.orderId.substring(0, 8)}
              </p>
            </div>
          </div>
          <div
            className={`shrink-0 text-[9px] font-black px-2.5 py-1 rounded-full uppercase ${getDisputeStatusColor(dispute.status)}`}
          >
            {getDisputeStatusLabel(dispute.status)}
          </div>
        </div>

        <div className="mb-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
            Motivo
          </p>
          <p className="text-sm text-slate-700 font-medium line-clamp-1">
            {getDisputeReasonLabel(dispute.reason)}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
          <span className="text-[10px] font-bold text-slate-400">
            {formatDateFriendly(dispute.createdAt)}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setIsDetailsModalOpen(true)}
              className="size-8 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-slate-100 transition-all"
            >
              <span className="material-symbols-outlined text-sm">
                visibility
              </span>
            </button>
            <button
              onClick={() => setIsResponseModalOpen(true)}
              className="size-8 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-[#6C3EF8] hover:text-white transition-all active:scale-90"
            >
              <span className="material-symbols-outlined text-sm">reply</span>
            </button>
          </div>
        </div>
      </div>

      <DisputeDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        dispute={dispute}
      />

      <DisputeResponseModal
        isOpen={isResponseModalOpen}
        onClose={() => setIsResponseModalOpen(false)}
        dispute={dispute}
        onSuccess={onSuccess}
      />
    </>
  );
};

export default DisputeCard;
