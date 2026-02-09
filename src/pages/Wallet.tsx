import React, { useState } from "react";
import TransactionItem from "../components/TransactionItem";
import BottomNavigation from "@/components/BottomNavigation";
import PerformanceCard from "../components/PerformanceCard";
import { useNavigate } from "react-router-dom";

const WalletScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen font-display text-[#181112] dark:text-white antialiased">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-[#111118]/70 backdrop-blur-md px-6 py-4 border-b border-gray-100/50 dark:border-gray-800/50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full border-2 border-primary/20 p-0.5 shadow-sm">
              <div
                className="w-full h-full rounded-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    'url("https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=100&h=100&auto=format&fit=crop")',
                }}
              />
            </div>
            <div>
              <p className="text-[10px] text-[#8c5f67] dark:text-gray-400 font-bold uppercase tracking-wider">
                Olá, Nelson
              </p>
              <h1 className="text-base font-black leading-tight tracking-tight">
                Carteira TRALLO
              </h1>
            </div>
          </div>
          <button className="size-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-soft border border-gray-100 dark:border-gray-700 active:scale-90 transition-transform">
            <span className="material-symbols-outlined text-xl text-primary">
              notifications
            </span>
          </button>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 pt-28 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Coluna Esquerda */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <div className="relative overflow-hidden rounded-3xl p-6 min-h-[220px] flex flex-col justify-between bg-gradient-to-br from-[#6C3EF8] to-[#8B5CF6] shadow-xl shadow-purple-500/20">
              <div className="absolute -right-10 -top-10 size-40 bg-white/10 rounded-full blur-2xl"></div>

              <div className="relative z-10">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white/80 text-sm font-medium">
                      Saldo Disponível
                    </p>
                    <h2 className="text-white text-3xl font-bold mt-1">
                      {isVisible ? "1.250.000,00" : "••••••••"}{" "}
                      <span className="text-sm font-medium">Kz</span>
                    </h2>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-white/70">
                  <span className="material-symbols-outlined text-sm">
                    lock
                  </span>
                  <p className="text-xs font-medium uppercase tracking-wider">
                    Saldo Retido:{" "}
                    <span className="text-white font-bold">
                      {isVisible ? "45.000,00 Kz" : "••••"}
                    </span>
                  </p>
                </div>
              </div>

              <div className="relative z-10 flex justify-between items-end mt-6">
                <div>
                  <p className="text-white/60 text-[10px] uppercase tracking-widest">
                    Número da Conta
                  </p>
                  <p className="text-white tracking-widest font-mono">
                    **** **** 4829
                  </p>
                </div>
                <button
                  onClick={toggleVisibility}
                  className="size-10 rounded-full bg-white/20 border border-white/30 backdrop-blur-sm flex items-center justify-center text-white active:scale-90"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {isVisible ? "visibility" : "visibility_off"}
                  </span>
                </button>
              </div>
            </div>

            <button className="w-full bg-primary text-white h-14 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/30 active:scale-[0.98]">
              <span className="material-symbols-outlined">add_circle</span>
              <span>Realizar levantamento</span>
            </button>

            <div className="p-6 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="size-12 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] flex items-center justify-center text-white mb-4 shadow-lg shadow-purple-500/20">
                <span className="material-symbols-outlined">lock_clock</span>
              </div>
              <h4 className="font-black text-lg mb-2 tracking-tight">
                Por que o saldo está retido?
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Este montante corresponde a pedidos já pagos e aguardando apenas
                a entrega ao cliente.
              </p>
            </div>
          </div>

          {/* Coluna Direita: Gráfico + Transações */}
          <div className="lg:col-span-7">
            {/* NOVO CARD DE PERFORMANCE AQUI */}
            <PerformanceCard />

            <div className="flex items-center justify-between mb-6">
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

            <div className="space-y-4">
              <TransactionItem
                type="compra"
                title="Tênis Nike Air Force 1"
                date="Hoje, 14:20 • Loja Oficial"
                amount={-85000}
                status="Concluído"
              />
              <TransactionItem
                type="venda"
                title="Venda: iPhone 13 Pro"
                date="Ontem, 18:05 • TRALLO Market"
                amount={450000}
                status="Pendente"
              />
              <TransactionItem
                type="levantamento"
                title="Levantamento MCX"
                date="22 Out, 09:12 • Caixa 042"
                amount={-20000}
                status="Concluído"
              />
            </div>
          </div>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default WalletScreen;
