import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import BottomNavigation from "../components/BottomNavigation";
import UserListItem from "../components/UserListItem";
import Pagination from "../components/Pagination";
import CustomReasonModal from "@/components/CustomReasonModal";
import { adminItems } from "@/constants/sidebar-items";
import { getUsers } from "@/services/user.service";
import { UserResponseDTO } from "@/types/user";
import { UserRole } from "@/enums/user";

const UsersManagement: React.FC = () => {
  const [users, setUsers] = useState<UserResponseDTO[]>([]);
  const [filter, setFilter] = useState("Todos");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateAfter, setDateAfter] = useState("");
  const [dateBefore, setDateBefore] = useState("");
  const [loading, setLoading] = useState(true);

  const [selectedUser, setSelectedUser] = useState<UserResponseDTO | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalPages = 3;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const roleMap: Record<string, UserRole | undefined> = {
        Vendedores: UserRole.SELLER,
        Compradores: UserRole.BUYER,
        ADMIN: UserRole.ADMIN,
        Todos: undefined,
      };

      const response = await getUsers({
        role: roleMap[filter],
        query: searchTerm, // Enviando como query para o DTO
        createdAfter: dateAfter ? new Date(dateAfter) : undefined,
        createdBefore: dateBefore ? new Date(dateBefore) : undefined,
        page: currentPage,
      });

      if (response.success) {
        setUsers(response.data);
      }
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleActionClick = (user: UserResponseDTO) => {
    if (user.isSuspended) {
      console.log("Lógica para reativar usuário:", user.id);
    } else {
      setSelectedUser(user);
      setIsModalOpen(true);
    }
  };

  const handleConfirmSuspension = async (reason: string) => {
    if (!selectedUser) return;
    try {
      setIsModalOpen(false);
      setSelectedUser(null);
      await fetchUsers();
    } catch (error) {
      console.error("Erro ao suspender:", error);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchUsers();
    }, 400);
    return () => clearTimeout(delayDebounce);
  }, [filter, searchTerm, currentPage, dateAfter, dateBefore]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-['Inter'] relative">
      <Sidebar
        title="Painel Administrativo"
        items={adminItems}
        activePage="usuarios"
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
              Gerenciamento
            </p>
            <h1 className="text-3xl font-semibold text-[#0F172A]">
              Usuários da Plataforma
            </h1>
          </motion.header>

          <motion.div variants={itemVariants} className="space-y-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              {/* Busca Principal */}
              <div className="flex-1 w-full lg:max-w-md">
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">
                  Nome, E-mail ou Telefone
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">
                    search
                  </span>
                  <input
                    type="text"
                    placeholder="Pesquisar registros..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full bg-white border-none rounded-2xl py-4 pl-12 pr-4 shadow-sm focus:ring-2 focus:ring-[#6C3EF8]/20 transition-all text-sm font-medium outline-none"
                  />
                </div>
              </div>

              {/* Filtro de Tipo (Tabs) */}
              <div className="flex flex-col">
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 ml-1 lg:text-right">
                  Filtrar por tipo
                </label>
                <div className="flex gap-3 overflow-x-auto py-4 px-2 -my-2 no-scrollbar lg:justify-end">
                  {["Todos", "Vendedores", "Compradores", "ADMIN"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => {
                        setFilter(tab);
                        setCurrentPage(1);
                      }}
                      className={`px-6 py-3 rounded-full text-[11px] font-black uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${
                        filter === tab
                          ? "bg-[#6C3EF8] text-white shadow-[0_10px_25px_-5px_rgba(108,62,248,0.4)] -translate-y-1"
                          : "bg-white text-slate-500 shadow-sm border border-slate-100 hover:border-slate-200"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Filtros de Data */}
            <div className="flex flex-wrap gap-4 items-end bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                  Criado após
                </label>
                <input
                  type="date"
                  value={dateAfter}
                  onChange={(e) => setDateAfter(e.target.value)}
                  className="w-full bg-white border-none rounded-xl py-2.5 px-4 shadow-sm text-xs font-semibold text-slate-600 outline-none focus:ring-2 focus:ring-[#6C3EF8]/10"
                />
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                  Criado antes de
                </label>
                <input
                  type="date"
                  value={dateBefore}
                  onChange={(e) => setDateBefore(e.target.value)}
                  className="w-full bg-white border-none rounded-xl py-2.5 px-4 shadow-sm text-xs font-semibold text-slate-600 outline-none focus:ring-2 focus:ring-[#6C3EF8]/10"
                />
              </div>
              <button 
                onClick={() => { setDateAfter(""); setDateBefore(""); }}
                className="px-4 py-2.5 text-[10px] font-bold text-slate-400 hover:text-red-500 transition-colors uppercase"
              >
                Limpar Datas
              </button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? (
              <div className="col-span-full flex justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6C3EF8]"></div>
              </div>
            ) : (
              users.map((user) => (
                <motion.div key={user.id} variants={itemVariants}>
                  <UserListItem
                    user={user}
                    onActionClick={() => handleActionClick(user)}
                  />
                </motion.div>
              ))
            )}

            {!loading && users.length === 0 && (
              <div className="col-span-full text-center py-20 text-slate-400 bg-white rounded-3xl border border-dashed border-slate-200">
                Nenhum usuário encontrado com os filtros aplicados.
              </div>
            )}
          </div>
        </motion.main>

        <div className="mt-auto">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>

        <BottomNavigation />
      </div>

      <CustomReasonModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedUser(null);
        }}
        onConfirm={handleConfirmSuspension}
      />
    </div>
  );
};

export default UsersManagement;