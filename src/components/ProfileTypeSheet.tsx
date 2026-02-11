import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProfileOption {
  id: string;
  label: string;
  icon: string;
  desc: string;
}

interface ProfileTypeSheetProps {
  isOpen: boolean;
  onClose: () => void;
  currentType: string;
  onSelect: (label: string) => void;
  options: ProfileOption[];
}

const ProfileTypeSheet = ({
  isOpen,
  onClose,
  currentType,
  onSelect,
  options,
}: ProfileTypeSheetProps) => {
  const [tempSelected, setTempSelected] = useState(currentType);

  useEffect(() => {
    if (isOpen) setTempSelected(currentType);
  }, [isOpen, currentType]);

  const handleConfirm = () => {
    onSelect(tempSelected);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.y > 150 || info.velocity.y > 500) {
                onClose();
              }
            }}
            className="relative w-full sm:max-w-md bg-white dark:bg-[#1c182d] rounded-t-[2.5rem] sm:rounded-[2.5rem] p-8 shadow-2xl touch-none"
          >
            <button
              onClick={onClose}
              className="absolute right-6 top-6 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="w-12 h-1.5 bg-slate-200 dark:bg-white/10 rounded-full mx-auto mb-6 sm:hidden" />

            <h3 className="clash-display text-xl font-semibold mb-6 text-center dark:text-white">
              Selecione o Tipo de Perfil
            </h3>

            <div className="space-y-3 overflow-y-auto max-h-[60vh]">
              {options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setTempSelected(option.label)}
                  className={`w-full flex items-start gap-4 p-4 rounded-2xl border transition-all ${
                    tempSelected === option.label
                      ? "border-primary bg-primary/5 dark:bg-primary/10"
                      : "border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5"
                  }`}
                >
                  <div
                    className={`p-2 rounded-xl ${
                      tempSelected === option.label
                        ? "bg-primary text-white"
                        : "bg-slate-100 dark:bg-white/5 text-slate-400"
                    }`}
                  >
                    <span className="material-symbols-outlined text-2xl">
                      {option.icon}
                    </span>
                  </div>
                  <div className="text-left">
                    <p
                      className={`font-bold text-sm ${
                        tempSelected === option.label
                          ? "text-primary"
                          : "text-slate-700 dark:text-slate-200"
                      }`}
                    >
                      {option.label}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                      {option.desc}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-3 mt-8">
              <button
                onClick={handleConfirm}
                className="w-full py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity"
              >
                Confirmar Seleção
              </button>

            
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProfileTypeSheet;
