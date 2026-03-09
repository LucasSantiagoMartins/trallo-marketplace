import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import { bankService } from "@/services/bank.service";
import { BankAccountDTO } from "@/dtos/bank.dto";
import PageHeader from "@/components/PageHeader";
import EditBankAccountSheet from "@/components/EditBankAccountSheet";

const BankAccountsScreen: React.FC = () => {
  const [accounts, setAccounts] = useState<BankAccountDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<BankAccountDTO | null>(
    null,
  );
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

  const handleDelete = async (id: string) => {
    try {
      const response = await bankService.deleteAccount(id);
      if (response.success) {
        setAccounts((prev) => prev.filter((acc) => acc.id !== id));
      }
    } catch (error) {
      console.error("Erro ao deletar conta:", error);
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
            <div className="sticky top-28 bg-gradient-to-br from-primary to-[#6C3EF8] p-8 rounded-[2.5rem] text-white shadow-xl shadow-primary/20">
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
                levantamentos de forma segura e rápida no TRALLO.
              </p>
              <button
                onClick={() => navigate("/contas-bancarias/nova")}
                className="mt-8 w-full bg-white text-primary h-14 rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-95 hover:bg-opacity-90 transition-all shadow-lg"
              >
                <span className="material-symbols-outlined">add</span>
                Nova Conta
              </button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="space-y-4">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <div className="size-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                  <p className="opacity-50 font-bold italic text-sm text-primary">
                    Carregando suas contas...
                  </p>
                </div>
              ) : accounts.length > 0 ? (
                accounts
                  .sort((a, b) => Number(b.isDefault) - Number(a.isDefault))
                  .map((acc) => (
                    <div
                      key={acc.id}
                      className={`p-5 bg-white dark:bg-gray-800/50 rounded-3xl border transition-all flex items-center justify-between group hover:shadow-md ${
                        acc.isDefault
                          ? "border-primary shadow-lg shadow-primary/5 bg-primary/[0.02]"
                          : "border-gray-100 dark:border-gray-700 hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center gap-4 overflow-hidden">
                        <div
                          className={`size-14 shrink-0 rounded-2xl flex items-center justify-center transition-colors ${
                            acc.isDefault
                              ? "bg-primary text-white shadow-md shadow-primary/20"
                              : "bg-gray-100 dark:bg-gray-800 text-primary group-hover:bg-primary group-hover:text-white"
                          }`}
                        >
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
                                  : "Banco Geral")}
                            </p>
                            {acc.isDefault && (
                              <span className="shrink-0 bg-primary text-white text-[8px] px-2 py-0.5 rounded-full font-black uppercase tracking-tighter">
                                Principal
                              </span>
                            )}
                          </div>
                          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-mono font-medium tracking-tight truncate max-w-[180px] sm:max-w-none">
                            {acc.type === "MCX_EXPRESS"
                              ? acc.phoneNumber
                              : acc.iban}
                          </p>
                          {acc.accountNumber && (
                            <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-tighter truncate">
                              Nº Conta: {acc.accountNumber}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0 ml-2">
                        <button
                          onClick={() => openEdit(acc)}
                          className="size-10 rounded-full flex items-center justify-center text-gray-300 hover:bg-blue-50 hover:text-blue-500 dark:hover:bg-blue-500/10 transition-all active:scale-90"
                        >
                          <span className="material-symbols-outlined text-xl">
                            edit
                          </span>
                        </button>

                        <button
                          onClick={() => handleDelete(acc.id)}
                          className="size-10 rounded-full flex items-center justify-center text-gray-300 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10 transition-all active:scale-90"
                        >
                          <span className="material-symbols-outlined text-xl">
                            delete
                          </span>
                        </button>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="py-20 text-center border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-[3rem] flex flex-col items-center justify-center">
                  <div className="size-16 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center mb-4 text-gray-300">
                    <span className="material-symbols-outlined text-3xl">
                      no_accounts
                    </span>
                  </div>
                  <p className="font-bold text-gray-400">
                    Nenhuma conta registada.
                  </p>
                  <p className="text-xs text-gray-400/60 mt-1">
                    Suas contas salvas aparecerão aqui.
                  </p>
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

      <BottomNavigation />
    </div>
  );
};

export default BankAccountsScreen;
