import React, { useState } from "react";
import toast from "react-hot-toast"; // Importação do react-hot-toast
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
    productSku: "",
    quantity: 1,
    delivery: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.productSku || formData.delivery === 0) {
      toast.error("Preencha o SKU e o ID da entrega.");
      return;
    }

    setLoading(true);
    try {
      const res = await registerStockExit({
        ...formData,
        delivery: Number(formData.delivery),
        quantity: Number(formData.quantity),
      });

      if (res.success) {
        toast.success("Saída registrada com sucesso!");
        onSuccess();
      } else {
        toast.error(res.message || "Erro ao registrar saída.");
      }
    } catch (err) {
      toast.error("Falha na comunicação com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TralloInput
        label="Código do Produto"
        placeholder="Ex: TR-123"
        value={formData.productSku}
        onChange={(e) => setFormData({ ...formData, productSku: e })}
      />
      <TralloInput
        label="ID da Entrega / Pedido"
        type="number"
        placeholder="0000"
        value={formData.delivery.toString()}
        onChange={(e) => setFormData({ ...formData, delivery: Number(e) })}
      />
      <TralloInput
        label="Quantidade"
        type="number"
        value={formData.quantity.toString()}
        onChange={(e) => setFormData({ ...formData, quantity: Number(e) })}
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
