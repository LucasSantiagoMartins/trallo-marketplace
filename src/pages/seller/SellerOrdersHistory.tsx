import React, { useState, useEffect, useCallback } from "react";
import { OrderStatus } from "@/enums/order-status";
import { OrderDTO } from "@/dtos/order";
import { orderService } from "@/services/order.service";
import Loader from "@/components/Loader";
import PageHeader from "@/components/PageHeader";
import SegmentedControl from "@/components/SegmentedControl";
import Pagination from "@/components/Pagination";
import OrderCard from "@/components/OrderCard";
import BottomNavigation from "@/components/BottomNavigation";

const SellerOrdersHistory: React.FC = () => {
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
      const response = await orderService.getSellerOrders(page, ITEMS_PER_PAGE);
      if (response.success && response.data) {
        const resData = response.data as any;
        setOrders(Array.isArray(resData.orders) ? resData.orders : []);
        setTotalPages(resData.pagination?.totalPages || 1);
      }
    } catch (error) {
      console.error("Erro ao carregar vendas", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage, fetchOrders]);

  const filteredOrders = orders.filter((order) => {
    const isFinalized = [
      OrderStatus.DELIVERED,
      OrderStatus.PAID,
      OrderStatus.CANCELLED,
    ].includes(order.status);

    return activeTab === "finalizados" ? isFinalized : !isFinalized;
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTabChange = (tab: "ativos" | "finalizados") => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#f6f5f8] dark:bg-[#141022] text-[#121118] dark:text-white pb-24 font-['Inter'] relative z-0">
      <PageHeader title="Minhas Vendas" />

      <main className="max-w-7xl mx-auto px-4 pt-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <SegmentedControl
              className="w-full md:w-80 mb-6"
              activeId={activeTab}
              onChange={handleTabChange}
              options={[
                { id: "ativos", label: "Em Andamento" },
                { id: "finalizados", label: "Concluídas" },
              ]}
            />

            <div className="grid grid-cols-1 gap-4">
              {loading ? (
                <Loader />
              ) : filteredOrders.length > 0 ? (
                <>
                  {filteredOrders.map((order) => (
                    <OrderCard
                      key={order.orderNumber}
                      order={order}
                      active={activeTab === "ativos"}
                      isSeller={true}
                      onRefresh={() => fetchOrders(currentPage)}
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
                    sell
                  </span>
                  <p>Nenhuma venda encontrada</p>
                </div>
              )}
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-28 p-8 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800/50 dark:to-gray-900/50 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-xl">
              <div className="size-14 rounded-2xl bg-[#6d3ff8] flex items-center justify-center text-white mb-6 shadow-lg shadow-purple-500/20">
                <span className="material-symbols-outlined text-3xl">
                  payments
                </span>
              </div>
              <h4 className="font-black text-xl mb-4 tracking-tight">
                Pedidos Recebidos
              </h4>

              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                Acompanhe os detalhes de cada venda. Após a entrega ao
                comprador, ele terá até{" "}
                <span className="text-[#6d3ff8] font-bold">24 horas</span> para
                abrir uma reclamação. Caso não haja nenhuma reclamação dentro
                desse prazo, o pedido será considerado concluído e o valor da
                venda, já com a comissão padrão da plataforma, será liberado
                para levantamento.
              </p>
              <div className="border-t border-gray-100 dark:border-white/5 pt-4">
                <div className="flex items-center gap-1 mt-2 text-[#6d3ff8]">
                  <span className="material-symbols-outlined">
                    verified_user
                  </span>
                  <span className="text-xs font-black uppercase tracking-widest">
                    Venda Garantida
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

export default SellerOrdersHistory;