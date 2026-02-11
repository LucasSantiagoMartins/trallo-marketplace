import React, { useState } from "react";
import TralloInput from "@/components/TralloInput";
import TralloButton from "@/components/TralloButton";
import PageHeader from "@/components/PageHeader";
import VerificationModal from "@/components/VerificationModal";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleResetRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsModalOpen(true);
    }
  };

  const handleVerifyCode = (code: string) => {
    console.log("Código verificado:", code);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col items-center p-4 sm:p-6">
      <PageHeader title="Redefinição de senha" backTo={-1} />

      <div className="mt-20 sm:mt-16 w-full" />

      <main className="w-full max-w-2xl bg-white dark:bg-[#1c182d] rounded-[2rem] sm:rounded-[3rem] px-8 sm:px-16 py-8 sm:py-10 shadow-xl dark:shadow-none border border-transparent dark:border-white/5 flex flex-col items-center">
        <div className="relative w-32 h-32 sm:w-36 sm:h-36 mb-6 flex items-center justify-center shrink-0">
          <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl"></div>
          <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 bg-slate-50 dark:bg-background-dark rounded-3xl shadow-lg flex items-center justify-center transform rotate-3 overflow-hidden border border-white/20">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 dark:bg-primary/20 backdrop-blur-md rounded-full flex items-center justify-center border border-primary/20">
              <span className="material-symbols-outlined text-primary text-3xl">
                key
              </span>
            </div>
          </div>
          <div className="absolute -bottom-1 -right-1 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#6f45f7] to-[#8b5cf6] rounded-xl flex items-center justify-center shadow-lg transform -rotate-6">
            <span className="material-symbols-outlined text-white text-xl sm:text-2xl">
              mark_email_unread
            </span>
          </div>
        </div>

        <div className="text-center space-y-2 mb-8 max-w-lg">
          <h1 className="clash-display text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white">
            Redefinir Senha
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed font-medium">
            Enviaremos um código de recuperação para o seu email de forma imediata.
          </p>
        </div>

        <form onSubmit={handleResetRequest} className="w-full space-y-5">
          <TralloInput
            label="Endereço de Email"
            type="email"
            icon="alternate_email"
            placeholder="ex: nome@trallo.ao"
            value={email}
            onChange={setEmail}
          />

          <TralloButton fullWidth type="submit" icon="arrow_forward">
            Enviar
          </TralloButton>
        </form>

       
      </main>

      <VerificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onVerify={handleVerifyCode}
        email={email}
      />
    </div>
  );
};

export default ResetPassword;
