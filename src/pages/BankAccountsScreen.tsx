import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import BottomNavigation from "@/components/BottomNavigation";
import { bankService } from "@/services/bank.service";
import { BankAccountDTO } from "@/dtos/bank.dto";
import PageHeader from "@/components/PageHeader";
import EditBankAccountSheet from "@/components/EditBankAccountSheet";
import ConfirmAction from "@/components/ConfirmAction";

const BankAccountsScreen: React.FC = () => {
  const [accounts, setAccounts] = useState<BankAccountDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<BankAccountDTO | null>(
    null,
  );
  const [accountToDelete, setAccountToDelete] = useState<BankAccountDTO | null>(
    null,
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const navigate = useNavigate();

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const response = await bankService.getAccounts();
      if (response.success) {
        setAccounts(response.data);
      }
    } catch (error) {
      console.error("Erro ao carregar contas:", error);
    } finally {
      setLoading(false);
    }
  };

  const openEdit = (acc: BankAccountDTO) => {
    setSelectedAccount(acc);
    setIsEditOpen(true);
  };

  const confirmDelete = async () => {
    if (!accountToDelete) return;

    setIsDeleting(true);
    try {
      const response = await bankService.deleteAccount(accountToDelete.id);
      if (response.success) {
        setAccounts((prev) =>
          prev.filter((acc) => acc.id !== accountToDelete.id),
        );
        toast.success("Conta eliminada com sucesso");
        setAccountToDelete(null);
      }
    } catch (error) {
      toast.error("Erro ao eliminar conta");
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

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
                  <span className="material-symbols-outlined text-3xl">
                    account_balance
                  </span>
                </div>
                <h2 className="text-2xl font-black leading-tight">
                  Gestão de Pagamentos
                </h2>
                <p className="text-white/70 mt-3 text-sm leading-relaxed">
                  Adicione e gerencie suas contas bancárias para realizar
                  levantamentos de forma segura e rápida.
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
                  <p className="opacity-50 font-bold italic text-sm text-primary">
                    Carregando...
                  </p>
                </div>
              ) : accounts.length > 0 ? (
                accounts.map((acc) => (
                  <div
                    key={acc.id}
                    className="p-5 bg-white dark:bg-gray-800/50 rounded-3xl border border-gray-100 dark:border-gray-700 hover:border-primary/50 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-4 overflow-hidden">
                      <div className="size-14 shrink-0 rounded-2xl flex items-center justify-center transition-colors bg-gray-100 dark:bg-gray-800 text-primary group-hover:bg-primary group-hover:text-white">
                        <span className="material-symbols-outlined text-2xl">
                          {acc.type === "MCX_EXPRESS"
                            ? "phone_iphone"
                            : "account_balance_wallet"}
                        </span>
                      </div>
                      <div className="overflow-hidden">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-black text-[#181112] dark:text-white uppercase text-[11px] tracking-widest truncate">
                            {acc.bankName ||
                              (acc.type === "MCX_EXPRESS"
                                ? "Multicaixa Express"
                                : "Banco")}
                          </p>
                        </div>
                        <p className="text-sm font-mono font-medium truncate max-w-[180px] sm:max-w-none opacity-80">
                          {acc.type === "MCX_EXPRESS"
                            ? acc.phoneNumber
                            : acc.iban}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => openEdit(acc)}
                        className="size-10 rounded-full flex items-center justify-center text-gray-300 hover:text-blue-500 transition-all active:scale-90"
                      >
                        <span className="material-symbols-outlined text-xl">
                          edit
                        </span>
                      </button>
                      <button
                        onClick={() => setAccountToDelete(acc)}
                        className="size-10 rounded-full flex items-center justify-center text-gray-300 hover:text-red-500 transition-all active:scale-90"
                      >
                        <span className="material-symbols-outlined text-xl">
                          delete
                        </span>
                      </button>
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
        onConfirm={confirmDelete}
        isLoading={isDeleting}
        title="Eliminar conta?"
        description={`Tem certeza que deseja remover esta conta de ${accountToDelete?.bankName || "pagamento"}?`}
        confirmText={isDeleting ? "A eliminar..." : "Sim, eliminar"}
        details={
          accountToDelete
            ? accountToDelete.type === "MCX_EXPRESS"
              ? accountToDelete.phoneNumber
              : accountToDelete.iban
            : undefined
        }
        icon="warning"
        variant="danger"
      />

      <BottomNavigation />
    </div>
  );
};

export default BankAccountsScreen;
