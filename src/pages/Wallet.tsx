import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/layouts/MobileLayout";
import PageHeader from "@/components/PageHeader";
import BottomNavigation from "@/components/BottomNavigation";
import PerformanceCard from "../components/PerformanceCard";
import MyTransactionCard from "@/components/MyTransactionCard";
import { useAuth } from "@/context/AuthContext";
import { walletService } from "@/services/wallet.service";
import { WalletSummaryDTO } from "@/dtos/wallet";
import { formatPrice } from "@/utils/currency";

const WalletScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [loading, setLoading] = useState(true);
  const [walletData, setWalletData] = useState<WalletSummaryDTO | null>(null);

  const navigate = useNavigate();
  const { user } = useAuth();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const fetchWalletSummary = async () => {
    setLoading(true);
    try {
      const response = await walletService.getWalletSummary();
      if (response.success) {
        setWalletData(response.data);
      }
    } catch (error) {
      console.error("Erro ao buscar dados da carteira:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWalletSummary();
  }, []);

  const RightElement = (
    <div
      className="flex items-center gap-3 cursor-pointer"
      onClick={() => navigate("/perfil")}
    >
      <div className="text-right hidden sm:block">
        <p className="text-[10px] text-[#8c5f67] dark:text-gray-400 font-bold uppercase tracking-wider">
          Olá, {user?.fullName || "Vendedor"}
        </p>
      </div>
      <div className="size-10 rounded-full border-2 border-primary/20 p-0.5 shadow-sm">
        <div
          className="w-full h-full rounded-full bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=100&h=100&auto=format&fit=crop")',
          }}
        />
      </div>
    </div>
  );

  return (
    <MobileLayout>
      <PageHeader title="Minha Carteira" rightElement={RightElement} />

      <main className="max-w-6xl mx-auto px-6 pt-24 pb-32 lg:pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Coluna Esquerda: Carteira FIXA */}
          <div className="lg:col-span-5">
            <div className="lg:fixed lg:w-[calc((1152px-40px)*5/12-2.5rem)] max-w-[440px] space-y-6">
              <div className="relative overflow-hidden rounded-[2.5rem] p-6 min-h-[220px] flex flex-col justify-between bg-gradient-to-br from-[#6C3EF8] to-[#8B5CF6] shadow-xl shadow-purple-500/20">
                <div className="absolute -right-10 -top-10 size-40 bg-white/10 rounded-full blur-2xl"></div>

                <div className="relative z-10">
                  <div>
                    <p className="text-white/80 text-sm font-medium">
                      Saldo Disponível
                    </p>
                    <h2 className="text-white text-3xl font-black mt-1">
                      {isVisible
                        ? formatPrice(walletData?.availableBalance || 0, false)
                        : "••••••••"}{" "}
                      <span className="text-sm font-medium opacity-60">Kz</span>
                    </h2>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-white/70">
                    <span className="material-symbols-outlined text-sm">
                      lock
                    </span>
                    <p className="text-xs font-medium uppercase tracking-wider">
                      Saldo Retido:{" "}
                      <span className="text-white font-bold">
                        {isVisible
                          ? formatPrice(walletData?.heldBalance || 0, true)
                          : "••••"}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="relative z-10 flex justify-between items-end mt-6">
                  <div>
                    <p className="text-white/60 text-[10px] uppercase tracking-widest">
                      ID da Carteira
                    </p>
                    <p className="text-white tracking-widest font-mono text-xs opacity-80">
                      {walletData?.id.split("-")[0]}...
                      {walletData?.id.split("-").pop()}
                    </p>
                  </div>
                  <button
                    onClick={toggleVisibility}
                    className="size-10 rounded-full bg-white/20 border border-white/30 backdrop-blur-sm flex items-center justify-center text-white active:scale-90 transition-transform"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {isVisible ? "visibility" : "visibility_off"}
                    </span>
                  </button>
                </div>
              </div>

              <button
                onClick={() => navigate("/realizar-levantamento")}
                className="w-full bg-primary text-white h-14 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/30 active:scale-[0.98] transition-all"
              >
                <span>Realizar levantamento</span>
              </button>

              <div className="p-6 bg-gradient-to-b from-white to-gray-50 dark:from-slate-900/40 dark:to-slate-900/60 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-sm">
                <div className="size-12 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] flex items-center justify-center text-white mb-4 shadow-lg shadow-purple-500/20">
                  <span className="material-symbols-outlined">lock_clock</span>
                </div>
                <h4 className="font-black text-lg mb-2 tracking-tight text-[#181112] dark:text-white">
                  Por que o saldo está retido?
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  Este montante corresponde a pedidos já pagos e aguardando
                  apenas a entrega ao cliente para ser liberado na sua conta.
                </p>
              </div>
            </div>
          </div>

          {/* Coluna Direita: Desempenho e Transações */}
          <div className="lg:col-span-7 lg:col-start-6">
            <PerformanceCard />

            <div className="flex items-center justify-between mb-6 mt-10 lg:mt-0">
              <h3 className="text-xl font-bold tracking-tight">
                Transações Recentes
              </h3>
              <button
                onClick={() => navigate("/transacoes")}
                className="text-primary text-sm font-bold hover:underline"
              >
                Ver tudo
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {loading ? (
                <div className="text-center py-12 opacity-50 font-bold animate-pulse">
                  Carregando transações...
                </div>
              ) : walletData && walletData.transactions.length > 0 ? (
                walletData.transactions.map((transaction) => (
                  <MyTransactionCard key={transaction.id} {...transaction} />
                ))
              ) : (
                <div className="py-20 text-center opacity-50 border-2 border-dashed border-gray-100 dark:border-white/5 rounded-[2.5rem] font-medium">
                  Nenhuma transação encontrada.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <BottomNavigation />
    </MobileLayout>
  );
};

export default WalletScreen;
