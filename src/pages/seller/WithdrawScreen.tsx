import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import MobileLayout from "@/layouts/MobileLayout";
import PageHeader from "@/components/PageHeader";
import PriceInput from "@/components/PriceInput";
import TralloButton from "@/components/TralloButton";
import BottomNavigation from "@/components/BottomNavigation";
import SecurityVerificationModal from "@/components/SecurityVerificationModal";
import SummaryCard from "@/components/SummaryCard";
import { withdrawalService } from "@/services/withdrawal.service";
import { walletService } from "@/services/wallet.service";
import { bankService } from "@/services/bank.service";
import { formatPrice } from "@/utils/currency";
import { VerificationType } from "@/enums/verification-type.enum";
import { useAuth } from "@/context/AuthContext";
import { requestCode } from "@/services/user-security.service";

const WithdrawScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchingBalance, setFetchingBalance] = useState(true);
  const [availableBalance, setAvailableBalance] = useState<number>(0);
  const [accounts, setAccounts] = useState<any[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    null,
  );
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

    if (!user?.secureOperations) {
      return handleFinalSubmit("");
    }

    setLoading(true);
    try {
      const res = await requestCode(VerificationType.WITHDRAWAL);
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

  const handleFinalSubmit = async (code: string) => {
    if (code) setMfaLoading(true);
    else setLoading(true);

    try {
      const res = await withdrawalService.requestWithdrawal({
        amount: Number(amount),
        bankAccountId: selectedAccountId!,
        code: code,
      });

      if (res.success) {
        toast.success(res.message || "Pedido enviado com sucesso!");
        setIsMfaOpen(false);
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
      setLoading(false);
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

      <main className="px-6 max-w-6xl mx-auto pt-24 pb-40 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4 lg:space-y-6">
            <div className="hidden lg:block">
              <SummaryCard
                label="Saldo disponível para levantamento"
                value={
                  fetchingBalance
                    ? "---"
                    : `${formatPrice(availableBalance, false)} Kz`
                }
                icon="account_balance_wallet"
              />
            </div>

            <div className="lg:hidden space-y-4 bg-white dark:bg-slate-900/20 p-6 rounded-[2.1rem] border border-gray-100 dark:border-white/5">
              <PriceInput
                value={amount}
                width="max-w-full"
                title="Valor do levantamento"
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
                      className={`relative text-left bg-white dark:bg-slate-900/40 border-2 transition-all rounded-2xl p-6 flex items-center gap-4 ${
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
            </div>

            <div className="lg:hidden pt-2">
              <TralloButton
                onClick={handleInitiateWithdraw}
                fullWidth
                isLoading={loading}
                className="py-5 shadow-xl shadow-primary/30"
                disabled={
                  !amount || loading || fetchingBalance || !selectedAccountId
                }
              >
                Confirmar Levantamento
              </TralloButton>
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-5 bg-white dark:bg-slate-900/20 p-8 rounded-[2.5rem] border border-gray-100 dark:border-white/5 sticky top-24">
            <div className="space-y-8">
              <div className="space-y-4">
                <PriceInput
                  value={amount}
                  width="max-w-full"
                  title="Valor do levantamento"
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

      <SecurityVerificationModal
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
