import PageHeader from "@/components/PageHeader";
import React, { useState } from "react";
import TralloInput from "@/components/TralloInput";
import TralloButton from "@/components/TralloButton";
import { VideoCard } from "@/components/VideoCard";
import BudgetSelector from "@/components/BudgetSelector";
import { usePurchaseSupport } from "@/hooks/usePurchaseSupport";

const PurchaseSupport: React.FC = () => {
  const [search, setSearch] = useState("");
  const [showBudget, setShowBudget] = useState(false);
  const { sendPurchaseRequest, validateInitialStep, isLoading } =
    usePurchaseSupport();

  const handleOpenBudget = () => {
    if (validateInitialStep(search)) {
      setShowBudget(true);
    }
  };

  const handleConfirm = async (budget: string, profile: any) => {
    const success = await sendPurchaseRequest({
      query: search,
      investment: budget,
      profileId: profile.id,
      profileTitle: profile.title,
      profileDesc: profile.desc,
    });

    if (success) {
      setShowBudget(false);
      setSearch("");
    }
  };

  return (
    <div className="bg-white text-[#0f172a] min-h-screen selection:bg-[#6c3ef8]/20 relative">
      <PageHeader title="Suporte de Compra" showUser={true} />

      <main className="pt-24 pb-32 px-6 max-w-6xl mx-auto space-y-12">
        <section className="text-center space-y-6">
          <h1 className="text-2xl md:text-6xl font-extrabold tracking-tight leading-tight text-slate-900">
            Sabe o que quer, o <span className="text-[#6c3ef8]">TRALLO</span>{" "}
            cuida do resto!
          </h1>
          <p className="text-base md:text-[14px] text-slate-600 max-w-2xl mx-auto font-medium">
            Diz o que precisas como "Preciso montar um estudio de podcast" ou
            "Quero um computador adequado para tarefas de escritório" e nós
            tratamos do resto — selecionamos os melhores produtos para ti ou
            organizamos tudo numa lista completa pronta a comprar.
          </p>
        </section>

        <section className="relative space-y-6">
          <div className="relative flex flex-row items-stretch gap-2 md:gap-4">
            <div className="flex-1">
              <TralloInput
                icon="search"
                placeholder="O que precisas?"
                value={search}
                onChange={(val) => setSearch(val)}
                className="!gap-0"
              />
            </div>

            <div className="flex items-center">
              <TralloButton
                variant="primary"
                className="uppercase tracking-wide text-sm px-4 md:px-10 h-full min-h-[58px]"
                onClick={handleOpenBudget}
              >
                <span className="hidden md:inline">Usar Agora</span>
                <span className="material-symbols-outlined md:hidden">
                  search
                </span>
              </TralloButton>
            </div>
          </div>

          {showBudget && (
            <div className="md:hidden mt-4 animate-in slide-in-from-top-4 duration-500">
              <BudgetSelector
                onConfirm={handleConfirm}
                onCancel={() => setShowBudget(false)}
                isLoading={isLoading}
              />
            </div>
          )}
        </section>

        <section className="space-y-6 w-full">
          <div className="text-left space-y-1">
            <h2 className="text-lg md:text-xl font-bold text-slate-900">
              Como Funciona
            </h2>
            <p className="text-slate-500 text-xs md:text-sm font-medium">
              Veja em menos de 1 minuto como o TRALLO facilita as suas compras.
            </p>
          </div>

          <div className="w-full">
            <VideoCard
              title="Assistente de Compras TRALLO"
              thumbnail="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200"
              videoSrc="/videos/generico-temporario.mp4"
            />
          </div>
        </section>
      </main>

      {showBudget && (
        <div className="hidden md:block">
          <BudgetSelector
            onConfirm={handleConfirm}
            onCancel={() => setShowBudget(false)}
            isLoading={isLoading}
          />
        </div>
      )}
    </div>
  );
};

export default PurchaseSupport;
