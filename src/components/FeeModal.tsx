import React, { useState, useEffect } from "react";
import TralloInput from "@/components/TralloInput";
import { CreateUpdateFeeDto, Fee } from "@/dtos/fee.dtos";
import { FeeType } from "@/enums/fee-type.enum";
import { feeTypeLabel } from "@/utils/mappers/fee.mapper";

interface FeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CreateUpdateFeeDto) => Promise<void>;
  feeToEdit?: Fee | null;
}

const FeeModal: React.FC<FeeModalProps> = ({
  isOpen,
  onClose,
  onSave,
  feeToEdit,
}) => {
  const [formData, setFormData] = useState<CreateUpdateFeeDto>({
    type: FeeType.PLATFORM_SALE_FEE,
    value: 0,
  });
  const [displayValue, setDisplayValue] = useState("0");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (feeToEdit) {
      setFormData({ type: feeToEdit.type, value: feeToEdit.value });
      setDisplayValue(feeToEdit.value.toString());
    } else {
      setFormData({ type: FeeType.PLATFORM_SALE_FEE, value: 0 });
      setDisplayValue("");
    }
  }, [feeToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    setLoading(true);
    await onSave({ ...formData, value: Number(displayValue) });
    setLoading(false);
    onClose();
  };

  const typeOptions = Object.values(FeeType).map((type) => ({
    value: type,
    label: feeTypeLabel[type],
  }));

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-black text-[#0F172A]">
              {feeToEdit ? "Editar Taxa" : "Nova Taxa"}
            </h2>
            <p className="text-sm text-slate-400 font-medium">
              Configure os valores percentuais da plataforma.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="space-y-4">
          {!feeToEdit && (
            <TralloInput
              label="Tipo de Taxa"
              isSelect
              options={typeOptions}
              value={formData.type}
              onChange={(val) =>
                setFormData({ ...formData, type: val as FeeType })
              }
              icon="category"
            />
          )}

          <TralloInput
            label="Valor da Taxa (%)"
            type="float"
            placeholder="Ex: 6.5"
            value={displayValue}
            onChange={(val) => setDisplayValue(val)}
            icon="percent"
          />
        </div>

        <div className="mt-8 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-4 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 hover:bg-slate-100 transition-all"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 py-4 rounded-full text-[10px] font-black uppercase tracking-widest text-white bg-[#6C3EF8] shadow-lg shadow-[#6C3EF8]/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? "Salvando..." : "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeeModal;
