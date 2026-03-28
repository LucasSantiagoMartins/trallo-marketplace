import React, { useState, useEffect, useCallback } from "react";
import Sidebar from "@/components/Sidebar";
import { adminItems } from "@/constants/sidebar-items";
import LoaderAnimation from "@/components/Loader";
import { Fee, CreateUpdateFeeDto } from "@/dtos/fee.dtos";
import { toast } from "react-hot-toast";
import { feeService } from "@/services/fee.service";
import FeeCard from "@/components/FeeCard";
import FeeModal from "@/components/FeeModal";
import ConfirmAction from "@/components/ConfirmAction";
import { feeTypeLabel } from "@/utils/mappers/fee.mapper";

const FeeManagement: React.FC = () => {
  const [fees, setFees] = useState<Fee[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFee, setSelectedFee] = useState<Fee | null>(null);
  const [pendingFormData, setPendingFormData] =
    useState<CreateUpdateFeeDto | null>(null);

  const [confirmConfig, setConfirmConfig] = useState<{
    isOpen: boolean;
    type: "status" | "save";
    feeId?: string | null;
    actionType?: "activate" | "deactivate";
    isLoading: boolean;
  }>({
    isOpen: false,
    type: "status",
    isLoading: false,
  });

  const fetchFees = useCallback(async () => {
    setLoading(true);
    try {
      const res = await feeService.getFees();
      if (res.success && res.data) {
        setFees(res.data);
      }
    } catch (error) {
      toast.error("Erro ao carregar taxas");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFees();
  }, [fetchFees]);

  const handleToggleStatusClick = (fee: Fee) => {
    setConfirmConfig({
      isOpen: true,
      type: "status",
      feeId: fee.id,
      actionType: fee.active ? "deactivate" : "activate",
      isLoading: false,
    });
  };

  const handleSaveClick = async (data: CreateUpdateFeeDto) => {
    setPendingFormData(data);
    setConfirmConfig({
      isOpen: true,
      type: "save",
      isLoading: false,
    });
  };

  const handleConfirmAction = async () => {
    setConfirmConfig((prev) => ({ ...prev, isLoading: true }));

    try {
      if (confirmConfig.type === "status" && confirmConfig.feeId) {
        const res = await feeService.toggleFeeStatus(confirmConfig.feeId);
        if (res.success) {
          toast.success(`Status atualizado com sucesso`);
          fetchFees();
        }
      } else if (confirmConfig.type === "save" && pendingFormData) {
        const res = await feeService.createAndUpdateFee(pendingFormData);
        if (res.success) {
          const isUpdate = !!pendingFormData.type;
          const message = isUpdate
            ? "Taxa atualizada com sucesso"
            : "Nova taxa criada com sucesso";

          toast.success(message);

          setModalOpen(false);
          setSelectedFee(null);
          setPendingFormData(null);
          fetchFees();
        }
      }
    } catch (error) {
      toast.error("Erro ao processar solicitação");
    } finally {
      setConfirmConfig((prev) => ({
        ...prev,
        isOpen: false,
        isLoading: false,
      }));
    }
  };

  const handleEditClick = (fee: Fee) => {
    setSelectedFee(fee);
    setModalOpen(true);
  };

  const selectedFeeData = fees.find((f) => f.id === confirmConfig.feeId);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-['Inter']">
      <Sidebar
        title="Painel Administrativo"
        items={adminItems}
        activePage="taxas"
      />

      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 px-4 lg:px-12 pt-12 pb-44 max-w-7xl mx-auto w-full flex flex-col">
          <header className="mb-8 flex justify-between items-end">
            <div>
              <p className="text-[#6C3EF8] font-bold text-[10px] tracking-[0.2em] mb-1 uppercase">
                Configurações
              </p>
              <h1 className="text-3xl font-semibold text-[#0F172A]">
                Taxas da Plataforma
              </h1>
            </div>
            <button
              onClick={() => {
                setSelectedFee(null);
                setModalOpen(true);
              }}
              className="bg-[#6C3EF8] text-white px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              Nova Taxa
            </button>
          </header>

          {loading ? (
            <div className="flex-1 flex items-center justify-center min-h-[400px]">
              <LoaderAnimation />
            </div>
          ) : fees.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {fees.map((fee) => (
                <FeeCard
                  key={fee.id}
                  fee={fee}
                  onToggle={() => handleToggleStatusClick(fee)}
                  onEdit={handleEditClick}
                />
              ))}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] text-center bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200">
              <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-slate-300 text-4xl">
                  payments
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#0F172A]">
                Nenhuma taxa encontrada
              </h3>
              <p className="text-slate-400 max-w-xs mt-2">
                Você ainda não configurou nenhuma taxa de serviço.
              </p>
            </div>
          )}
        </main>
      </div>

      <FeeModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedFee(null);
        }}
        onSave={handleSaveClick}
        feeToEdit={selectedFee}
      />

      <ConfirmAction
        isOpen={confirmConfig.isOpen}
        isLoading={confirmConfig.isLoading}
        onClose={() => setConfirmConfig((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={handleConfirmAction}
        title={
          confirmConfig.type === "save"
            ? "Confirmar Alterações?"
            : confirmConfig.actionType === "deactivate"
              ? "Desativar Taxa?"
              : "Ativar Taxa?"
        }
        variant={
          confirmConfig.type === "save" ||
          confirmConfig.actionType === "activate"
            ? "primary"
            : "danger"
        }
        icon={
          confirmConfig.type === "save"
            ? "save"
            : confirmConfig.actionType === "activate"
              ? "check_circle"
              : "block"
        }
        description={
          confirmConfig.type === "save" ? (
            <p>
              Deseja salvar as configurações da taxa de{" "}
              <strong>
                {pendingFormData ? feeTypeLabel[pendingFormData.type] : ""}
              </strong>{" "}
              com o valor de <strong>{pendingFormData?.value}%</strong>?
            </p>
          ) : (
            <p>
              Você está prestes a{" "}
              <strong>
                {confirmConfig.actionType === "deactivate"
                  ? "desativar"
                  : "ativar"}
              </strong>{" "}
              a taxa{" "}
              <strong>
                {selectedFeeData ? feeTypeLabel[selectedFeeData.type] : ""}
              </strong>
              .
            </p>
          )
        }
        confirmText={
          confirmConfig.type === "save" ? "Confirmar e Salvar" : "Confirmar"
        }
      />
    </div>
  );
};

export default FeeManagement;
