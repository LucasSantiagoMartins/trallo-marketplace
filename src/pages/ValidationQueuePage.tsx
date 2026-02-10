import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageHeader from "../components/PageHeader";
import BottomNavigation from "@/components/BottomNavigation";
import StatCard from "@/components/StatCard";
import ValidationCard, { ValidationItem } from "@/components/ValidationCard";
import ValidationInfoCard from "@/components/ValidationInfoCard";
import Pagination from "@/components/Pagination";

const ValidationQueuePage: React.FC = () => {
  const navigate = useNavigate();
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
      image:
        "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=300",
    },
    {
      id: 2,
      name: "Nike Air Max Plus OG",
      price: "85.000 Kz",
      seller: "Wilson G. Almeida",
      type: "person",
      timeAgo: "12m",
      category: "Moda",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=300",
    },
    {
      id: 3,
      name: "Sony WH-1000XM5",
      price: "240.000 Kz",
      seller: "Digital Zone Angola",
      type: "store",
      timeAgo: "1h",
      category: "Eletrónicos",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=300",
    },
    {
      id: 4,
      name: "Relógio Minimalist White",
      price: "15.500 Kz",
      seller: "Paula M. Santos",
      type: "person",
      timeAgo: "2h",
      category: "Moda",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=300",
    },
    {
      id: 5,
      name: "Samsung S24 Ultra",
      price: "890.000 Kz",
      seller: "Tech Store AO",
      type: "store",
      timeAgo: "3h",
      category: "Eletrónicos",
      image:
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=300",
    },
  ]);

  const totalPages = Math.ceil(queue.length / itemsPerPage);
  const currentItems = queue.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-[#f6f5f8] dark:bg-[#141022] min-h-screen flex flex-col transition-colors duration-300">
      <PageHeader title="Fila de Validação" />

      <main className="max-w-6xl mx-auto w-full px-6 pt-24 pb-40">
        <section className="flex flex-col md:grid md:grid-cols-12 gap-4 mb-8 items-stretch">
          <div className="md:col-span-5 lg:col-span-4 flex overflow-x-auto md:grid md:grid-cols-2 gap-3 no-scrollbar pb-2 md:pb-0">
            <StatCard
              label="Pendentes"
              value="24"
              icon="pending_actions"
              color="slate"
            />
            <StatCard
              label="Urgentes"
              value="08"
              icon="priority_high"
              color="primary"
            />
            <StatCard
              label="Aprovados"
              value="156"
              icon="check_circle"
              color="slate"
            />
            <StatCard
              label="Precisão"
              value="98%"
              icon="insights"
              color="slate"
            />
          </div>

          <div className="hidden md:block md:col-span-7 lg:col-span-8">
            <ValidationInfoCard />
          </div>
        </section>

        <div className="space-y-4 mt-2">
          <h3 className="text-lg font-bold tracking-tight px-1">
            Produtos em Espera
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 relative">
            <AnimatePresence mode="wait">
              {currentItems.map((item) => (
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

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <BottomNavigation />
    </div>
  );
};

export default ValidationQueuePage;
