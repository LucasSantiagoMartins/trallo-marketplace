import { useState } from "react";
import toast from "react-hot-toast";
import { PurchaseRequestDto, PurchaseSupportResponseDto } from "@/types/purchase-support";
import { purchaseSupportService } from "@/services/purchase-support.service";

// Variável global ao módulo para persistir os dados entre navegações
let persistedRecommendations: PurchaseSupportResponseDto | null = null;
let persistedSearch: string = "";

export const usePurchaseSupport = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<PurchaseSupportResponseDto | null>(persistedRecommendations);
  const [search, setSearch] = useState<string>(persistedSearch);

  const sendPurchaseRequest = async (data: PurchaseRequestDto) => {
    setIsLoading(true);

    try {
      const cleanInvestment = data.investment.replace(/\D/g, "");

      const response = await purchaseSupportService.getRecommendations({
        ...data,
        investment: cleanInvestment,
      });

      if (response.success && response.data) {
        persistedRecommendations = response.data;
        persistedSearch = data.query;

        setRecommendations(response.data);
        setSearch(data.query);

        toast.success("Encontramos as melhores opções!");
        return true;
      }

      throw new Error(response.message || "Não encontramos produtos para esse perfil.");

    } catch (err: any) {
      toast.error(err.message || "Erro de conexão com o assistente.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const validateInitialStep = (val: string) => {
    if (!val || val.trim().length < 3) {
      toast.error("Descreve melhor o que precisas.");
      return false;
    }
    return true;
  };

  const clearRecommendations = () => {
    persistedRecommendations = null;
    persistedSearch = "";
    setRecommendations(null);
    setSearch("");
  };

  return {
    sendPurchaseRequest,
    validateInitialStep,
    recommendations,
    search,
    setSearch,
    clearRecommendations,
    isLoading,
  };
};