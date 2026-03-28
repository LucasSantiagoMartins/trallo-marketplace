import React, { useState, useEffect } from "react";
import { TransactionStatus, TransactionType } from "@/enums/transaction";
import TralloButton from "@/components/TralloButton";
import TralloInput from "@/components/TralloInput";

interface TransactionFilterModalProps {
  onClose: () => void;
  currentFilters: any;
  onApplyLocal: (filters: any) => void;
  onSearchAPI: (filters: any) => void;
}

const TransactionFilterModal: React.FC<TransactionFilterModalProps> = ({
  onClose,
  currentFilters,
  onApplyLocal,
  onSearchAPI,
}) => {
  const [tempFilters, setTempFilters] = useState({ ...currentFilters });

  const [startY, setStartY] = useState<number | null>(null);
  const [currentY, setCurrentY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY === null) return;
    const deltaY = e.touches[0].clientY - startY;

    if (deltaY > 0) {
      window.requestAnimationFrame(() => {
        setCurrentY(deltaY);
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (currentY > 120) {
      onClose();
    } else {
      setCurrentY(0);
    }
    setStartY(null);
  };

  const sections = [
    {
      title: "Tipo",
      key: "type",
      options: [
        { id: "todas", label: "Todas" },
        { id: TransactionType.SALE, label: "Venda" },
        { id: TransactionType.WITHDRAWAL, label: "Levant." },
        { id: TransactionType.REFUND, label: "Estorno" },
      ],
    },
    {
      title: "Período",
      key: "period",
      options: [
        { id: "todos", label: "Tudo" },
        { id: "semana", label: "Semana" },
        { id: "mes", label: "Mês" },
        { id: "ano", label: "Ano" },
      ],
    },
    {
      title: "Estado",
      key: "status",
      options: [
        { id: "todos", label: "Todos" },
        { id: TransactionStatus.COMPLETED, label: "Concl." },
        { id: TransactionStatus.PENDING, label: "Pend." },
        { id: TransactionStatus.CANCELLED, label: "Canc." },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-end lg:items-center lg:justify-center overflow-hidden touch-none">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: `translateY(${currentY}px)`,
          transition: isDragging
            ? "none"
            : "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className="relative w-full lg:max-w-md bg-white dark:bg-[#16161E] rounded-t-[2.5rem] lg:rounded-[2.5rem] p-6 shadow-2xl overflow-hidden animate-in slide-in-from-bottom lg:slide-in-from-bottom-0 lg:zoom-in-95 duration-300 ease-out will-change-transform touch-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-700 mx-auto rounded-full mb-6 lg:hidden cursor-grab active:cursor-grabbing"></div>

        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-black tracking-tight text-[#121118] dark:text-white">
            Filtros
          </h3>
          <button
            onClick={onClose}
            className="hidden lg:flex items-center justify-center size-8 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        <div className="space-y-5">
          {sections.map((section) => (
            <div key={section.key}>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
                {section.title}
              </h4>
              <div className="grid grid-cols-4 gap-2">
                {section.options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() =>
                      setTempFilters({ ...tempFilters, [section.key]: opt.id })
                    }
                    className={`py-2.5 px-1 rounded-full text-[10px] font-bold transition-all border-2 active:scale-95 ${
                      tempFilters[section.key] === opt.id
                        ? "border-primary bg-primary text-white"
                        : "border-gray-50 dark:border-gray-800 text-gray-400"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-8">
          <TralloButton
            className="flex-1"
            variant="secondary"
            onClick={() => onApplyLocal(tempFilters)}
          >
            Aplicar
          </TralloButton>
          <TralloButton
            className="flex-[2]"
            onClick={() => onSearchAPI(tempFilters)}
          >
            Pesquisar
          </TralloButton>
        </div>
      </div>
    </div>
  );
};

export default TransactionFilterModal;
