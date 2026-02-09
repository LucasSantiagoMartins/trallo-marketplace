import React, { useState } from "react";
import { motion } from "framer-motion";

interface FilterModalProps {
  onClose: () => void;
  currentFilters: any;
  onApply: (filters: any) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  onClose,
  currentFilters,
  onApply,
}) => {
  const [tempFilters, setTempFilters] = useState({ ...currentFilters });

  const sections = [
    {
      title: "Tipo",
      key: "type",
      options: [
        { id: "todas", label: "Todas" },
        { id: "venda", label: "Venda" },
        { id: "compra", label: "Compra" },
        { id: "levantamento", label: "Levant." },
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
        { id: "Concluído", label: "Concl." },
        { id: "Pendente", label: "Pend." },
        { id: "Cancelado", label: "Canc." },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-end lg:items-center lg:justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        drag="y"
        dragConstraints={{ top: 0 }}
        dragElastic={0.2}
        onDragEnd={(_, info) => {
          if (info.offset.y > 150) onClose();
        }}
        className="relative w-full lg:max-w-md bg-white dark:bg-[#16161E] rounded-t-[2.5rem] lg:rounded-[2.5rem] p-6 shadow-2xl overflow-hidden"
      >
        <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-700 mx-auto rounded-full mb-6 cursor-grab active:cursor-grabbing"></div>

        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-black tracking-tight text-[#121118] dark:text-white">
            Filtros
          </h3>
          <button onClick={onClose} className="text-gray-400 font-bold text-sm">
            Cancelar
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
                    className={`py-2.5 px-1 rounded-xl text-[10px] font-bold transition-all border-2 ${
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

        <button
          onClick={() => onApply(tempFilters)}
          className="w-full py-4 bg-primary text-white font-black rounded-2xl mt-8 active:scale-95 transition-all shadow-lg shadow-primary/20"
        >
          Aplicar Filtros
        </button>
      </motion.div>
    </div>
  );
};

export default FilterModal;
