import React from "react";
import PageHeader from "../components/PageHeader";
import BottomNavigation from "../components/BottomNavigation";

const OrderDetail: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f6f5f8] dark:bg-[#141022] text-[#121118] dark:text-white pb-32">
      <PageHeader
        title="Detalhe do Pedido"
        rightElement={
          <button className="flex items-center justify-center size-10 rounded-full bg-white dark:bg-white/5 shadow-sm">
            <span className="material-symbols-outlined text-[#6d3ff8]">
              support_agent
            </span>
          </button>
        }
      />

      <main className="max-w-3xl mx-auto px-4 pt-24 space-y-6">
        {/* Card Resumo do Pedido */}
        <section className="bg-white dark:bg-white/5 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="bg-[#6d3ff8]/10 text-[#6d3ff8] text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-full">
                Em Processamento
              </span>
              <h2 className="text-xl font-black mt-2">Pedido #TR-98234</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                24 de Outubro, 2023 • 10:30 AM
              </p>
            </div>
            <div className="size-14 bg-[#6d3ff8]/10 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-[#6d3ff8] text-3xl">
                shopping_bag
              </span>
            </div>
          </div>
          <div className="border-t border-dashed border-gray-200 dark:border-white/10 pt-4 flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Método de Pagamento
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold">Multicaixa Express</span>
              <span className="material-symbols-outlined text-[#6d3ff8]">
                credit_card
              </span>
            </div>
          </div>
        </section>

        {/* Seção de Rastreamento */}
        <section className="space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 px-1">
            Rastreamento
          </h3>
          <div className="bg-white dark:bg-white/5 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/10">
            <div className="relative space-y-0">
              {/* Item 1 */}
              <div className="flex gap-4 pb-8 relative">
                <div className="absolute left-[11px] top-6 bottom-0 w-[2px] bg-[#6d3ff8]"></div>
                <div className="relative z-10 flex size-6 items-center justify-center rounded-full bg-[#6d3ff8] ring-4 ring-[#6d3ff8]/20">
                  <span className="material-symbols-outlined text-white text-[16px]">
                    check
                  </span>
                </div>
                <div>
                  <p className="font-bold text-sm">Pedido Confirmado</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Pagamento aprovado com sucesso.
                  </p>
                  <p className="text-[10px] text-[#6d3ff8] font-bold mt-1">
                    10:30 AM
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex gap-4 pb-8 relative">
                <div className="absolute left-[11px] top-6 bottom-0 w-[2px] bg-gray-200 dark:bg-white/10"></div>
                <div className="relative z-10 flex size-6 items-center justify-center rounded-full bg-[#6d3ff8] ring-4 ring-[#6d3ff8]/20">
                  <span className="material-symbols-outlined text-white text-[16px]">
                    package_2
                  </span>
                </div>
                <div>
                  <p className="font-bold text-sm">Em Preparação</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    O vendedor está a preparar o seu pacote.
                  </p>
                  <p className="text-[10px] text-[#6d3ff8] font-bold mt-1">
                    11:45 AM
                  </p>
                </div>
              </div>

              {/* Item 3 (Ativo) */}
              <div className="flex gap-4 pb-8 relative">
                <div className="absolute left-[11px] top-6 bottom-0 w-[2px] bg-gray-200 dark:bg-white/10"></div>
                <div className="relative z-10 flex size-6 items-center justify-center rounded-full bg-white dark:bg-[#1c182d] ring-2 ring-[#6d3ff8]">
                  <div className="size-2 bg-[#6d3ff8] rounded-full animate-pulse"></div>
                </div>
                <div>
                  <p className="font-bold text-sm">A caminho</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    O estafeta TRALLO saiu para entrega.
                  </p>
                  <p className="text-[10px] font-bold mt-1 text-gray-400">
                    Previsão: 14:00 PM
                  </p>
                </div>
              </div>

              {/* Item 4 */}
              <div className="flex gap-4">
                <div className="relative z-10 flex size-6 items-center justify-center rounded-full bg-gray-100 dark:bg-white/10">
                  <span className="material-symbols-outlined text-gray-400 text-[16px]">
                    home
                  </span>
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-400">Entregue</p>
                  <p className="text-xs text-gray-400">
                    Aguardando chegada na morada.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Morada */}
        <section className="space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 px-1">
            Morada de Entrega
          </h3>
          <div className="bg-white dark:bg-white/5 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-white/10 flex items-start gap-4">
            <div className="size-12 rounded-xl bg-gray-100 dark:bg-white/10 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#6d3ff8]">
                location_on
              </span>
            </div>
            <div className="flex-1">
              <p className="font-bold text-sm">Cabo Ledo, Luanda</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Condomínio Vereda das Flores, Casa 45B, Talatona
              </p>
              <p className="text-xs font-bold text-[#6d3ff8] mt-1">
                +244 923 456 789
              </p>
            </div>
          </div>
        </section>

        {/* Itens */}
        <section className="space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 px-1">
            Itens (2)
          </h3>
          <div className="space-y-3">
            {[
              {
                name: "Sapatilhas Urban Prime V2",
                desc: "Tamanho: 42 • Cor: Bege",
                price: "45.000",
                img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200",
              },
              {
                name: "Hoodie Oversized Noir",
                desc: "Tamanho: L • Cor: Preto",
                price: "22.500",
                img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=200",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-white/5 p-3 rounded-2xl shadow-sm border border-gray-100 dark:border-white/10 flex gap-4 items-center"
              >
                <div className="size-20 rounded-xl bg-gray-100 dark:bg-white/10 overflow-hidden shrink-0">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm line-clamp-1">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                  <div className="flex justify-between items-end mt-2">
                    <p className="text-xs font-medium">quantidade: 1</p>
                    <p className="font-bold text-[#6d3ff8]">{item.price} AOA</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Totais */}
        <section className="bg-white dark:bg-white/5 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/10 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Subtotal</span>
            <span className="font-bold">67.500 AOA</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Taxa de Entrega</span>
            <span className="font-bold">2.500 AOA</span>
          </div>
          <div className="border-t border-gray-100 dark:border-white/10 pt-3 flex justify-between items-center">
            <span className="font-black text-lg">Total</span>
            <span className="font-black text-2xl text-[#6d3ff8]">
              70.000 AOA
            </span>
          </div>
        </section>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default OrderDetail;
