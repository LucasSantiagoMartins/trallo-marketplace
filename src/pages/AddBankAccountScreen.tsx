import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import PageHeader from "@/components/PageHeader";
import { bankService } from "@/services/bank.service";
import toast from "react-hot-toast";
import { BankAccountType } from "@/dtos/bank.dto";
import TralloInput from "@/components/TralloInput";
import TralloButton from "@/components/TralloButton";

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

const AddBankAccountScreen: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"SELECT_TYPE" | "FILL_DATA">("SELECT_TYPE");
  const [selectedType, setSelectedType] = useState<BankAccountType>(
    BankAccountType.NORMAL_BANK,
  );

  const [formData, setFormData] = useState({
    bankName: "",
    iban: "",
    phoneNumber: "",
  });

  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedBank = BANKS.find((b) => b.name === formData.bankName);

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

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (selectedType === BankAccountType.NORMAL_BANK) {
      if (!formData.bankName) return toast.error("Selecione o seu banco");
      if (formData.iban.length < 21) return toast.error("IBAN incompleto");
    } else {
      if (formData.phoneNumber.length < 9)
        return toast.error("Número de telefone inválido");
    }

    setSubmitting(true);
    try {
      const response = await bankService.createAccount({
        type: selectedType,
        bankName:
          selectedType === BankAccountType.MCX_EXPRESS
            ? "Multicaixa Express"
            : formData.bankName,
        iban:
          selectedType === BankAccountType.NORMAL_BANK
            ? formData.iban
            : undefined,
        phoneNumber:
          selectedType === BankAccountType.MCX_EXPRESS
            ? formData.phoneNumber
            : undefined,
      });

      if (response.success) {
        toast.success("Conta vinculada com sucesso!");
        navigate("/contas-bancarias");
      }
    } catch (error) {
      toast.error("Erro ao vincular conta. Verifique os dados.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen font-display text-[#181112] dark:text-white antialiased">
      <PageHeader title="Vincular Conta" backTo="/contas-bancarias" />

      <main className="max-w-2xl mx-auto px-6 pt-28 pb-32">
        {step === "SELECT_TYPE" ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="mb-10 text-center">
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 font-medium">
                Como você deseja receber seus pagamentos?
              </p>
            </header>

            <div className="grid grid-cols-1 gap-4">
              <button
                onClick={() => {
                  setSelectedType(BankAccountType.NORMAL_BANK);
                  setStep("FILL_DATA");
                }}
                className="group p-6 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-[2.5rem] flex items-center gap-6 hover:border-primary transition-all hover:shadow-xl hover:shadow-primary/5 active:scale-[0.98]"
              >
                <div className="size-16 bg-primary/10 rounded-3xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-3xl">
                    account_balance
                  </span>
                </div>
                <div className="text-left">
                  <h3 className="font-black uppercase text-sm tracking-widest">
                    Conta Bancária
                  </h3>
                  <p className="text-xs text-gray-400 font-medium">
                    Transferência via IBAN (Qualquer banco)
                  </p>
                </div>
              </button>

              <button
                onClick={() => {
                  setSelectedType(BankAccountType.MCX_EXPRESS);
                  setStep("FILL_DATA");
                }}
                className="group p-6 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-[2.5rem] flex items-center gap-6 hover:border-primary transition-all hover:shadow-xl hover:shadow-primary/5 active:scale-[0.98]"
              >
                <div className="size-16 bg-primary/10 rounded-3xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-3xl">
                    phone_iphone
                  </span>
                </div>
                <div className="text-left">
                  <h3 className="font-black uppercase text-sm tracking-widest">
                    MCX Express
                  </h3>
                  <p className="text-xs text-gray-400 font-medium">
                    Pagamento via número de telefone
                  </p>
                </div>
              </button>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in zoom-in-95 duration-300">
            <header className="mb-10 text-center">
              <div className="size-20 bg-primary/10 rounded-[2.5rem] flex items-center justify-center text-primary mx-auto mb-6 transform -rotate-6">
                <span className="material-symbols-outlined text-4xl">
                  {selectedType === BankAccountType.NORMAL_BANK
                    ? "account_balance"
                    : "smartphone"}
                </span>
              </div>
              <h2 className="text-3xl font-black uppercase tracking-tighter">
                {selectedType === BankAccountType.NORMAL_BANK
                  ? "Dados Bancários"
                  : "Dados Express"}
              </h2>
            </header>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="space-y-6"
            >
              {selectedType === BankAccountType.NORMAL_BANK ? (
                <>
                  <div className="space-y-1 relative" ref={selectRef}>
                    <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-[0.2em]">
                      Instituição
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsSelectOpen(!isSelectOpen)}
                      className={`w-full h-14 pl-4 pr-6 rounded-xl bg-white dark:bg-gray-800 border transition-all flex items-center justify-between group ${
                        isSelectOpen
                          ? "border-primary ring-4 ring-primary/5"
                          : "border-gray-100 dark:border-gray-700"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {selectedBank ? (
                          <img
                            src={selectedBank.logo}
                            alt=""
                            className="size-6 object-contain"
                          />
                        ) : (
                          <div className="text-gray-400">
                            <span className="material-symbols-outlined text-lg">
                              account_balance
                            </span>
                          </div>
                        )}
                        <span
                          className={`font-bold text-sm ${
                            formData.bankName
                              ? "text-[#181112] dark:text-white"
                              : "text-gray-400"
                          }`}
                        >
                          {formData.bankName || "Escolha o banco..."}
                        </span>
                      </div>
                      <span
                        className={`material-symbols-outlined transition-transform duration-300 text-gray-400 ${
                          isSelectOpen ? "rotate-180" : ""
                        }`}
                      >
                        expand_more
                      </span>
                    </button>

                    {isSelectOpen && (
                      <div className="absolute z-[100] w-full mt-2 p-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="max-h-60 overflow-y-auto custom-scrollbar">
                          {BANKS.map((bank) => (
                            <button
                              key={bank.id}
                              type="button"
                              onClick={() => {
                                setFormData({
                                  ...formData,
                                  bankName: bank.name,
                                });
                                setIsSelectOpen(false);
                              }}
                              className="w-full p-3 flex items-center gap-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors group"
                            >
                              <div className="size-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center p-1 shrink-0">
                                <img
                                  src={bank.logo}
                                  alt={bank.name}
                                  className="w-full h-full object-contain"
                                />
                              </div>
                              <span className="font-bold text-sm uppercase tracking-tight group-hover:text-primary transition-colors">
                                {bank.name}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <TralloInput
                    label="Número do IBAN"
                    placeholder="AO06 0000 0000 0000 0000 0"
                    icon="pin"
                    value={formData.iban}
                    onChange={(val) =>
                      setFormData({ ...formData, iban: val.toUpperCase() })
                    }
                  />
                </>
              ) : (
                <TralloInput
                  label="Telefone Associado"
                  placeholder="9XX XXX XXX"
                  type="tel"
                  icon="phone_android"
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
                className="mt-4"
              >
                Confirmar
              </TralloButton>
            </form>
          </div>
        )}

        <div className="mt-8 p-6 bg-blue-50/50 dark:bg-blue-900/10 rounded-3xl border border-blue-100/50 dark:border-blue-900/20">
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-blue-500">
              info
            </span>
            <p className="text-xs text-blue-600/80 dark:text-blue-400 leading-relaxed font-medium">
              O TRALLO valida automaticamente a titularidade das contas.
              Certifique-se de que os dados inseridos correspondem ao seu nome
              completo.
            </p>
          </div>
        </div>
      </main>
      <BottomNavigation />
    </div>
  );
};

export default AddBankAccountScreen;
