import React, { useState, useRef, useEffect } from "react";
import TralloButton from "@/components/TralloButton";
import { VerificationType } from "@/enums/verification-type.enum";

interface SecurityVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (code: string) => void;
  onResend?: () => void;
  isLoading: boolean;
  type: VerificationType;
  method?: string;
}

const SecurityVerificationModal: React.FC<SecurityVerificationModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onResend,
  isLoading,
  type,
  method,
}) => {
  const [code, setCode] = useState<string[]>(new Array(4).fill(""));
  const [timer, setTimer] = useState(300);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isOpen) {
      setCode(new Array(4).fill(""));
      setTimer(300);
      setCanResend(false);

      if (window.innerWidth >= 768) {
        setTimeout(() => inputRefs.current[0]?.focus(), 100);
      }

      document.body.style.overflow = "hidden";

      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      clearInterval(interval);
    };
  }, [isOpen]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleResendClick = () => {
    if (canResend && onResend) {
      onResend();
      setTimer(300);
      setCanResend(false);
    }
  };

  const getContent = () => {
    const deliveryMethod = method ? ` via ${method.toLowerCase()}` : "";

    switch (type) {
      case VerificationType.WITHDRAWAL:
        return {
          title: "Confirmar Levantamento",
          desc: `Confirme o código enviado${deliveryMethod} para autorizar a retirada`,
          buttonText: "Confirmar Levantamento",
          icon: "payments",
        };
      case VerificationType.CHANGE_PASSWORD:
        return {
          title: "Alterar Senha",
          desc: `Confirme o código enviado${deliveryMethod} para mudar sua senha`,
          buttonText: "Alterar Senha",
          icon: "lock_reset",
        };
      case VerificationType.RESET_PASSWORD:
        return {
          title: "Redefinição de Senha",
          desc: `Insira o código enviado${deliveryMethod} para criar uma nova senha`,
          buttonText: "Continuar",
          icon: "key",
        };
      case VerificationType.CHANGE_BANK:
        return {
          title: "Dados Bancários",
          desc: `Confirme o código enviado${deliveryMethod} para alterar sua conta bancária`,
          buttonText: "Atualizar Banco",
          icon: "account_balance",
        };
      case VerificationType.LOGIN:
      default:
        return {
          title: "Verificação",
          desc: `Insira o código enviado${deliveryMethod} para acessar sua conta`,
          buttonText: "Verificar Identidade",
          icon: "verified_user",
        };
    }
  };

  const { title, desc, buttonText, icon } = getContent();

  const handleChange = (value: string, index: number) => {
    const char = value.substring(value.length - 1);
    if (char && !/^[0-9]$/.test(char)) return;

    const newCode = [...code];
    newCode[index] = char;
    setCode(newCode);

    if (char && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(code.join(""));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-end md:items-center justify-center bg-black/70 backdrop-blur-md transition-all duration-300">
      {/* Overlay sem evento de clique para obrigar a interação com o modal */}
      <div className="absolute inset-0" />

      <div className="relative bg-white dark:bg-[#1c182d] w-full md:max-w-md rounded-t-[32px] md:rounded-[32px] border-t md:border border-white/5 shadow-2xl p-8 animate-in slide-in-from-bottom md:slide-in-from-bottom-0 md:zoom-in duration-300">
        <div className="text-center mb-8">
          <div className="size-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined !text-3xl">{icon}</span>
          </div>
          <h2 className="text-2xl font-bold clash-display text-slate-900 dark:text-white">
            {title}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-3">
            {desc}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-4 gap-3">
            {code.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => (inputRefs.current[idx] = el)}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                className={`w-full h-16 text-center text-2xl font-bold border rounded-xl bg-muted/20 outline-none transition-all duration-200
                  ${
                    digit
                      ? "border-primary ring-2 ring-primary/10 bg-primary/5"
                      : "border-slate-200 dark:border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  }
                  ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
                `}
                value={digit}
                onChange={(e) => handleChange(e.target.value, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                disabled={isLoading}
              />
            ))}
          </div>

          <div className="space-y-4 pb-4 md:pb-0">
            <TralloButton
              type="submit"
              fullWidth
              isLoading={isLoading}
              disabled={isLoading || code.join("").length < 4}
            >
              {buttonText}
            </TralloButton>

            <div className="text-center">
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResendClick}
                  className="text-primary text-sm font-semibold hover:underline"
                >
                  Solicitar novo código
                </button>
              ) : (
                <p className="text-slate-500 text-xs">
                  Pode solicitar um novo código em{" "}
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    {formatTime(timer)}
                  </span>
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SecurityVerificationModal;
