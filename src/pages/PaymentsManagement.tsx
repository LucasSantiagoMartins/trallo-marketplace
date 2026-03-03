import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, Variants } from "framer-motion";
import Pagination from "../components/Pagination";
import BottomNavigation from "../components/BottomNavigation";
import PaymentCard from "@/components/PaymentCard";
import Sidebar from "@/components/Sidebar";
import { adminItems } from "@/constants/sidebar-items";
import { getAdminPayments } from "@/services/admin.service";
import { AdminPayment } from "@/dtos/admin-management";
import { PaymentStatus } from "@/enums/payment";

const PaymentsManagement: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState<string>("Tudo");
  const [searchQuery, setSearchQuery] = useState("");
  const [payments, setPayments] = useState<AdminPayment[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const ITEMS_PER_PAGE = 10;

  const fetchPayments = useCallback(async (page: number) => {
    setIsLoading(true);
    try {
      const response = await getAdminPayments(page, ITEMS_PER_PAGE);
      if (response.success) {
        setPayments(response.data.payments);
        setTotalPages(response.data.pagination.totalPages);
      }
    } catch (error) {
      console.error("Erro ao carregar pagamentos:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPayments(currentPage);
  }, [currentPage, fetchPayments]);

  const filteredPayments = useMemo(() => {
    return payments.filter((pay) => {
      const matchesStatus =
        activeFilter === "Tudo" ||
        pay.status === (activeFilter as PaymentStatus);

      const matchesSearch =
        pay.seller.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pay.order.orderNumber
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        pay.id.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [payments, activeFilter, searchQuery]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-['Inter']">
      <Sidebar
        title="Painel Administrativo"
        items={adminItems}
        activePage="pagamentos"
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
              Operações
            </p>
            <h1 className="text-3xl font-semibold text-[#0F172A]">
              Gestão de Pagamentos
            </h1>
          </motion.header>

          <motion.div
            variants={itemVariants}
            className="flex flex-col lg:flex-row lg:items-end gap-6 mb-8"
          >
            <div className="relative flex-1">
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">
                Pesquisar Beneficiário
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ID, nome do vendedor ou pedido..."
                  className="w-full bg-white border-none rounded-2xl py-4 pl-12 pr-4 shadow-sm focus:ring-2 focus:ring-[#6C3EF8]/20 transition-all text-sm outline-none font-medium"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 ml-1 lg:text-right">
                Estado
              </label>
              <div className="flex gap-3 overflow-visible py-4 px-2 -my-2 no-scrollbar">
                {["Tudo", "PAID", "PROCESSING", "PENDING", "FAILED"].map(
                  (filter) => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] whitespace-nowrap transition-all duration-300 ${
                        activeFilter === filter
                          ? "bg-[#6C3EF8] text-white shadow-[0_10px_20px_-5px_rgba(108,62,248,0.4)] -translate-y-1"
                          : "bg-white text-slate-400 border border-slate-100 hover:shadow-md hover:text-slate-600 active:scale-95"
                      }`}
                    >
                      {filter === "PAID"
                        ? "Pago"
                        : filter === "PROCESSING"
                          ? "Processando"
                          : filter === "PENDING"
                            ? "Pendente"
                            : filter === "FAILED"
                              ? "Falhou"
                              : filter}
                    </button>
                  ),
                )}
              </div>
            </div>
          </motion.div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {isLoading ? (
                <div className="col-span-full py-20 text-center text-slate-400 font-medium italic">
                  Buscando registros na rede...
                </div>
              ) : filteredPayments.length > 0 ? (
                filteredPayments.map((pay) => (
                  <motion.div key={pay.id} variants={itemVariants}>
                    <PaymentCard payment={pay} />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center text-slate-400 font-medium">
                  Nenhum resultado encontrado para os filtros aplicados.
                </div>
              )}
            </div>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </motion.main>

        <BottomNavigation />
      </div>
    </div>
  );
};

export default PaymentsManagement;
