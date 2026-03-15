import React, { useState, useEffect, useCallback, useMemo } from "react";
import Sidebar from "@/components/Sidebar";
import BottomNavigation from "../components/BottomNavigation";
import ConfirmAction from "../components/ConfirmAction";
import TralloInput from "../components/TralloInput";
import TralloButton from "../components/TralloButton";
import { operatorItems } from "@/constants/sidebar-items";
import { ShelfDTO } from "@/dtos/wharehouse-invetory.dto";
import {
  deleteShelf,
  getShelves,
  createShelf,
} from "@/services/warehouse-inventory.service";
import { toast } from "react-hot-toast";

const ShelvesManagement: React.FC = () => {
  const [shelves, setShelves] = useState<ShelfDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [numShelves, setNumShelves] = useState("");

  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    shelfId: string | null;
  }>({
    isOpen: false,
    shelfId: null,
  });

  const fetchShelves = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getShelves();
      if (response.success) {
        setShelves(response.data);
      } else {
        toast.error(response.message || "Erro ao carregar prateleiras");
      }
    } catch (err: any) {
      toast.error(err.message || "Erro de conexão ao carregar prateleiras");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchShelves();
  }, [fetchShelves]);

  const handleCreateShelves = async () => {
    if (!numShelves || isCreating) return;
    setIsCreating(true);
    try {
      const response = await createShelf({ totalRows: Number(numShelves) });
      if (response.success) {
        toast.success(response.message || "Prateleiras criadas com sucesso");
        setNumShelves("");
        setIsModalOpen(false);
        fetchShelves();
      } else {
        toast.error(response.message || "Erro ao criar prateleiras");
      }
    } catch (err: any) {
      toast.error(err.message || "Erro interno ao criar");
    } finally {
      setIsCreating(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteModal.shelfId) return;
    setIsDeleting(true);
    try {
      const response = await deleteShelf(deleteModal.shelfId);
      if (response.success) {
        toast.success(response.message || "Prateleira removida");
        setShelves((prev) => prev.filter((s) => s.id !== deleteModal.shelfId));
        setDeleteModal({ isOpen: false, shelfId: null });
      } else {
        toast.error(response.message || "Erro ao deletar");
      }
    } catch (err: any) {
      toast.error(err.message || "Erro interno ao deletar");
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredShelves = useMemo(() => {
    return shelves.filter((shelf) =>
      shelf.code.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [shelves, searchQuery]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-['Inter']">
      <Sidebar
        title="Painel Operacional"
        items={operatorItems}
        activePage="prateleiras"
        showSettings={true}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 px-4 lg:px-12 pt-12 pb-44 max-w-7xl mx-auto w-full animate-in fade-in duration-500">
          <header className="flex justify-between items-end mb-8 animate-in slide-in-from-top-4 duration-500">
            <div>
              <p className="text-[#6C3EF8] font-bold text-[10px] tracking-[0.2em] mb-1 uppercase">
                Inventário de Depósito
              </p>
              <h1 className="text-3xl font-semibold text-[#0F172A]">
                Gerenciar Prateleiras
              </h1>
            </div>
            <TralloButton
              onClick={() => setIsModalOpen(true)}
              variant="primary"
              className="h-12 text-sm px-6"
            >
              Adicionar
            </TralloButton>
          </header>

          <div className="mb-8 max-w-md animate-in slide-in-from-left-4 duration-500">
            <TralloInput
              placeholder="Pesquisar por código..."
              value={searchQuery}
              onChange={setSearchQuery}
              icon="search"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {isLoading ? (
              <div className="col-span-full py-20 text-center">
                <div className="animate-spin size-8 border-4 border-[#6C3EF8] border-t-transparent rounded-full mx-auto mb-4" />
                <p className="text-slate-400 text-sm">Carregando...</p>
              </div>
            ) : filteredShelves.length > 0 ? (
              filteredShelves.map((shelf, index) => (
                <div
                  key={shelf.id}
                  style={{ animationDelay: `${index * 50}ms` }}
                  className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all relative group animate-in fade-in zoom-in-95 duration-300"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="material-symbols-outlined text-[#6C3EF8] text-xl">
                      shelves
                    </span>
                    <button
                      onClick={() =>
                        setDeleteModal({ isOpen: true, shelfId: shelf.id })
                      }
                      className="text-slate-300 hover:text-red-500 transition-all"
                    >
                      <span className="material-symbols-outlined text-lg">
                        delete
                      </span>
                    </button>
                  </div>

                  <h3 className="text-sm font-black text-slate-800 break-all">
                    {shelf.code}
                  </h3>

                  <div className="mt-3 pt-3 border-t border-slate-50">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">
                      Fileiras: {shelf.totalRows || 0}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center bg-white rounded-[2rem] border-2 border-dashed border-slate-200">
                <p className="text-slate-400 text-sm">Nenhum registro.</p>
              </div>
            )}
          </div>
        </main>

        <BottomNavigation />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            onClick={() => setIsModalOpen(false)}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
          />
          <div className="bg-white rounded-[2.5rem] p-8 w-full max-w-sm relative shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
            <h2 className="text-xl font-black text-slate-800 mb-6">
              Criar Prateleiras
            </h2>
            <div className="space-y-6">
              <TralloInput
                label="Quantidade de fileiras"
                type="number"
                placeholder="Ex: 5"
                value={numShelves}
                onChange={setNumShelves}
                icon="numbers"
              />

              <TralloButton
                fullWidth
                onClick={handleCreateShelves}
                isLoading={isCreating}
              >
                Gerar Prateleira
              </TralloButton>
            </div>
          </div>
        </div>
      )}

      <ConfirmAction
        isOpen={deleteModal.isOpen}
        onClose={() =>
          !isDeleting && setDeleteModal({ isOpen: false, shelfId: null })
        }
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        title="Remover Prateleira"
        description="Esta ação removerá permanentemente a estrutura do sistema."
        confirmText="Excluir"
        variant="danger"
        icon="delete_forever"
      />
    </div>
  );
};

export default ShelvesManagement;
