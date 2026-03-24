import React, { useState, useEffect, useCallback } from "react";
import { motion, Variants } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import BottomNavigation from "../components/BottomNavigation";
import Pagination from "../components/Pagination";
import SegmentedControl from "../components/SegmentedControl";
import { orderService } from "@/services/order.service";
import { DeliveryResponseDto } from "@/dtos/delivery-response";
import DeliveryOrderCard from "@/components/DeliveryOrderCard";
import TralloInput from "@/components/TralloInput";
import { adminItems } from "@/constants/sidebar-items";
import LoaderAnimation from "@/components/Loader";

const AdminDeliveryManagement: React.FC = () => {
  const [deliveries, setDeliveries] = useState<DeliveryResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"ativos" | "finalizados">(
    "ativos",
  );

  const ITEMS_PER_PAGE = 10;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const fetchAllDeliveries = useCallback(async (page: number) => {
    try {
      setLoading(true);
      const response = await orderService.getAdminDeliveries(
        page,
        ITEMS_PER_PAGE,
      );

      if (response.success && response.data) {
        const resData = response.data as any;
        setDeliveries(
          Array.isArray(resData.deliveries) ? resData.deliveries : [],
        );
        setTotalPages(resData.pagination?.totalPages || 1);
      }
    } catch (error) {
      console.error("Erro ao carregar gestão de entregas", error);
      setDeliveries([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllDeliveries(currentPage);
  }, [currentPage, fetchAllDeliveries]);

  const filteredDeliveries = deliveries.filter((delivery) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      delivery.order.orderNumber.toLowerCase().includes(searchLower) ||
      delivery.order.buyerName.toLowerCase().includes(searchLower) ||
      delivery.deliverer?.name.toLowerCase().includes(searchLower);

    const isFinalized = ["DELIVERED", "DELIVERY_FAILED", "CANCELLED"].includes(
      delivery.status,
    );
    const matchesTab = activeTab === "finalizados" ? isFinalized : !isFinalized;

    return matchesSearch && matchesTab;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-['Inter'] relative">
      <Sidebar
        title="Painel Administrativo"
        items={adminItems}
        activePage="entregas"
        showSettings={true}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <motion.main
          className="flex-1 px-4 lg:px-12 pt-12 pb-44 max-w-7xl mx-auto w-full"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.header variants={itemVariants} className="mb-8">
            <p className="text-[#6C3EF8] font-bold text-[10px] tracking-[0.2em] mb-1 uppercase">
              Logística
            </p>
            <h1 className="text-3xl font-semibold text-[#0F172A]">
              Gestão de Entregas
            </h1>
          </motion.header>

          <motion.div variants={itemVariants} className="space-y-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="flex-1 w-full lg:max-w-md">
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">
                  Pedido, Cliente ou Entregador
                </label>
                <TralloInput
                  placeholder="Pesquisar entregas..."
                  value={searchQuery}
                  onChange={(val) => {
                    setSearchQuery(val);
                    setCurrentPage(1);
                  }}
                  icon="search"
                />
              </div>

              <div className="flex flex-col">
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 ml-1 lg:text-right">
                  Status da Entrega
                </label>
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
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {loading ? (
              <LoaderAnimation />
            ) : filteredDeliveries.length > 0 ? (
              filteredDeliveries.map((delivery) => (
                <motion.div key={delivery.id} variants={itemVariants}>
                  <DeliveryOrderCard
                    delivery={delivery}
                    active={activeTab === "ativos"}
                    onRefresh={() => fetchAllDeliveries(currentPage)}
                    isAdminView={true}
                  />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center opacity-50 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                <span className="material-symbols-outlined text-6xl mb-2 text-slate-300">
                  local_shipping
                </span>
                <p className="text-slate-500 font-medium">
                  Nenhuma entrega encontrada
                </p>
              </div>
            )}
          </div>
        </motion.main>

        <div className="mt-auto">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </div>

        <BottomNavigation />
      </div>
    </div>
  );
};

export default AdminDeliveryManagement;
