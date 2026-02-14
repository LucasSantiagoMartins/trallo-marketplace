  import React, { useState } from "react";
  import BottomNavigation from "../components/BottomNavigation";
  import PageHeader from "../components/PageHeader";
  import { ProductStockCard } from "@/components/ProductStockCard";

  const INVENTORY_MOCK = [
    {
      id: 1,
      name: "Monitor UltraWide 34''",
      sku: "TR-9921-W34",
      quantity: 12,
      location: "P-A12 | F-04",
      status: "Disponível",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD_xOHDgwu7yJKMIugzvCBkkAM2KvKjrCAdmMmM_31I9bXYUMR0HF_f_N76bj1kmeuHv6bPisomV-LkuH_DqhTLc4qqMD2jwvlO-FA3OdkRCfpfJo6L67UhN6nY1w4IncOOYb7s8E1l-_fy11SIWxnw_04qiWQpBi0diVWqNqVY5k7bZ_DMH5mscSLKhXCdfXZH9MoKh-eDoA1hjPAbBHLxEFqMsnYqqVdLmQKep781OqPiC0DeydVf3tma18ZqEly-v0te5VNn1J8o",
      type: "entradas",
    },
    {
      id: 2,
      name: "Headphones Wireless V2",
      sku: "TR-1044-HPH",
      quantity: 3,
      location: "P-B02 | F-01",
      status: "Stock Baixo",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCDYuzwdaa4DAnN-ocWJ6tKi4uIUxzy8fqXraLn0g5YUheAxjI5W-rQtxdZQZee3aJJ6-GM3LRoxqbu6GR4mCV2ewzm9hlOx6bbUI_LkU7CTXq9Zgssp6RKORqpkjkOk6R0j_upxRz9IzpVdfqsMHWB8gWwVFehY5tLopyefON-CPERp-BcB7bm1pV_R9yATWXqA1uXD1SXehbmAChRIsxbSBC8XFAA8ejLPqDvOMrOJpls-Z7sL_f9Kg5hrZTvTXYtcvDweeGZ-Dau",
      type: "entradas",
    },
  ];

  const InventoryScreen: React.FC = () => {
    const [activeTab, setActiveTab] = useState<"entradas" | "saidas">("entradas");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filteredStock = INVENTORY_MOCK.filter(
      (item) => item.type === activeTab,
    );

    return (
      <div className="min-h-screen bg-[#f6f5f8] dark:bg-[#141022] text-[#121118] dark:text-white pb-24">
        <PageHeader title="Gestão de Stock" />

        <main className="max-w-7xl mx-auto px-4 pt-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex p-1.5 bg-gray-200/50 dark:bg-white/5 rounded-2xl w-full md:w-80 mb-6 border border-gray-200/30 dark:border-white/5">
                <button
                  onClick={() => setActiveTab("entradas")}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    activeTab === "entradas"
                      ? "bg-white dark:bg-[#6d3ff8] shadow-md"
                      : "text-gray-500"
                  }`}
                >
                  Entradas
                </button>
                <button
                  onClick={() => setActiveTab("saidas")}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    activeTab === "saidas"
                      ? "bg-white dark:bg-[#6d3ff8] shadow-md"
                      : "text-gray-500"
                  }`}
                >
                  Saídas
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {filteredStock.length > 0 ? (
                  filteredStock.map((product) => (
                    <ProductStockCard key={product.id} {...product} />
                  ))
                ) : (
                  <div className="py-20 text-center opacity-50">
                    <span className="material-symbols-outlined text-6xl mb-2">
                      inventory_2
                    </span>
                    <p>Nenhum registro de {activeTab} encontrado.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="sticky top-28 p-8 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800/50 dark:to-gray-900/50 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-xl">
                <div className="size-14 rounded-2xl bg-[#6d3ff8] flex items-center justify-center text-white mb-6 shadow-lg shadow-purple-500/20">
                  <span className="material-symbols-outlined text-3xl">info</span>
                </div>

                <h4 className="font-black text-xl mb-4 tracking-tight">
                  Controle de Inventário
                </h4>

                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                  Gerencie a movimentação de produtos. Registre novas{" "}
                  <span className="text-[#6d3ff8] font-bold">entradas</span> para
                  atualizar prateleiras ou finalize{" "}
                  <span className="text-[#6d3ff8] font-bold">saídas</span> para
                  expedição imediata.
                </p>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-4 bg-[#6d3ff8] text-white rounded-2xl font-bold shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">add</span>
                  Novo Registro
                </button>
              </div>
            </div>
          </div>
        </main>

        <button
          onClick={() => setIsModalOpen(true)}
          className="lg:hidden fixed bottom-24 right-6 size-14 bg-[#6d3ff8] text-white rounded-full shadow-lg shadow-[#6d3ff8]/30 flex items-center justify-center z-40"
        >
          <span className="material-symbols-outlined text-3xl">add</span>
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-md bg-white dark:bg-[#1c182d] rounded-t-[2.5rem] lg:rounded-[2.5rem] p-8 animate-in slide-in-from-bottom duration-300">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">
                  Nova {activeTab === "entradas" ? "Entrada" : "Saída"}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="material-symbols-outlined text-gray-400"
                >
                  close
                </button>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase text-gray-400">
                    Produto
                  </label>
                  <input
                    type="text"
                    className="w-full mt-1 p-3 bg-gray-100 dark:bg-white/5 rounded-xl border-none text-sm"
                    placeholder="Nome ou SKU"
                  />
                </div>

                {activeTab === "entradas" ? (
                  <div>
                    <label className="text-xs font-bold uppercase text-gray-400">
                      Localização no Armazém
                    </label>
                    <input
                      type="text"
                      className="w-full mt-1 p-3 bg-gray-100 dark:bg-white/5 rounded-xl border-none text-sm"
                      placeholder="Ex: P-A12 | F-04"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="text-xs font-bold uppercase text-gray-400">
                      Entregador / Transportadora
                    </label>
                    <input
                      type="text"
                      className="w-full mt-1 p-3 bg-gray-100 dark:bg-white/5 rounded-xl border-none text-sm"
                      placeholder="Nome de quem vai levar"
                    />
                  </div>
                )}

                <button className="w-full py-4 bg-[#6d3ff8] text-white rounded-2xl font-bold shadow-lg shadow-[#6d3ff8]/20 mt-4">
                  Confirmar Registro
                </button>
              </form>
            </div>
          </div>
        )}

        <BottomNavigation />
      </div>
    );
  };

  export default InventoryScreen;
