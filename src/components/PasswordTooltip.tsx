import React from "react";

interface PasswordTooltipProps {
  password: string;
  isVisible: boolean;
}

const PasswordTooltip: React.FC<PasswordTooltipProps> = ({
  password,
  isVisible,
}) => {
  const checks = [
    { label: "Mínimo de 6 caracteres", met: password.length >= 6 },
    { label: "Uma letra maiúscula", met: /[A-Z]/.test(password) },
    { label: "Uma letra minúscula", met: /[a-z]/.test(password) },
    { label: "Pelo menos um número", met: /\d/.test(password) },
    { label: "Caractere especial (!@#$)", met: /[\W_]/.test(password) },
  ];

  if (!isVisible) return null;

  return (
    <div className="absolute bottom-full mb-3 left-0 w-full min-w-[280px] z-50 animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-300">
      <div className="bg-card/95 backdrop-blur-md border border-border p-4 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] space-y-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-black uppercase tracking-[0.15em] text-foreground/50">
            Segurança da Senha
          </span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
            password.length > 8 && checks.every(c => c.met) ? "bg-green-500/10 text-green-500" : "bg-primary/10 text-primary"
          }`}>
            {checks.filter(c => c.met).length} / {checks.length}
          </span>
        </div>

        <div className="space-y-2">
          {checks.map((check, index) => (
            <div key={index} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span
                  className={`text-[11px] font-medium transition-colors duration-300 ${
                    check.met ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {check.label}
                </span>
                <span className={`material-symbols-outlined text-[14px] transition-all duration-300 ${
                  check.met ? "text-green-500 scale-110" : "text-muted-foreground/30"
                }`}>
                  {check.met ? "check_circle" : "radio_button_unchecked"}
                </span>
              </div>
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ease-out ${
                    check.met ? "w-full bg-green-500" : "w-0 bg-transparent"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="absolute -bottom-1 left-8 w-2.5 h-2.5 bg-card border-r border-b border-border rotate-45"></div>
      </div>
    </div>
  );
};

export default PasswordTooltip;