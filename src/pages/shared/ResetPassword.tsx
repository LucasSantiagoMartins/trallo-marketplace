import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TralloInput from "@/components/TralloInput";
import TralloButton from "@/components/TralloButton";
import PageHeader from "@/components/PageHeader";
import SecurityVerificationModal from "@/components/SecurityVerificationModal";
import PasswordTooltip from "@/components/PasswordTooltip";
import { requestResetPassword, resetPassword } from "@/services/user.service";
import { toast } from "react-hot-toast";
import { VerificationType } from "@/enums/verification-type.enum";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showMfaModal, setShowMfaModal] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const isPasswordValid = newPassword.length >= 8;
  const passwordsMatch = newPassword === confirmPassword;
  const isFormValid =
    isPasswordValid && passwordsMatch && newPassword.length > 0;

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Informe o seu endereço de e-mail");
      return;
    }

    setLoading(true);
    try {
      await requestResetPassword({ email } as any);
      setShowMfaModal(true);
      toast.success("Enviamos o código de redefinição para o seu email");
    } catch (err: any) {
      toast.error(err.message || "Erro ao solicitar redefinição");
    } finally {
      setLoading(false);
    }
  };

  const handleMfaVerify = async (verificationCode: string) => {
    setCode(verificationCode);
    setShowMfaModal(false);
    setStep(2);
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setLoading(true);
    try {
      const res = await resetPassword({
        email,
        code,
        newPassword,
        confirmPassword,
      });

      toast.success(res.message ?? "Senha redefinida com sucesso!");

      setTimeout(() => {
        navigate("/entrar");
      }, 2000);
    } catch (err: any) {
      toast.error(err.message || "Erro ao redefinir senha");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col items-center justify-center p-0 sm:p-6">
      <PageHeader title="Redefinição de senha" />

      <main className="w-full max-w-2xl bg-white dark:bg-[#1c182d] rounded-none sm:rounded-[3rem] px-8 sm:px-16 py-10 sm:py-12 shadow-xl dark:shadow-none border border-transparent dark:border-white/5 flex flex-col items-center min-h-screen sm:min-h-0 sm:h-auto justify-center sm:justify-start">
        <div className="relative w-32 h-32 sm:w-36 sm:h-36 mb-6 flex items-center justify-center shrink-0">
          <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl"></div>
          <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 bg-slate-50 dark:bg-background-dark rounded-3xl shadow-lg flex items-center justify-center transform rotate-3 overflow-hidden border border-white/20">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 dark:bg-primary/20 backdrop-blur-md rounded-full flex items-center justify-center border border-primary/20">
              <span className="material-symbols-outlined text-primary text-3xl">
                {step === 1 ? "key" : "lock_reset"}
              </span>
            </div>
          </div>
          <div className="absolute -bottom-1 -right-1 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#6f45f7] to-[#8b5cf6] rounded-xl flex items-center justify-center shadow-lg transform -rotate-6">
            <span className="material-symbols-outlined text-white text-xl sm:text-2xl">
              {step === 1 ? "mark_email_unread" : "verified"}
            </span>
          </div>
        </div>

        <div className="text-center space-y-2 mb-8 max-w-lg">
          <h1 className="clash-display text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white">
            {step === 1 ? "Redefinir Senha" : "Nova Senha"}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed font-medium">
            {step === 1
              ? "Enviaremos um código de recuperação para o seu email de forma imediata."
              : "Defina uma nova senha segura para acessar sua conta."}
          </p>
        </div>

        {step === 1 ? (
          <form onSubmit={handleResetRequest} className="w-full space-y-5">
            <TralloInput
              label="Endereço de Email"
              type="email"
              icon="alternate_email"
              placeholder="ex: seuemail@gmail.com"
              value={email}
              onChange={setEmail}
            />

            <TralloButton fullWidth type="submit" isLoading={loading}>
              Enviar
            </TralloButton>
          </form>
        ) : (
          <form onSubmit={handleUpdatePassword} className="w-full space-y-5">
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

            <div className="pt-2 flex flex-col items-center gap-4">
              <TralloButton
                fullWidth
                type="submit"
                icon="check_circle"
                isLoading={loading}
                disabled={!isFormValid || loading}
              >
                Atualizar Senha
              </TralloButton>

              <button
                type="button"
                onClick={() => setShowMfaModal(true)}
                className="text-primary text-sm font-semibold hover:underline transition-all"
              >
                Inserir código novamente
              </button>
            </div>
          </form>
        )}
      </main>

      <SecurityVerificationModal
        isOpen={showMfaModal}
        isLoading={loading}
        method="EMAIL"
        onClose={() => setShowMfaModal(false)}
        onSubmit={handleMfaVerify}
        type={VerificationType.RESET_PASSWORD}
      />
    </div>
  );
};

export default ResetPassword;
