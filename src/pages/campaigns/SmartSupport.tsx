import PageHeader from "@/components/PageHeader";
import React, { useState } from "react";
import TralloInput from "@/components/TralloInput";
import TralloButton from "@/components/TralloButton";

const SmartSupport: React.FC = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="bg-white text-[#0f172a] min-h-screen selection:bg-[#6c3ef8]/20 relative overflow-hidden">
      {/* Elementos Animados de Fundo */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <svg className="absolute top-[10%] left-[-5%] w-64 h-64 text-[#6c3ef8]/5 animate-pulse" viewBox="0 0 200 200">
          <path fill="currentColor" d="M45,-62.1C58.3,-53.4,69.1,-40.1,74.3,-24.9C79.5,-9.7,79.1,7.5,73.4,22.7C67.7,37.9,56.7,51.1,42.8,59.3C28.9,67.5,12.1,70.7,-4.1,76.3C-20.3,81.9,-35.9,89.9,-48.7,86.2C-61.5,82.4,-71.5,66.9,-77.8,51.1C-84,35.3,-86.6,19.2,-84.3,4C-82,-11.2,-74.8,-25.4,-65.4,-37.2C-56,-49,-44.4,-58.4,-31.8,-67.4C-19.2,-76.4,-5.7,-85.1,5.6,-92.8C16.9,-100.5,31.7,-70.7,45,-62.1Z" transform="translate(100 100)" />
        </svg>
        <svg className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] text-[#6c3ef8]/5 animate-[spin_20s_linear_infinite]" viewBox="0 0 200 200">
          <path fill="currentColor" d="M38.1,-63.4C49.7,-57.1,59.7,-46.8,66.7,-34.7C73.7,-22.6,77.7,-8.7,76.5,5C75.3,18.7,68.9,32.3,59.8,43.2C50.7,54.1,38.9,62.4,26.1,67.4C13.2,72.4,-0.6,74.1,-15.1,71.8C-29.6,69.5,-44.8,63.1,-56.3,52.7C-67.8,42.3,-75.6,27.8,-78,12.5C-80.4,-2.8,-77.4,-19,-69.1,-32.5C-60.8,-45.9,-47.2,-56.6,-33.7,-61.8C-20.2,-67,-6.8,-66.7,5.5,-76.2C17.7,-85.7,26.5,-69.7,38.1,-63.4Z" transform="translate(100 100)" />
        </svg>
      </div>

      <PageHeader title="Pedido inteligente" showUser={true} />

      <main className="pt-24 pb-32 px-6 max-w-6xl mx-auto space-y-12">
        <section className="text-center space-y-6">
          <h1 className="text-2xl md:text-6xl font-extrabold tracking-tight leading-tight text-slate-900">
            Sabe o que quer, o <span className="text-[#6c3ef8]">TRALLO</span>{" "}
            cuida do resto!
          </h1>
          <p className="text-base md:text-xl text-slate-600 max-w-2xl mx-auto font-medium">
            Nossa inteligência artificial encontra as melhores ofertas, analisa
            avaliações e garante a compra perfeita para você.
          </p>
        </section>

        <section className="relative">
          <div className="relative flex flex-row items-stretch gap-2 md:gap-4">
            <div className="flex-1">
              <TralloInput
                icon="search"
                placeholder="O que deseja comprar?"
                value={search}
                onChange={(val) => setSearch(val)}
                className="!gap-0"
              />
            </div>

            <div className="flex items-center">
              <TralloButton
                variant="primary"
                className="uppercase tracking-wide text-sm px-4 md:px-10 h-full min-h-[58px]"
                onClick={() => console.log("Pesquisando:", search)}
              >
                <span className="hidden md:inline">Usar Agora</span>
                <span className="material-symbols-outlined md:hidden">search</span>
              </TralloButton>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2 justify-start px-4">
            <span className="text-slate-400 text-[10px] md:text-xs uppercase tracking-widest py-1 font-bold">
              Sugestões:
            </span>
            <button
              onClick={() => setSearch("Melhor iPhone por até Kz 500.000")}
              className="bg-slate-50 border border-slate-200 rounded-full px-3 md:px-4 py-1 text-xs md:text-sm text-slate-600 transition-all hover:bg-[#6c3ef8]/10 shadow-sm"
            >
              "iPhone até 500k"
            </button>
            <button
              onClick={() => setSearch("Notebook para edição 4K")}
              className="bg-slate-50 border border-slate-200 rounded-full px-3 md:px-4 py-1 text-xs md:text-sm text-slate-600 transition-all hover:bg-[#6c3ef8]/10 shadow-sm"
            >
              "Notebook 4K"
            </button>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-bold flex items-center gap-3 text-slate-900">
            Como Funciona
          </h2>
          <div className="relative h-48 md:h-[300px] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-sm group">
            <img
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              alt="home office"
              src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800"
            />
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#6c3ef8] rounded-full flex items-center justify-center shadow-2xl text-white animate-bounce">
                <span
                  className="material-symbols-outlined text-3xl md:text-4xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  play_arrow
                </span>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 bg-gradient-to-t from-black/70 to-transparent">
              <p className="text-base md:text-xl font-bold text-white">
                Assistente de Compras TRALLO
              </p>
              <p className="text-white/80 text-xs md:text-sm font-medium">
                Economize tempo e dinheiro com nossa IA.
              </p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="bg-white p-6 md:p-8 rounded-[2rem] space-y-3 md:space-y-4 border border-slate-200 shadow-sm hover:border-[#6c3ef8]/30 transition-colors">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#6c3ef8]/10 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-[#6c3ef8] text-xl md:text-2xl">
                verified_user
              </span>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-slate-900">
              Curadoria Especializada
            </h3>
            <p className="text-sm md:text-slate-600 leading-relaxed">
              Nossa IA não apenas busca preços, ela lê milhares de avaliações
              reais para garantir que você não compre um produto problemático.
            </p>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-[2rem] space-y-3 md:space-y-4 border border-slate-200 shadow-sm hover:border-[#6c3ef8]/30 transition-colors">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#6c3ef8]/10 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-[#6c3ef8] text-xl md:text-2xl">
                trending_down
              </span>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-slate-900">
              Economia Real
            </h3>
            <p className="text-sm md:text-slate-600 leading-relaxed">
              Encontramos o menor preço histórico e cupons ativos automaticamente para sua compra.
            </p>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-[2rem] space-y-3 md:space-y-4 border border-slate-200 shadow-sm hover:border-[#6c3ef8]/30 transition-colors">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#6c3ef8]/10 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-[#6c3ef8] text-xl md:text-2xl">
                auto_awesome
              </span>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-slate-900">
              IA Generativa
            </h3>
            <p className="text-sm md:text-slate-600 leading-relaxed">
              Tecnologia de ponta para entender exatamente seu contexto e necessidade.
            </p>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-[2rem] space-y-3 md:space-y-4 border border-slate-200 shadow-sm hover:border-[#6c3ef8]/30 transition-colors">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#6c3ef8]/10 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-[#6c3ef8] text-xl md:text-2xl">
                analytics
              </span>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-slate-900">
              Análise em Tempo Real
            </h3>
            <p className="text-sm md:text-slate-600 leading-relaxed">
              Monitoramos variações de preço a cada segundo no mercado Angolano
              para garantir a melhor oportunidade.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SmartSupport;