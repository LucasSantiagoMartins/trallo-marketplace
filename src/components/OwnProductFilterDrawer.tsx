import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

interface ProductFilterProps {
  onClose: () => void;
}

const OwnProductFilterDrawer: React.FC<ProductFilterProps> = ({ onClose }) => {
  const [activeStatus, setActiveStatus] = React.useState("Todos");
  const [activeCategory, setActiveCategory] = React.useState("Todas");
  const [sortBy, setSortBy] = React.useState("Preço");

  const y = useMotionValue(0);
  const backdropOpacity = useTransform(y, [0, 300], [1, 0]);

  const categories = [
    "Todas",
    "Calçado",
    "Eletrônicos",
    "Acessórios",
    "Roupas",
  ];
  const statuses = ["Todos", "Ativo", "Sem Stock", "Verificando"];

  return (
    <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center p-0 md:p-4 overflow-hidden">
      <motion.div
        style={{ opacity: backdropOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        drag="y"
        style={{ y }}
        dragConstraints={{ top: 0 }}
        dragElastic={0.1}
        onDragEnd={(_, info) => {
          if (info.offset.y > 100 || info.velocity.y > 500) {
            onClose();
          } else {
            y.set(0);
          }
        }}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="relative w-full md:max-w-md bg-white dark:bg-gray-900 rounded-t-[2.5rem] md:rounded-[3rem] p-6 md:p-8 shadow-2xl max-h-[95vh] overflow-y-auto touch-none md:touch-auto"
      >
        <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full mx-auto mb-6 md:hidden" />

        <div className="flex justify-between items-center mb-6">
          <h4 className="text-xl font-black tracking-tight text-foreground">
            Filtrar
          </h4>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setActiveStatus("Todos");
                setActiveCategory("Todas");
                setSortBy("Preço");
              }}
              className="text-[9px] font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1.5 rounded-xl active:scale-90 transition-transform"
            >
              Limpar
            </button>
            <button
              onClick={onClose}
              className="size-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-slate-500 active:scale-90 transition-transform"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>
        </div>

        <div className="space-y-6 mb-8">
          <section>
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-3">
              Status
            </label>
            <div className="flex flex-wrap gap-2">
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => setActiveStatus(status)}
                  className={`px-4 py-2.5 rounded-xl text-[11px] font-bold transition-all ${
                    activeStatus === status
                      ? "bg-primary text-white shadow-md shadow-primary/30"
                      : "bg-gray-100 dark:bg-gray-800 text-slate-500"
                  }`}
                >
                  {status === "Verificando" ? "Em Verificação" : status}
                </button>
              ))}
            </div>
          </section>

          <section>
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-3">
              Categoria
            </label>
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar -mx-2 px-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2.5 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all border-2 ${
                    activeCategory === cat
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-transparent bg-gray-100 dark:bg-gray-800 text-slate-500"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </section>

          <section>
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-3">
              Ordenar por
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSortBy("Preço")}
                className={`flex items-center justify-center gap-2 py-3.5 rounded-2xl border-2 transition-all ${
                  sortBy === "Preço"
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-gray-100 dark:border-gray-800 text-slate-500"
                }`}
              >
                <span className="material-symbols-outlined text-base">
                  trending_up
                </span>
                <span className="text-[10px] font-black uppercase tracking-tight">
                  Preço
                </span>
              </button>
              <button
                onClick={() => setSortBy("Novos")}
                className={`flex items-center justify-center gap-2 py-3.5 rounded-2xl border-2 transition-all ${
                  sortBy === "Novos"
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-gray-100 dark:border-gray-800 text-slate-500"
                }`}
              >
                <span className="material-symbols-outlined text-base">
                  history
                </span>
                <span className="text-[10px] font-black uppercase tracking-tight">
                  Novos
                </span>
              </button>
            </div>
          </section>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-primary text-white py-4 rounded-2xl font-black uppercase tracking-[0.15em] text-[11px] shadow-lg shadow-primary/30 active:scale-95 transition-all"
        >
          Aplicar Filtros
        </button>
      </motion.div>
    </div>
  );
};

export default OwnProductFilterDrawer;
