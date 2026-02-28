import React, { useState } from "react";
import toast from "react-hot-toast";
import TralloInput from "@/components/TralloInput";
import TralloButton from "@/components/TralloButton";
import { registerStockExit } from "@/services/warehouse-inventory.service";

interface Props {
  onSuccess: () => void;
  onCancel: () => void;
}

export const RegisterExitForm: React.FC<Props> = ({ onSuccess, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    orderNumber: "",
    delivererId: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.orderNumber || formData.delivererId === 0) {
      toast.error("Preencha o número do pedido e o ID do entregador.");
      return;
    }

    setLoading(true);
    try {
      const res = await registerStockExit({
        ...formData,
        delivererId: Number(formData.delivererId),
      });

      if (res.success) {
        toast.success("Saída registrada com sucesso.");
        onSuccess();
      } else {
        toast.error(res.message || "Erro ao registrar saída.");
      }
    } catch (err) {
      toast.error(err.message ?? "Falha na comunicação com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TralloInput
        label="Número do Pedido"
        placeholder="PED-XXXXXX"
        value={formData.orderNumber}
        onChange={(e) => setFormData({ ...formData, orderNumber: e })}
      />
      <TralloInput
        label="ID do Entregador"
        type="number"
        placeholder="5"
        value={formData.delivererId.toString()}
        onChange={(e) => setFormData({ ...formData, delivererId: Number(e) })}
      />
      <TralloButton
        type="submit"
        isLoading={loading}
        className="w-full py-5 bg-red-500 hover:bg-red-600 text-white rounded-2xl font-black mt-4"
      >
        Confirmar Saída
      </TralloButton>
    </form>
  );
};