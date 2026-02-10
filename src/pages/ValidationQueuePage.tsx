import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PageHeader from "../components/PageHeader";
import BottomNavigation from "@/components/BottomNavigation";
import TralloButton from "@/components/TralloButton";

interface ValidationItem {
  id: number;
  name: string;
  price: string;
  seller: string;
  type: "store" | "person";
  timeAgo: string;
  image: string;
  isUrgent?: boolean;
  category: string;
}

const ValidationQueuePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("Tudo");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const [queue] = useState<ValidationItem[]>([
    {
      id: 1,
      name: "iPhone 15 Pro Max - 256GB",
      price: "950.000 Kz",
      seller: "Loja do Man Kikas",
      type: "store",
      timeAgo: "5m",
      category: "Eletrónicos",
      image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=300",
    },
    {
      id: 2,
      name: "Nike Air Max Plus OG",
      price: "85.000 Kz",
      seller: "Wilson G. Almeida",
      type: "person",
      timeAgo: "12m",
      category: "Moda",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=300",
    },
    {
      id: 3,
      name: "Sony WH-1000XM5",
      price: "240.000 Kz",
      seller: "Digital Zone Angola",
      type: "store",
      timeAgo: "1h",
      isUrgent: true,
      category: "Eletrónicos",
      image: "https://images.unsplash.com/photo-1618366712277-72162601938b?q=80&w=300",
    },
    {
      id: 4,
      name: "Relógio Minimalist White",
      price: "15.500 Kz",
      seller: "Paula M. Santos",
      type: "person",
      timeAgo: "2h",
      category: "Moda",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=300",
    },
    {
      id: 5,
      name: "Samsung S24 Ultra",
      price: "890.000 Kz",
      seller: "Tech Store AO",
      type: "store",
      timeAgo: "3h",
      category: "Eletrónicos",
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=300",
    },
  ]);

  const filters = ["Tudo", "Eletrónicos", "Moda", "Imobiliário"];

  // Lógica de Filtro e Paginação
  const filteredQueue = activeFilter === "Tudo"
    ? queue
    : queue.filter(item => item.category === activeFilter);

  const totalPages = Math.ceil(filteredQueue.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredQueue.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#f6f5f8] dark:bg-[#141022] min-h-screen flex flex-col transition-colors duration-300">
      <PageHeader title="Fila de Validação" />

      <main className="max-w-6xl mx-auto w-full px-6 pt-24 pb-32">
        <header className="mb-8 flex justify-between items-end">
          <div>
            <h2 className="font-black text-3xl tracking-tight uppercase">Fila de Validação</h2>
            <p className="text-slate-500 dark:text-slate-400 text-base">
              Moderador: <span className="font-bold text-[#6C3EF8]">Trallo Admin</span>
            </p>
          </div>
          <div className="size-12 rounded-2xl bg-[#6C3EF8]/10 flex items-center justify-center border-2 border-[#6C3EF8]/20">
            <span className="material-symbols-outlined font-bold text-[#6C3EF8]">verified_user</span>
          </div>
        </header>

        {/* Estatísticas + Card Informativo Lateral */}
        <section className="flex gap-4 overflow-x-auto pb-8 no-scrollbar">
          <StatCard label="Pendentes" value="24" icon="pending_actions" color="slate" />
          <StatCard label="Urgentes" value="08" icon="priority_high" color="primary" />
          <StatCard label="Aprovados" value="156" icon="check_circle" color="slate" />
          <StatCard label="Precisão" value="98%" icon="insights" color="slate" />

          <div className="flex-shrink-0 w-80 bg-gradient-to-br from-[#6C3EF8] to-[#4F2FD7] p-6 rounded-[2.5rem] text-white shadow-lg shadow-[#6C3EF8]/20 flex items-center gap-4">
            <div className="size-12 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined font-bold">policy</span>
            </div>
            <div>
              <h4 className="font-black text-sm uppercase tracking-tight">Protocolo de Revisão</h4>
              <p className="text-white/80 text-[11px] leading-tight mt-1">
                Valide vídeos e fotos antes de aprovar. Em dúvida, rejeite com nota.
              </p>
            </div>
          </div>
        </section>

        <div className="space-y-6">
          <h3 className="text-xl font-bold tracking-tight">Produtos em Espera</h3>

          {/* Filtros */}
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => { setActiveFilter(filter); setCurrentPage(1); }}
                className={`px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeFilter === filter
                  ? "bg-slate-900 dark:bg-[#6C3EF8] text-white shadow-lg shadow-[#6C3EF8]/20"
                  : "bg-white dark:bg-slate-800/40 text-slate-500 border border-slate-100 dark:border-slate-800"
                  }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Grid de Cards de Validação */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
            <AnimatePresence mode="popLayout">
              {currentItems.map((item) => (
                <ValidationCard
                  key={item.id}
                  item={item}
                  onOpen={() => navigate(`/validar-produto/${item.id}`)}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Paginação */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-12">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="size-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700 disabled:opacity-30 transition-all"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>

              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`size-12 rounded-2xl font-black text-xs transition-all ${currentPage === i + 1
                        ? "bg-[#6C3EF8] text-white shadow-lg shadow-[#6C3EF8]/20"
                        : "bg-white dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700"
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="size-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700 disabled:opacity-30 transition-all"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          )}
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

/* Componentes Auxiliares */

const StatCard = ({ label, value, icon, color }: any) => (
  <div className="flex-shrink-0 w-40 bg-white dark:bg-slate-800/60 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
    <div className={`mb-4 size-12 rounded-2xl flex items-center justify-center ${color === 'primary' ? 'bg-[#6C3EF8]/10 text-[#6C3EF8]' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'
      }`}>
      <span className="material-symbols-outlined font-bold">{icon}</span>
    </div>
    <div className={`text-3xl font-black mb-1 ${color === 'primary' ? 'text-[#6C3EF8]' : 'text-slate-900 dark:text-white'}`}>
      {value}
    </div>
    <div className="text-[10px] text-slate-400 font-black uppercase tracking-[0.15em]">
      {label}
    </div>
  </div>
);

const ValidationCard = ({ item, onOpen }: { item: ValidationItem; onOpen: () => void }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className={`bg-white dark:bg-slate-800/40 rounded-[2.5rem] p-5 border shadow-sm relative overflow-hidden transition-all hover:shadow-md ${item.isUrgent ? "border-[#6C3EF8]/40" : "border-slate-100 dark:border-slate-800"
      }`}
  >
    {item.isUrgent && (
      <div className="absolute top-0 right-0 z-10">
        <div className="bg-[#6C3EF8] text-white text-[9px] font-black px-4 py-1.5 rounded-bl-2xl uppercase tracking-[0.2em]">
          Urgente
        </div>
      </div>
    )}

    <div className="flex gap-5">
      <div className="w-24 h-24 rounded-2xl bg-slate-100 dark:bg-slate-800 overflow-hidden flex-shrink-0 ring-1 ring-slate-200 dark:ring-white/10">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
      </div>

      <div className="flex-1 flex flex-col justify-between py-1">
        <div>
          <div className="flex justify-between items-start">
            <span className="bg-[#6C3EF8]/10 text-[#6C3EF8] text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider">
              Pendente
            </span>
            <span className={`text-[10px] font-black ${item.isUrgent ? "text-[#6C3EF8]" : "text-slate-400"}`}>
              {item.timeAgo}
            </span>
          </div>
          <h3 className="font-black text-slate-900 dark:text-white mt-2 line-clamp-1 text-base tracking-tight">
            {item.name}
          </h3>
          <div className="flex items-center gap-1.5 mt-1 text-slate-500">
            <span className="material-symbols-outlined text-[16px]">
              {item.type === "store" ? "storefront" : "person"}
            </span>
            <span className="text-xs font-bold truncate max-w-[120px]">{item.seller}</span>
          </div>
        </div>
        <p className="clash-font font-bold text-xl text-slate-900 dark:text-white mt-1">
          {item.price}
        </p>
      </div>
    </div>

    <TralloButton
      variant="primary"
      fullWidth
      icon="fact_check"
      onClick={onOpen}
      className="mt-5 !h-14 !text-xs !uppercase !tracking-widest !bg-[#6C3EF8]"
    >
      Abrir Validação
    </TralloButton>
  </motion.div>
);

export default ValidationQueuePage;