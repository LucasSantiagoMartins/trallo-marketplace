import React, { useState } from "react";
import TralloInput from "@/components/TralloInput";
import TralloButton from "@/components/TralloButton";
import PageHeader from "@/components/PageHeader";
import PasswordTooltip from "@/components/PasswordTooltip";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Alterando senha...", { currentPassword, newPassword });
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col items-center p-4 sm:p-6">
      <PageHeader title="Alterar Senha" backTo="configuracoes" />

      <div className="mt-20 sm:mt-16 w-full" />

      <main className="w-full max-w-2xl bg-white dark:bg-[#1c182d] rounded-[2rem] sm:rounded-[3rem] px-8 sm:px-16 py-8 sm:py-10 shadow-xl dark:shadow-none border border-transparent dark:border-white/5 flex flex-col items-center">
        <div className="relative w-32 h-32 sm:w-36 sm:h-36 mb-6 flex items-center justify-center shrink-0">
          <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl"></div>
          <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 bg-slate-50 dark:bg-background-dark rounded-3xl shadow-lg flex items-center justify-center transform rotate-3 overflow-hidden border border-white/20">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 dark:bg-primary/20 backdrop-blur-md rounded-full flex items-center justify-center border border-primary/20">
              <span className="material-symbols-outlined text-primary text-3xl">
                lock_reset
              </span>
            </div>
          </div>
          <div className="absolute -bottom-1 -right-1 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#6f45f7] to-[#8b5cf6] rounded-xl flex items-center justify-center shadow-lg transform -rotate-6">
            <span className="material-symbols-outlined text-white text-xl sm:text-2xl">
              shield_lock
            </span>
          </div>
        </div>

        <div className="text-center space-y-2 mb-8 max-w-lg">
          <h1 className="clash-display text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white">
            Atualizar Credenciais
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed font-medium">
            Mantenha sua conta segura utilizando uma senha forte e única.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-5">
          <TralloInput
            label="Senha Atual"
            type="password"
            icon="lock_open"
            placeholder="••••••••"
            value={currentPassword}
            onChange={setCurrentPassword}
            showPasswordToggle
          />

          <div className="relative w-full">
            <PasswordTooltip password={newPassword} isVisible={showTooltip} />
            <TralloInput
              label="Nova Senha"
              type="password"
              icon="lock"
              placeholder="Mínimo 8 caracteres"
              value={newPassword}
              onChange={setNewPassword}
              showPasswordToggle
              onFocus={() => setShowTooltip(true)}
              onBlur={() => setShowTooltip(false)}
            />
          </div>

          <TralloInput
            label="Confirmar Nova Senha"
            type="password"
            icon="enhanced_encryption"
            placeholder="Repita a nova senha"
            value={confirmPassword}
            onChange={setConfirmPassword}
            showPasswordToggle
          />

          <div className="pt-2">
            <TralloButton fullWidth type="submit" icon="check_circle">
              Atualizar Senha
            </TralloButton>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ChangePassword;
