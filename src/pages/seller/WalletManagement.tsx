import React, { useState, useEffect, useCallback, useRef } from "react";
import { Clock, ShieldCheck, Store, Eye, X } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { adminItems } from "@/constants/sidebar-items";
import { getAdminWallets } from "@/services/admin.service";
import { AdminWalletListResponse, AdminWallet } from "@/dtos/admin-management";
import { formatDateFriendly } from "@/utils/date";
import TralloInput from "@/components/TralloInput";
import TralloButton from "@/components/TralloButton";
import LoaderAnimation from "@/components/Loader";
import { WalletDetailsModal } from "@/components/walletDetailsModal";
import Pagination from "@/components/Pagination";
import BottomNavigation from "@/components/BottomNavigation";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const WalletManagement: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [walletsData, setWalletsData] =
    useState<AdminWalletListResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("Tudo");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWallet, setSelectedWallet] = useState<AdminWallet | null>(
    null,
  );

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
            <LoaderAnimation />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredWallets.map((wallet) => (
                  <div
                    key={wallet.id}
                    className="bg-white rounded-[1.5rem] p-4 border border-slate-100 shadow-sm hover:shadow-md transition-all group animate-in fade-in slide-in-from-bottom-2"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`p-2 rounded-xl ${wallet.walletType === "PLATFORM" ? "bg-amber-50 text-amber-600" : "bg-indigo-50 text-indigo-600"}`}
                      >
                        {wallet.walletType === "PLATFORM" ? (
                          <ShieldCheck size={18} />
                        ) : (
                          <Store size={18} />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-bold text-[#1B2559] truncate uppercase tracking-tight">
                          {wallet.owner.fullName}
                        </h3>
                        <p className="text-[10px] text-slate-400 truncate tracking-wide">
                          {wallet.owner.email}
                        </p>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 mb-4">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                        Disponível
                      </p>
                      <p className="text-lg font-black text-[#1B2559]">
                        {formatCurrency(wallet.availableBalance)}
                      </p>
                    </div>

                    <TralloButton
                      onClick={() => setSelectedWallet(wallet)}
                      variant="secondary"
                      className="w-full !h-12 !text-[10px] !uppercase !tracking-widest"
                    >
                      <Eye size={14} className="mr-2" /> Detalhes
                    </TralloButton>
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

      <WalletDetailsModal
        wallet={selectedWallet}
        onClose={() => setSelectedWallet(null)}
      />
    </div>
  );
};

export default WalletManagement;
