import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
 
import FilterButton from "@/components/FilterButton";
import Loader from "@/components/Loader";
import { ProductDTO, ProductStatus } from "@/types/product";
import { getMyProducts } from "@/services/product.service";
import { useAuth } from "@/context/AuthContext";
import PageHeader from "@/components/PageHeader";
import OwnProductFilterDrawer from "@/components/OwnProductFilterDrawer";
import ConfirmAction from "@/components/ConfirmAction";
import BottomNavigation from "@/components/BottomNavigation";
import OwnProductCard from "@/components/OwnProductCard";

const MyProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [productToDelete, setProductToDelete] = useState<ProductDTO | null>(
    null,
  );

  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [activeFilters, setActiveFilters] = useState({
    category: "Todas",
    status: "Todos",
    sortBy: "Preço",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [products, activeFilters]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await getMyProducts();
      if (response.data) {
        setProducts(response.data);
      }
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let result = [...products];

    if (activeFilters.status !== "Todos") {
      result = result.filter((p) => p.status === activeFilters.status);
    }

    if (activeFilters.category !== "Todas") {
      result = result.filter((p) => p.category === activeFilters.category);
    }

    if (activeFilters.sortBy === "Preço") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (activeFilters.sortBy === "Novos") {
      result.sort(
        (a, b) =>
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime(),
      );
    }

    setFilteredProducts(result);
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
      setProductToDelete(null);
    }
  };

  const stats = {
    active: products.filter((p) => p.status === ProductStatus.ONLINE_VERIFIED)
      .length,
    pending: products.filter(
      (p) => p.status === ProductStatus.AWAITING_SUBMISSION,
    ).length,
    verifying: products.filter(
      (p) =>
        p.status === ProductStatus.SUBMITTED ||
        p.status === ProductStatus.TRALLO_VERIFIED,
    ).length,
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col">
      <PageHeader title="Meus Produtos" showUser={true} />

      <main className="max-w-6xl mx-auto w-full px-6 pt-24 pb-32 lg:pb-20">
        <header className="mb-8">
          <h2 className="font-black text-3xl tracking-tight">
            Centro de Produtos
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-base">
            Controle total dos seus itens à venda
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-6 mb-4">
          <div className="flex gap-4 lg:gap-6 overflow-x-auto pb-4 lg:pb-0 no-scrollbar flex-1 lg:justify-start">
            <SummaryCard
              icon="check_circle"
              value={stats.active.toString()}
              label="Ativos"
              color="emerald"
            />
            <SummaryCard
              icon="history"
              value={stats.pending.toString()}
              label="Pendentes"
              color="blue"
            />
            <SummaryCard
              icon="verified_user"
              value={stats.verifying.toString()}
              label="Verificando"
              color="amber"
            />
          </div>

          <div
            onClick={() => navigate("/adicionar-produto")}
            className="hidden lg:flex flex-col items-start cursor-pointer hover:scale-[1.02] transition-transform p-6 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 max-w-sm"
          >
            <div className="size-12 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] flex items-center justify-center text-white mb-4 shadow-lg shadow-purple-500/20">
              <span className="material-symbols-outlined font-bold">
                inventory_2
              </span>
            </div>
            <h4 className="font-black text-lg mb-2 tracking-tight">
              Novo Produto
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Expanda sua vitrine e comece a vender novos itens agora mesmo.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold tracking-tight">
                Lista de Produtos
              </h3>
              <FilterButton onClick={() => setShowFilters(true)} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
            {isLoading ? (
              <div className="col-span-full flex justify-center py-20">
                <Loader size="md" />
              </div>
            ) : (
              <div className="col-span-full grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                    >
                      <OwnProductCard
                        product={product}
                        onDelete={(p) => setProductToDelete(p)}
                      />
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-20 opacity-50">
                    <p className="font-bold">Nenhum produto encontrado.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <OwnProductFilterDrawer
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        currentCategory={activeFilters.category as any}
        currentStatus={activeFilters.status as any}
        onApply={(filters) => setActiveFilters(filters)}
      />

      <ConfirmAction
        isOpen={!!productToDelete}
        onClose={() => setProductToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Eliminar Produto?"
        description={`Tem certeza que deseja remover "${productToDelete?.name}"? Esta ação não pode ser desfeita.`}
        confirmText="Sim, Eliminar"
        variant="danger"
        icon="delete_forever"
      />

      <BottomNavigation />
    </div>
  );
};

const SummaryCard = ({ icon, value, label, color }: any) => {
  const colorMap: any = {
    emerald: "text-emerald-500 bg-emerald-500/10",
    blue: "text-blue-500 bg-blue-500/10",
    amber: "text-amber-500 bg-amber-500/10",
  };

  return (
    <div className="flex-shrink-0 lg:flex-1 w-36 md:w-40 lg:w-full bg-white dark:bg-gray-800/60 p-4 lg:p-5 rounded-[1.8rem] border border-gray-100 dark:border-gray-700/50 shadow-sm transition-all">
      <div
        className={`${colorMap[color]} size-9 lg:size-12 rounded-xl flex items-center justify-center mb-2 lg:mb-3`}
      >
        <span className="material-symbols-outlined text-xl lg:text-2xl">
          {icon}
        </span>
      </div>
      <div className="text-xl lg:text-2xl font-black truncate leading-tight">
        {value}
      </div>
      <div className="text-[9px] lg:text-[10px] text-slate-400 font-black uppercase tracking-wider mt-0.5">
        {label}
      </div>
    </div>
  );
};

export default MyProductsPage;
