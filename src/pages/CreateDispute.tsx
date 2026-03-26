import React from "react";
import TralloInput from "@/components/TralloInput";
import TralloButton from "@/components/TralloButton";
import PageHeader from "@/components/PageHeader";
import { disputeReasonLabel } from "@/utils/mappers/dispute.mapper";
import { Gavel, Search, Package, AlertTriangle } from "lucide-react";
import { useDispute } from "@/hooks/useDispute";
import ProductSelectionModal from "@/components/ProductSelectionModal";

const CreateDispute = () => {
  const {
    orderNumber,
    setOrderNumber,
    selectedProduct,
    setSelectedProduct,
    reason,
    setReason,
    description,
    setDescription,
    isLoading,
    orderItems,
    isModalOpen,
    setIsModalOpen,
    fetchOrderItems,
    handleCreateDispute,
    isFormValid,
  } = useDispute();

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen w-full flex flex-col overflow-hidden">
      <PageHeader title="Central de Reclamações" showUser={true} />

      <div className="mt-16 flex-1 flex items-stretch sm:items-end justify-center w-full sm:p-8">
        <main className="w-full h-full sm:h-auto max-w-3xl bg-white dark:bg-[#1c182d] rounded-none sm:rounded-[2.5rem] p-6 sm:p-12 shadow-xl border-none sm:border sm:border-transparent sm:dark:border-white/5 overflow-y-auto">
          <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
            
            {/* Design Lateral: Cabeçalho da Seção */}
            <div className="flex flex-col items-center lg:items-start lg:w-1/3 text-center lg:text-left">
              <div className="relative w-14 h-14 mb-4 flex items-center justify-center shrink-0">
                <div className="absolute inset-0 bg-slate-200/50 dark:bg-white/5 rounded-full blur-xl"></div>
                <div className="relative z-10 w-10 h-10 bg-slate-50 dark:bg-background-dark rounded-xl shadow-md flex items-center justify-center transform rotate-3 border border-slate-200 dark:border-white/10">
                  <Gavel className="text-slate-700 dark:text-slate-300" size={20} />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-red-500 to-orange-500 rounded flex items-center justify-center shadow-lg transform -rotate-6">
                  <AlertTriangle className="text-white" size={12} />
                </div>
              </div>

              <div className="space-y-1 mt-2">
                <h1 className="clash-display text-base sm:text-lg font-semibold text-slate-900 dark:text-white">
                  Nova Reclamação
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-[11px] font-medium max-w-[180px]">
                  Conte o que houve e nossa equipe ajudará você.
                </p>
              </div>
            </div>

            {/* Formulário e Lógica Funcional */}
            <div className="w-full lg:w-2/3 grid grid-cols-1 gap-y-4 pb-12 sm:pb-0">
              
              {/* Busca de Pedido */}
              <div className="flex gap-2 items-end">
                <div className="flex-1">
                  <TralloInput
                    label="Número do Pedido"
                    icon="receipt"
                    placeholder="Ex: ORD-123456"
                    value={orderNumber}
                    onChange={setOrderNumber}
                  />
                </div>
                {!selectedProduct && (
                  <TralloButton 
                    onClick={fetchOrderItems} 
                    isLoading={isLoading}
                    className="h-[52px] px-6"
                  >
                    <Search size={18} />
                  </TralloButton>
                )}
              </div>

              {/* Card de Produto Selecionado (Design Neutro) */}
              {selectedProduct && (
                <div className="p-4 bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white dark:bg-white/5 flex items-center justify-center border border-slate-100 dark:border-white/5">
                       <Package className="text-slate-400" size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                        Produto Selecionado
                      </p>
                      <p className="text-sm font-semibold dark:text-white">
                        {selectedProduct.name}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors p-2"
                  >
                    Alterar
                  </button>
                </div>
              )}

              <TralloInput
                isSelect
                label="Motivo"
                icon="report_problem"
                placeholder="Selecione o motivo"
                value={reason}
                onChange={(val) => setReason(val as any)}
                options={Object.entries(disputeReasonLabel).map(
                  ([value, label]) => ({ value, label }),
                )}
              />

              <TralloInput
                multiline
                label="Descrição Detalhada"
                placeholder="Descreva detalhadamente o que ocorreu..."
                value={description}
                onChange={setDescription}
                rows={5}
              />

              <div className="pt-2">
                <TralloButton
                  fullWidth
                  onClick={handleCreateDispute}
                  isLoading={isLoading}
                  disabled={!isFormValid || isLoading}
                >
                  Enviar Reclamação
                </TralloButton>
              </div>
            </div>
          </div>
        </main>
      </div>

      <ProductSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        products={orderItems}
        onSelect={setSelectedProduct}
      />
    </div>
  );
};

export default CreateDispute;