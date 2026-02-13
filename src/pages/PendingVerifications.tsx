import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageHeader from "../components/PageHeader";
import BottomNavigation from "@/components/BottomNavigation";
import Pagination from "@/components/Pagination";
import { PendingVerificationDTO } from "@/types/product";
import { useAppToast } from "@/hooks/useAppToast";
import { pendingVerifications } from "@/services/product.service";
import ProductVerificationCard from "@/components/ProductVerificationCard";

const PendingVerificationsPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useAppToast();
  const [products, setProducts] = useState<PendingVerificationDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await pendingVerifications();
      if (res.success && res.data) setProducts(res.data);
    } catch (err: any) {
      showToast("error", "Erro ao carregar produtos pendentes.");
    } finally {
      setLoading(false);
    }
  };

  const currentItems = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleStartVerification = (product: PendingVerificationDTO) => {
    navigate(`/area-operacional/validar-produto`, { state: { product } });
  };

  return (
    <div className="bg-[#f6f5f8] dark:bg-[#141022] min-h-screen flex flex-col text-slate-900 dark:text-white">
      <PageHeader title="verificacões pendentes" />

      <main className="max-w-6xl mx-auto w-full px-6 pt-24 pb-40">
        {/* Cards de Status e Critérios */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Card de Contador */}
          <div className="p-6 bg-white dark:bg-slate-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-6">
            <div className="size-16 rounded-3xl bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl">
                pending_actions
              </span>
            </div>
            <div>
              <h4 className="text-3xl font-black tracking-tight">
                {loading ? "..." : products.length}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
                Produtos Pendentes
              </p>
            </div>
          </div>

          {/* Card de Critérios */}
          <div className="p-6 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-purple-500">
                verified_user
              </span>
              <h4 className="font-black text-lg tracking-tight">
                Critérios de Aprovação
              </h4>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Verifique se as fotos são reais, o preço é condizente e se a
              descrição respeita as diretrizes.
            </p>
          </div>
        </section>

        <div className="space-y-4">
          <div className="flex items-center justify-between ml-2">
            <h3 className="text-lg font-bold tracking-tight">
              Produtos em Espera
            </h3>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Página {currentPage} de{" "}
              {Math.ceil(products.length / itemsPerPage) || 1}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <AnimatePresence mode="wait">
              {loading
                ? [1, 2, 3, 4].map((n) => (
                    <div
                      key={n}
                      className="h-40 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-[2.5rem]"
                    />
                  ))
                : currentItems.map((p) => (
                    <ProductVerificationCard
                      key={p.id}
                      product={p}
                      onAction={handleStartVerification}
                    />
                  ))}
            </AnimatePresence>
          </div>

          {!loading && products.length === 0 && (
            <div className="text-center py-20 bg-white dark:bg-slate-800/50 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-700">
              <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">
                check_circle
              </span>
              <p className="text-slate-500 font-medium">
                Tudo limpo! Nenhum produto pendente.
              </p>
            </div>
          )}
        </div>
      </main>

      {products.length > itemsPerPage && (
        <div className="fixed bottom-24 left-0 right-0 flex justify-center pb-4 pointer-events-none">
          <div className="pointer-events-auto">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(products.length / itemsPerPage)}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      )}

      <BottomNavigation />
    </div>
  );
};

export default PendingVerificationsPage;
