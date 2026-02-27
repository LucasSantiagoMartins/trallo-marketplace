import React from "react";
import { motion } from "framer-motion";

interface ConfirmActionModalProps {
  isOpen: boolean;
  type: "single" | "all" | null;
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmActionModal: React.FC<ConfirmActionModalProps> = ({
  isOpen,
  type,
  onConfirm,
  onClose,
}) => {
  if (!isOpen || !type) return null;

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-[#1c182d] w-full max-w-md rounded-3xl p-6 text-center"
      >
        <h4 className="text-lg font-bold mb-6">
          {type === "all" ? "Limpar carrinho?" : "Remover item?"}
        </h4>
        <div className="flex flex-col gap-2">
          <button
            onClick={onConfirm}
            className="w-full py-3 text-white bg-red-500 rounded-xl font-bold"
          >
            Sim, confirmar
          </button>
          <button
            onClick={onClose}
            className="w-full py-3 text-gray-500 bg-gray-100 dark:bg-white/5 rounded-xl"
          >
            Cancelar
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmActionModal;
