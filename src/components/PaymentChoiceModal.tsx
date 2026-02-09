import React from "react";
import { motion } from "framer-motion";

interface Props {
  onSelect: (type: "online" | "presencial") => void;
  onClose: () => void;
}

const PaymentChoiceModal: React.FC<Props> = ({ onSelect, onClose }) => {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-[#1c182d] w-full max-w-sm rounded-3xl p-6 shadow-2xl"
      >
        <h3 className="text-xl font-black mb-6 text-center">
          Tipo de Pagamento
        </h3>
        <div className="grid grid-cols-1 gap-3">
          <button
            onClick={() => onSelect("online")}
            className="flex items-center gap-4 p-4 rounded-2xl border-2 border-gray-100 dark:border-white/5 hover:border-[#6d3ff8] transition-all bg-gray-50 dark:bg-white/5"
          >
            <span className="material-symbols-outlined text-[#6d3ff8] text-3xl">
              language
            </span>
            <div className="text-left">
              <p className="font-bold">Pagamento Online</p>
              <p className="text-xs text-gray-500">
                MCX Express ou Transferência
              </p>
            </div>
          </button>
          <button
            onClick={() => onSelect("presencial")}
            className="flex items-center gap-4 p-4 rounded-2xl border-2 border-gray-100 dark:border-white/5 hover:border-[#6d3ff8] transition-all bg-gray-50 dark:bg-white/5"
          >
            <span className="material-symbols-outlined text-[#6d3ff8] text-3xl">
              handshake
            </span>
            <div className="text-left">
              <p className="font-bold">Pagamento Presencial</p>
              <p className="text-xs text-gray-500">Pague e levante no Trallo</p>
            </div>
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 py-3 rounded-2xl border-2 border-[#6d3ff8] text-[#6d3ff8] font-bold hover:bg-[#6d3ff8] hover:text-white transition-all"
        >
          Cancelar
        </button>
      </motion.div>
    </div>
  );
};

export default PaymentChoiceModal;
