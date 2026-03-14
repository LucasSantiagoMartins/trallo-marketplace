import React, { useState, useEffect, useRef } from "react";

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
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [animate, setAnimate] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchOffset, setTouchOffset] = useState(0);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      document.body.style.overflow = "hidden";
      setTimeout(() => setAnimate(true), 10);
    } else {
      setAnimate(false);
      document.body.style.overflow = "unset";
      const timer = setTimeout(() => {
        setShouldRender(false);
        setTouchOffset(0);
      }, 400);
      return () => clearTimeout(timer);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const currentTouch = e.targetTouches[0].clientY;
    const diff = currentTouch - touchStart;
    if (diff > 0) setTouchOffset(diff);
  };

  const handleTouchEnd = () => {
    if (touchOffset > 100) onClose();
    else setTouchOffset(0);
    setTouchStart(null);
  };

  if (!shouldRender) return null;

  const isAnySecurityEnabled = data?.secureLogin || data?.secureOperations;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center px-0 sm:px-4 overflow-hidden">
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          animate ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      <div
        ref={sheetRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: animate
            ? `translateY(${touchOffset}px)`
            : "translateY(100%)",
        }}
        className={`relative bg-white dark:bg-[#1E1A1A] w-full max-w-lg rounded-t-[32px] sm:rounded-[32px] px-6 pb-10 pt-4 border border-white/5 shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          !animate
            ? "sm:translate-y-12 sm:opacity-0 sm:scale-95"
            : "opacity-100"
        }`}
      >
        <div className="flex flex-col items-center mb-6">
          <div className="sm:hidden w-12 h-1.5 bg-gray-300 dark:bg-white/10 rounded-full mb-4 cursor-grab active:cursor-grabbing" />

          <div className="w-full flex items-center justify-between sm:justify-center relative">
            <h3 className="text-xl font-black tracking-tight select-none text-center w-full">
              {title}
            </h3>

            <button
              onClick={onClose}
              className="hidden sm:flex absolute -right-2 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center bg-gray-100 dark:bg-white/5 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
            >
              <span className="material-symbols-outlined text-gray-500 dark:text-gray-400">
                close
              </span>
            </button>
          </div>
        </div>

        <div className="max-h-[70vh] overflow-y-auto custom-scrollbar">
          {type === "2fa" && (
            <div className="flex flex-col gap-4">
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
                    className={`w-10 h-6 rounded-full transition-colors duration-300 ${
                      data.secureLogin
                        ? "bg-primary"
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  />
                  <div
                    className={`absolute top-[3px] left-[4px] bg-white rounded-full h-[18px] w-[18px] transition-transform duration-300 ease-out ${
                      data.secureLogin ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </div>
              </div>

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
                    className={`w-10 h-6 rounded-full transition-colors duration-300 ${
                      data.secureOperations
                        ? "bg-primary"
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  />
                  <div
                    className={`absolute top-[3px] left-[4px] bg-white rounded-full h-[18px] w-[18px] transition-transform duration-300 ease-out ${
                      data.secureOperations ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </div>
              </div>

              <div
                className={`grid grid-cols-2 gap-4 mt-2 transition-opacity duration-500 ${
                  !isAnySecurityEnabled
                    ? "opacity-20 pointer-events-none"
                    : "opacity-100"
                }`}
              >
                <button
                  onClick={() => data.setTempTwoFAMethod("SMS")}
                  className={`flex flex-col items-center gap-3 p-5 rounded-[28px] border-2 transition-all duration-300 relative ${
                    data.tempTwoFAMethod === "SMS"
                      ? "border-primary bg-primary/5 text-primary shadow-lg"
                      : "border-transparent bg-gray-50 dark:bg-white/5 text-gray-400"
                  }`}
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
                  className={`flex flex-col items-center gap-3 p-5 rounded-[28px] border-2 transition-all duration-300 relative ${
                    data.tempTwoFAMethod === "EMAIL"
                      ? "border-primary bg-primary/5 text-primary shadow-lg"
                      : "border-transparent bg-gray-50 dark:bg-white/5 text-gray-400"
                  }`}
                >
                  {data.tempTwoFAMethod === "EMAIL" && (
                    <span className="material-symbols-outlined absolute top-3 right-3 text-lg">
                      check_circle
                    </span>
                  )}
                  <span className="material-symbols-outlined text-3xl">
                    mail
                  </span>
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-black uppercase tracking-wider">
                      E-mail
                    </span>
                    <span className="text-[8px] font-bold text-primary uppercase mt-0.5">
                      Recomendado
                    </span>
                  </div>
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
                disabled={data.isUpdating}
                className="w-full h-14 bg-primary text-white rounded-2xl font-bold transition-all active:scale-[0.98] mt-4 shadow-xl shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:active:scale-100 disabled:cursor-not-allowed"
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
                  className={`w-full p-4 rounded-2xl text-left font-bold transition-all duration-200 flex justify-between items-center ${
                    data.selectedLanguage === lang
                      ? "bg-primary text-white shadow-lg"
                      : "hover:bg-gray-100 dark:hover:bg-white/5 text-gray-600 dark:text-gray-300"
                  }`}
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
        </div>
      </div>
    </div>
  );
};

export default ActionSheet;
