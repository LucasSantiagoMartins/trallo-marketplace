import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import Pagination from "../components/Pagination";
import BottomNavigation from "../components/BottomNavigation";
import PaymentCard from "@/components/PaymentCard";
import Sidebar from "@/components/Sidebar";
import { adminItems } from "@/constants/sidebar-items";
import { getAdminPayments } from "@/services/admin.service";
import { AdminPayment } from "@/dtos/admin-management";
import { PaymentStatus } from "@/enums/payment";
import TralloInput from "@/components/TralloInput";

const PaymentsManagement: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState<string>("Tudo");
  const [searchQuery, setSearchQuery] = useState("");
  const [payments, setPayments] = useState<AdminPayment[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const ITEMS_PER_PAGE = 10;

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

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

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
    scrollLeft.current = scrollContainerRef.current?.scrollLeft || 0;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
    const walk = (x - startX.current) * 2;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
    }
  };

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

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-['Inter']">
      <Sidebar
        title="Painel Administrativo"
        items={adminItems}
        activePage="pagamentos"
        showSettings={true}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 px-4 lg:px-12 pt-12 pb-44 max-w-7xl mx-auto w-full animate-in fade-in duration-500">
          <header className="mb-10">
            <p className="text-[#6C3EF8] font-bold text-[10px] tracking-[0.2em] mb-1 uppercase">
              Operações
            </p>
            <h1 className="text-3xl font-semibold text-[#0F172A]">
              Gestão de Pagamentos
            </h1>
          </header>

          <div className="space-y-8 mb-10">
            {/* Seção de Pesquisa - Agora com W-FULL */}
            <div className="w-full">
              <TralloInput
                label="Pesquisar Beneficiário"
                icon="search"
                placeholder="ID, nome do vendedor ou pedido..."
                value={searchQuery}
                onChange={setSearchQuery}
                className="shadow-none border-slate-200 w-full"
              />
            </div>

            {/* Seção de Filtros Separada */}
            <div className="flex flex-col w-full overflow-hidden">
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">
                Filtrar por Estado
              </label>
              <div
                ref={scrollContainerRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                className="flex gap-3 overflow-x-auto py-2 px-1 no-scrollbar touch-pan-x select-none scroll-smooth cursor-grab active:cursor-grabbing"
              >
                {["Tudo", "PAID", "PROCESSING", "PENDING", "FAILED"].map(
                  (filter) => (
                    <button
                      key={filter}
                      onClick={() => {
                        if (!isDragging.current) setActiveFilter(filter);
                      }}
                      className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] whitespace-nowrap transition-all duration-300 flex-shrink-0 border ${
                        activeFilter === filter
                          ? "bg-[#6C3EF8] text-white border-[#6C3EF8] -translate-y-0.5"
                          : "bg-white text-slate-400 border-slate-100 hover:text-slate-600 hover:border-slate-200 shadow-none"
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
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {isLoading ? (
                <div className="col-span-full py-20 text-center text-slate-400 font-medium italic">
                  Buscando registros na rede...
                </div>
              ) : filteredPayments.length > 0 ? (
                filteredPayments.map((pay) => (
                  <div
                    key={pay.id}
                    className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                  >
                    <PaymentCard payment={pay} />
                  </div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center text-slate-400 font-medium border-2 border-dashed border-slate-100 rounded-3xl">
                  Nenhum resultado encontrado para os filtros aplicados.
                </div>
              )}
            </div>
          </div>

          {totalPages > 1 && (
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
          )}
        </main>

        <BottomNavigation />
      </div>
    </div>
  );
};

export default PaymentsManagement;
