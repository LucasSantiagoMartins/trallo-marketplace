import React, { useState, useEffect, useCallback } from "react";
import BottomNavigation from "../components/BottomNavigation";
import OrderCard from "../components/OrderCard";
import PageHeader from "../components/PageHeader";
import Pagination from "../components/Pagination";
import { OrderStatus } from "@/enums/order-status";
import { OrderDTO } from "@/dtos/order";
import { orderService } from "@/services/order.service";

const SellerOrdersHistory: React.FC = () => {
  const [orders, setOrders] = useState<OrderDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeTab, setActiveTab] = useState<"ativos" | "finalizados">(
    "ativos",
  );

  const ITEMS_PER_PAGE = 3;

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

  return (
    <div className="min-h-screen bg-[#f6f5f8] dark:bg-[#141022] text-[#121118] dark:text-white pb-24 font-['Inter'] relative z-0">
      <PageHeader title="Minhas Vendas" />

      <main className="max-w-7xl mx-auto px-4 pt-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex p-1.5 bg-gray-200/50 dark:bg-white/5 rounded-2xl w-full md:w-80 mb-6 border border-gray-200/30 dark:border-white/5">
              <button
                onClick={() => { setActiveTab("ativos"); setCurrentPage(1); }}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  activeTab === "ativos"
                    ? "bg-white dark:bg-[#6d3ff8] shadow-md text-[#6d3ff8] dark:text-white"
                    : "text-gray-500"
                }`}
              >
                Em Andamento
              </button>
              <button
                onClick={() => { setActiveTab("finalizados"); setCurrentPage(1); }}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  activeTab === "finalizados"
                    ? "bg-white dark:bg-[#6d3ff8] shadow-md text-[#6d3ff8] dark:text-white"
                    : "text-gray-500"
                }`}
              >
                Concluídas
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {loading ? (
                <div className="py-20 text-center">
                  <div className="animate-spin size-8 border-4 border-[#6d3ff8] border-t-transparent rounded-full mx-auto mb-4" />
                  <p className="opacity-50">Carregando vendas...</p>
                </div>
              ) : filteredOrders.length > 0 ? (
                <>
                  {filteredOrders.map((order) => (
                    <OrderCard
                      key={order.orderNumber}
                      order={order}
                      active={activeTab === "ativos"}
                      isSeller={true}
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
                <div className="flex items-center gap-1 text-[#6d3ff8]">
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