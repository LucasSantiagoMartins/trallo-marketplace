import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { bankService } from "@/services/bank.service";
import toast from "react-hot-toast";
import { BankAccountType, BankAccountDTO } from "@/dtos/bank.dto";
import TralloInput from "@/components/TralloInput";
import TralloButton from "@/components/TralloButton";

// Importação das imagens dos bancos
import baiImg from "@/assets/images/banks/bai.png";
import bfaImg from "@/assets/images/banks/bfa.png";
import bicImg from "@/assets/images/banks/bic.png";
import keveImg from "@/assets/images/banks/keve.png";
import millenniumImg from "@/assets/images/banks/millennium.png";
import solImg from "@/assets/images/banks/sol.png";

const BANKS = [
  { id: "bai", name: "BAI", color: "#003366", logo: baiImg },
  { id: "bfa", name: "BFA", color: "#E30613", logo: bfaImg },
  { id: "bic", name: "BIC", color: "#F39200", logo: bicImg },
  { id: "sol", name: "Banco SOL", color: "#FFD700", logo: solImg },
  {
    id: "millennium",
    name: "Millennium Atlântico",
    color: "#00AEEF",
    logo: millenniumImg,
  },
  { id: "keve", name: "Banco Keve", color: "#006738", logo: keveImg },
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
  const selectRef = useRef<HTMLDivElement>(null);

  // Encontrar o banco selecionado para mostrar o logo no botão do Select
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsSelectOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleUpdate = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!account) return;

    const hasChanged =
      formData.bankName !== (account.bankName || "") ||
      formData.iban !== (account.iban || "") ||
      formData.phoneNumber !== (account.phoneNumber || "");

    if (!hasChanged) {
      toast("Nenhuma alteração foi feita.");
      onClose();
      return;
    }

    if (account.type === BankAccountType.NORMAL_BANK) {
      if (!formData.bankName) return toast.error("Selecione o banco");
      if (formData.iban.length < 21) return toast.error("IBAN incompleto");
    } else {
      if (formData.phoneNumber.length < 9)
        return toast.error("Telefone inválido");
    }

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
      });

      if (response.success) {
        toast.success(response.message ?? "Dados atualizados");
        onSuccess();
        onClose();
      }
    } catch (err: any) {
      toast.error(err.message ?? "Erro ao atualizar.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
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
            animate={{
              y: window.innerWidth >= 1024 ? "-50%" : 0,
              x: "-50%",
            }}
            exit={{ y: "100%", x: "-50%" }}
            drag={window.innerWidth >= 1024 ? false : "y"}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.y > 150) onClose();
            }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            style={{
              left: "50%",
              top: window.innerWidth >= 1024 ? "50%" : "auto",
            }}
            className="fixed bottom-0 lg:bottom-auto w-full lg:max-w-md bg-white dark:bg-gray-900 rounded-t-[2.5rem] lg:rounded-[2.5rem] z-[101] shadow-2xl overflow-visible"
          >
            <div className="p-4 flex justify-center lg:hidden cursor-grab active:cursor-grabbing">
              <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full" />
            </div>

            <div className="px-8 pt-4 pb-10">
              <header className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-xl font-black uppercase tracking-tighter text-[#181112] dark:text-white">
                    Editar Coordenadas
                  </h2>
                  <p className="text-[10px] text-primary font-bold uppercase tracking-widest mt-1">
                    {account.type === BankAccountType.NORMAL_BANK
                      ? "Conta Bancária"
                      : "Multicaixa Express"}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="size-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">
                    close
                  </span>
                </button>
              </header>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdate();
                }}
                className="space-y-5"
              >
                {account.type === BankAccountType.NORMAL_BANK ? (
                  <>
                    <div className="space-y-2 relative" ref={selectRef}>
                      <label className="text-[10px] font-black uppercase text-gray-400 ml-2">
                        Banco
                      </label>
                      <button
                        type="button"
                        onClick={() => setIsSelectOpen(!isSelectOpen)}
                        className="w-full h-14 pl-4 pr-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 flex items-center justify-between transition-all focus:border-primary"
                      >
                        <div className="flex items-center gap-3">
                          {selectedBank ? (
                            <img
                              src={selectedBank.logo}
                              alt=""
                              className="size-6 object-contain"
                            />
                          ) : (
                            <span className="material-symbols-outlined text-primary">
                              account_balance
                            </span>
                          )}
                          <span className="font-bold text-sm text-[#181112] dark:text-white">
                            {formData.bankName || "Selecionar Banco"}
                          </span>
                        </div>
                        <span
                          className={`material-symbols-outlined text-gray-400 transition-transform ${isSelectOpen ? "rotate-180" : ""}`}
                        >
                          expand_more
                        </span>
                      </button>

                      <AnimatePresence>
                        {isSelectOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-[calc(100%+4px)] left-0 w-full p-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-xl max-h-48 overflow-y-auto z-[110] scrollbar-hide"
                          >
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
                                className="w-full p-2.5 flex items-center gap-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900/50 text-[11px] font-bold uppercase text-[#181112] dark:text-white transition-colors"
                              >
                                <div className="size-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center p-1">
                                  <img
                                    src={b.logo}
                                    alt={b.name}
                                    className="w-full h-full object-contain"
                                  />
                                </div>
                                {b.name}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <TralloInput
                      label="IBAN"
                      icon="pin"
                      className="font-mono"
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
                    className="font-mono"
                    value={formData.phoneNumber}
                    onChange={(val) =>
                      setFormData({ ...formData, phoneNumber: val })
                    }
                  />
                )}

                <TralloButton
                  type="submit"
                  fullWidth
                  isLoading={submitting}
                  className="mt-2"
                >
                  Salvar Alterações
                </TralloButton>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EditBankAccountSheet;
