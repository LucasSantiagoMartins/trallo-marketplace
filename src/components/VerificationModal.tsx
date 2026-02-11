import React, { useState, useRef } from "react";
import TralloButton from "./TralloButton";

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (code: string) => void;
  email: string;
}

const VerificationModal: React.FC<VerificationModalProps> = ({
  isOpen,
  onClose,
  onVerify,
  email,
}) => {
  const [code, setCode] = useState(["", "", "", ""]);
  const inputs = useRef<HTMLInputElement[]>([]);

  if (!isOpen) return null;

  const handleChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return;
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);

    if (value && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full sm:max-w-md bg-white dark:bg-[#1c182d] rounded-t-[2.5rem] sm:rounded-[2.5rem] p-8 shadow-2xl animate-in slide-in-from-bottom sm:zoom-in-95 duration-300">
        <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mb-6 sm:hidden" />

        <div className="text-center space-y-2 mb-8">
          <h2 className="clash-display text-2xl font-bold dark:text-white">
            Verifique seu e-mail
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Enviamos um código de 4 dígitos para <br />
            <span className="font-bold text-primary">{email}</span>
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputs.current[index] = el!)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`w-14 h-16 sm:w-16 sm:h-20 text-center text-2xl font-bold rounded-2xl border-2 transition-all outline-none
                ${
                  digit
                    ? "border-green-500 bg-green-50 dark:bg-green-500/10 dark:text-white"
                    : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 dark:text-white focus:border-primary"
                }`}
            />
          ))}
        </div>

        <div className="space-y-4">
          <TralloButton
            fullWidth
            onClick={() => onVerify(code.join(""))}
            disabled={code.some((d) => d === "")}
          >
            Verificar Código
          </TralloButton>

          <button
            onClick={onClose}
            className="w-full py-2 text-sm font-bold text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationModal;
