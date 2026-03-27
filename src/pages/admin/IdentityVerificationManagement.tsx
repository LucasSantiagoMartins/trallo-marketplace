import React, { useState, useEffect, useMemo } from "react";
import Sidebar from "@/components/Sidebar";
import { adminItems } from "@/constants/sidebar-items";
import LoaderAnimation from "@/components/Loader";
import { useIdentityVerification } from "@/hooks/useIdentityVerification";
import IdentityCard from "@/components/IdentityCard";
import Pagination from "@/components/Pagination";

const IdentityVerificationManagement: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("PENDING");
  const ITEMS_PER_PAGE = 10;

  const { verifications, totalPages, loading, fetchVerifications } =
    useIdentityVerification(currentPage, ITEMS_PER_PAGE);

  useEffect(() => {
    fetchVerifications();
  }, [fetchVerifications]);

  const filteredData = useMemo(() => {
    if (activeFilter === "ALL") return verifications;
    return verifications.filter((v: any) => v.status === activeFilter);
  }, [verifications, activeFilter]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-['Inter']">
      <Sidebar
        title="Painel Administrativo"
        items={adminItems}
        activePage="verificacoes"
      />

      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 px-4 lg:px-12 pt-12 pb-44 max-w-7xl mx-auto w-full animate-in fade-in duration-500 flex flex-col">
          <header className="mb-8">
            <p className="text-[#6C3EF8] font-bold text-[10px] tracking-[0.2em] mb-1 uppercase">
              Segurança
            </p>
            <h1 className="text-3xl font-semibold text-[#0F172A]">
              Verificações de Identidade
            </h1>
          </header>

          <div className="flex gap-3 mb-8 overflow-x-auto no-scrollbar py-2">
            {[
              { id: "PENDING", label: "Pendentes" },
              { id: "APPROVED", label: "Aprovados" },
              { id: "REJECTED", label: "Rejeitados" },
              { id: "ALL", label: "Histórico Geral" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeFilter === f.id
                    ? "bg-[#6C3EF8] text-white shadow-lg"
                    : "bg-white text-slate-400 border border-slate-100"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex-1 flex items-center justify-center min-h-[400px]">
              <LoaderAnimation />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredData.length > 0 ? (
                  filteredData.map((item: any) => (
                    <IdentityCard
                      key={item.id}
                      data={item}
                      onRefresh={fetchVerifications}
                    />
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center text-slate-400 font-medium">
                    Nenhuma solicitação encontrada.
                  </div>
                )}
              </div>

              {totalPages > 1 && (
                <div className="mt-8">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default IdentityVerificationManagement;
