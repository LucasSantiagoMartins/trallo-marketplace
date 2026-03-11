import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export type TwoFactorMethod = "EMAIL" | "SMS";

interface ActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  type: "language" | "2fa" | "security-lock";
  data?: any;
  onAction?: (payload: any) => void;
}

const ActionSheet: React.FC<ActionSheetProps> = ({
  isOpen,
  onClose,
  title,
  type,
  data,
  onAction,
}) => {
  // Verifica se pelo menos um dos toggles está ativo
  const isAnySecurityEnabled = data?.secureLogin || data?.secureOperations;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center px-0 sm:px-4 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative bg-white dark:bg-[#1E1A1A] w-full max-w-lg rounded-t-[32px] sm:rounded-[32px] p-6 sm:p-8 border border-white/5 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black tracking-tight">{title}</h3>
              <button
                onClick={onClose}
                className="size-10 flex items-center justify-center bg-gray-100 dark:bg-white/5 rounded-full"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {type === "2fa" && (
              <div className="flex flex-col gap-4">
                {/* Toggle: Secure Login */}
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-[22px] border border-black/5 dark:border-white/5">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold">Login Seguro</span>
                    <p className="text-[10px] text-gray-500">
                      Exigir código ao entrar
                    </p>
                  </div>
                  <div
                    className="shrink-0 relative cursor-pointer"
                    onClick={() => data.setSecureLogin(!data.secureLogin)}
                  >
                    <div
                      className={`w-10 h-6 rounded-full transition-colors ${data.secureLogin ? "bg-primary" : "bg-gray-200 dark:bg-gray-700"}`}
                    />
                    <div
                      className={`absolute top-[3px] left-[4px] bg-white rounded-full h-[18px] w-[18px] transition-all ${data.secureLogin ? "translate-x-4" : "translate-x-0"}`}
                    />
                  </div>
                </div>

                {/* Toggle: Secure Operations */}
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-[22px] border border-black/5 dark:border-white/5">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold">Operações Seguras</span>
                    <p className="text-[10px] text-gray-500">
                      Exigir código para saques
                    </p>
                  </div>
                  <div
                    className="shrink-0 relative cursor-pointer"
                    onClick={() =>
                      data.setSecureOperations(!data.secureOperations)
                    }
                  >
                    <div
                      className={`w-10 h-6 rounded-full transition-colors ${data.secureOperations ? "bg-primary" : "bg-gray-200 dark:bg-gray-700"}`}
                    />
                    <div
                      className={`absolute top-[3px] left-[4px] bg-white rounded-full h-[18px] w-[18px] transition-all ${data.secureOperations ? "translate-x-4" : "translate-x-0"}`}
                    />
                  </div>
                </div>

                {/* Cards de Método - Desabilitados se nada estiver ativo */}
                <div
                  className={`grid grid-cols-2 gap-4 mt-2 transition-opacity duration-300 ${!isAnySecurityEnabled ? "opacity-40 pointer-events-none" : "opacity-100"}`}
                >
                  <button
                    onClick={() => data.setTempTwoFAMethod("SMS")}
                    className={`flex flex-col items-center gap-3 p-5 rounded-[28px] border-2 transition-all relative ${data.tempTwoFAMethod === "SMS" ? "border-primary bg-primary/5 text-primary shadow-lg" : "border-transparent bg-gray-50 dark:bg-white/5 text-gray-400"}`}
                  >
                    {data.tempTwoFAMethod === "SMS" && (
                      <span className="material-symbols-outlined absolute top-3 right-3 text-lg">
                        check_circle
                      </span>
                    )}
                    <span className="material-symbols-outlined text-3xl">
                      sms
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-wider">
                      SMS
                    </span>
                  </button>

                  <button
                    onClick={() => data.setTempTwoFAMethod("EMAIL")}
                    className={`flex flex-col items-center gap-3 p-5 rounded-[28px] border-2 transition-all relative ${data.tempTwoFAMethod === "EMAIL" ? "border-primary bg-primary/5 text-primary shadow-lg" : "border-transparent bg-gray-50 dark:bg-white/5 text-gray-400"}`}
                  >
                    {data.tempTwoFAMethod === "EMAIL" && (
                      <span className="material-symbols-outlined absolute top-3 right-3 text-lg">
                        check_circle
                      </span>
                    )}
                    <span className="material-symbols-outlined text-3xl">
                      mail
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-wider">
                      E-mail
                    </span>
                  </button>
                </div>

                <button
                  onClick={() =>
                    onAction?.({
                      secureLogin: data.secureLogin,
                      secureOperations: data.secureOperations,
                      twoFactorMethod: data.tempTwoFAMethod,
                    })
                  }
                  disabled={data.isUpdating || !isAnySecurityEnabled}
                  className="w-full h-14 bg-primary text-white rounded-2xl font-bold transition-all active:scale-[0.98] mt-4 shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:active:scale-100 disabled:cursor-not-allowed"
                >
                  {data.isUpdating ? (
                    <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    "Salvar Configurações"
                  )}
                </button>
              </div>
            )}

            {type === "language" && (
              <div className="flex flex-col gap-2">
                {data?.languages.map((lang: string) => (
                  <button
                    key={lang}
                    onClick={() => onAction?.(lang)}
                    className={`w-full p-4 rounded-2xl text-left font-bold transition-all flex justify-between items-center ${data.selectedLanguage === lang ? "bg-primary text-white shadow-md" : "hover:bg-gray-100 dark:hover:bg-white/5 text-gray-600 dark:text-gray-300"}`}
                  >
                    {lang}
                    {data.selectedLanguage === lang && (
                      <span className="material-symbols-outlined text-lg">
                        check
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ActionSheet;
