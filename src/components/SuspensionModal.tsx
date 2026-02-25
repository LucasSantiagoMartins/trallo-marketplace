import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SuspensionReason } from "@/constants/suspension-reasons";
import { UserResponseDTO } from "@/types/user";
import CustomReasonModal from "./CustomReasonModal";

interface SuspensionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  user: UserResponseDTO | null;
}

const REASONS = [
  { label: SuspensionReason.FRAUD, icon: "shield_person" },
  { label: SuspensionReason.ABUSE, icon: "forum" },
  { label: SuspensionReason.TERMS, icon: "gavel" },
  { label: SuspensionReason.REPORT, icon: "report" },
  { label: SuspensionReason.SPAM, icon: "mail_lock" },
  { label: "OUTRO", icon: "add_notes" },
];

const SuspensionModal: React.FC<SuspensionModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  user,
}) => {
  const [selectedReason, setSelectedReason] = useState("");
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

  const handleReasonClick = (reason: string) => {
    setSelectedReason(reason);
  };

  const handleConfirm = () => {
    if (selectedReason === "OUTRO") {
      setIsCustomModalOpen(true);
    } else if (selectedReason) {
      onConfirm(selectedReason);
      setSelectedReason("");
    }
  };

  const handleCustomConfirm = (customText: string) => {
    onConfirm(customText);
    setIsCustomModalOpen(false);
    setSelectedReason("");
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="relative bg-white w-full max-w-[500px] rounded-[42px] p-8 shadow-2xl border border-slate-100 flex flex-col items-center"
            >
              <button
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <span className="material-symbols-outlined text-2xl">
                  close
                </span>
              </button>

              <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-red-500 text-3xl">
                  block
                </span>
              </div>

              <h2 className="text-xl font-bold text-[#0F172A] mb-1">
                Suspender Conta
              </h2>
              <p className="text-slate-500 text-xs mb-6">
                Motivo para <span className="font-bold">{user?.fullName}</span>
              </p>

              <div className="grid grid-cols-2 gap-2 w-full mb-8">
                {REASONS.map((reason) => (
                  <button
                    key={reason.label}
                    onClick={() => handleReasonClick(reason.label)}
                    className={`flex items-center gap-3 p-3 rounded-2xl border-2 transition-all ${
                      selectedReason === reason.label
                        ? "border-[#6C3EF8] bg-[#6C3EF8]/5"
                        : "border-slate-50 bg-slate-50/50 hover:border-slate-200"
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-lg ${
                        selectedReason === reason.label
                          ? "text-[#6C3EF8]"
                          : "text-slate-400"
                      }`}
                    >
                      {reason.icon}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-tight ${
                        selectedReason === reason.label
                          ? "text-[#6C3EF8]"
                          : "text-slate-500"
                      }`}
                    >
                      {reason.label}
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-2 w-full">
                <button
                  disabled={!selectedReason}
                  onClick={handleConfirm}
                  className="w-full py-4 bg-[#6C3EF8] text-white rounded-2xl text-sm font-bold shadow-lg shadow-[#6C3EF8]/20 disabled:opacity-20 transition-all active:scale-[0.98]"
                >
                  {selectedReason === "OUTRO" ? "Escrever Motivo" : "Confirmar"}
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-2 text-xs font-bold text-slate-400 hover:text-slate-600"
                >
                  Cancelar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <CustomReasonModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
        onConfirm={handleCustomConfirm}
      />
    </>
  );
};

export default SuspensionModal;
