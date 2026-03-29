import { PurchaseProfileEnum } from "@/types/purchaseSupport";
import { useState } from "react";
import toast from "react-hot-toast";

export interface PurchaseRequestDto {
  query: string;
  investment: string;
  profileId: PurchaseProfileEnum; // Usando o Enum aqui
  profileTitle: string;
  profileDesc: string;
}

export const usePurchaseSupport = () => {
  const [isLoading, setIsLoading] = useState(false);

  const sendPurchaseRequest = async (data: PurchaseRequestDto) => {
    setIsLoading(true);
    try {
      // Limpa a formatação de milhar (pontos) antes de enviar para a API
      const payload = {
        ...data,
        investment: data.investment.replace(/\./g, ""),
      };

      console.log("Payload padronizado para API:", payload);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Solicitação enviada com sucesso!");
      return true;
    } catch (error) {
      console.error("Erro ao enviar suporte de compra:", error);
      toast.error("Ocorreu um erro ao processar sua solicitação.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const validateInitialStep = (search: string) => {
    if (!search.trim()) {
      toast("Informe o que precisas primeiro", { icon: "⚠️" });
      return false;
    }
    return true;
  };

  return {
    sendPurchaseRequest,
    validateInitialStep,
    isLoading,
  };
};