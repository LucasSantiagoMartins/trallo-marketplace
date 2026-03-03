import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { User, Clock, ShieldCheck, Store, Loader2, Search } from "lucide-react";
import Pagination from "../components/Pagination";
import BottomNavigation from "../components/BottomNavigation";
import Sidebar from "@/components/Sidebar";
import { adminItems } from "@/constants/sidebar-items";
import { getAdminWallets } from "@/services/admin.service";
import { AdminWalletListResponse } from "@/dtos/admin-management";
import { formatDateFriendly } from "@/utils/date";

const WalletManagement: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [walletsData, setWalletsData] =
    useState<AdminWalletListResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("Tudo");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchWallets = async (page: number) => {
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
  };

  useEffect(() => {
    fetchWallets(currentPage);
  }, [currentPage]);

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("pt-AO", {
      style: "currency",
      currency: "AOA",
    }).format(val);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

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
    <div className="min-h-screen bg-[#F8FAFC] flex font-['Inter']">
      <Sidebar
        title="Painel Administrativo"
        items={adminItems}
        activePage="carteiras"
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
              Financeiro
            </p>
            <h1 className="text-3xl font-semibold text-[#0F172A]">
              Gestão de Carteiras
            </h1>
          </motion.header>

          <motion.div
            variants={itemVariants}
            className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 mb-12"
          >
            <div className="flex-1 w-full max-w-md relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search
                  size={18}
                  className="text-slate-400 group-focus-within:text-[#6C3EF8] transition-colors"
                />
              </div>
              <input
                type="text"
                placeholder="Pesquisar por nome ou e-mail..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-slate-200 text-slate-600 text-sm rounded-2xl py-3.5 pl-12 pr-4 shadow-sm outline-none focus:border-[#6C3EF8] focus:ring-4 focus:ring-[#6C3EF8]/5 transition-all"
              />
            </div>

            <div className="flex flex-col shrink-0">
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1 xl:text-right">
                Filtrar por Tipo
              </label>
              <div className="flex flex-wrap gap-2 xl:justify-end">
                {filterOptions.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setActiveFilter(filter.value)}
                    className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.05em] transition-all duration-300 ${
                      activeFilter === filter.value
                        ? "bg-[#6C3EF8] text-white shadow-[0_8px_15px_-3px_rgba(108,62,248,0.3)] -translate-y-0.5"
                        : "bg-white text-slate-400 border border-slate-100 hover:border-slate-200 hover:text-slate-600 active:scale-95"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <Loader2 className="w-10 h-10 animate-spin mb-4 text-[#6C3EF8]" />
              <p className="text-sm font-medium">Carregando carteiras...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWallets.map((wallet) => (
                  <motion.div
                    key={wallet.id}
                    variants={itemVariants}
                    className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-[#7090B0]/10 transition-all group relative overflow-hidden"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div
                        className={`p-2.5 rounded-xl ${wallet.walletType === "PLATFORM" ? "bg-amber-50 text-amber-600" : "bg-indigo-50 text-indigo-600"}`}
                      >
                        {wallet.walletType === "PLATFORM" ? (
                          <ShieldCheck size={20} />
                        ) : (
                          <Store size={20} />
                        )}
                      </div>
                      <span
                        className={`text-[10px] px-3 py-1 rounded-full font-black tracking-widest uppercase ${wallet.walletType === "PLATFORM" ? "bg-amber-100 text-amber-700" : "bg-indigo-100 text-indigo-700"}`}
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
                          className={`text-sm font-bold ${wallet.heldBalance > 0 ? "text-orange-500" : "text-slate-400"}`}
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
                  </motion.div>
                ))}
              </div>

              {walletsData && walletsData.pagination.totalPages > 1 && (
                <motion.div variants={itemVariants} className="mt-12">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={walletsData.pagination.totalPages}
                    onPageChange={setCurrentPage}
                  />
                </motion.div>
              )}
            </>
          )}
        </motion.main>

        <BottomNavigation />
      </div>
    </div>
  );
};

export default WalletManagement;
