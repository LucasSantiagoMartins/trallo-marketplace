import React from "react";
import PageHeader from "@/components/PageHeader";
import TralloButton from "@/components/TralloButton";

const ContactSupport: React.FC = () => {
  return (
    <div className="bg-white text-[#0f172a] min-h-screen selection:bg-[#6c3ef8]/20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <svg
          className="absolute top-[-5%] right-[-10%] w-[500px] h-[500px] text-[#6c3ef8]/5 animate-pulse"
          viewBox="0 0 200 200"
        >
          <path
            fill="currentColor"
            d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.9C87,14.6,81.4,29.1,72.1,40.1C62.8,51.1,49.8,58.6,36.4,65.8C23,73,9.2,80,-5.4,89.4C-20,98.8,-35.3,110.6,-47.1,107.5C-58.9,104.4,-67.1,86.3,-74.4,71.4C-81.7,56.5,-88,44.7,-91.4,31.7C-94.8,18.7,-95.2,4.4,-92.4,-9.1C-89.6,-22.6,-83.5,-35.3,-74.6,-45.8C-65.7,-56.3,-54,-64.6,-41.4,-72.7C-28.8,-80.8,-15.3,-88.7,0.3,-89.2C15.9,-89.7,30.6,-83.6,44.7,-76.4Z"
            transform="translate(100 100)"
          />
        </svg>

        <svg
          className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] text-[#6c3ef8]/5 animate-[spin_45s_linear_infinite]"
          viewBox="0 0 200 200"
        >
          <path
            fill="currentColor"
            d="M39.9,-65.7C52.1,-59.1,62.6,-48.5,70.2,-36.1C77.7,-23.7,82.2,-9.5,81.2,4.4C80.2,18.3,73.7,31.8,64.3,42.8C54.8,53.8,42.5,62.3,29.1,67.7C15.7,73.1,1.2,75.4,-13.6,73.4C-28.4,71.4,-43.5,65.1,-55.5,54.8C-67.5,44.5,-76.4,30.3,-79.9,14.9C-83.4,-0.5,-81.4,-17.1,-74.1,-31.6C-66.8,-46.1,-54.1,-58.5,-40.1,-64.4C-26.1,-70.3,-10.8,-69.7,2.5,-74C15.8,-78.3,27.7,-72.3,39.9,-65.7Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      <PageHeader title="Contacto & Suporte" showUser={true} />

      <main className="relative z-10 pt-28 pb-12 px-6 space-y-8 max-w-5xl mx-auto">
        <section className="space-y-3 md:text-center md:mb-12">
          <h2 className="font-black text-3xl md:text-5xl tracking-tight text-slate-900 leading-none">
            Visite o <span className="text-[#6C3EF8]">TRALLO</span>
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium">
            Estamos mais perto de você do que imagina. Sinta a inovação ao vivo.
          </p>
        </section>

        <section className="w-full">
          <div className="relative h-64 md:h-[400px] w-full rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-2xl group">
            <img
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              alt="Map"
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent md:from-white/40"></div>
            <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-md p-3 rounded-2xl border border-white/50">
                <span
                  className="material-symbols-outlined text-[#6C3EF8]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  location_on
                </span>
                <span className="text-[10px] md:text-xs font-black text-slate-900 uppercase tracking-tight">
                  Viana, Estrada de Catete, Luanda
                </span>
              </div>
              <button className="w-full md:w-auto bg-[#6C3EF8] text-white px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-[#6C3EF8]/40 transition-all hover:bg-[#5a32d1] active:scale-95">
                ABRIR NO GOOGLE MAPS
                <span className="material-symbols-outlined text-xs">
                  open_in_new
                </span>
              </button>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <section className="md:col-span-2 space-y-6">
            <div className="bg-white/60 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-sm border border-slate-200/50 h-full flex flex-col justify-center">
              <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#6C3EF8]/10 text-[#6C3EF8]">
                <span
                  className="material-symbols-outlined text-3xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
              </div>
              <p className="text-slate-800 text-lg md:text-xl font-medium leading-relaxed">
                Nossas instalações foram pensadas para oferecer suporte rápido,
                confiança e inovação no seu processo de compra.
              </p>
            </div>
          </section>

          <section className="grid grid-cols-2 md:grid-cols-1 gap-4">
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col justify-center items-center text-center">
              <p className="text-[#6C3EF8] font-extrabold text-3xl md:text-4xl">
                10k+
              </p>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">
                Entregas
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col justify-center items-center text-center">
              <p className="text-[#6C3EF8] font-extrabold text-3xl md:text-4xl">
                500+
              </p>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">
                Vendedores
              </p>
            </div>
          </section>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex gap-5 items-start bg-[#6C3EF8]/5 backdrop-blur-sm p-8 rounded-[2.5rem] border border-[#6C3EF8]/10">
            <span className="material-symbols-outlined text-3xl text-[#6C3EF8]">
              security
            </span>
            <div>
              <h4 className="font-bold text-base text-slate-900">
                Garantia de Qualidade
              </h4>
              <p className="text-slate-500 text-xs leading-relaxed">
                Cada transação é monitorada rigorosamente por nossa equipe de
                segurança avançada.
              </p>
            </div>
          </div>
          <div className="flex gap-5 items-start bg-[#6C3EF8]/5 backdrop-blur-sm p-8 rounded-[2.5rem] border border-[#6C3EF8]/10">
            <span className="material-symbols-outlined text-3xl text-[#6C3EF8]">
              support_agent
            </span>
            <div>
              <h4 className="font-bold text-base text-slate-900">
                Equipa Especializada
              </h4>
              <p className="text-slate-500 text-xs leading-relaxed">
                Atendimento humano e especializado por consultores locais em
                Angola.
              </p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 bg-white/70 backdrop-blur-xl p-6 flex items-center justify-between rounded-[2.5rem] shadow-sm border border-slate-200/50">
            <div className="space-y-1">
              <p className="text-slate-400 text-[9px] font-bold uppercase tracking-[0.2em]">
                Suporte Voz
              </p>
              <p className="text-xl font-bold text-slate-900 tracking-tight">
                +244 9XX XXX XXX
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#6C3EF8] text-white flex items-center justify-center shadow-lg shadow-[#6C3EF8]/30">
              <span className="material-symbols-outlined text-xl">call</span>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-md p-6 rounded-[2.5rem] flex flex-col justify-between border border-slate-200/50 hover:border-green-500/40 transition-all group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-green-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-green-500/20">
              <span className="material-symbols-outlined text-xl">chat</span>
            </div>
            <div className="mt-4">
              <p className="text-slate-400 text-[9px] font-bold uppercase tracking-widest">
                WhatsApp
              </p>
              <p className="text-base font-bold text-slate-900">Fale agora</p>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-md p-6 rounded-[2.5rem] flex flex-col justify-between border border-slate-200/50 hover:border-[#6C3EF8]/40 transition-all group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-[#6C3EF8] text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-[#6C3EF8]/20">
              <span className="material-symbols-outlined text-xl">mail</span>
            </div>
            <div className="mt-4">
              <p className="text-slate-400 text-[9px] font-bold uppercase tracking-widest">
                Email
              </p>
              <p className="text-base font-bold text-slate-900">Suporte</p>
            </div>
          </div>
        </section>

        <section className="flex flex-col md:flex-row gap-4">
          <TralloButton
            variant="primary"
            className="flex-1 py-6 rounded-[2rem] text-base uppercase font-black tracking-[0.2em] shadow-2xl shadow-[#6C3EF8]/20"
            onClick={() => console.log("Contacto Voz")}
          >
            Entrar em Contacto
          </TralloButton>

          <TralloButton
            variant="secondary"
            className="flex-1 py-6 rounded-[2rem] text-base uppercase font-black tracking-[0.2em] border-2 bg-white/50 backdrop-blur-md"
            onClick={() => console.log("WhatsApp Click")}
          >
            Falar no WhatsApp
          </TralloButton>
        </section>

        <div className="bg-slate-50/50 p-5 rounded-[2rem] flex items-center justify-center gap-4 border border-slate-100">
          <span className="material-symbols-outlined text-slate-400 text-xl">
            schedule
          </span>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
            Horário:{" "}
            <span className="text-slate-900">Segunda a Sexta, 8h às 18h</span>
          </p>
        </div>
      </main>

      <div className="h-20"></div>
    </div>
  );
};

export default ContactSupport;
