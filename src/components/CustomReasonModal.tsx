import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CustomReasonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

const CustomReasonModal: React.FC<CustomReasonModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [text, setText] = useState("");

  const handleConfirm = () => {
    if (text.trim()) {
      onConfirm(text);
      setText("");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="relative bg-white w-full max-w-[500px] rounded-[42px] p-8 shadow-2xl border border-slate-100 flex flex-col items-center"
          >
            {/* Botão de Fechar (X) */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>

            <div className="w-16 h-16 bg-[#6C3EF8]/5 rounded-2xl flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[#6C3EF8] text-3xl">
                edit_note
              </span>
            </div>

            <h3 className="text-xl font-bold text-[#0F172A] mb-1">
              Motivo Personalizado
            </h3>
            <p className="text-slate-500 text-xs mb-6 text-center">
              Descreva detalhadamente a razão da suspensão
            </p>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Digite aqui o motivo..."
              className="w-full h-32 p-5 bg-slate-50 border border-slate-100 rounded-[24px] text-sm outline-none focus:ring-2 focus:ring-[#6C3EF8]/20 transition-all resize-none mb-6 font-medium text-slate-600"
            />

            <div className="flex flex-col gap-2 w-full">
              <button
                disabled={!text.trim()}
                onClick={handleConfirm}
                className="w-full py-4 bg-[#6C3EF8] text-white rounded-2xl text-sm font-bold shadow-lg shadow-[#6C3EF8]/20 disabled:opacity-20 transition-all active:scale-[0.98]"
              >
                Confirmar Detalhes
              </button>
              <button
                onClick={onClose}
                className="w-full py-2 text-xs font-bold text-slate-400 hover:text-slate-600"
              >
                Voltar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CustomReasonModal;
