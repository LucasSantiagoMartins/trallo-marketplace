import React, { useState, useEffect, useCallback, useRef } from "react";
import { User, Clock, ShieldCheck, Store, Loader2 } from "lucide-react";
import Pagination from "../components/Pagination";
import BottomNavigation from "../components/BottomNavigation";
import Sidebar from "@/components/Sidebar";
import { adminItems } from "@/constants/sidebar-items";
import { getAdminWallets } from "@/services/admin.service";
import { AdminWalletListResponse } from "@/dtos/admin-management";
import { formatDateFriendly } from "@/utils/date";
import TralloInput from "@/components/TralloInput";

const WalletManagement: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [walletsData, setWalletsData] =
    useState<AdminWalletListResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("Tudo");
  const [searchTerm, setSearchTerm] = useState("");

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const fetchWallets = useCallback(async (page: number) => {
    setLoading(true);
    try {
      const response = await getAdminWallets(page, 9);
      if (response.success) {
        setWalletsData(response.data);
      }
    } catch (error) {
      console.error("Erro ao carregar carteiras:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWallets(currentPage);
  }, [currentPage, fetchWallets]);

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

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("pt-AO", {
      style: "currency",
      currency: "AOA",
    }).format(val);

  const filterOptions = [
    { label: "Todas as Contas", value: "Tudo" },
    { label: "Vendedores", value: "SELLER" },
    { label: "Plataforma", value: "PLATFORM" },
  ];

  const filteredWallets =
    walletsData?.wallets.filter((wallet) => {
      const matchesFilter =
        activeFilter === "Tudo" || wallet.walletType === activeFilter;
      const matchesSearch =
        wallet.owner.fullName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        wallet.owner.email.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesFilter && matchesSearch;
    }) || [];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-['Inter'] relative">
      <Sidebar
        title="Painel Administrativo"
        items={adminItems}
        activePage="carteiras"
        showSettings={true}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 px-4 lg:px-12 pt-12 pb-44 max-w-7xl mx-auto w-full animate-in fade-in duration-500">
          <header className="mb-10">
            <p className="text-[#6C3EF8] font-bold text-[10px] tracking-[0.2em] mb-1 uppercase">
              Financeiro
            </p>
            <h1 className="text-3xl font-semibold text-[#0F172A]">
              Gestão de Carteiras
            </h1>
          </header>

          <div className="space-y-8 mb-10">
            {/* Seção de Pesquisa */}
            <div className="w-full">
              <TralloInput
                label="Pesquisar Beneficiário"
                icon="search"
                placeholder="Pesquisar por nome ou e-mail..."
                value={searchTerm}
                onChange={setSearchTerm}
                className="shadow-none border-slate-200 w-full"
              />
            </div>

            {/* Seção de Filtros */}
            <div className="flex flex-col w-full overflow-hidden">
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">
                Filtrar por Tipo
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
                      if (!isDragging.current) setActiveFilter(filter.value);
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

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <Loader2 className="w-10 h-10 animate-spin mb-4 text-[#6C3EF8]" />
              <p className="text-sm font-medium">Carregando carteiras...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWallets.map((wallet) => (
                  <div
                    key={wallet.id}
                    className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-[#7090B0]/10 transition-all group relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div
                        className={`p-2.5 rounded-xl ${
                          wallet.walletType === "PLATFORM"
                            ? "bg-amber-50 text-amber-600"
                            : "bg-indigo-50 text-indigo-600"
                        }`}
                      >
                        {wallet.walletType === "PLATFORM" ? (
                          <ShieldCheck size={20} />
                        ) : (
                          <Store size={20} />
                        )}
                      </div>
                      <span
                        className={`text-[10px] px-3 py-1 rounded-full font-black tracking-widest uppercase ${
                          wallet.walletType === "PLATFORM"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-indigo-100 text-indigo-700"
                        }`}
                      >
                        {wallet.walletType === "SELLER"
                          ? "Vendedor"
                          : "Sistema"}
                      </span>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-[#1B2559] truncate">
                        {wallet.owner.fullName}
                      </h3>
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <User size={12} />
                        <span className="text-xs font-medium truncate">
                          {wallet.owner.email}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">
                          Disponível
                        </span>
                        <span className="text-base font-black text-[#1B2559]">
                          {formatCurrency(wallet.availableBalance)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center border-t border-slate-200 pt-3">
                        <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">
                          Retido
                        </span>
                        <span
                          className={`text-sm font-bold ${
                            wallet.heldBalance > 0
                              ? "text-orange-500"
                              : "text-slate-400"
                          }`}
                        >
                          {formatCurrency(wallet.heldBalance)}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-between items-center">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Clock size={12} />
                        <span className="text-[8px] font-bold uppercase tracking-tight">
                          atualizado em . {formatDateFriendly(wallet.updatedAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {walletsData && walletsData.pagination.totalPages > 1 && (
                <div className="mt-12">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={walletsData.pagination.totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </>
          )}
        </main>

        <BottomNavigation />
      </div>
    </div>
  );
};

export default WalletManagement;
