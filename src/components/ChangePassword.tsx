import React, { useState } from "react";
import TralloInput from "@/components/TralloInput";
import TralloButton from "@/components/TralloButton";
import PageHeader from "@/components/PageHeader";
import PasswordTooltip from "@/components/PasswordTooltip";
import { changePassword } from "@/services/user.service";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isPasswordValid = newPassword.length >= 8;
  const passwordsMatch = newPassword === confirmPassword;
  const isFormValid =
    isPasswordValid && passwordsMatch && currentPassword.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) return;

    setIsLoading(true);

    try {
      const res = await changePassword({
        currentPassword,
        newPassword,
        confirmPassword,
      });

      toast.success(res.message ?? "Senha alterada com sucesso");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(err.message || "Erro ao alterar senha");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark h-screen flex flex-col p-4 overflow-hidden">
      <div className="w-full pt-2">
        <PageHeader title="Alterar Senha" showUser={true} />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <main className="w-full max-w-4xl bg-white dark:bg-[#1c182d] rounded-[2.5rem] p-10 sm:p-16 shadow-xl dark:shadow-none border border-transparent dark:border-white/5">
          <div className="flex flex-col lg:flex-row gap-10 items-center lg:items-start">
            
            <div className="flex flex-col items-center lg:items-start lg:w-1/3 text-center lg:text-left">
              <div className="relative w-16 h-16 mb-4 flex items-center justify-center shrink-0">
                <div className="absolute inset-0 bg-primary/5 rounded-full blur-xl"></div>
                <div className="relative z-10 w-12 h-12 bg-slate-50 dark:bg-background-dark rounded-xl shadow-md flex items-center justify-center transform rotate-3 border border-white/20">
                  <span className="material-symbols-outlined text-primary text-2xl">
                    lock_reset
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-br from-[#6f45f7] to-[#8b5cf6] rounded flex items-center justify-center shadow-lg transform -rotate-6">
                  <span className="material-symbols-outlined text-white text-base">
                    shield_lock
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h1 className="clash-display text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white">
                  Atualizar Credenciais
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium max-w-[240px]">
                  Mantenha sua conta segura utilizando uma senha forte e única.
                </p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5"
            >
              <div className="sm:col-span-2">
                <TralloInput
                  label="Senha Atual"
                  type="password"
                  icon="lock_open"
                  placeholder="••••••••"
                  value={currentPassword}
                  onChange={setCurrentPassword}
                  showPasswordToggle
                />
              </div>

              <div className="relative w-full">
                <PasswordTooltip password={newPassword} isVisible={showTooltip} />
                <TralloInput
                  label="Nova Senha"
                  type="password"
                  icon="lock"
                  placeholder="Mínimo 8 chars"
                  value={newPassword}
                  onChange={setNewPassword}
                  showPasswordToggle
                  onFocus={() => setShowTooltip(true)}
                  onBlur={() => setShowTooltip(false)}
                />
              </div>

              <TralloInput
                label="Confirmar Senha"
                type="password"
                icon="enhanced_encryption"
                placeholder="Repita a senha"
                value={confirmPassword}
                onChange={setConfirmPassword}
                showPasswordToggle
              />

              <div className="sm:col-span-2 pt-4">
                <TralloButton
                  fullWidth
                  type="submit"
                  isLoading={isLoading}
                  disabled={!isFormValid || isLoading}
                >
                  Atualizar Senha
                </TralloButton>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ChangePassword;