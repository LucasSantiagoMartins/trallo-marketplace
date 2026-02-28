import React, { useState } from "react";
import toast from "react-hot-toast";
import TralloInput from "@/components/TralloInput";
import TralloButton from "@/components/TralloButton";
import { registerStockEntry } from "@/services/warehouse-inventory.service";

interface Props {
  onSuccess: () => void;
  onCancel: () => void;
}

export const RegisterEntryForm: React.FC<Props> = ({ onSuccess, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    orderNumber: "",
    productSku: "",
    shelfCode: "",
    row: "",
    quantity: 1,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.orderNumber || !formData.productSku || !formData.shelfCode) {
      toast.error("Por favor, preencha o número do pedido, SKU e localização.");
      return;
    }

    setLoading(true);
    try {
      const res = await registerStockEntry({
        ...formData,
        quantity: Number(formData.quantity),
      });

      if (res.success) {
        toast.success("Entrada registrada com sucesso.");

        setFormData((prev) => ({
          orderNumber: prev.orderNumber,
          productSku: "",
          shelfCode: "",
          row: "",
          quantity: 1,
        }));

        onSuccess();
      } else {
        toast.error(res.message || "Erro ao registrar entrada.");
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
        label="Código do Produto"
        placeholder="Ex: TR-123"
        value={formData.productSku}
        onChange={(e) => setFormData({ ...formData, productSku: e })}
      />
      <div className="grid grid-cols-2 gap-4">
        <TralloInput
          label="Prateleira"
          placeholder="P-A3"
          value={formData.shelfCode}
          onChange={(e) => setFormData({ ...formData, shelfCode: e })}
        />
        <TralloInput
          label="Fileira"
          placeholder="2"
          value={formData.row}
          onChange={(e) => setFormData({ ...formData, row: e })}
        />
      </div>
      <TralloInput
        label="Quantidade"
        type="number"
        value={formData.quantity.toString()}
        onChange={(e) => setFormData({ ...formData, quantity: Number(e) })}
      />
      <TralloButton
        type="submit"
        isLoading={loading}
        className="w-full py-5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black mt-4"
      >
        Confirmar Entrada
      </TralloButton>
    </form>
  );
};
