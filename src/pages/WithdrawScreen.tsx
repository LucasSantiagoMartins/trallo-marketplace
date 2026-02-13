import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import MobileLayout from "@/layouts/MobileLayout";
import PageHeader from "@/components/PageHeader";
import PriceInput from "@/components/PriceInput";
import TralloButton from "@/components/TralloButton";
import BottomNavigation from "@/components/BottomNavigation";

const WithdrawScreen: React.FC = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleWithdraw = () => {
    if (!amount) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSheetOpen(false);
      navigate("/carteira");
    }, 2000);
  };

  return (
    <MobileLayout className="pb-10">
      <PageHeader title="Levantamento" backTo={-1} />

      {/* Ajustado pb-40 para garantir que o conteúdo não fique sob a BottomNavigation no mobile */}
      <main className="px-6 max-w-6xl mx-auto pt-32 pb-40 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LADO ESQUERDO: Status e Dados Bancários (Col 7) */}
          <div className="lg:col-span-7 space-y-4 lg:space-y-6">
            {/* Card Principal de Saldo - Reduzido padding no mobile */}
            <div className="bg-gradient-to-br from-[#6C3EF8] to-[#8B5CF6] p-6 lg:p-8 rounded-[2.5rem] text-white shadow-xl shadow-purple-500/20 relative overflow-hidden">
              <div className="absolute -right-10 -top-10 size-40 bg-white/10 rounded-full blur-3xl" />
              <div className="relative z-10">
                <p className="text-white/60 text-[10px] lg:text-xs uppercase font-black tracking-[0.2em] mb-1">
                  Saldo disponível para levantamento
                </p>
                <h2 className="text-3xl lg:text-4xl font-black">
                  1.250.000,00{" "}
                  <span className="text-lg lg:text-xl font-medium text-white/50">
                    Kz
                  </span>
                </h2>
              </div>
            </div>

            {/* Card de Informações - Mais compacto no mobile */}
            <div className="bg-white dark:bg-slate-900/40 border border-gray-100 dark:border-white/5 rounded-[2.5rem] p-5 lg:p-6 space-y-4 lg:space-y-6">
              <div className="flex items-start gap-4">
                <div className="size-10 lg:size-12 rounded-2xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 shrink-0">
                  <span className="material-symbols-outlined text-xl lg:text-2xl">
                    account_balance
                  </span>
                </div>
                <div>
                  <p className="text-[9px] lg:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                    Conta de Destino (IBAN)
                  </p>
                  <p className="font-bold text-sm lg:text-base text-foreground break-all">
                    AO06 0040 0000 1234 4829 1012 3
                  </p>
                </div>
              </div>

              <div className="h-px bg-gray-100 dark:bg-white/5 w-full" />

              <div className="flex items-start gap-4">
                <div className="size-10 lg:size-12 rounded-2xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center text-amber-600 shrink-0">
                  <span className="material-symbols-outlined text-xl lg:text-2xl">
                    schedule
                  </span>
                </div>
                <div>
                  <p className="text-[9px] lg:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                    Prazo de Processamento
                  </p>
                  <p className="text-xs lg:text-sm font-medium leading-relaxed">
                    Processado em até{" "}
                    <span className="font-black text-foreground">
                      24 horas úteis
                    </span>
                    .
                  </p>
                </div>
              </div>
            </div>

            {/* Botão Mobile - Agora mais visível devido ao pb-40 no main e redução de paddings acima */}
            <div className="lg:hidden pt-2">
              <TralloButton
                onClick={() => setIsSheetOpen(true)}
                fullWidth
                className="py-5 shadow-xl shadow-primary/30"
                icon="account_balance_wallet"
              >
                Solicitar Levantamento
              </TralloButton>
            </div>
          </div>

          {/* LADO DIREITO: Formulário Desktop (Col 5) */}
          <div className="hidden lg:block lg:col-span-5 bg-white dark:bg-slate-900/20 p-8 rounded-[2.5rem] border border-gray-100 dark:border-white/5 sticky top-32">
            <h3 className="text-xl font-black mb-8 tracking-tight">
              Configurar Saque
            </h3>

            <div className="space-y-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-[0.15em]">
                  Valor do Levantamento
                </label>
                <PriceInput
                  value={amount}
                  onChange={(e) =>
                    setAmount(
                      e.target.value
                        .replace(/\D/g, "")
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."),
                    )
                  }
                />
                <div className="flex justify-between items-center px-1">
                  <button
                    onClick={() => setAmount("1.250.000")}
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
                disabled={!amount}
                className="py-5 text-base"
                icon="check_circle"
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
              drag="y"
              dragConstraints={{ top: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) =>
                info.offset.y > 100 && setIsSheetOpen(false)
              }
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
                    onChange={(e) =>
                      setAmount(
                        e.target.value
                          .replace(/\D/g, "")
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."),
                      )
                    }
                  />
                </div>

                <TralloButton
                  onClick={handleWithdraw}
                  fullWidth
                  isLoading={loading}
                  disabled={!amount}
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
