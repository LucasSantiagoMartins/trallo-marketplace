import React, { useState } from "react";
import toast from "react-hot-toast"; // Importação do novo toast
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
    productSku: "",
    shelfCode: "",
    row: 0,
    quantity: 1,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.productSku || !formData.shelfCode) {
      toast.error("Por favor, preencha a localização e o SKU.");
      return;
    }

    setLoading(true);
    try {
      const res = await registerStockEntry({
        ...formData,
        row: Number(formData.row),
        quantity: Number(formData.quantity),
      });

      if (res.success) {
        toast.success("Entrada registrada com sucesso!");
        onSuccess();
      } else {
        toast.error(res.message || "Erro ao registrar entrada.");
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
      <div className="grid grid-cols-2 gap-4">
        <TralloInput
          label="Prateleira"
          placeholder="A1"
          value={formData.shelfCode}
          onChange={(e) => setFormData({ ...formData, shelfCode: e })}
        />
        <TralloInput
          label="Fileira"
          type="number"
          value={formData.row.toString()}
          onChange={(e) => setFormData({ ...formData, row: Number(e) })}
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
