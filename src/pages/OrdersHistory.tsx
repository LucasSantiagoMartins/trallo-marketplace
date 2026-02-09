import React, { useState } from "react";
import BottomNavigation from "../components/BottomNavigation";
import OrderItem from "../components/OrderItem";
import PageHeader from "../components/PageHeader";

const ORDERS_MOCK = [
  {
    id: "#TR-8821",
    name: "Apple Store Angola",
    date: "Hoje, 14:20",
    status: "A Caminho" as const,
    items: "1x iPhone 15 Pro Max, 1x Capa Silicone",
    price: "1.250.000",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop",
    type: "ativos",
  },
  {
    id: "#TR-8850",
    name: "Samsung Unitel",
    date: "Hoje, 16:45",
    status: "Preparando" as const,
    items: "1x Galaxy S24 Ultra, 1x Galaxy Buds 3 Pro",
    price: "980.000",
    image:
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=200&h=200&fit=crop",
    type: "ativos",
  },
  {
    id: "#TR-8755",
    name: "LG Electronics",
    date: "Hoje, 11:30",
    status: "Preparando" as const,
    items: "1x Smart TV OLED 55', 1x Soundbar G3",
    price: "845.200",
    image:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200&h=200&fit=crop",
    type: "ativos",
  },
  {
    id: "#TR-8210",
    name: "NCR Angola",
    date: "Ontem, 18:45",
    status: "Entregue" as const,
    items: "1x MacBook Air M2, 1x Mouse Logitech",
    price: "910.000",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop",

    type: "finalizados",
  },
  {
    id: "#TR-8100",
    name: "Zap Cinemas",
    date: "05 Fev, 20:00",
    status: "Entregue" as const,
    items: "4x Ingressos VIP, 2x Pipocas Grandes",
    price: "45.000",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=200&h=200&fit=crop",
    type: "finalizados",
  },
  {
    id: "#TR-7950",
    name: "Adidas Kilamba",
    date: "02 Fev, 14:15",
    status: "Entregue" as const,
    items: "1x Tênis Ultraboost Light, 2x Meias Performance",
    price: "125.000",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop",
    type: "finalizados",
  },
  {
    id: "#TR-7820",
    name: "Kero Ginga",
    date: "01 Fev, 10:30",
    status: "Entregue" as const,
    items: "Compras do Mês - Pack Econômico",
    price: "210.500",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&h=200&fit=crop",
    type: "finalizados",
  },
];

const OrdersHistory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"ativos" | "finalizados">(
    "ativos",
  );

  const filteredOrders = ORDERS_MOCK.filter(
    (order) => order.type === activeTab,
  );

  return (
    <div className="min-h-screen bg-[#f6f5f8] dark:bg-[#141022] text-[#121118] dark:text-white pb-24">
      <PageHeader
        title="Meus Pedidos"
      />

      <main className="max-w-7xl mx-auto px-4 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex p-1.5 bg-gray-200/50 dark:bg-white/5 rounded-2xl w-full md:w-80 mb-6 border border-gray-200/30 dark:border-white/5">
              <button
                onClick={() => setActiveTab("ativos")}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeTab === "ativos"
                    ? "bg-white dark:bg-[#6d3ff8] shadow-md"
                    : "text-gray-500"
                }`}
              >
                Ativos
              </button>
              <button
                onClick={() => setActiveTab("finalizados")}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeTab === "finalizados"
                    ? "bg-white dark:bg-[#6d3ff8] shadow-md"
                    : "text-gray-500"
                }`}
              >
                Finalizados
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <OrderItem
                    key={order.id}
                    {...order}
                    active={activeTab === "ativos"}
                  />
                ))
              ) : (
                <div className="py-20 text-center opacity-50">
                  <span className="material-symbols-outlined text-6xl mb-2">
                    inventory_2
                  </span>
                  <p>Nenhum pedido encontrado.</p>
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
                Gestão de Pedidos
              </h4>

              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                Aqui você pode acompanhar o estado em tempo real de suas
                compras. Lembramos que a liberação do pagamento ao vendedor
                ocorre em até{" "}
                <span className="text-[#6d3ff8] font-bold">
                  24h após a entrega
                </span>
                , garantindo total segurança para você.
              </p>

              <div className="pt-6 border-t border-gray-100 dark:border-white/5">
                <div className="flex items-center gap-1 text-[#6d3ff8]">
                  <span className="material-symbols-outlined">
                    shield
                  </span>
                  <span className="text-xs font-black uppercase tracking-widest">
                    Compra Protegida
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default OrdersHistory;
