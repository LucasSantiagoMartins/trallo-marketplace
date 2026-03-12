import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import MobileLayout from "@/layouts/MobileLayout";
import PageHeader from "@/components/PageHeader";
import PriceInput from "@/components/PriceInput";
import TralloButton from "@/components/TralloButton";
import BottomNavigation from "@/components/BottomNavigation";
import MfaVerificationModal from "@/components/MfaVerificationModal";
import { withdrawalService } from "@/services/withdrawal.service";
import { walletService } from "@/services/wallet.service";
import { bankService } from "@/services/bank.service";
import { formatPrice } from "@/utils/currency";
import { VerificationType } from "@/enums/verification-type.enum";
import { requestCode } from "@/services/user-security.service";

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

  // Estados para o MFA
  const [isMfaOpen, setIsMfaOpen] = useState(false);
  const [mfaLoading, setMfaLoading] = useState(false);

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

  // 1. Solicita o código e abre o Modal de MFA
  const handleInitiateWithdraw = async () => {
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
      // Solicita o código de verificação antes de abrir o modal
      const res = await requestCode(
        VerificationType.WITHDRAWAL,
      );

      if (res.success) {
        setIsMfaOpen(true);
      } else {
        toast.error(res.message || "Erro ao solicitar código de segurança.");
      }
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Não foi possível enviar o código.",
      );
    } finally {
      setLoading(false);
    }
  };

  // 2. Finaliza o processo enviando o código digitado no modal
  const handleFinalSubmit = async (code: string) => {
    setMfaLoading(true);
    try {
      const res = await withdrawalService.requestWithdrawal({
        amount: Number(amount),
        bankAccountId: selectedAccountId!,
        code: code,
      });

      if (res.success) {
        toast.success(res.message || "Pedido enviado com sucesso!");
        setIsMfaOpen(false);
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
      setMfaLoading(false);
    }
  };

  const ShortcutBadge = ({
    value,
    colorClass,
    hoverClass,
  }: {
    value: number;
    colorClass: string;
    hoverClass: string;
  }) => (
    <button
      onClick={() => setAmount(String(Math.floor(value)))}
      className={`flex-1 ${colorClass} ${hoverClass} backdrop-blur-md transition-all duration-300 py-2.5 px-1 rounded-full border border-transparent active:scale-90 flex items-center justify-center group`}
    >
      <p className="text-[10px] font-black truncate text-center tracking-tight group-hover:scale-105 transition-transform">
        {formatPrice(value, false)}
      </p>
    </button>
  );

  return (
    <MobileLayout className="pb-10">
      <PageHeader title="Levantamento" />

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

                <div className="flex gap-2">
                  <ShortcutBadge
                    value={availableBalance / 3}
                    colorClass="bg-blue-50/50 text-blue-600 dark:bg-blue-500/5 dark:text-blue-400"
                    hoverClass="hover:border-blue-400/50 hover:bg-blue-100/50 dark:hover:bg-blue-500/10"
                  />
                  <ShortcutBadge
                    value={availableBalance / 2}
                    colorClass="bg-purple-50/50 text-purple-600 dark:bg-purple-500/5 dark:text-purple-400"
                    hoverClass="hover:border-purple-400/50 hover:bg-purple-100/50 dark:hover:bg-purple-500/10"
                  />
                  <ShortcutBadge
                    value={availableBalance}
                    colorClass="bg-emerald-50/50 text-emerald-600 dark:bg-emerald-500/5 dark:text-emerald-400"
                    hoverClass="hover:border-emerald-400/50 hover:bg-emerald-100/50 dark:hover:bg-emerald-500/10"
                  />
                </div>
              </div>

              <TralloButton
                onClick={handleInitiateWithdraw}
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

                  <div className="flex gap-2">
                    <ShortcutBadge
                      value={availableBalance / 3}
                      colorClass="bg-blue-50/50 text-blue-600 dark:bg-blue-500/5 dark:text-blue-400"
                      hoverClass="hover:border-blue-400/50"
                    />
                    <ShortcutBadge
                      value={availableBalance / 2}
                      colorClass="bg-purple-50/50 text-purple-600 dark:bg-purple-500/5 dark:text-purple-400"
                      hoverClass="hover:border-purple-400/50"
                    />
                    <ShortcutBadge
                      value={availableBalance}
                      colorClass="bg-emerald-50/50 text-emerald-600 dark:bg-emerald-500/5 dark:text-emerald-400"
                      hoverClass="hover:border-emerald-400/50"
                    />
                  </div>
                </div>

                <TralloButton
                  onClick={handleInitiateWithdraw}
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

      <MfaVerificationModal
        isOpen={isMfaOpen}
        onClose={() => setIsMfaOpen(false)}
        onSubmit={handleFinalSubmit}
        isLoading={mfaLoading}
        type={VerificationType.WITHDRAWAL}
      />
    </MobileLayout>
  );
};

export default WithdrawScreen;
