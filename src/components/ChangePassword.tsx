import React, { useState } from "react";
import TralloInput from "@/components/TralloInput";
import TralloButton from "@/components/TralloButton";
import PageHeader from "@/components/PageHeader";
import PasswordTooltip from "@/components/PasswordTooltip";
import SecurityVerificationModal from "@/components/SecurityVerificationModal";
import { changePassword } from "@/services/user.service";
import { requestCode } from "@/services/user-security.service";
import { VerificationType } from "@/enums/verification-type.enum";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const { user } = useAuth();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMfaOpen, setIsMfaOpen] = useState(false);

  const isPasswordValid = newPassword.length >= 8;
  const passwordsMatch = newPassword === confirmPassword;
  const isFormValid =
    isPasswordValid && passwordsMatch && currentPassword.length > 0;

  const handleInitiateChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    if (user?.secureOperations === false) {
      return handleFinalSubmit("");
    }

    setIsLoading(true);
    try {
      const res = await requestCode(VerificationType.CHANGE_PASSWORD);
      if (res.success) {
        setIsMfaOpen(true);
      } else {
        toast.error(res.message || "Erro ao solicitar código de verificação.");
      }
    } catch (err) {
      toast.error("Falha ao enviar código de segurança.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinalSubmit = async (code: string) => {
    setIsLoading(true);
    try {
      const res = await changePassword({
        currentPassword,
        newPassword,
        confirmPassword,
        code,
      });

      toast.success(res.message ?? "Senha alterada com sucesso");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsMfaOpen(false);
    } catch (err: any) {
      toast.error(err.message || "Erro ao alterar senha");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark h-screen flex flex-col overflow-hidden">
      <div className="w-full pt-2 px-4 shrink-0">
        <PageHeader title="Alterar Senha" showUser={true} />
      </div>

      {/* Ajustado: overflow-y-auto apenas no mobile, sm:overflow-visible no desktop */}
      <div className="flex-1 flex flex-col w-full mt-12 sm:mt-0 sm:items-center sm:justify-center sm:p-4 overflow-y-auto sm:overflow-visible">
        <main className="w-full h-full sm:h-auto max-w-4xl bg-white dark:bg-[#1c182d] rounded-none sm:rounded-[2.5rem] p-6 sm:p-16 shadow-xl dark:shadow-none border-none sm:border sm:border-transparent sm:dark:border-white/5 pb-20 sm:pb-16 sm:overflow-visible">
          <div className="flex flex-col lg:flex-row gap-10 items-center lg:items-start sm:overflow-visible">
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
              onSubmit={handleInitiateChange}
              className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 sm:overflow-visible"
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

              <div className="relative w-full sm:static lg:relative">
                {/* PasswordTooltip agora tem z-50 e o container pai permite overflow no desktop */}
                <div className="absolute z-50 bottom-full mb-2 left-0 w-full sm:w-auto">
                   <PasswordTooltip
                    password={newPassword}
                    isVisible={showTooltip}
                  />
                </div>
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
                  Prosseguir
                </TralloButton>
              </div>
            </form>
          </div>
        </main>
      </div>

      <SecurityVerificationModal
        isOpen={isMfaOpen}
        onClose={() => setIsMfaOpen(false)}
        onSubmit={handleFinalSubmit}
        isLoading={isLoading}
        type={VerificationType.CHANGE_PASSWORD}
      />
    </div>
  );
};

export default ChangePassword;