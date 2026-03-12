import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { bankService } from "@/services/bank.service";
import toast from "react-hot-toast";
import { BankAccountType, BankAccountDTO } from "@/dtos/bank.dto";
import { VerificationType } from "@/enums/verification-type.enum";
import TralloInput from "@/components/TralloInput";
import TralloButton from "@/components/TralloButton";
import MfaVerificationModal from "@/components/MfaVerificationModal";

import baiImg from "@/assets/images/banks/bai.png";
import bfaImg from "@/assets/images/banks/bfa.png";
import bicImg from "@/assets/images/banks/bic.png";
import keveImg from "@/assets/images/banks/keve.png";
import millenniumImg from "@/assets/images/banks/millennium.png";
import solImg from "@/assets/images/banks/sol.png";
import { requestCode } from "@/services/user-security.service";

const BANKS = [
  { id: "bai", name: "BAI", logo: baiImg },
  { id: "bfa", name: "BFA", logo: bfaImg },
  { id: "bic", name: "BIC", logo: bicImg },
  { id: "sol", name: "Banco SOL", logo: solImg },
  { id: "millennium", name: "Millennium Atlântico", logo: millenniumImg },
  { id: "keve", name: "Banco Keve", logo: keveImg },
];

interface EditAccountProps {
  account: BankAccountDTO | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const EditBankAccountSheet: React.FC<EditAccountProps> = ({
  account,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    bankName: "",
    iban: "",
    phoneNumber: "",
  });
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isMfaOpen, setIsMfaOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedBank = BANKS.find((b) => b.name === formData.bankName);

  useEffect(() => {
    if (account) {
      setFormData({
        bankName: account.bankName || "",
        iban: account.iban || "",
        phoneNumber: account.phoneNumber || "",
      });
    }
  }, [account]);

  // Passo 1: Solicitar código MFA
  const handleInitiateUpdate = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!account) return;

    // Validações básicas
    if (account.type === BankAccountType.NORMAL_BANK) {
      if (!formData.bankName) return toast.error("Selecione o banco");
      if (formData.iban.length < 21) return toast.error("IBAN incompleto");
    } else if (formData.phoneNumber.length < 9) {
      return toast.error("Telefone inválido");
    }

    setSubmitting(true);
    try {
      const res = await requestCode(
        VerificationType.CHANGE_BANK,
      );
      if (res.success) {
        setIsMfaOpen(true);
      } else {
        toast.error(res.message || "Erro ao solicitar código.");
      }
    } catch (err) {
      toast.error("Erro ao processar verificação de segurança.");
    } finally {
      setSubmitting(false);
    }
  };

  // Passo 2: Enviar atualização com o código digitado
  const handleFinalUpdate = async (code: string) => {
    if (!account) return;
    setSubmitting(true);
    try {
      const response = await bankService.updateAccount(account.id, {
        bankName:
          account.type === BankAccountType.NORMAL_BANK
            ? formData.bankName
            : "Multicaixa Express",
        iban:
          account.type === BankAccountType.NORMAL_BANK
            ? formData.iban
            : undefined,
        phoneNumber:
          account.type === BankAccountType.MCX_EXPRESS
            ? formData.phoneNumber
            : undefined,
        code: code, // Enviando o código MFA para o backend
      });

      if (response.success) {
        toast.success("Dados atualizados com sucesso");
        onSuccess();
        setIsMfaOpen(false);
        onClose();
      }
    } catch (err: any) {
      toast.error(err.message || "Erro ao atualizar.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && account && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ y: "100%", x: "-50%" }}
              animate={{ y: window.innerWidth >= 1024 ? "-50%" : 0, x: "-50%" }}
              exit={{ y: "100%", x: "-50%" }}
              style={{
                left: "50%",
                top: window.innerWidth >= 1024 ? "50%" : "auto",
              }}
              className="fixed bottom-0 lg:bottom-auto w-full lg:max-w-md bg-white dark:bg-gray-900 rounded-t-[2.5rem] lg:rounded-[2.5rem] z-[101] shadow-2xl"
            >
              <div className="px-8 pt-6 pb-10">
                <header className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-black uppercase tracking-tighter">
                    Editar Coordenadas
                  </h2>
                  <button
                    onClick={onClose}
                    className="size-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
                  >
                    <span className="material-symbols-outlined text-sm">
                      close
                    </span>
                  </button>
                </header>

                <form onSubmit={handleInitiateUpdate} className="space-y-5">
                  {account.type === BankAccountType.NORMAL_BANK ? (
                    <>
                      <div className="space-y-2 relative" ref={selectRef}>
                        <button
                          type="button"
                          onClick={() => setIsSelectOpen(!isSelectOpen)}
                          className="w-full h-14 px-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            {selectedBank && (
                              <img
                                src={selectedBank.logo}
                                className="size-6 object-contain"
                                alt=""
                              />
                            )}
                            <span className="font-bold text-sm">
                              {formData.bankName || "Selecionar Banco"}
                            </span>
                          </div>
                          <span className="material-symbols-outlined text-gray-400">
                            expand_more
                          </span>
                        </button>
                        {isSelectOpen && (
                          <div className="absolute top-full left-0 w-full p-2 bg-white dark:bg-gray-800 border rounded-2xl shadow-xl max-h-48 overflow-y-auto z-[110]">
                            {BANKS.map((b) => (
                              <button
                                key={b.id}
                                type="button"
                                onClick={() => {
                                  setFormData({
                                    ...formData,
                                    bankName: b.name,
                                  });
                                  setIsSelectOpen(false);
                                }}
                                className="w-full p-2.5 flex items-center gap-3 rounded-xl hover:bg-gray-50 text-[11px] font-bold uppercase"
                              >
                                <img
                                  src={b.logo}
                                  className="size-6 object-contain"
                                  alt=""
                                />{" "}
                                {b.name}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      <TralloInput
                        label="IBAN"
                        icon="pin"
                        value={formData.iban}
                        onChange={(val) =>
                          setFormData({ ...formData, iban: val.toUpperCase() })
                        }
                      />
                    </>
                  ) : (
                    <TralloInput
                      label="Telefone"
                      icon="phone_iphone"
                      value={formData.phoneNumber}
                      onChange={(val) =>
                        setFormData({ ...formData, phoneNumber: val })
                      }
                    />
                  )}
                  <TralloButton type="submit" fullWidth isLoading={submitting}>
                    Salvar Alterações
                  </TralloButton>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <MfaVerificationModal
        isOpen={isMfaOpen}
        onClose={() => setIsMfaOpen(false)}
        onSubmit={handleFinalUpdate}
        isLoading={submitting}
        type={VerificationType.CHANGE_BANK}
      />
    </>
  );
};

export default EditBankAccountSheet;
