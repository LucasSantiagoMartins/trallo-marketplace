import React, { useState } from "react";
import BottomNavigation from "../components/BottomNavigation";
import PageHeader from "../components/PageHeader";
import { ProductStockCard } from "@/components/ProductStockCard";
import TralloInput from "@/components/TralloInput";
import { InventoryControlCard } from "@/components/InventoryControlCard";

const INVENTORY_MOCK = [
  {
    id: 1,
    name: "Monitor UltraWide 34''",
    sku: "TR-9921-W34",
    quantity: 12,
    location: "P-A12 | F-04",
    status: "Disponível" as const,
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
    status: "Stock Baixo" as const,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCDYuzwdaa4DAnN-ocWJ6tKi4uIUxzy8fqXraLn0g5YUheAxjI5W-rQtxdZQZee3aJJ6-GM3LRoxqbu6GR4mCV2ewzm9hlOx6bbUI_LkU7CTXq9Zgssp6RKORqpkjkOk6R0j_upxRz9IzpVdfqsMHWB8gWwVFehY5tLopyefON-CPERp-BcB7bm1pV_R9yATWXqA1uXD1SXehbmAChRIsxbSBC8XFAA8ejLPqDvOMrOJpls-Z7sL_f9Kg5hrZTvTXYtcvDweeGZ-Dau",
    type: "entradas",
  },
];

const InventoryManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"entradas" | "saidas">("entradas");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"entradas" | "saidas">("entradas");

  const filteredStock = INVENTORY_MOCK.filter(
    (item) => item.type === activeTab,
  );

  const handleOpenModal = (type: "entradas" | "saidas") => {
    setModalType(type);
    setIsModalOpen(true);
  };

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
                    ? "bg-white dark:bg-[#6d3ff8] shadow-md text-[#6d3ff8] dark:text-white"
                    : "text-gray-500"
                }`}
              >
                Entradas
              </button>
              <button
                onClick={() => setActiveTab("saidas")}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeTab === "saidas"
                    ? "bg-white dark:bg-[#6d3ff8] shadow-md text-[#6d3ff8] dark:text-white"
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
            <InventoryControlCard onAction={handleOpenModal} />
          </div>
        </div>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white dark:bg-[#1c182d] rounded-[2.5rem] p-8 animate-in zoom-in-95 duration-200 shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-black tracking-tight mt-1 text-slate-900 dark:text-white">
                  Nova {modalType === "entradas" ? "Entrada" : "Saída"}
                </h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="size-12 flex items-center justify-center rounded-2xl bg-gray-100 dark:bg-white/5 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form className="space-y-6">
              <TralloInput
                label="Produto"
                placeholder="Nome ou SKU do item"
                className="w-full"
              />

              {modalType === "entradas" ? (
                <TralloInput
                  label="Localização no Armazém"
                  placeholder="Ex: P-A12 | F-04"
                  className="w-full"
                />
              ) : (
                <TralloInput
                  label="Entregador / Transportadora"
                  placeholder="Quem fará a entrega?"
                  className="w-full"
                />
              )}

              <TralloInput
                label="Quantidade"
                placeholder="0"
                type="number"
                className="w-full"
              />

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-full py-5 bg-[#6d3ff8] text-white rounded-2xl font-black shadow-lg shadow-purple-600/20 mt-4 transition-all hover:brightness-110 active:scale-[0.97]"
              >
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

export default InventoryManagement;
