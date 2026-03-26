import React, { useState, useEffect, useRef, useMemo } from "react";
import Pagination from "../components/Pagination";
import BottomNavigation from "../components/BottomNavigation";
import UserListItem from "../components/UserListItem";
import Sidebar from "@/components/Sidebar";
import CustomReasonModal from "@/components/CustomReasonModal";
import ConfirmAction from "@/components/ConfirmAction";
import { adminItems } from "@/constants/sidebar-items";
import { UserResponseDTO } from "@/types/user";
import { useUserManagement } from "@/hooks/useUserManagement";
import TralloInput from "@/components/TralloInput";
import TralloButton from "@/components/TralloButton";
import { UserRole } from "@/enums/user";
import { getUserRoleLabel } from "@/utils/mappers/user.mapper";

const UsersManagement: React.FC = () => {
  const [filter, setFilter] = useState<string>("");
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

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const {
    users, // Assumindo que o hook retorna a lista base
    loading,
    handleSuspend,
    handleReactivate,
    handleDelete,
  } = useUserManagement(undefined, "", 1, "", "");

  const filterOptions = useMemo(
    () => [
      { label: "Todos", value: "" },
      { label: getUserRoleLabel(UserRole.SELLER), value: UserRole.SELLER },
      { label: getUserRoleLabel(UserRole.BUYER), value: UserRole.BUYER },
      { label: getUserRoleLabel(UserRole.ADMIN), value: UserRole.ADMIN },
      { label: getUserRoleLabel(UserRole.OPERATOR), value: UserRole.OPERATOR },
      {
        label: getUserRoleLabel(UserRole.DELIVERER),
        value: UserRole.DELIVERER,
      },
    ],
    [],
  );

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesRole = filter === "" || user.role === filter;

      const search = searchTerm.toLowerCase();
      const matchesSearch =
        user.fullName?.toLowerCase().includes(search) ||
        user.email?.toLowerCase().includes(search) ||
        user.phoneNumber?.includes(search);

      const createdAt = new Date(user.createdAt).getTime();
      const matchesAfter =
        !dateAfter || createdAt >= new Date(dateAfter).getTime();
      const matchesBefore =
        !dateBefore || createdAt <= new Date(dateBefore).getTime();

      return matchesRole && matchesSearch && matchesAfter && matchesBefore;
    });
  }, [users, filter, searchTerm, dateAfter, dateBefore]);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(start, start + itemsPerPage);
  }, [filteredUsers, currentPage]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter, searchTerm, dateAfter, dateBefore]);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    if (scrollContainerRef.current) {
      startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
      scrollLeft.current = scrollContainerRef.current.scrollLeft;
    }
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  const handleMouseUp = () => {
    setTimeout(() => (isDragging.current = false), 50);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
  };

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
          <header className="mb-10">
            <p className="text-[#6C3EF8] font-bold text-[10px] tracking-[0.2em] mb-1 uppercase">
              Gerenciamento
            </p>
            <h1 className="text-3xl font-semibold text-[#0F172A]">
              Usuários da Plataforma
            </h1>
          </header>

          <div className="space-y-8 mb-10">
            <div className="w-full">
              <TralloInput
                label="Nome, E-mail ou Telefone"
                icon="search"
                placeholder="Pesquisar registros..."
                value={searchTerm}
                onChange={setSearchTerm}
                className="shadow-none border-slate-200 w-full"
              />
            </div>

            <div className="flex flex-col w-full overflow-hidden">
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">
                Filtrar por tipo
              </label>
              <div
                ref={scrollContainerRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                className="flex gap-3 overflow-x-auto py-2 px-1 no-scrollbar touch-pan-x select-none scroll-smooth cursor-grab active:cursor-grabbing"
              >
                {filterOptions.map((tab) => (
                  <button
                    key={tab.label}
                    onClick={() => setFilter(tab.value)}
                    className={`px-6 py-3 rounded-full text-[11px] font-black uppercase tracking-wider whitespace-nowrap transition-all duration-300 border ${
                      filter === tab.value
                        ? "bg-[#6C3EF8] text-white border-[#6C3EF8] -translate-y-0.5"
                        : "bg-white text-slate-500 border-slate-100 shadow-none hover:border-slate-200"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 items-end bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
              <div className="flex-1 min-w-[200px]">
                <TralloInput
                  label="Criado após"
                  type="date"
                  value={dateAfter}
                  onChange={setDateAfter}
                  className="shadow-none border-slate-200"
                />
              </div>
              <div className="flex-1 min-w-[200px]">
                <TralloInput
                  label="Criado antes de"
                  type="date"
                  value={dateBefore}
                  onChange={setDateBefore}
                  className="shadow-none border-slate-200"
                />
              </div>
              <TralloButton
                variant="primary"
                className="shadow-none"
                onClick={() => {
                  setDateAfter("");
                  setDateBefore("");
                }}
              >
                Limpar Datas
              </TralloButton>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? (
              <div className="col-span-full flex justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6C3EF8]"></div>
              </div>
            ) : (
              paginatedUsers.map((user, index) => (
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
            onPageChange={setCurrentPage}
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
        description={`Tem certeza que deseja excluir permanentemente ${selectedUser?.fullName}?`}
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
        description={`Deseja restaurar o acesso de ${selectedUser?.fullName}?`}
        confirmText="Confirmar"
        variant="primary"
        icon="person_check"
      />
    </div>
  );
};

export default UsersManagement;
