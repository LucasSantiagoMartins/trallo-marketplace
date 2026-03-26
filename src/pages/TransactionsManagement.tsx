import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import Pagination from "../components/Pagination";
import TransactionCard from "../components/TransactionCard";
import BottomNavigation from "../components/BottomNavigation";
import Sidebar from "@/components/Sidebar";
import { adminItems } from "@/constants/sidebar-items";
import { getAdminTransactions } from "@/services/admin.service";
import { AdminTransaction } from "@/dtos/admin-management";
import { TransactionType } from "@/enums/transaction";
import TralloInput from "@/components/TralloInput";

const TransactionsManagement: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<TransactionType | "Tudo">(
    "Tudo",
  );
  const [transactions, setTransactions] = useState<AdminTransaction[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const ITEMS_PER_PAGE = 10;

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const fetchTransactions = useCallback(async (page: number) => {
    setIsLoading(true);
    try {
      const response = await getAdminTransactions(page, ITEMS_PER_PAGE);
      if (response.success) {
        setTransactions(response.data.transactions);
        setTotalPages(response.data.pagination.totalPages);
      }
    } catch (error) {
      console.error("Erro ao carregar transações:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions(currentPage);
  }, [currentPage, fetchTransactions]);

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

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        tx.wallet.ownerName.toLowerCase().includes(searchLower) ||
        tx.order?.orderNumber.toLowerCase().includes(searchLower) ||
        tx.id.toLowerCase().includes(searchLower);

      const matchesType = activeFilter === "Tudo" || tx.type === activeFilter;

      return matchesSearch && matchesType;
    });
  }, [transactions, searchQuery, activeFilter]);

  const filterOptions = [
    { label: "Tudo", value: "Tudo" },
    { label: "Venda", value: TransactionType.SALE },
    { label: "Saque", value: TransactionType.WITHDRAWAL },
    { label: "Estorno", value: TransactionType.REFUND },
    { label: "Comissão", value: TransactionType.COMMISSION },
    { label: "Saque Plataforma", value: TransactionType.PLATFORM_WITHDRAWAL },
    { label: "Débito Plataforma", value: TransactionType.PLATFORM_DEBIT },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-['Inter']">
      <Sidebar
        title="Painel Administrativo"
        items={adminItems}
        activePage="transacoes"
        showSettings={true}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 px-4 lg:px-12 pt-12 pb-44 max-w-7xl mx-auto w-full animate-in fade-in duration-500">
          <header className="mb-10">
            <p className="text-[#6C3EF8] font-bold text-[10px] tracking-[0.2em] mb-1 uppercase">
              Financeiro
            </p>
            <h1 className="text-3xl font-semibold text-[#0F172A]">
              Histórico de Transações
            </h1>
          </header>

          <div className="space-y-8 mb-10">
            {/* Seção de Pesquisa */}
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

            {/* Seção de Filtros */}
            <div className="flex flex-col w-full overflow-hidden">
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">
                Tipo de Transação
              </label>
              <div
                ref={scrollContainerRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                className="flex gap-3 overflow-x-auto py-2 px-1 no-scrollbar touch-pan-x select-none scroll-smooth cursor-grab active:cursor-grabbing"
              >
                {filterOptions.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => {
                      if (!isDragging.current)
                        setActiveFilter(filter.value as any);
                    }}
                    className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] whitespace-nowrap transition-all duration-300 flex-shrink-0 border ${
                      activeFilter === filter.value
                        ? "bg-[#6C3EF8] text-white border-[#6C3EF8] -translate-y-0.5"
                        : "bg-white text-slate-400 border-slate-100 hover:text-slate-600 hover:border-slate-200 shadow-none"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center px-1">
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                {isLoading
                  ? "Carregando..."
                  : `Mostrando ${filteredTransactions.length} transações`}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {!isLoading &&
                filteredTransactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                  >
                    <TransactionCard transaction={tx} />
                  </div>
                ))}

              {isLoading &&
                Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-40 bg-slate-200 animate-pulse rounded-[2rem]"
                  />
                ))}
            </div>

            {!isLoading && filteredTransactions.length === 0 && (
              <div className="py-20 text-center text-slate-400 font-medium border-2 border-dashed border-slate-100 rounded-3xl">
                Nenhum registro encontrado para os filtros selecionados.
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
        </main>

        <BottomNavigation />
      </div>
    </div>
  );
};

export default TransactionsManagement;
