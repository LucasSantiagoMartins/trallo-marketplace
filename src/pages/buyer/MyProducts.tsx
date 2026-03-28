import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterButton from "@/components/FilterButton";
import { ProductDTO } from "@/types/product";
import PageHeader from "@/components/PageHeader";
import OwnProductFilterDrawer from "@/components/OwnProductFilterDrawer";
import ConfirmAction from "@/components/ConfirmAction";
import BottomNavigation from "@/components/BottomNavigation";
import OwnProductCard from "@/components/OwnProductCard";
import LoaderAnimation from "@/components/Loader";
import ActivateDispatchDrawer from "@/components/ActivateDispatchDrawer";
import { useMyProducts } from "@/hooks/useMyProducts";
import StatsOverviewCard from "@/components/StatviewCard";

const MyProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    filteredProducts,
    isLoading,
    activeFilters,
    setActiveFilters,
    stats,
    deleteProduct,
    activateDispatch,
  } = useMyProducts();

  const [showFilters, setShowFilters] = useState(false);
  const [productToDelete, setProductToDelete] = useState<ProductDTO | null>(
    null,
  );
  const [selectedProduct, setSelectedProduct] = useState<ProductDTO | null>(
    null,
  );

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col">
      <PageHeader title="Meus Produtos" showUser={true} />

      <main className="max-w-6xl mx-auto w-full px-6 pt-24 pb-32 lg:pb-20">
        <header className="mb-6">
          <h2 className="font-black text-3xl tracking-tight">
            Centro de Produtos
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-base">
            Controle total dos seus itens à venda
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-6 mb-2 items-start">
          <div className="flex gap-4 lg:gap-6 overflow-x-auto pb-4 lg:pb-0 no-scrollbar flex-1 lg:justify-start">
            <StatsOverviewCard
              icon="check_circle"
              value={stats.active.toString()}
              label="Ativos"
              color="emerald"
            />
            <StatsOverviewCard
              icon="history"
              value={stats.pending.toString()}
              label="Pendentes"
              color="blue"
            />
            <StatsOverviewCard
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

        <div className="space-y-4">
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
                <LoaderAnimation />
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
                        onActivateDispatch={() => setSelectedProduct(product)}
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

      <ActivateDispatchDrawer
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        productId={selectedProduct?.id || ""}
        productName={selectedProduct?.name || ""}
        currentPrice={selectedProduct?.price || 0}
        onConfirm={activateDispatch}
      />

      <ConfirmAction
        isOpen={!!productToDelete}
        onClose={() => setProductToDelete(null)}
        onConfirm={() => {
          if (productToDelete) deleteProduct(productToDelete.id);
          setProductToDelete(null);
        }}
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

export default MyProductsPage;
