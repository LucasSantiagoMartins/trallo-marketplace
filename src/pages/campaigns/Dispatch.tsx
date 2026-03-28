import React from "react";
import PageHeader from "@/components/PageHeader";
import TralloButton from "@/components/TralloButton";
import { VideoCard } from "@/components/VideoCard";

const DispatchInfoScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50/50 font-inter overflow-x-hidden">
      <PageHeader title="Como Funciona" showUser={true} />

      <main className="relative pt-20 md:pt-24 pb-12 md:pb-16 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 md:mb-16 text-center relative">
            <div className="absolute -top-6 -left-4 md:-top-10 md:-left-10 opacity-20 animate-pulse">
              <svg
                viewBox="0 0 100 100"
                className="w-[60px] h-[60px] md:w-[100px] md:h-[100px]"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#6C3EF8"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="10 5"
                />
              </svg>
            </div>

            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-tight mb-4 md:mb-6 uppercase px-2">
              Domine o <br />
              <span className="text-[#6C3EF8]">Despacho Rápido</span>
            </h2>
            <p className="text-[#64748B] text-base md:text-xl max-w-2xl mx-auto leading-relaxed px-4">
              Aprenda a garantir os menores preços antes que o estoque acabe. A
              pressão sobe, mas a economia é real.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-16 md:mb-24">
            <VideoCard
              title="Parte 1: Como Comprar"
              thumbnail="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1000&auto=format&fit=crop"
            />
            <VideoCard
              title="Parte 2: Garantir o Desconto"
              thumbnail="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1000&auto=format&fit=crop"
            />
          </div>

          <div className="mb-16 md:mb-24">
            <h3 className="text-sm md:text-lg font-bold uppercase text-[#0F172A] tracking-wider mb-6 md:mb-10 text-left">
              O Caminho da Economia
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { step: "01", text: "Escolha o produto na lista de Despacho." },
                { step: "02", text: "Aguarde o preço cair em tempo real." },
                {
                  step: "03",
                  text: "Seja rápido antes que outra pessoa compre.",
                },
                { step: "04", text: "Receba em casa com entrega prioritária." },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group relative bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 hover:border-[#6C3EF8] transition-all duration-300 shadow-sm overflow-hidden"
                >
                  <span className="text-[#6C3EF8] font-black text-2xl md:text-3xl block mb-2 md:mb-4 relative z-10">
                    {item.step}
                  </span>
                  <p className="text-[#475569] text-xs md:text-sm font-semibold leading-relaxed relative z-10">
                    {item.text}
                  </p>
                  <div className="absolute -bottom-2 -right-2 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                    <svg
                      viewBox="0 0 24 24"
                      fill="#6C3EF8"
                      className="w-[60px] h-[60px] md:w-[80px] md:h-[80px]"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16 md:mb-24">
            <h3 className="text-sm md:text-lg font-bold uppercase text-[#0F172A] tracking-wider mb-6 md:mb-10 text-left">
              Vantagens de Utilizar
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
              <div className="group relative bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 flex flex-col gap-4 md:gap-6 hover:shadow-xl hover:shadow-[#6C3EF8]/5 transition-all shadow-sm overflow-hidden">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-green-50 rounded-xl md:rounded-2xl flex items-center justify-center relative z-10">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-green-600 w-6 h-6 md:w-8 md:h-8"
                  >
                    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
                    <polyline points="17 18 23 18 23 12"></polyline>
                  </svg>
                </div>
                <div className="relative z-10">
                  <h4 className="font-bold text-lg md:text-xl text-[#0F172A] mb-2 md:mb-3">
                    Preços Decrescentes
                  </h4>
                  <p className="text-[#64748B] text-sm md:text-base leading-relaxed">
                    Quanto mais você espera, menor o preço fica. Mas cuidado com
                    o estoque!
                  </p>
                </div>
                <div className="absolute -bottom-4 -right-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-green-600 w-[80px] h-[80px] md:w-[120px] md:h-[120px]"
                  >
                    <path d="M11.5 3L11.5 15.17L8.91 12.59L7.5 14L12.5 19L17.5 14L16.09 12.59L13.5 15.17L13.5 3L11.5 3Z" />
                  </svg>
                </div>
              </div>

              <div className="group relative bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 flex flex-col gap-4 md:gap-6 hover:shadow-xl hover:shadow-[#6C3EF8]/5 transition-all shadow-sm overflow-hidden">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-50 rounded-xl md:rounded-2xl flex items-center justify-center relative z-10">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-blue-600 w-6 h-6 md:w-8 md:h-8"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div className="relative z-10">
                  <h4 className="font-bold text-lg md:text-xl text-[#0F172A] mb-2 md:mb-3">
                    Prioridade de Envio
                  </h4>
                  <p className="text-[#64748B] text-sm md:text-base leading-relaxed">
                    Produtos no Despacho Rápido saem do armazém em menos de 12
                    horas.
                  </p>
                </div>
                <div className="absolute -bottom-4 -right-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-blue-600 w-[80px] h-[80px] md:w-[120px] md:h-[120px]"
                  >
                    <path d="M20 8H17L13.33 3H10.67L7 8H4C2.89 8 2 8.89 2 10V19C2 20.11 2.89 21 4 21H20C21.11 21 22 20.11 22 19V10C22 8.89 21.11 8 20 8Z" />
                  </svg>
                </div>
              </div>

              <div className="group relative bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 flex flex-col gap-4 md:gap-6 hover:shadow-xl hover:shadow-[#6C3EF8]/5 transition-all shadow-sm overflow-hidden">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-[#F5F1FF] rounded-xl md:rounded-2xl flex items-center justify-center relative z-10">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-[#6C3EF8] w-6 h-6 md:w-8 md:h-8"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <div className="relative z-10">
                  <h4 className="font-bold text-lg md:text-xl text-[#0F172A] mb-2 md:mb-3">
                    Garantia Total
                  </h4>
                  <p className="text-[#64748B] text-sm md:text-base leading-relaxed">
                    Todos os itens passam por uma curadoria rigorosa antes de
                    entrar na live.
                  </p>
                </div>
                <div className="absolute -bottom-4 -right-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-[#6C3EF8] w-[80px] h-[80px] md:w-[120px] md:h-[120px]"
                  >
                    <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-16 md:mb-24 relative overflow-hidden bg-white p-6 md:p-12 rounded-[2.5rem] md:rounded-[3rem] border border-slate-100 shadow-sm">
            <h3 className="text-xl md:text-2xl font-bold mb-8 md:mb-10 flex items-center gap-3 text-[#0F172A]">
              <span className="w-1.5 h-6 md:w-2 md:h-8 bg-[#6C3EF8] rounded-full"></span>
              Dúvidas Comuns
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative z-10">
              <div className="space-y-2 md:space-y-4">
                <p className="font-bold text-[#6C3EF8] text-base md:text-lg">
                  O preço para de cair?
                </p>
                <p className="text-[#64748B] text-sm md:text-base leading-relaxed">
                  Sim, cada produto tem um preço mínimo limite definido pelo
                  vendedor. Se atingir esse valor, ele estabiliza.
                </p>
              </div>
              <div className="space-y-2 md:space-y-4">
                <p className="font-bold text-[#6C3EF8] text-base md:text-lg">
                  Posso reservar um item?
                </p>
                <p className="text-[#64748B] text-sm md:text-base leading-relaxed">
                  Não. No sistema de Despacho, a prioridade é de quem finalizar
                  o checkout primeiro. A agilidade é essencial.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center pb-6 md:pb-8">
            <TralloButton variant="primary" className="w-full">
              Entendi, Quero Começar
            </TralloButton>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DispatchInfoScreen;
