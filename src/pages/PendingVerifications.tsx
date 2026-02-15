import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion, Variants } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import Pagination from "@/components/Pagination";
import { PendingVerificationDTO } from "@/types/product";
import { useAppToast } from "@/hooks/useAppToast";
import { pendingVerifications } from "@/services/product.service";
import ProductVerificationCard from "@/components/ProductVerificationCard";
import { operatorItems } from "@/constants/sidebar-items";

const PendingVerificationsPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useAppToast();
  const [products, setProducts] = useState<PendingVerificationDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

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
    <div className="flex min-h-screen bg-[#f6f5f8] dark:bg-[#141022] text-[#121118] dark:text-white font-['Inter']">
      <Sidebar
        title="Painel Operacional"
        items={operatorItems}
        activePage="verificacoes-pendentes"
      />

      <div className="flex-1 flex flex-col min-w-0">
        <motion.main
          className="max-w-7xl mx-auto w-full px-6 pt-12 pb-20 flex-1"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.header variants={itemVariants} className="mb-10">
            <p className="text-[#6C3EF8] font-bold text-[10px] tracking-[0.2em] mb-1 uppercase">
              Área Operacional
            </p>
            <h1 className="text-3xl font-semibold text-[#0F172A] dark:text-white tracking-tight">
              Verificações de Produtos
            </h1>
          </motion.header>

          <motion.section 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
          >
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
          </motion.section>

          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center justify-between ml-2">
              <h3 className="text-lg font-bold tracking-tight">
                Produtos em Espera
              </h3>
            
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <AnimatePresence mode="popLayout">
                {loading
                  ? [1, 2, 3, 4].map((n) => (
                      <motion.div
                        key={`skeleton-${n}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="h-40 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-[2.5rem]"
                      />
                    ))
                  : currentItems.map((p) => (
                      <motion.div
                        key={p.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ProductVerificationCard
                          product={p}
                          onAction={handleStartVerification}
                        />
                      </motion.div>
                    ))}
              </AnimatePresence>
            </div>

            {!loading && products.length === 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20 bg-white dark:bg-slate-800/50 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-700"
              >
                <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">
                  check_circle
                </span>
                <p className="text-slate-500 font-medium">
                  Tudo limpo! Nenhum produto pendente.
                </p>
              </motion.div>
            )}
          </motion.div>

          {products.length > itemsPerPage && (
            <motion.div variants={itemVariants} className="mt-8 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(products.length / itemsPerPage)}
                onPageChange={setCurrentPage}
              />
            </motion.div>
          )}
        </motion.main>
      </div>
    </div>
  );
};

export default PendingVerificationsPage;