import React, { useState } from "react";
import TralloButton from "./TralloButton";
import TralloInput from "./TralloInput";
import { formatThousands } from "@/utils/currency";
import { PurchaseProfileEnum, profileTranslation } from "@/types/purchaseSupport";
interface Profile {
  id: PurchaseProfileEnum;
  title: string;
  desc: string;
  icon: string;
}

interface BudgetSelectorProps {
  onConfirm: (amount: string, profile: Profile) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const BudgetSelector: React.FC<BudgetSelectorProps> = ({
  onConfirm,
  onCancel,
  isLoading,
}) => {
  const [amount, setAmount] = useState("");
  const [selectedProfileId, setSelectedProfileId] =
    useState<PurchaseProfileEnum>(PurchaseProfileEnum.VALUE_FOR_MONEY);

  const profiles: Profile[] = [
    {
      id: PurchaseProfileEnum.BEST_PRICE,
      title: profileTranslation[PurchaseProfileEnum.BEST_PRICE],
      desc: "Foco total em economia e produtos de entrada.",
      icon: "payments",
    },
    {
      id: PurchaseProfileEnum.VALUE_FOR_MONEY,
      title: profileTranslation[PurchaseProfileEnum.VALUE_FOR_MONEY],
      desc: "O equilíbrio perfeito entre qualidade e preço justo.",
      icon: "balance",
    },
    {
      id: PurchaseProfileEnum.HIGH_PERFORMANCE,
      title: profileTranslation[PurchaseProfileEnum.HIGH_PERFORMANCE],
      desc: "Produtos premium para quem não abre mão do melhor.",
      icon: "star",
    },
  ];

  const handleConfirm = () => {
    const profile = profiles.find((p) => p.id === selectedProfileId);
    if (profile) {
      onConfirm(amount, profile);
    }
  };

  return (
    <div className="md:fixed md:inset-0 md:z-[100] md:flex md:items-center md:justify-center md:p-6 md:bg-slate-900/60 md:backdrop-blur-md animate-in fade-in duration-300">
      <div
        className="bg-slate-50 p-6 md:p-12 rounded-3xl border border-slate-200 space-y-8 md:space-y-10 animate-in zoom-in-95 duration-300 shadow-sm md:shadow-2xl max-w-full md:max-w-4xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-lg mx-auto text-center">
          <label className="block text-slate-900 font-bold mb-4 uppercase text-[10px] md:text-xs tracking-widest">
            Quanto pretende investir?
          </label>
          <TralloInput
            icon="sell"
            placeholder="Ex: 500.000"
            type="text" // 'text' permite os pontos sem bugar o input
            value={amount}
            onChange={(val) => setAmount(formatThousands(val))}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {profiles.map((p) => (
            <button
              key={p.id}
              disabled={isLoading}
              onClick={() => setSelectedProfileId(p.id)}
              className={`p-5 md:p-6 rounded-2xl border-2 transition-all text-left flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-5 ${
                selectedProfileId === p.id
                  ? "border-[#6c3ef8] bg-white shadow-md scale-[1.01] md:scale-[1.02]"
                  : "border-transparent bg-slate-100 hover:bg-slate-200"
              }`}
            >
              <span
                className={`material-symbols-outlined !text-2xl md:!text-3xl ${
                  selectedProfileId === p.id
                    ? "text-[#6c3ef8]"
                    : "text-slate-400"
                }`}
              >
                {p.icon}
              </span>
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 text-sm md:text-base">
                  {p.title}
                </h4>
                <p className="text-[11px] md:text-xs text-slate-500 mt-1 leading-tight md:leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-4 pt-6 md:pt-8 border-t border-slate-200">
          <TralloButton
            variant="secondary"
            className="w-full md:flex-1 !bg-slate-200 !text-slate-600 border-none order-2 md:order-1 h-12 md:h-14"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancelar
          </TralloButton>
          <TralloButton
            variant="primary"
            className="w-full md:flex-1 order-1 md:order-2 h-12 md:h-14"
            onClick={handleConfirm}
            isLoading={isLoading}
          >
            Confirmar Escolha
          </TralloButton>
        </div>
      </div>
    </div>
  );
};

export default BudgetSelector;
