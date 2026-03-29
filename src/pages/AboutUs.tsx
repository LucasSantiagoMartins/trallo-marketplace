import React from "react";
import PageHeader from "@/components/PageHeader";
import TralloButton from "@/components/TralloButton";
import { VideoCard } from "@/components/VideoCard";

const AboutUs: React.FC = () => {
  return (
    <div className="bg-white text-[#0f172a] min-h-screen selection:bg-[#6c3ef8]/20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-[#6c3ef8]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[10%] left-[-5%] w-[300px] h-[300px] bg-[#6c3ef8]/5 rounded-full blur-3xl" />
      </div>

      <PageHeader title="Sobre Nós & Instalações" showUser={true} />

      <main className="relative z-10 pt-28 pb-12 px-6 max-w-4xl mx-auto space-y-12">
        <section className="text-center space-y-4">
          <h2 className="font-black text-3xl md:text-5xl tracking-tight text-slate-900">
            Conheça a <span className="text-[#6C3EF8]">Trallo</span>
          </h2>
          <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Estamos redefinindo a experiência de compra e venda em Angola,
            combinando tecnologia de ponta com um atendimento humano e
            eficiente.
          </p>
        </section>

        <section className="space-y-4">
          <div className="relative">
            <VideoCard
              title="Visita guiada pelas Nossas Instalações"
              thumbnail="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200"
              videoSrc="/videos/generico-temporario.mp4"
            />

            <div className="absolute top-6 left-6 z-30 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-white/50 flex items-center gap-2 pointer-events-none">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-[10px] font-black text-slate-900 uppercase tracking-tighter">
                Espaço Físico
              </span>
            </div>
          </div>
          <p className="text-center text-slate-500 text-sm italic">
            Veja onde a nossa equipa trabalha para garantir a melhor experiência
            para si.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 flex flex-col items-center text-center space-y-3 hover:border-[#6C3EF8]/30 transition-colors group">
            <div className="w-12 h-12 rounded-2xl bg-[#6C3EF8] text-white flex items-center justify-center shadow-lg shadow-[#6C3EF8]/20">
              <span className="material-symbols-outlined">groups</span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Nossa Missão
              </p>
              <p className="text-lg font-bold text-slate-900">
                Conectar Angola
              </p>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 flex flex-col items-center text-center space-y-3 hover:border-[#6C3EF8]/30 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-[#6C3EF8] text-white flex items-center justify-center shadow-lg shadow-[#6C3EF8]/20">
              <span className="material-symbols-outlined">verified_user</span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Segurança
              </p>
              <p className="text-lg font-bold text-slate-900">100% Protegido</p>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 flex flex-col items-center text-center space-y-3 hover:border-[#6C3EF8]/30 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-[#6C3EF8] text-white flex items-center justify-center shadow-lg shadow-[#6C3EF8]/20">
              <span className="material-symbols-outlined">
                workspace_premium
              </span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Qualidade
              </p>
              <p className="text-lg font-bold text-slate-900">Excelência</p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 h-48 md:h-auto bg-slate-100 relative">
              <img
                className="w-full h-full object-cover grayscale opacity-80"
                alt="Map"
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <TralloButton variant="primary" className="scale-90 shadow-xl">
                  Ver no Mapa
                </TralloButton>
              </div>
            </div>

            <div className="p-8 md:w-1/2 space-y-6">
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#6C3EF8]">
                    location_on
                  </span>
                  Onde Estamos
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Luanda, Vila de Viana
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#6C3EF8]">
                    meeting_room
                  </span>
                  Horário de Funcionamento
                </h4>
                <p className="text-slate-500 text-sm">
                  Segunda a Sexta: 8h às 18h
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-slate-100 pt-12">
          <div className="text-center">
            <p className="text-2xl font-black text-slate-900">10 mil+</p>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
              Entregas
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-black text-slate-900">500+</p>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
              Vendedores
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-black text-slate-900">100%</p>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
              Seguro
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-black text-slate-900">Angola</p>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
              Local
            </p>
          </div>
        </section>
      </main>

      <div className="h-20"></div>
    </div>
  );
};

export default AboutUs;
