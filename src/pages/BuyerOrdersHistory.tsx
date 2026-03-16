import React, { useState, useEffect, useCallback } from "react";
import BottomNavigation from "../components/BottomNavigation";
import OrderItem from "../components/OrderCard";
import PageHeader from "../components/PageHeader";
import Pagination from "../components/Pagination";
import SegmentedControl from "../components/SegmentedControl";
import { OrderStatus } from "@/enums/order-status";
import { OrderDTO } from "@/dtos/order";
import { orderService } from "@/services/order.service";

const BuyerOrdersHistory: React.FC = () => {
  const [orders, setOrders] = useState<OrderDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeTab, setActiveTab] = useState<"ativos" | "finalizados">(
    "ativos",
  );

  const ITEMS_PER_PAGE = 10;

  const fetchOrders = useCallback(async (page: number) => {
    try {
      setLoading(true);
      const response = await orderService.getBuyerOrders(page, ITEMS_PER_PAGE);
      if (response.success && response.data) {
        const data = response.data as any;
        setOrders(Array.isArray(data.orders) ? data.orders : []);
        setTotalPages(data.pagination?.totalPages || 1);
      }
    } catch (error) {
      console.error("Erro ao carregar pedidos", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage, fetchOrders]);

  const filteredOrders = (Array.isArray(orders) ? orders : []).filter(
    (order) => {
      const isFinalized = [
        OrderStatus.DELIVERED,
        OrderStatus.CANCELLED,
      ].includes(order.status);
      return activeTab === "finalizados" ? isFinalized : !isFinalized;
    },
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTabChange = (tab: "ativos" | "finalizados") => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#f6f5f8] dark:bg-[#141022] text-[#121118] dark:text-white">
      <PageHeader title="Meus Pedidos" />

      <main className="max-w-7xl mx-auto px-4 pt-24 pb-20 lg:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <SegmentedControl
              className="w-full md:w-80 mb-6"
              activeId={activeTab}
              onChange={handleTabChange}
              options={[
                { id: "ativos", label: "Ativos" },
                { id: "finalizados", label: "Finalizados" },
              ]}
            />

            <div className="grid grid-cols-1 gap-4">
              {loading ? (
                <div className="py-20 text-center">
                  <div className="animate-spin size-8 border-4 border-[#6d3ff8] border-t-transparent rounded-full mx-auto mb-4" />
                  <p className="opacity-50">Carregando pedidos...</p>
                </div>
              ) : filteredOrders.length > 0 ? (
                <>
                  {filteredOrders.map((order) => (
                    <OrderItem
                      key={order.orderNumber}
                      order={order}
                      active={activeTab === "ativos"}
                      isAdmin={false}
                      isSeller={false}
                    />
                  ))}

                  <div className="mt-8">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                </>
              ) : (
                <div className="py-20 text-center opacity-50 bg-white dark:bg-white/5 rounded-[2rem] border-2 border-dashed border-gray-200 dark:border-white/5">
                  <span className="material-symbols-outlined text-6xl mb-2">
                    inventory_2
                  </span>
                  <p>Nenhum pedido encontrado</p>
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
              <div className="border-t border-gray-100 dark:border-white/5">
                <div className="flex items-center gap-1 mt-6 text-[#6d3ff8]">
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

export default BuyerOrdersHistory;
