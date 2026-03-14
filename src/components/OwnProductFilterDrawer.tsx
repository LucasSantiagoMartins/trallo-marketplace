import React, { useEffect, useState, useRef } from "react";

interface ProductFilterProps {
  onClose: () => void;
  isOpen: boolean;
}

const OwnProductFilterDrawer: React.FC<ProductFilterProps> = ({
  onClose,
  isOpen,
}) => {
  const [activeStatus, setActiveStatus] = useState("Todos");
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [sortBy, setSortBy] = useState("Preço");
  const [mounted, setMounted] = useState(false);

  const touchStart = useRef<number | null>(null);
  const touchEnd = useRef<number | null>(null);
  const minSwipeDistance = 50;

  // Função para fechar com animação suave antes de desmontar
  const handleClose = () => {
    setMounted(false);
    // Aguarda o tempo da transição (500ms conforme definido no transform)
    setTimeout(() => {
      onClose();
    }, 500);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => setMounted(true), 10);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchEnd.current = null;
    touchStart.current = e.targetTouches[0].clientY;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = e.targetTouches[0].clientY;
  };

  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchEnd.current - touchStart.current;
    if (distance > minSwipeDistance) {
      handleClose();
    }
  };

  if (!isOpen && !mounted) return null;

  const categories = [
    "Todas",
    "Calçado",
    "Eletrônicos",
    "Acessórios",
    "Roupas",
  ];
  const statuses = ["Todos", "Ativo", "Sem Stock", "Verificando"];

  return (
    <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center overflow-hidden">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ease-in-out ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      {/* Drawer Container */}
      <div
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className={`relative w-full md:max-w-md bg-white dark:bg-gray-900 rounded-t-[2.5rem] md:rounded-[3rem] p-6 md:p-8 shadow-2xl max-h-[90vh] overflow-y-auto transition-all duration-500 ease-in-out transform ${
          mounted
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-full md:translate-y-10 md:scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle de arraste (Mobile) */}
        <div className="w-full pt-2 pb-6 md:hidden cursor-grab active:cursor-grabbing">
          <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full mx-auto" />
        </div>

        <div className="flex justify-between items-center mb-8">
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
              onClick={handleClose}
              className="hidden md:flex size-8 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-slate-500 active:scale-90 transition-transform"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>
        </div>

        <div className="space-y-6 mb-8">
          <section>
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-3">
              Estado
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
          onClick={handleClose}
          className="w-full bg-primary text-white py-4 rounded-2xl font-black uppercase tracking-[0.15em] text-[11px] shadow-lg shadow-primary/30 active:scale-95 transition-all"
        >
          Aplicar Filtros
        </button>
      </div>
    </div>
  );
};

export default OwnProductFilterDrawer;
