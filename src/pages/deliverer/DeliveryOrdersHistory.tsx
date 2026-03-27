import React, { useState, useEffect, useCallback } from "react";
 
import Loader from "@/components/Loader";
import { DeliveryResponseDto } from "@/dtos/delivery-response";
import DeliveryOrderCard from "@/components/DeliveryOrderCard";
import TralloInput from "@/components/TralloInput";
import { deliveryService } from "@/services/delivery.service";
import DeliveryDetailsModal from "@/components/DeliveryDetailsModal";
import PageHeader from "@/components/PageHeader";
import SegmentedControl from "@/components/SegmentedControl";
import BottomNavigation from "@/components/BottomNavigation";
import Pagination from "@/components/Pagination";

const DeliveryOrdersHistory: React.FC = () => {
  const [deliveries, setDeliveries] = useState<DeliveryResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"ativos" | "finalizados">(
    "ativos",
  );

  const [selectedDelivery, setSelectedDelivery] =
    useState<DeliveryResponseDto | null>(null);

  const ITEMS_PER_PAGE = 10;

  const fetchDeliveries = useCallback(async (page: number) => {
    try {
      setLoading(true);
      const response = await deliveryService.getDeliveryOrders(
        page,
        ITEMS_PER_PAGE,
      );

      if (response.success && response.data.deliveries) {
        const { deliveries, pagination } = response.data as any;
        setDeliveries(Array.isArray(deliveries) ? deliveries : []);
        setTotalPages(pagination?.totalPages || 1);
      }
    } catch (error) {
      console.error("Erro ao carregar entregas", error);
      setDeliveries([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDeliveries(currentPage);
  }, [currentPage, fetchDeliveries]);

  const filteredDeliveries = deliveries.filter((delivery) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      delivery.order.orderNumber.toLowerCase().includes(searchLower) ||
      delivery.order.buyerName.toLowerCase().includes(searchLower);

    const isFinalized = ["DELIVERED", "DELIVERY_FAILED", "CANCELLED"].includes(
      delivery.status,
    );
    const matchesTab = activeTab === "finalizados" ? isFinalized : !isFinalized;

    return matchesSearch && matchesTab;
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#f6f5f8] dark:bg-[#141022] text-[#121118] dark:text-white pb-24 font-['Inter'] relative z-0">
      <PageHeader title="Minhas Entregas" />

      <main className="max-w-7xl mx-auto px-4 pt-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
              <SegmentedControl
                className="w-full md:w-80"
                activeId={activeTab}
                onChange={(tab: any) => {
                  setActiveTab(tab);
                  setCurrentPage(1);
                }}
                options={[
                  { id: "ativos", label: "Pendentes" },
                  { id: "finalizados", label: "Concluídas" },
                ]}
              />

              <div className="flex-1">
                <TralloInput
                  placeholder="Pesquisar por pedido ou cliente..."
                  value={searchQuery}
                  onChange={(val) => setSearchQuery(val)}
                  icon="search"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {loading ? (
                <Loader />
              ) : filteredDeliveries.length > 0 ? (
                <>
                  {filteredDeliveries.map((delivery) => (
                    <DeliveryOrderCard
                      key={delivery.id}
                      delivery={delivery}
                      active={activeTab === "ativos"}
                      onRefresh={() => fetchDeliveries(currentPage)}
                      onShowDetails={() => setSelectedDelivery(delivery)}
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
                    local_shipping
                  </span>
                  <p>Nenhuma entrega encontrada</p>
                </div>
              )}
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-28 p-8 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800/50 dark:to-gray-900/50 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-xl">
              <div className="size-14 rounded-2xl bg-[#6d3ff8] flex items-center justify-center text-white mb-6 shadow-lg shadow-purple-500/20">
                <span className="material-symbols-outlined text-3xl">
                  directions_run
                </span>
              </div>
              <h4 className="font-black text-xl mb-4 tracking-tight">
                Painel do Entregador
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Gerencie suas rotas. Use o botão "Ver Rota" para abrir o GPS e,
                ao chegar ao destino, clique em "Confirmar Entrega" para
                finalizar o processo.
              </p>
            </div>
          </div>
        </div>
      </main>

      {selectedDelivery && (
        <DeliveryDetailsModal
          delivery={selectedDelivery}
          onClose={() => setSelectedDelivery(null)}
        />
      )}

      <BottomNavigation />
    </div>
  );
};

export default DeliveryOrdersHistory;
