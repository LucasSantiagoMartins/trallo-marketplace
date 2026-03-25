import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import BottomNavigation from "../components/BottomNavigation";
import UserListItem from "../components/UserListItem";
import Pagination from "../components/Pagination";
import CustomReasonModal from "@/components/CustomReasonModal";
import ConfirmAction from "@/components/ConfirmAction";
import { adminItems } from "@/constants/sidebar-items";
import { UserResponseDTO } from "@/types/user";
import { useUserManagement } from "@/hooks/useUserManagement";

const UsersManagement: React.FC = () => {
  const [filter, setFilter] = useState("Todos");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateAfter, setDateAfter] = useState("");
  const [dateBefore, setDateBefore] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  const [selectedUser, setSelectedUser] = useState<UserResponseDTO | null>(
    null,
  );
  const [isSuspensionModalOpen, setIsSuspensionModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isReactivateModalOpen, setIsReactivateModalOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const {
    users,
    loading,
    totalPages,
    handleSuspend,
    handleReactivate,
    handleDelete,
  } = useUserManagement(filter, searchTerm, currentPage, dateAfter, dateBefore);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onConfirmSuspension = async (reason: string) => {
    if (selectedUser) {
      setActionLoading(true);
      const res = await handleSuspend(String(selectedUser.id), reason);
      if (res.success) {
        setIsSuspensionModalOpen(false);
        setSelectedUser(null);
      }
      setActionLoading(false);
    }
  };

  const onConfirmDelete = async () => {
    if (selectedUser) {
      setActionLoading(true);
      const res = await handleDelete(String(selectedUser.id));
      if (res.success) {
        setIsDeleteModalOpen(false);
        setSelectedUser(null);
      }
      setActionLoading(false);
    }
  };

  const onConfirmReactivate = async () => {
    if (selectedUser) {
      setActionLoading(true);
      const res = await handleReactivate(String(selectedUser.id));
      if (res.success) {
        setIsReactivateModalOpen(false);
        setSelectedUser(null);
      }
      setActionLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-['Inter'] relative">
      <Sidebar
        title="Painel Administrativo"
        items={adminItems}
        activePage="usuarios"
        showSettings={true}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <main
          className={`flex-1 px-4 lg:px-12 pt-12 pb-44 max-w-7xl mx-auto w-full transition-all duration-700 ease-out ${
            isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <header className="mb-8">
            <p className="text-[#6C3EF8] font-bold text-[10px] tracking-[0.2em] mb-1 uppercase">
              Gerenciamento
            </p>
            <h1 className="text-3xl font-semibold text-[#0F172A]">
              Usuários da Plataforma
            </h1>
          </header>

          <div className="space-y-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
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

              <div className="flex flex-col">
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 ml-1 lg:text-right">
                  Filtrar por tipo
                </label>
                <div className="flex gap-3 overflow-x-auto py-4 px-2 -my-2 no-scrollbar lg:justify-end">
                  {["Todos", "Vendedores", "Compradores", "ADMIN"].map(
                    (tab) => (
                      <button
                        key={tab}
                        onClick={() => {
                          setFilter(tab);
                          setCurrentPage(1);
                        }}
                        className={`px-6 py-3 rounded-full text-[11px] font-black uppercase tracking-wider whitespace-nowrap transition-all duration-300 active:scale-95 ${
                          filter === tab
                            ? "bg-[#6C3EF8] text-white shadow-[0_10px_25px_-5px_rgba(108,62,248,0.4)] -translate-y-1"
                            : "bg-white text-slate-500 shadow-sm border border-slate-100 hover:border-slate-200"
                        }`}
                      >
                        {tab}
                      </button>
                    ),
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 items-end bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                  Criado após
                </label>
                <input
                  type="date"
                  value={dateAfter}
                  onChange={(e) => {
                    setDateAfter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full bg-white border-none rounded-xl py-2.5 px-4 shadow-sm text-xs font-semibold text-slate-600 outline-none focus:ring-2 focus:ring-[#6C3EF8]/10 transition-all"
                />
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                  Criado antes de
                </label>
                <input
                  type="date"
                  value={dateBefore}
                  onChange={(e) => {
                    setDateBefore(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full bg-white border-none rounded-xl py-2.5 px-4 shadow-sm text-xs font-semibold text-slate-600 outline-none focus:ring-2 focus:ring-[#6C3EF8]/10 transition-all"
                />
              </div>
              <button
                onClick={() => {
                  setDateAfter("");
                  setDateBefore("");
                  setCurrentPage(1);
                }}
                className="px-4 py-2.5 text-[10px] font-bold text-slate-400 hover:text-red-500 transition-colors uppercase"
              >
                Limpar Datas
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? (
              <div className="col-span-full flex justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6C3EF8]"></div>
              </div>
            ) : (
              users.map((user, index) => (
                <UserListItem
                  key={user.id}
                  user={user}
                  onSuspendClick={() => {
                    setSelectedUser(user);
                    setIsSuspensionModalOpen(true);
                  }}
                  onReactivateClick={() => {
                    setSelectedUser(user);
                    setIsReactivateModalOpen(true);
                  }}
                  onDeleteClick={() => {
                    setSelectedUser(user);
                    setIsDeleteModalOpen(true);
                  }}
                  styleDelay={index * 50}
                  isMounted={isMounted}
                />
              ))
            )}
          </div>
        </main>

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
        isOpen={isSuspensionModalOpen}
        onClose={() => {
          setIsSuspensionModalOpen(false);
          setSelectedUser(null);
        }}
        onConfirm={onConfirmSuspension}
      />

      <ConfirmAction
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedUser(null);
        }}
        onConfirm={onConfirmDelete}
        isLoading={actionLoading}
        title="Excluir Usuário"
        description={`Tem certeza que deseja excluir permanentemente ${selectedUser?.fullName}? Esta ação removerá todos os dados vinculados e não pode ser desfeita.`}
        confirmText="Sim, excluir"
        variant="danger"
        icon="delete_forever"
      />

      <ConfirmAction
        isOpen={isReactivateModalOpen}
        onClose={() => {
          setIsReactivateModalOpen(false);
          setSelectedUser(null);
        }}
        onConfirm={onConfirmReactivate}
        isLoading={actionLoading}
        title="Reativar Usuário"
        description={`Deseja restaurar o acesso de ${selectedUser?.fullName}? O usuário poderá realizar login novamente na plataforma.`}
        confirmText="Confirmar"
        variant="primary"
        icon="person_check"
      />
    </div>
  );
};

export default UsersManagement;
