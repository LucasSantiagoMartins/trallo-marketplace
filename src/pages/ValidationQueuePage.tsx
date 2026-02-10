import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PageHeader from "../components/PageHeader";
import BottomNavigation from "@/components/BottomNavigation";

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
      image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=300",

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
  ]);

  const filters = ["Tudo", "Eletrónicos", "Moda", "Imobiliário"];

  const filteredQueue = activeFilter === "Tudo"
    ? queue
    : queue.filter(item => item.category === activeFilter);

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col">
      <PageHeader title="Fila de Validação" />

      <main className="max-w-6xl mx-auto w-full px-6 pt-24 pb-32">
        <header className="mb-8 flex justify-between items-end">
          <div>
            <h2 className="font-black text-3xl tracking-tight uppercase">Fila de Validação</h2>
            <p className="text-slate-500 dark:text-slate-400 text-base">
              Moderador: <span className="font-bold text-primary">Trallo Admin</span>
            </p>
          </div>
          <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center border-2 border-primary/20">
            <span className="material-symbols-outlined text-primary font-bold">verified_user</span>
          </div>
        </header>

        {/* Estatísticas com Estilo SummaryCard */}
        <section className="flex gap-4 overflow-x-auto pb-6 no-scrollbar">
          <StatCard label="Pendentes" value="24" icon="pending_actions" color="slate" />
          <StatCard label="Urgentes" value="08" icon="priority_high" color="primary" />
          <StatCard label="Rejeitados" value="12" icon="cancel" color="slate" />
        </section>

        {/* Filtros */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold tracking-tight">Produtos em Espera</h3>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeFilter === filter
                  ? "bg-slate-900 dark:bg-primary text-white dark:text-slate-900 shadow-lg shadow-primary/20"
                  : "bg-white dark:bg-slate-800/40 text-slate-500 border border-slate-100 dark:border-slate-800"
                  }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
            <AnimatePresence mode="popLayout">
              {filteredQueue.map((item) => (
                <ValidationCard
                  key={item.id}
                  item={item}
                  onOpen={() => navigate(`/validar-produto/${item.id}`)}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

/* Componentes Internos com Match de Design */

const StatCard = ({ label, value, icon, color }: any) => (
  <div className="flex-shrink-0 w-40 bg-white dark:bg-slate-800/60 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
    <div className={`mb-4 size-12 rounded-2xl flex items-center justify-center ${color === 'primary' ? 'bg-primary/10 text-primary' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'
      }`}>
      <span className="material-symbols-outlined font-bold">{icon}</span>
    </div>
    <div className={`text-3xl font-black mb-1 ${color === 'primary' ? 'text-primary' : ''}`}>{value}</div>
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
    className={`bg-white dark:bg-slate-800/40 rounded-[2.5rem] p-5 border shadow-sm relative overflow-hidden transition-all hover:shadow-md ${item.isUrgent ? "border-primary/40" : "border-slate-100 dark:border-slate-800"
      }`}
  >
    {item.isUrgent && (
      <div className="absolute top-0 right-0">
        <div className="bg-primary text-white text-[9px] font-black px-4 py-1.5 rounded-bl-2xl uppercase tracking-[0.2em]">
          Urgente
        </div>
      </div>
    )}

    <div className="flex gap-5">
      <div className="w-24 h-24 rounded-2xl bg-slate-100 dark:bg-slate-700 overflow-hidden flex-shrink-0">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
      </div>

      <div className="flex-1 flex flex-col justify-between py-1">
        <div>
          <div className="flex justify-between items-start">
            <span className="bg-primary/10 text-primary text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider">
              Pendente
            </span>
            <span className={`text-[10px] font-black ${item.isUrgent ? "text-primary" : "text-slate-400"}`}>
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

    <button
      onClick={onOpen}
      className="w-full mt-5 bg-primary text-white py-4 rounded-[1.5rem] flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 active:scale-95 transition-all"
    >
      <span className="material-symbols-outlined font-bold text-lg">fact_check</span>
      Abrir Validação
    </button>
  </motion.div>
);

export default ValidationQueuePage;