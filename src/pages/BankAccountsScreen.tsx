import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import BottomNavigation from "@/components/BottomNavigation";
import { bankService } from "@/services/bank.service";
import { BankAccountDTO } from "@/dtos/bank.dto";
import { VerificationType } from "@/enums/verification-type.enum";
import PageHeader from "@/components/PageHeader";
import EditBankAccountSheet from "@/components/EditBankAccountSheet";
import ConfirmAction from "@/components/ConfirmAction";
import MfaVerificationModal from "@/components/MfaVerificationModal";
import { useAuth } from "@/context/AuthContext";
import { requestCode } from "@/services/user-security.service";

import baiImg from "@/assets/images/banks/bai.png";
import bfaImg from "@/assets/images/banks/bfa.png";
import bicImg from "@/assets/images/banks/bic.png";
import keveImg from "@/assets/images/banks/keve.png";
import millenniumImg from "@/assets/images/banks/millennium.png";
import solImg from "@/assets/images/banks/sol.png";
import mcxImg from "@/assets/images/banks/mcx_express.png";

const BANKS = [
  { id: "bai", name: "BAI", logo: baiImg },
  { id: "bfa", name: "BFA", logo: bfaImg },
  { id: "bic", name: "BIC", logo: bicImg },
  { id: "sol", name: "BANCO SOL", logo: solImg },
  { id: "millennium", name: "MILLENNIUM ATLÂNTICO", logo: millenniumImg },
  { id: "keve", name: "BANCO KEVE", logo: keveImg },
];

const BankAccountsScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [accounts, setAccounts] = useState<BankAccountDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<BankAccountDTO | null>(null);

  const [accountToDelete, setAccountToDelete] = useState<BankAccountDTO | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMfaOpen, setIsMfaOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const response = await bankService.getAccounts();
      if (response.success) setAccounts(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const openEdit = (acc: BankAccountDTO) => {
    setSelectedAccount(acc);
    setIsEditOpen(true);
    setActiveMenu(null);
  };

  const handleInitiateDelete = async () => {
    if (!accountToDelete) return;

    // Se a segurança estiver desativada, deleta direto
    if (user?.secureOperations === false) {
      return handleFinalDelete("");
    }

    setIsDeleting(true);
    try {
      const res = await requestCode(VerificationType.CHANGE_BANK);
      if (res.success) {
        setIsMfaOpen(true);
      } else {
        toast.error(res.message || "Erro ao solicitar código.");
      }
    } catch (err: any) {
      toast.error("Falha ao enviar código de verificação.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleFinalDelete = async (code: string) => {
    if (!accountToDelete) return;

    setIsDeleting(true);
    try {
      const response = await bankService.deleteAccount(accountToDelete.id, code);
      if (response.success) {
        setAccounts((prev) => prev.filter((acc) => acc.id !== accountToDelete.id));
        toast.success("Conta eliminada com sucesso");
        setIsMfaOpen(false);
        setAccountToDelete(null);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message || "Erro ao eliminar conta");
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const getBankContent = (acc: BankAccountDTO) => {
    if (acc.type === "MCX_EXPRESS") {
      return <img src={mcxImg} alt="MCX" className="size-10 object-contain" />;
    }
    const bank = BANKS.find((b) =>
      acc.bankName?.toUpperCase().includes(b.name.replace("BANCO ", "").toUpperCase())
    );
    return bank ? (
      <img src={bank.logo} alt={bank.name} className="size-10 object-contain" />
    ) : (
      <span className="material-symbols-outlined text-2xl">account_balance_wallet</span>
    );
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen font-display text-[#181112] dark:text-white antialiased">
      <PageHeader title="Minhas Contas" />

      <main className="max-w-6xl mx-auto px-6 pt-28 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <div className="sticky top-28 bg-gradient-to-br from-primary to-[#6C3EF8] p-8 rounded-[2.5rem] text-white shadow-xl shadow-primary/20 overflow-hidden relative">
              <div className="absolute -right-10 -top-10 size-40 bg-white/10 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="size-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-3xl">account_balance</span>
                </div>
                <h2 className="text-2xl font-black leading-tight">Gestão de Pagamentos</h2>
                <p className="text-white/70 mt-3 text-sm leading-relaxed">
                  Adicione e gerencie suas contas bancárias para realizar levantamentos de forma segura.
                </p>
                <button
                  onClick={() => navigate("/contas-bancarias/nova")}
                  className="mt-8 w-full bg-white text-primary h-14 rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg"
                >
                  <span className="material-symbols-outlined">add</span>
                  Nova Conta
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="space-y-4">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <div className="size-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                  <p className="opacity-50 font-bold italic text-sm text-primary">Carregando...</p>
                </div>
              ) : accounts.length > 0 ? (
                accounts.map((acc) => (
                  <div
                    key={acc.id}
                    className="p-5 bg-white dark:bg-gray-800/50 rounded-3xl border border-gray-100 dark:border-gray-700 hover:border-primary/50 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-4 overflow-hidden">
                      <div className="size-14 shrink-0 rounded-full flex items-center justify-center transition-colors bg-gray-100 dark:bg-gray-800 text-primary group-hover:bg-primary/10">
                        {getBankContent(acc)}
                      </div>
                      <div className="overflow-hidden">
                        <p className="font-black text-[#181112] dark:text-white uppercase text-[11px] tracking-widest truncate">
                          {acc.type === "MCX_EXPRESS" ? "Multicaixa Express" : acc.bankName || "Banco"}
                        </p>
                        <p className="text-sm font-mono font-medium truncate opacity-80">
                          {acc.type === "MCX_EXPRESS" ? acc.phoneNumber : acc.iban}
                        </p>
                      </div>
                    </div>

                    <div className="relative">
                      <button
                        onClick={() => setActiveMenu(activeMenu === acc.id ? null : acc.id)}
                        className="size-10 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all active:scale-90"
                      >
                        <span className="material-symbols-outlined">more_vert</span>
                      </button>

                      {activeMenu === acc.id && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setActiveMenu(null)} />
                          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 z-20 animate-in fade-in zoom-in duration-200">
                            <button
                              onClick={() => openEdit(acc)}
                              className="w-full px-4 py-3 flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                            >
                              <span className="material-symbols-outlined text-lg">edit</span>
                              Editar conta
                            </button>
                            <button
                              onClick={() => {
                                setAccountToDelete(acc);
                                setActiveMenu(null);
                              }}
                              className="w-full px-4 py-3 flex items-center gap-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                            >
                              <span className="material-symbols-outlined text-lg">delete</span>
                              Eliminar conta
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-20 text-center border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-[3rem] text-gray-400 font-bold">
                  Nenhuma conta registada.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <EditBankAccountSheet
        isOpen={isEditOpen}
        account={selectedAccount}
        onClose={() => setIsEditOpen(false)}
        onSuccess={fetchAccounts}
      />

      <ConfirmAction
        isOpen={!!accountToDelete}
        onClose={() => setAccountToDelete(null)}
        onConfirm={handleInitiateDelete}
        isLoading={isDeleting}
        title="Eliminar conta?"
        description={`Tem certeza que deseja remover esta conta?`}
        confirmText="Sim, eliminar"
        variant="danger"
      />

      <MfaVerificationModal
        isOpen={isMfaOpen}
        onClose={() => setIsMfaOpen(false)}
        onSubmit={handleFinalDelete}
        isLoading={isDeleting}
        type={VerificationType.CHANGE_BANK}
      />

      <BottomNavigation />
    </div>
  );
};

export default BankAccountsScreen;