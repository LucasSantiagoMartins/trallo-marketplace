import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import MobileLayout from "@/layouts/MobileLayout";
import PageHeader from "@/components/PageHeader";
import PriceInput from "@/components/PriceInput";
import TralloButton from "@/components/TralloButton";
import BottomNavigation from "@/components/BottomNavigation";
import { withdrawalService } from "@/services/withdrawal.service";
import { walletService } from "@/services/wallet.service";
import { bankService } from "@/services/bank.service";
import { formatPrice } from "@/utils/currency";

const WithdrawScreen: React.FC = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchingBalance, setFetchingBalance] = useState(true);
  const [availableBalance, setAvailableBalance] = useState<number>(0);
  const [accounts, setAccounts] = useState<any[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    null,
  );
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    const loadInitialData = async () => {
      setFetchingBalance(true);
      try {
        const [balanceRes, accountsRes] = await Promise.all([
          walletService.getWalletSummary(),
          bankService.getAccounts(),
        ]);

        if (balanceRes.success) {
          setAvailableBalance(balanceRes.data.availableBalance);
        }

        if (accountsRes.success) {
          setAccounts(accountsRes.data);
          if (accountsRes.data.length > 0) {
            setSelectedAccountId(accountsRes.data[0].id);
          }
        }
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        toast.error("Erro ao carregar informações.");
      } finally {
        setFetchingBalance(false);
      }
    };

    loadInitialData();
  }, []);

  const handleWithdraw = async () => {
    const numericAmount = Number(amount);

    if (!selectedAccountId) {
      toast.error("Selecione uma conta de destino.");
      return;
    }

    if (!amount || numericAmount <= 0) {
      toast.error("Insira um valor válido.");
      return;
    }

    if (numericAmount > availableBalance) {
      toast.error("Saldo insuficiente.");
      return;
    }

    setLoading(true);
    try {
      const res = await withdrawalService.requestWithdrawal({
        amount: numericAmount,
        bankAccountId: selectedAccountId,
      });

      if (res.success) {
        toast.success(res.message || "Pedido enviado com sucesso!");
        setIsSheetOpen(false);
        navigate("/carteira");
      } else {
        toast.error(res.message || "Erro ao processar levantamento.");
      }
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || err.message || "Erro no servidor.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <MobileLayout className="pb-10">
      <PageHeader title="Levantamento" backTo={-1} />

      <main className="px-6 max-w-6xl mx-auto pt-32 pb-40 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4 lg:space-y-6">
            <div className="bg-gradient-to-br from-[#6C3EF8] to-[#8B5CF6] p-6 lg:p-8 rounded-[2.1rem] text-white shadow-xl shadow-purple-500/20 relative overflow-hidden">
              <div className="absolute -right-10 -top-10 size-40 bg-white/10 rounded-full blur-3xl" />
              <div className="relative z-10">
                <p className="text-white/60 text-[10px] lg:text-xs uppercase font-black tracking-[0.2em] mb-1">
                  Saldo disponível para levantamento
                </p>
                <h2 className="text-3xl lg:text-4xl font-black">
                  {fetchingBalance
                    ? "---"
                    : formatPrice(availableBalance, false)}{" "}
                  <span className="text-lg lg:text-xl font-medium text-white/50">
                    Kz
                  </span>
                </h2>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">
                Selecione a conta de destino
              </p>

              <div className="grid grid-cols-1 gap-2">
                {accounts.map((acc) => {
                  const isMCX = acc.type === "MCX_EXPRESS";
                  return (
                    <button
                      key={acc.id}
                      onClick={() => setSelectedAccountId(acc.id)}
                      className={`relative text-left bg-white dark:bg-slate-900/40 border-2 transition-all rounded-[1.8rem] p-4 flex items-center gap-4 ${
                        selectedAccountId === acc.id
                          ? "border-primary shadow-md shadow-primary/5"
                          : "border-gray-100 dark:border-white/5"
                      }`}
                    >
                      <div
                        className={`size-10 rounded-xl flex items-center justify-center shrink-0 ${
                          isMCX
                            ? "bg-orange-50 text-orange-600 dark:bg-orange-500/10"
                            : "bg-blue-50 text-blue-600 dark:bg-blue-500/10"
                        }`}
                      >
                        <span className="material-symbols-outlined text-xl">
                          {isMCX ? "smartphone" : "account_balance"}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0 pr-6">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest truncate">
                          {isMCX ? "MCX Express" : acc.bankName || "Banco"}
                        </p>
                        <p className="font-bold text-sm text-foreground truncate">
                          {isMCX ? acc.phoneNumber : acc.iban}
                        </p>
                      </div>

                      {selectedAccountId === acc.id && (
                        <div className="absolute right-4 text-primary">
                          <span className="material-symbols-outlined font-bold text-lg">
                            check_circle
                          </span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="bg-white dark:bg-slate-900/40 border border-gray-100 dark:border-white/5 rounded-[1.8rem] p-4 flex items-center gap-4">
                <div className="size-10 rounded-xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center text-amber-600 shrink-0">
                  <span className="material-symbols-outlined text-xl">
                    schedule
                  </span>
                </div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    Prazo
                  </p>
                  <p className="text-xs font-medium text-foreground">
                    Até <span className="font-black">48h úteis</span>.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:hidden pt-2">
              <TralloButton
                onClick={() => setIsSheetOpen(true)}
                fullWidth
                className="py-5 shadow-xl shadow-primary/30"
                disabled={fetchingBalance || accounts.length === 0}
              >
                Solicitar Levantamento
              </TralloButton>
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-5 bg-white dark:bg-slate-900/20 p-8 rounded-[2.5rem] border border-gray-100 dark:border-white/5 sticky top-32">
            <div className="space-y-8">
              <div className="space-y-4">
                <PriceInput
                  value={amount}
                  title="Valor do levantamento"
                  onChange={(val: any) =>
                    setAmount(String(val).replace(/\D/g, ""))
                  }
                />
                <div className="flex justify-between items-center px-1">
                  <button
                    onClick={() => setAmount(String(availableBalance))}
                    className="text-[10px] font-black text-primary uppercase hover:underline"
                  >
                    Levantar saldo total
                  </button>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    Taxa: 0 Kz
                  </span>
                </div>
              </div>

              <TralloButton
                onClick={handleWithdraw}
                fullWidth
                isLoading={loading}
                disabled={
                  !amount || loading || fetchingBalance || !selectedAccountId
                }
                className="py-5 text-base"
              >
                Confirmar Levantamento
              </TralloButton>
            </div>
          </div>
        </div>
      </main>

      <BottomNavigation />

      <AnimatePresence>
        {isSheetOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSheetOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] lg:hidden"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#111118] z-[101] rounded-t-[3rem] p-8 pb-12 lg:hidden shadow-2xl border-t border-white/5"
            >
              <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full mx-auto mb-10" />
              <div className="space-y-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    Valor do Levantamento
                  </label>
                  <PriceInput
                    value={amount}
                    onChange={(val: any) =>
                      setAmount(String(val).replace(/\D/g, ""))
                    }
                  />
                  <button
                    onClick={() => setAmount(String(availableBalance))}
                    className="text-[10px] font-black text-primary uppercase"
                  >
                    Saldo total: {formatPrice(availableBalance, true)}
                  </button>
                </div>

                <TralloButton
                  onClick={handleWithdraw}
                  fullWidth
                  isLoading={loading}
                  disabled={!amount || loading || !selectedAccountId}
                  className="py-5"
                  icon="check_circle"
                >
                  Confirmar Levantamento
                </TralloButton>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </MobileLayout>
  );
};

export default WithdrawScreen;
