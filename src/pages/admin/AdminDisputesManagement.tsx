import React, { useState, useMemo, useEffect, useRef } from "react";
import Sidebar from "@/components/Sidebar";
import { useDisputes } from "@/hooks/useDisputes";
import { DisputeStatus } from "@/dtos/disputes";
import { adminItems } from "@/constants/sidebar-items";
import DisputeCard from "@/components/DisputeCard";
import { getDisputeStatusLabel } from "@/utils/mappers/dispute.mapper";
import LoaderAnimation from "@/components/Loader";
import Pagination from "@/components/Pagination";
import BottomNavigation from "@/components/BottomNavigation";

const DisputesManagement: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState<string>("Tudo");
  const ITEMS_PER_PAGE = 10;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const { disputes, totalPages, isLoading, refresh } = useDisputes(
    currentPage,
    ITEMS_PER_PAGE,
  );

  useEffect(() => {
    const activeElement = scrollContainerRef.current?.querySelector(
      '[data-active="true"]',
    );
    if (activeElement) {
      activeElement.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeFilter]);

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

  const filteredDisputes = useMemo(() => {
    const data = disputes || [];
    return data.filter((item) => {
      if (!item) return false;
      const matchesStatus =
        activeFilter === "Tudo" ||
        item.status === (activeFilter as DisputeStatus);
      return matchesStatus;
    });
  }, [disputes, activeFilter]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-['Inter']">
      <Sidebar
        title="Painel Administrativo"
        items={adminItems}
        activePage="disputas"
        showSettings={true}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 px-4 lg:px-12 pt-12 pb-44 max-w-7xl mx-auto w-full animate-in fade-in duration-500 flex flex-col">
          <header className="mb-8">
            <p className="text-[#6C3EF8] font-bold text-[10px] tracking-[0.2em] mb-1 uppercase">
              Suporte
            </p>
            <h1 className="text-3xl font-semibold text-[#0F172A]">
              Reclamações e Disputas
            </h1>
          </header>

          <div className="flex flex-col mb-8 w-full">
            <div className="flex flex-col w-full min-w-0 overflow-hidden">
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 ml-1">
                Filtrar Status
              </label>
              <div
                ref={scrollContainerRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                className="flex gap-3 overflow-x-auto py-4 px-2 -my-2 no-scrollbar touch-pan-x select-none justify-start scroll-smooth cursor-grab active:cursor-grabbing"
              >
                {["Tudo", ...Object.values(DisputeStatus)].map((filter) => (
                  <button
                    key={filter}
                    data-active={activeFilter === filter}
                    onClick={() => {
                      if (!isDragging.current) setActiveFilter(filter);
                    }}
                    className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-300 flex-shrink-0 ${
                      activeFilter === filter
                        ? "bg-[#6C3EF8] text-white shadow-lg -translate-y-1"
                        : "bg-white text-slate-400 border border-slate-100 hover:border-[#6C3EF8]/30"
                    }`}
                  >
                    {filter === "Tudo"
                      ? "Tudo"
                      : getDisputeStatusLabel(filter as DisputeStatus)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex-1 flex items-center justify-center min-h-[400px]">
              <LoaderAnimation />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDisputes.length > 0 ? (
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
                <div className="mt-8">
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
            </>
          )}
        </main>
        <BottomNavigation />
      </div>
    </div>
  );
};

export default DisputesManagement;
