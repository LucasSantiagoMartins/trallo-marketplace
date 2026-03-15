import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, Variants } from "framer-motion";
import Pagination from "../components/Pagination";
import BottomNavigation from "../components/BottomNavigation";
import OrderCard from "../components/OrderCard";
import Sidebar from "@/components/Sidebar";
import { operatorItems } from "@/constants/sidebar-items";
import { OrderStatus } from "@/enums/order-status";
import { OrderDTO } from "@/dtos/order";
import { orderService } from "@/services/order.service";
import { orderStatusLabel } from "@/utils/mappers/order.mapper";

const OrdersManagement: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeStatus, setActiveStatus] = useState<string>("Tudo");
  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setOrders] = useState<OrderDTO[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const ITEMS_PER_PAGE = 10;

  const fetchAllOrders = useCallback(async (page: number) => {
    setIsLoading(true);
    try {
      const response = await orderService.getOrdersManagement(
        page,
        ITEMS_PER_PAGE,
      );
      if (response.success) {
        setOrders(response.data.orders);
        setTotalPages(response.data.pagination.totalPages);
      }
    } catch (err) {
      console.error("Erro ao carregar pedidos:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllOrders(currentPage);
  }, [currentPage, fetchAllOrders]);

  // Lógica de filtro atualizada
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // Filtro por Status
      const matchesStatus =
        activeStatus === "Tudo" || order.status === activeStatus;

      const matchesSearch =
        order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.items.some(
          (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.productSku?.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      return matchesStatus && matchesSearch;
    });
  }, [orders, activeStatus, searchQuery]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-['Inter']">
      <Sidebar
        title="Painel Operacional"
        items={operatorItems}
        activePage="pedidos"
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
              Operador de Sistema
            </p>
            <h1 className="text-3xl font-semibold text-[#0F172A]">
              Monitoramento de Pedidos
            </h1>
          </motion.header>

          <motion.div
            variants={itemVariants}
            className="flex flex-col lg:flex-row lg:items-end gap-6 mb-8"
          >
            <div className="relative flex-1">
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">
                Filtro Global
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  manage_search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Pesquisar por Nº do pedido e produto..."
                  className="w-full bg-white border-none rounded-2xl py-4 pl-12 pr-4 shadow-sm focus:ring-2 focus:ring-[#6C3EF8]/20 transition-all text-sm outline-none font-medium text-slate-700"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 ml-1 lg:text-right">
                Estado da Transação
              </label>
              <div className="flex gap-2 overflow-x-auto py-4 no-scrollbar max-w-[90vw] lg:max-w-xl">
                {[
                  "Tudo",
                  OrderStatus.AWAITING_PAYMENT,
                  OrderStatus.PAYMENT_PROCESSING,
                  OrderStatus.PAID,
                  OrderStatus.PAYMENT_FAILED,
                  OrderStatus.AWAITING_SHIPMENT,
                  OrderStatus.SHIPPED,
                  OrderStatus.DELIVERED,
                  OrderStatus.CANCELLED,
                ].map((status) => (
                  <button
                    key={status}
                    onClick={() => setActiveStatus(status)}
                    className={`px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                      activeStatus === status
                        ? "bg-[#6C3EF8] text-white"
                        : "bg-white text-slate-400 border border-slate-100 hover:bg-slate-50"
                    }`}
                  >
                    {
                    }
                    {status === "Tudo"
                      ? "Todos"
                      : orderStatusLabel(status as OrderStatus)}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {isLoading ? (
              <div className="col-span-full py-32 text-center">
                <div className="animate-spin size-10 border-4 border-[#6C3EF8] border-t-transparent rounded-full mx-auto mb-4" />
                <p className="text-slate-400 font-medium italic">
                  Consultando registros...
                </p>
              </div>
            ) : filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <motion.div key={order.orderNumber} variants={itemVariants}>
                  <OrderCard order={order} isSeller={false} isAdmin={true} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-24 text-center bg-white rounded-[2rem] border-2 border-dashed border-slate-100">
                <span className="material-symbols-outlined text-5xl text-slate-200 mb-3">
                  order_approve
                </span>
                <p className="text-slate-400 font-medium">
                  Nenhum pedido corresponde aos critérios de busca.
                </p>
              </div>
            )}
          </div>

          <div className="mt-12">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </div>
        </motion.main>

        <BottomNavigation />
      </div>
    </div>
  );
};

export default OrdersManagement;
