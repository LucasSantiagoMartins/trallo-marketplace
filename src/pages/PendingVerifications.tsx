import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageHeader from "../components/PageHeader";
import BottomNavigation from "@/components/BottomNavigation";
import StatCard from "@/components/StatCard";
import ValidationInfoCard from "@/components/ValidationInfoCard";
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

  useEffect(() => { fetchProducts(); }, []);

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

  const currentItems = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleStartVerification = (product: PendingVerificationDTO) => {
    navigate(`/validar-produto`, { state: { product } });
  };

  return (
    <div className="bg-[#f6f5f8] dark:bg-[#141022] min-h-screen flex flex-col">
      <PageHeader title="Fila de Validação" />
      <main className="max-w-6xl mx-auto w-full px-6 pt-24 pb-40">
        <section className="flex flex-col md:grid md:grid-cols-12 gap-4 mb-8">
          <div className="md:col-span-4 grid grid-cols-2 gap-3">
            <StatCard label="Pendentes" value={products.length.toString()} icon="pending_actions" color="primary" />
            <StatCard label="Aprovados" value="--" icon="check_circle" color="slate" />
          </div>
          <div className="hidden md:block md:col-span-8"><ValidationInfoCard /></div>
        </section>

        <div className="space-y-4">
          <h3 className="text-lg font-bold">Produtos em Espera</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <AnimatePresence mode="wait">
              {loading ? [1,2].map(n => <div key={n} className="h-32 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-[2rem]" />) 
              : currentItems.map(p => <ProductVerificationCard key={p.id} product={p} onAction={handleStartVerification} />)}
            </AnimatePresence>
          </div>
        </div>
      </main>
      {products.length > itemsPerPage && <Pagination currentPage={currentPage} totalPages={Math.ceil(products.length / itemsPerPage)} onPageChange={setCurrentPage} />}
      <BottomNavigation />
    </div>
  );
};

export default PendingVerificationsPage;