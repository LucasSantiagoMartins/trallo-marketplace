import React, { useState, useRef, useEffect } from "react";
import TralloButton from "@/components/TralloButton";
import { VerificationType } from "@/enums/verification-type.enum";

interface MfaVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (code: string) => void;
  isLoading: boolean;
  type: VerificationType;
  method?: string;
}

const MfaVerificationModal: React.FC<MfaVerificationModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  type,
  method,
}) => {
  const [mfaCode, setMfaCode] = useState<string[]>(new Array(4).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (isOpen) {
      setMfaCode(new Array(4).fill(""));
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const getContent = () => {
    const deliveryMethod = method ? ` via ${method.toLowerCase()}` : "";

    switch (type) {
      case VerificationType.WITHDRAWAL:
        return {
          title: "Confirmar Saque",
          desc: `Confirme o código enviado${deliveryMethod} para autorizar a retirada`,
        };
      case VerificationType.CHANGE_PASSWORD:
        return {
          title: "Alterar Senha",
          desc: `Confirme o código enviado${deliveryMethod} para mudar sua senha`,
        };
      case VerificationType.CHANGE_BANK:
        return {
          title: "Dados Bancários",
          desc: `Confirme o código enviado${deliveryMethod} para alterar sua conta bancária`,
        };
      case VerificationType.LOGIN:
      default:
        return {
          title: "Verificação",
          desc: `Insira o código enviado${deliveryMethod} para acessar sua conta`,
        };
    }
  };

  const { title, desc } = getContent();

  const handleChange = (value: string, index: number) => {
    const char = value.substring(value.length - 1);

    if (char && !/^[0-9]$/.test(char)) return;

    const newCode = [...mfaCode];
    newCode[index] = char;
    setMfaCode(newCode);

    if (char && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !mfaCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(mfaCode.join(""));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div className="bg-card w-full max-w-md rounded-[32px] border border-border shadow-2xl p-8 animate-in fade-in zoom-in duration-300">
        <div className="text-center mb-8">
          <div className="size-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined !text-3xl">
              {type === VerificationType.WITHDRAWAL
                ? "payments"
                : "verified_user"}
            </span>
          </div>
          <h2 className="text-2xl font-bold clash-style">{title}</h2>
          <p className="text-muted-foreground text-sm mt-3">{desc}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-4 gap-3">
            {mfaCode.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => (inputRefs.current[idx] = el)}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                className={`w-full h-16 text-center text-2xl font-bold border rounded-xl bg-muted/20 outline-none transition-all duration-200
                  ${
                    digit
                      ? "border-emerald-500 ring-2 ring-emerald-500/10 bg-emerald-500/5"
                      : "border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
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

          <div className="pt-2">
            <TralloButton
              type="submit"
              fullWidth
              isLoading={isLoading}
              disabled={isLoading || mfaCode.join("").length < 4}
            >
              Confirmar Identidade
            </TralloButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MfaVerificationModal;
