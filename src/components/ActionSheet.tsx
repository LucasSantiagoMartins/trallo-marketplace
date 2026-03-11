import React from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center px-0 sm:px-4 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 200,
              duration: 0.3,
            }}
            className="relative bg-white dark:bg-[#1E1A1A] w-full max-w-lg rounded-t-[32px] sm:rounded-[32px] p-6 sm:p-8 border border-white/5 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black tracking-tight">{title}</h3>
              <button
                onClick={onClose}
                className="size-10 flex items-center justify-center bg-gray-100 dark:bg-white/5 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* CONTEÚDO: IDIOMA */}
            {type === "language" && (
              <div className="flex flex-col gap-2">
                {data.languages.map((lang: string) => (
                  <button
                    key={lang}
                    onClick={() => onAction?.(lang)}
                    className={`flex items-center justify-between p-4 rounded-2xl transition-all ${
                      data.selectedLanguage === lang
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-gray-50 dark:hover:bg-white/5"
                    }`}
                  >
                    <span className="font-bold">{lang}</span>
                    {data.selectedLanguage === lang && (
                      <span className="material-symbols-outlined">
                        check_circle
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* CONTEÚDO: CONFIGURAÇÃO 2FA */}
            {type === "2fa" && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between p-5 bg-gray-50 dark:bg-white/5 rounded-[24px] border border-black/5 dark:border-white/5">
                  <div>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                      Adicione uma camada extra de proteção para saques e
                      alterações de conta.
                    </p>
                  </div>
                  <div
                    className="shrink-0 relative cursor-pointer"
                    onClick={() => data.setIs2FAEnabled(!data.is2FAEnabled)}
                  >
                    <div
                      className={`w-10 sm:w-12 h-6 sm:h-7 rounded-full transition-colors shadow-inner ${data.is2FAEnabled ? "bg-primary" : "bg-gray-200 dark:bg-gray-700"}`}
                    />
                    <div
                      className={`absolute top-[3px] sm:top-[4px] left-[4px] bg-white rounded-full h-[18px] sm:h-[20px] w-[18px] sm:w-[20px] transition-all shadow-md ${data.is2FAEnabled ? "translate-x-4 sm:translate-x-5" : "translate-x-0"}`}
                    />
                  </div>
                </div>

                <div
                  className={`grid grid-cols-2 gap-4 transition-all duration-500 ${!data.is2FAEnabled ? "opacity-30 pointer-events-none grayscale" : ""}`}
                >
                  <button
                    onClick={() => data.setTempTwoFAMethod("sms")}
                    className={`flex flex-col items-center gap-3 p-6 rounded-[28px] border-2 transition-all relative ${data.tempTwoFAMethod === "sms" ? "border-primary bg-primary/5 text-primary shadow-lg shadow-primary/10" : "border-transparent bg-gray-50 dark:bg-white/5 text-gray-400"}`}
                  >
                    {data.tempTwoFAMethod === "sms" && (
                      <span className="material-symbols-outlined absolute top-3 right-3 text-lg">
                        check_circle
                      </span>
                    )}
                    <span className="material-symbols-outlined text-4xl">
                      sms
                    </span>
                    <span className="text-[11px] font-black uppercase tracking-wider">
                      Via SMS
                    </span>
                  </button>

                  <button
                    onClick={() => data.setTempTwoFAMethod("email")}
                    className={`flex flex-col items-center gap-3 p-6 rounded-[28px] border-2 transition-all relative ${data.tempTwoFAMethod === "email" ? "border-primary bg-primary/5 text-primary shadow-lg shadow-primary/10" : "border-transparent bg-gray-50 dark:bg-white/5 text-gray-400"}`}
                  >
                    {data.tempTwoFAMethod === "email" && (
                      <span className="material-symbols-outlined absolute top-3 right-3 text-lg">
                        check_circle
                      </span>
                    )}
                    <span className="material-symbols-outlined text-4xl">
                      mail
                    </span>
                    <span className="text-[11px] font-black uppercase tracking-wider">
                      Via E-mail
                    </span>
                  </button>
                </div>

                <button
                  onClick={() => onAction?.(null)}
                  disabled={!data.is2FAEnabled}
                  className="w-full h-14 bg-primary text-white rounded-2xl font-bold transition-all active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-primary/20"
                >
                  Salvar Configurações
                </button>
              </div>
            )}

            {/* CONTEÚDO: TRAVA DE SEGURANÇA (PARA SAQUES/AÇÕES CRÍTICAS) */}
            {type === "security-lock" && (
              <div className="flex flex-col gap-6">
                <div className="text-center space-y-3">
                  <div className="size-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto transition-transform hover:scale-110">
                    <span className="material-symbols-outlined text-3xl">
                      {data.method === "sms"
                        ? "phonelink_lock"
                        : "mark_email_read"}
                    </span>
                  </div>
                  <div className="space-y-1 px-4">
                    <p className="font-bold text-lg tracking-tight">
                      Confirme sua identidade
                    </p>
                    <p className="text-sm text-[#866565] dark:text-gray-400 leading-relaxed">
                      Esta é uma ação crítica para sua segurança (saques ou
                      dados sensíveis). Insira o código enviado para o seu
                      <strong className="text-primary font-bold">
                        {" "}
                        {data.method === "sms" ? "telemóvel" : "e-mail"}
                      </strong>
                      .
                    </p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <input
                    type="text"
                    maxLength={6}
                    value={data.code}
                    onChange={(e) => data.setCode(e.target.value)}
                    placeholder="000000"
                    className="w-full h-16 text-center text-3xl font-black tracking-[0.5em] bg-gray-50 dark:bg-white/5 border-2 border-transparent focus:border-primary rounded-[20px] transition-all outline-none placeholder:opacity-20"
                  />
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => onAction?.(data.code)}
                    disabled={data.code?.length < 6 || data.isVerifying}
                    className="w-full h-14 bg-primary text-white rounded-2xl font-bold transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                  >
                    {data.isVerifying ? (
                      <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      "Confirmar Operação"
                    )}
                  </button>

                  <button className="w-full py-2 text-primary text-[11px] font-black uppercase tracking-wider hover:opacity-70 transition-opacity">
                    Não recebi o código? Reenviar
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ActionSheet;
