import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import BottomNavigation from "@/components/BottomNavigation";
import OwnProductCard, { Product } from "../components/OwnProductCard";
import { AnimatePresence, motion } from "framer-motion";
import OwnProductFilterDrawer from "../components/OwnProductFilterDrawer";

const MyProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Tênis Nike Air Force 1",
      price: "45.000 Kz",
      stock: 12,
      status: "Ativo",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=300",
    },
    {
      id: 2,
      name: "Apple Watch SE 2024",
      price: "125.000 Kz",
      stock: 0,
      status: "Sem Stock",
      image:
        "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=300",
    },
    {
      id: 3,
      name: "Mochila Urban Style",
      price: "22.500 Kz",
      stock: 5,
      status: "Verificando",
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=300",
    },
    {
      id: 6,
      name: "Câmara DSLR Canon",
      price: "450.000 Kz",
      stock: 2,
      status: "Pendente",
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=300",
    },
  ]);

  const handleConfirmDelete = () => {
    if (productToDelete) {
      setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
      setProductToDelete(null);
    }
  };

  const handleSendToVerify = (product: Product) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === product.id ? { ...p, status: "Verificando" } : p,
      ),
    );
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col">
      <PageHeader title="Meus Produtos" />

      <main className="max-w-6xl mx-auto w-full px-6 pt-24 pb-20">
        <header className="mb-8">
          <h2 className="font-black text-3xl tracking-tight">
            Centro de Produtos
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-base">
            Controle total dos seus itens à venda
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <div className="flex gap-4 overflow-x-auto pb-4 lg:pb-0 no-scrollbar flex-1">
            <SummaryCard
              icon="check_circle"
              value="12"
              label="Ativos"
              color="emerald"
            />
            <SummaryCard
              icon="history"
              value="2"
              label="Pendentes"
              color="blue"
            />
            <SummaryCard
              icon="verified_user"
              value="5"
              label="Verificando"
              color="amber"
            />
          </div>

          <div 
            onClick={() => navigate("/adicionar-produto")}
            className="hidden lg:flex flex-col cursor-pointer hover:scale-[1.02] transition-transform p-6 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm max-w-sm"
          >
            <div className="size-12 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] flex items-center justify-center text-white mb-4 shadow-lg shadow-purple-500/20">
              <span className="material-symbols-outlined font-bold">inventory_2</span>
            </div>
            <h4 className="font-black text-lg mb-2 tracking-tight">Novo Produto</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Expanda sua vitrine e comece a vender novos itens agora mesmo.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold tracking-tight">
              Lista de Produtos
            </h3>
            <button
              onClick={() => setShowFilters(true)}
              className="text-primary text-xs font-black flex items-center gap-2 bg-primary/5 px-4 py-2.5 rounded-2xl uppercase tracking-widest hover:bg-primary/10 transition-colors"
            >
              Filtrar{" "}
              <span className="material-symbols-outlined text-base">
                filter_list
              </span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
            <AnimatePresence mode="popLayout">
              {products.map((product) => (
                <OwnProductCard
                  key={product.id}
                  product={product}
                  onDelete={(p) => setProductToDelete(p)}
                  onSendToVerify={handleSendToVerify}
                />
              ))}
            </AnimatePresence>
            <div className="h-20 lg:hidden" />
          </div>
        </div>
      </main>

      <button
        onClick={() => navigate("/adicionar-produto")}
        className="lg:hidden fixed bottom-24 right-6 bg-primary text-white flex items-center gap-3 pl-5 pr-6 py-4 rounded-[2rem] shadow-xl shadow-primary/40 z-40 active:scale-90 transition-all group"
      >
        <span className="material-symbols-outlined font-bold group-hover:rotate-90 transition-transform">
          add_circle
        </span>
        <span className="font-black text-sm uppercase tracking-wider">
          Novo Produto
        </span>
      </button>

      <AnimatePresence>
        {showFilters && (
          <OwnProductFilterDrawer onClose={() => setShowFilters(false)} />
        )}

        {productToDelete && (
          <DeleteConfirmPopup
            productName={productToDelete.name}
            onClose={() => setProductToDelete(null)}
            onConfirm={handleConfirmDelete}
          />
        )}
      </AnimatePresence>

      <BottomNavigation />
    </div>
  );
};

const DeleteConfirmPopup = ({ productName, onClose, onConfirm }: any) => (
  <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
    <div
      className="absolute inset-0 bg-black/30 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    />

    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="relative w-full max-w-sm bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-2xl flex flex-col items-center text-center border border-border/50"
    >
      <div className="size-20 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-6">
        <span className="material-symbols-outlined text-4xl">
          delete_forever
        </span>
      </div>

      <h3 className="text-xl font-black mb-2">Eliminar Produto?</h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 leading-relaxed">
        Tem certeza que deseja remover{" "}
        <span className="font-bold text-foreground">"{productName}"</span>? Esta
        ação não pode ser desfeita.
      </p>

      <div className="flex flex-col w-full gap-3">
        <button
          onClick={onConfirm}
          className="w-full bg-red-500 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-red-500/20 hover:bg-red-600 transition-colors"
        >
          Sim, Eliminar
        </button>
        <button
          onClick={onClose}
          className="w-full py-4 text-sm font-bold border border-border rounded-2xl hover:bg-muted transition-colors"
        >
          Cancelar
        </button>
      </div>
    </motion.div>
  </div>
);

const SummaryCard = ({ icon, value, label, color }: any) => (
  <div className="flex-shrink-0 w-40 md:w-44 bg-white dark:bg-gray-800/60 p-6 rounded-[2.5rem] border border-gray-100 dark:border-gray-700/50 shadow-sm">
    <div
      className={`text-${color}-500 mb-4 bg-${color}-500/10 size-12 rounded-2xl flex items-center justify-center`}
    >
      <span className="material-symbols-outlined text-2xl">{icon}</span>
    </div>
    <div className="text-3xl font-black mb-1">{value}</div>
    <div className="text-[10px] text-slate-400 font-black uppercase tracking-[0.15em]">
      {label}
    </div>
  </div>
);

export default MyProductsPage;