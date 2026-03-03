import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import {
  Wallet,
  User,
  ArrowUpRight,
  Clock,
  ShieldCheck,
  Store,
} from "lucide-react"; 
import Pagination from "../components/Pagination";
import BottomNavigation from "../components/BottomNavigation";
import Sidebar from "@/components/Sidebar";
import { adminItems } from "@/constants/sidebar-items";

const WalletManagement: React.FC = () => {
  const apiResponse = {
    success: true,
    data: {
      wallets: [
        {
          id: "5d561f18-5a89-467c-953b-e54438c14cd3",
          availableBalance: 200000,
          heldBalance: 0,
          walletType: "SELLER",
          updatedAt: "2026-03-02T22:41:57.388Z",
          owner: {
            id: 2,
            fullName: "Operador Trallo",
            email: "operator@gmail.com",
          },
        },
        {
          id: "b76bc8fc-dd93-49d5-9d13-f046a360fc92",
          availableBalance: 194000,
          heldBalance: 18000,
          walletType: "SELLER",
          updatedAt: "2026-03-02T22:54:15.554Z",
          owner: {
            id: 1,
            fullName: "Vendedor trallo",
            email: "seller@gmail.com",
          },
        },
        {
          id: "a325dab6-c6ba-479f-b341-ce7d09a32e8b",
          availableBalance: 100000,
          heldBalance: 0,
          walletType: "SELLER",
          updatedAt: "2026-03-02T22:41:57.388Z",
          owner: {
            id: 5,
            fullName: "Entregador trallo",
            email: "deliverer@gmail.com",
          },
        },
        {
          id: "dd0059a8-582b-4bee-ba61-dca37c4cc7f5",
          availableBalance: 2000,
          heldBalance: 0,
          walletType: "PLATFORM",
          updatedAt: "2026-03-02T22:41:57.388Z",
          owner: { id: 6, fullName: "Admin trallo", email: "admin@gmail.com" },
        },
      ],
      pagination: { total: 4, page: 1, limit: 10, totalPages: 1 },
    },
  };

  const [currentPage, setCurrentPage] = useState(
    apiResponse.data.pagination.page,
  );
  const [activeFilter, setActiveFilter] = useState("Tudo");

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("pt-AO", {
      style: "currency",
      currency: "AOA",
    }).format(val);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  const filteredWallets = apiResponse.data.wallets.filter(
    (wallet) => activeFilter === "Tudo" || wallet.walletType === activeFilter,
  );

  return (
    <div className="min-h-screen bg-[#F4F7FE] flex font-['Inter'] antialiased text-[#1B2559]">
      <Sidebar
        title="Painel Administrativo"
        items={adminItems}
        activePage="carteiras"
      />

      <div className="flex-1 flex flex-col min-w-0">
        <motion.main
          className="flex-1 px-4 lg:px-8 pt-8 pb-20 max-w-[1400px] mx-auto w-full"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Cabeçalho */}
          <motion.header
            variants={itemVariants}
            className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-[#1B2559]">
                Gestão de Carteiras
              </h1>
              <p className="text-sm text-[#A3AED0] mt-1 font-medium">
                Monitoramento de saldos e custódia da rede Trallo.
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-sm border border-white flex items-center gap-4">
              <div className="p-3 bg-[#F4F7FE] rounded-xl text-[#6C3EF8]">
                <Wallet size={24} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#A3AED0] uppercase tracking-wider">
                  Patrimônio Total
                </p>
                <h2 className="text-xl font-bold text-[#1B2559]">
                  {formatCurrency(496000)}
                </h2>
              </div>
            </div>
          </motion.header>

          {/* Filtros */}
          <motion.div
            variants={itemVariants}
            className="flex gap-3 mb-8 overflow-x-auto pb-2"
          >
            {["Tudo", "SELLER", "PLATFORM"].map((tipo) => (
              <button
                key={tipo}
                onClick={() => setActiveFilter(tipo)}
                className={`px-5 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                  activeFilter === tipo
                    ? "bg-[#6C3EF8] text-white shadow-lg shadow-[#6C3EF8]/30"
                    : "bg-white text-[#A3AED0] hover:text-[#6C3EF8] border border-transparent shadow-sm"
                }`}
              >
                {tipo === "Tudo"
                  ? "Todas as Contas"
                  : tipo === "SELLER"
                    ? "Vendedores"
                    : "Plataforma"}
              </button>
            ))}
          </motion.div>

          {/* Grid de Carteiras */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWallets.map((wallet) => (
              <motion.div
                key={wallet.id}
                variants={itemVariants}
                className="bg-white rounded-3xl p-6 border border-white shadow-xl shadow-[#7090B0]/10 hover:shadow-2xl hover:shadow-[#7090B0]/20 transition-all group relative overflow-hidden"
              >
                {/* Badge de Tipo */}
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
                    {wallet.walletType === "SELLER" ? "Vendedor" : "Sistema"}
                  </span>
                </div>

                {/* Info Dono */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-[#1B2559] truncate">
                    {wallet.owner.fullName}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[#A3AED0]">
                    <User size={12} />
                    <span className="text-xs font-medium truncate">
                      {wallet.owner.email}
                    </span>
                  </div>
                </div>

                {/* Saldos */}
                <div className="space-y-4 bg-[#F4F7FE] p-4 rounded-2xl">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-bold text-[#A3AED0] uppercase">
                      Disponível
                    </span>
                    <span className="text-base font-black text-[#1B2559]">
                      {formatCurrency(wallet.availableBalance)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-t border-slate-200/50 pt-3">
                    <span className="text-[11px] font-bold text-[#A3AED0] uppercase">
                      Retido
                    </span>
                    <span
                      className={`text-sm font-bold ${wallet.heldBalance > 0 ? "text-orange-500" : "text-[#A3AED0]"}`}
                    >
                      {formatCurrency(wallet.heldBalance)}
                    </span>
                  </div>
                </div>

                {/* Footer do Card */}
                <div className="mt-6 flex justify-between items-center">
                  <div className="flex items-center gap-1.5 text-[#A3AED0]">
                    <Clock size={12} />
                    <span className="text-[10px] font-medium">
                      Atu.{" "}
                      {new Date(wallet.updatedAt).toLocaleDateString("pt-AO")}
                    </span>
                  </div>
                  <button className="flex items-center gap-1 text-xs font-bold text-[#6C3EF8] hover:underline">
                    Detalhes <ArrowUpRight size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Paginação */}
          <motion.div
            variants={itemVariants}
            className="mt-12 flex justify-center"
          >
            <div className="bg-white p-2 rounded-2xl shadow-sm border border-white">
              <Pagination
                currentPage={currentPage}
                totalPages={apiResponse.data.pagination.totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </motion.div>
        </motion.main>
        <BottomNavigation />
      </div>
    </div>
  );
};

export default WalletManagement;
