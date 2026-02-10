import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import BottomNavigation from "@/components/BottomNavigation";
import OwnProductCard, { Product } from "../components/OwnProductCard";
import ProductFilter from "../components/OwnProductFilterDrawer"; // Importando o novo componente
import { AnimatePresence } from "framer-motion";
import OwnProductFilterDrawer from "../components/OwnProductFilterDrawer";

const MyProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);

  const products: Product[] = [
    {
      id: 1,
      name: "Tênis Nike Air Force 1",
      price: "45.000 Kz",
      stock: 12,
      status: "Ativo",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=300",
    },
    {
      id: 2,
      name: "Apple Watch SE 2024",
      price: "125.000 Kz",
      stock: 0,
      status: "Sem Stock",
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=300",
    },
    {
      id: 3,
      name: "Mochila Urban Style",
      price: "22.500 Kz",
      stock: 5,
      status: "Verificando",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=300",
    },
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col">
      <PageHeader title="Meus Produtos" />

      <main className="max-w-6xl mx-auto w-full px-6 pt-24 pb-32">
        <header className="mb-8">
          <h2 className="font-black text-3xl tracking-tight">Centro de Produtos</h2>
          <p className="text-slate-500 dark:text-slate-400 text-base">
            Controle total dos seus itens à venda
          </p>
        </header>

        <div className="flex gap-4 overflow-x-auto pb-8 no-scrollbar">
          <SummaryCard icon="check_circle" value="12" label="Ativos" color="emerald" />
          <SummaryCard icon="error" value="3" label="Sem Stock" color="red" />
          <SummaryCard icon="verified_user" value="5" label="Verificando" color="amber" />
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold tracking-tight">Lista de Produtos</h3>
            <button
              onClick={() => setShowFilters(true)}
              className="text-primary text-xs font-black flex items-center gap-2 bg-primary/5 px-4 py-2.5 rounded-2xl uppercase tracking-widest hover:bg-primary/10 transition-colors"
            >
              Filtrar <span className="material-symbols-outlined text-base">filter_list</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {products.map((product) => (
              <OwnProductCard
                key={product.id}
                product={product}
                onEdit={(id) => console.log("Editar", id)}
              />
            ))}
          </div>
        </div>
      </main>

      <button
        onClick={() => navigate("/adicionar-produto")}
        className="fixed bottom-24 right-6 bg-primary text-white flex items-center gap-3 pl-5 pr-6 py-4 rounded-[2rem] shadow-xl shadow-primary/40 z-40 active:scale-90 transition-all group"
      >
        <span className="material-symbols-outlined font-bold group-hover:rotate-90 transition-transform">
          add_circle
        </span>
        <span className="font-black text-sm uppercase tracking-wider">Novo Produto</span>
      </button>

      <AnimatePresence>
        {showFilters && <OwnProductFilterDrawer onClose={() => setShowFilters(false)} />}
      </AnimatePresence>

      <BottomNavigation />
    </div>
  );
};

const SummaryCard = ({ icon, value, label, color }: any) => (
  <div className="flex-shrink-0 w-40 md:w-44 bg-white dark:bg-gray-800/60 p-6 rounded-[2.5rem] border border-gray-100 dark:border-gray-700/50 shadow-sm">
    <div className={`text-${color}-500 mb-4 bg-${color}-500/10 size-12 rounded-2xl flex items-center justify-center`}>
      <span className="material-symbols-outlined text-2xl">{icon}</span>
    </div>
    <div className="text-3xl font-black mb-1">{value}</div>
    <div className="text-[10px] text-slate-400 font-black uppercase tracking-[0.15em]">{label}</div>
  </div>
);

export default MyProductsPage;