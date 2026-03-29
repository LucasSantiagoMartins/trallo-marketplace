import { PurchaseRequestDto } from "@/types/purchaseSupport";
import { useState } from "react";
import toast from "react-hot-toast";

export const usePurchaseSupport = () => {
  const [isLoading, setIsLoading] = useState(false);

  const sendPurchaseRequest = async (data: PurchaseRequestDto) => {
    setIsLoading(true);
    try {
      const payload = {
        ...data,
        investment: data.investment.replace(/\./g, ""),
      };

      console.log("Payload padronizado para API:", payload);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Solicitação enviada com sucesso!");
      return true;
    } catch (err) {
      toast.error(err.message ?? "Ocorreu um erro ao processar sua solicitação");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const validateInitialStep = (search: string) => {
    if (!search.trim()) {
      toast("Informe o que precisas primeiro");
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