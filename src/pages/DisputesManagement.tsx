import React, { useState, useMemo } from "react";
import Sidebar from "@/components/Sidebar";
import Pagination from "../components/Pagination";
import BottomNavigation from "../components/BottomNavigation";
import { useDisputes } from "@/hooks/useDisputes";
import { DisputeStatus } from "@/dtos/disputes";
import { adminItems } from "@/constants/sidebar-items";
import DisputeCard from "@/components/DisputeCard";
import { getDisputeStatusLabel } from "@/utils/mappers/dispute.mapper";

const DisputesManagement: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState<string>("Tudo");
  const [searchQuery, setSearchQuery] = useState("");
  const ITEMS_PER_PAGE = 10;

  const { disputes, totalPages, isLoading, refresh } = useDisputes(
    currentPage,
    ITEMS_PER_PAGE,
  );

  const filteredDisputes = useMemo(() => {
    const data = disputes || [];

    return data.filter((item) => {
      if (!item) return false;

      const matchesStatus =
        activeFilter === "Tudo" ||
        item.status === (activeFilter as DisputeStatus);

      const search = searchQuery.toLowerCase();
      const matchesSearch =
        item.user?.fullName?.toLowerCase().includes(search) ||
        item.orderId?.toLowerCase().includes(search);

      return matchesStatus && matchesSearch;
    });
  }, [disputes, activeFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-['Inter']">
      <Sidebar
        title="Painel Administrativo"
        items={adminItems}
        activePage="disputas"
        showSettings={true}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 px-4 lg:px-12 pt-12 pb-44 max-w-7xl mx-auto w-full animate-in fade-in duration-500">
          <header className="mb-8">
            <p className="text-[#6C3EF8] font-bold text-[10px] tracking-[0.2em] mb-1 uppercase">
              Suporte
            </p>
            <h1 className="text-3xl font-semibold text-[#0F172A]">
              Reclamações e Disputas
            </h1>
          </header>

          <div className="flex flex-col lg:flex-row lg:items-end gap-6 mb-8">
            <div className="relative flex-1">
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">
                Localizar Reclamação
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Nome do usuário ou ID do pedido..."
                  className="w-full bg-white border-none rounded-2xl py-4 pl-12 pr-4 shadow-sm focus:ring-2 focus:ring-[#6C3EF8]/20 transition-all text-sm outline-none font-medium"
                />
              </div>
            </div>

            <div className="flex flex-col w-full lg:w-auto overflow-hidden">
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 ml-1 lg:text-right">
                Filtrar Status
              </label>
              <div className="flex gap-3 overflow-x-auto py-4 px-2 -my-2 no-scrollbar">
                {["Tudo", ...Object.values(DisputeStatus)].map((filter: DisputeStatus) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-300 flex-shrink-0 ${
                      activeFilter === filter
                        ? "bg-[#6C3EF8] text-white shadow-lg -translate-y-1"
                        : "bg-white text-slate-400 border border-slate-100"
                    }`}
                  >
                    {getDisputeStatusLabel(filter)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {isLoading ? (
              <div className="col-span-full py-20 text-center text-slate-400 font-medium italic">
                Sincronizando disputas...
              </div>
            ) : filteredDisputes.length > 0 ? (
              filteredDisputes.map((dispute) => (
                <DisputeCard
                  key={dispute.id}
                  dispute={dispute}
                  onSuccess={refresh}
                />
              ))
            ) : (
              <div className="col-span-full py-20 text-center text-slate-400 font-medium">
                Nenhuma reclamação encontrada.
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          )}
        </main>
        <BottomNavigation />
      </div>
    </div>
  );
};

export default DisputesManagement;
