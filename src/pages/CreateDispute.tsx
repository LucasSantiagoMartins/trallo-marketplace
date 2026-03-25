import React, { useState } from "react";
import TralloInput from "@/components/TralloInput";
import TralloButton from "@/components/TralloButton";
import PageHeader from "@/components/PageHeader";
import { disputeService } from "@/services/dispute.service";
import { disputeReasonLabel } from "@/utils/mappers/dispute.mapper";
import toast from "react-hot-toast";
import { Gavel, AlertTriangle } from "lucide-react";

const CreateDispute = () => {
  const [productSku, setproductSku] = useState("");
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isFormValid =
    productSku.trim() !== "" && reason !== "" && description.length >= 10;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsLoading(true);
    try {
      const res = await disputeService.createDispute({
        productSku,
        reason,
        description,
      });

      if (res.success) {
        toast.success(res.message || "Reclamação aberta com sucesso!");
        setproductSku("");
        setReason("");
        setDescription("");
      } else {
        toast.error(res.message || "Erro ao processar a solicitação.");
      }
    } catch (err: any) {
      toast.error(err.message || "Falha ao conectar com o servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen w-full flex flex-col overflow-hidden">
      <PageHeader title="Central de Reclamações" showUser={true} />

      {/* Ajustado: flex-1 e items-stretch no mobile para ocupar tudo */}
      <div className="mt-16 flex-1 flex items-stretch sm:items-end justify-center w-full sm:p-8">
        {/* Ajustado: h-full e rounded-none no mobile para ocupar 100% */}
        <main className="w-full h-full sm:h-auto max-w-3xl bg-white dark:bg-[#1c182d] rounded-none sm:rounded-[2.5rem] p-6 sm:p-12 shadow-xl dark:shadow-none border-none sm:border sm:border-transparent sm:dark:border-white/5 overflow-y-auto">
          <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
            <div className="flex flex-col items-center lg:items-start lg:w-1/3 text-center lg:text-left">
              <div className="relative w-14 h-14 mb-4 flex items-center justify-center shrink-0">
                <div className="absolute inset-0 bg-primary/5 rounded-full blur-xl"></div>
                <div className="relative z-10 w-10 h-10 bg-slate-50 dark:bg-background-dark rounded-xl shadow-md flex items-center justify-center transform rotate-3 border border-white/20">
                  <Gavel className="text-primary" size={20} />
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

            <form
              onSubmit={handleSubmit}
              className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 pb-12 sm:pb-0"
            >
              <div className="sm:col-span-2">
                <TralloInput
                  label="Código do Producto"
                  icon="inventory_2"
                  placeholder="Digite o código ou ID"
                  value={productSku}
                  onChange={setproductSku}
                />
              </div>

              <div className="sm:col-span-2">
                <TralloInput
                  isSelect
                  label="Motivo da Reclamação"
                  icon="report_problem"
                  placeholder="Selecione o motivo"
                  value={reason}
                  onChange={setReason}
                  options={Object.entries(disputeReasonLabel).map(
                    ([value, label]) => ({
                      value,
                      label,
                    }),
                  )}
                />
              </div>

              <div className="sm:col-span-2">
                <TralloInput
                  multiline
                  label="Descrição Detalhada"
                  placeholder="Descreva detalhadamente o que ocorreu..."
                  value={description}
                  onChange={setDescription}
                  rows={5}
                />
              </div>

              <div className="sm:col-span-2 pt-2">
                <TralloButton
                  fullWidth
                  type="submit"
                  isLoading={isLoading}
                  disabled={!isFormValid || isLoading}
                >
                  Enviar Reclamação
                </TralloButton>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateDispute;
