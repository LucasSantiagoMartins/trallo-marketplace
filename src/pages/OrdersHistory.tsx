import React, { useState, useEffect } from "react";
import BottomNavigation from "../components/BottomNavigation";
import OrderItem from "../components/OrderItem";
import PageHeader from "../components/PageHeader";
import { OrderStatus } from "@/enums/order-status";
import { MyOrderDTO } from "@/dtos/order";
import { orderService } from "@/services/order.service";

const OrdersHistory: React.FC = () => {
  const [orders, setOrders] = useState<MyOrderDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"ativos" | "finalizados">(
    "ativos",
  );

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderService.getBuyerOrders();
      if (response.success) {
        setOrders(response.data);
      }
    } catch (error) {
      console.error("Erro ao carregar pedidos", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const isFinalized = [OrderStatus.DELIVERED, OrderStatus.CANCELLED].includes(
      order.status,
    );
    return activeTab === "finalizados" ? isFinalized : !isFinalized;
  });

  return (
    <div className="min-h-screen bg-[#f6f5f8] dark:bg-[#141022] text-[#121118] dark:text-white pb-24">
      <PageHeader title="Meus Pedidos" />

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
              {loading ? (
                <div className="py-20 text-center">
                  <div className="animate-spin size-8 border-4 border-[#6d3ff8] border-t-transparent rounded-full mx-auto mb-4" />
                  <p className="opacity-50">Carregando pedidos...</p>
                </div>
              ) : filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <OrderItem
                    key={order.orderNumber}
                    order={order}
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
                  <span className="material-symbols-outlined">shield</span>
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
