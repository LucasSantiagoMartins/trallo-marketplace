import React, { useState, useEffect } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { ProductStockCard } from "@/components/ProductStockCard";
import { InventoryControlCard } from "@/components/InventoryControlCard";
import { operatorItems } from "@/constants/sidebar-items";
import { StockMovementDTO } from "@/types/warehouse-inventory";
import {
  getStockEntries,
  getStockExits,
} from "@/services/warehouse-inventory.service";
import BottomNavigation from "@/components/BottomNavigation";

const InventoryManagement: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"entradas" | "saidas">("entradas");
  const [movements, setMovements] = useState<StockMovementDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMovements();
  }, [activeTab]);

  const fetchMovements = async () => {
    setIsLoading(true);
    try {
      const response =
        activeTab === "entradas"
          ? await getStockEntries()
          : await getStockExits();
      if (response.success) {
        setMovements(response.data);
      }
    } catch (error) {
      console.error("Erro ao carregar movimentações", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigateToRegister = (type: "entradas" | "saidas") => {
    if (type === "entradas") {
      navigate("/area-operacional/registar-entrada");
    } else {
      navigate("/area-operacional/registar-saida");
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <div className="flex min-h-screen bg-[#f6f5f8] dark:bg-[#141022] text-[#121118] dark:text-white font-['Inter']">
      <Sidebar
        title="Painel Operacional"
        items={operatorItems}
        activePage="gestao-estoque"
      />

      <div className="flex-1 flex flex-col min-w-0">
        <motion.main
          className="max-w-7xl mx-auto w-full px-6 pt-12 pb-24 lg:pb-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.header variants={itemVariants} className="mb-10">
            <p className="text-[#6C3EF8] font-bold text-[10px] tracking-[0.2em] mb-1 uppercase">
              Logística
            </p>
            <h1 className="text-3xl font-semibold text-[#0F172A] dark:text-white tracking-tight">
              Controle de Inventário
            </h1>
          </motion.header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <motion.div
                variants={itemVariants}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6"
              >
                <div className="flex p-1.5 bg-gray-200/50 dark:bg-white/5 rounded-2xl w-full md:w-80 border border-gray-200/30 dark:border-white/5">
                  <button
                    onClick={() => setActiveTab("entradas")}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      activeTab === "entradas"
                        ? "bg-white dark:bg-[#6d3ff8] shadow-md text-[#6d3ff8] dark:text-white"
                        : "text-gray-500"
                    }`}
                  >
                    Entradas
                  </button>
                  <button
                    onClick={() => setActiveTab("saidas")}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      activeTab === "saidas"
                        ? "bg-white dark:bg-[#6d3ff8] shadow-md text-[#6d3ff8] dark:text-white"
                        : "text-gray-500"
                    }`}
                  >
                    Saídas
                  </button>
                </div>

                <div className="flex gap-2 lg:hidden">
                  <button
                    onClick={() => handleNavigateToRegister("entradas")}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors"
                  >
                    <span className="material-symbols-outlined text-lg">
                      add_circle
                    </span>
                    Entrada
                  </button>
                  <button
                    onClick={() => handleNavigateToRegister("saidas")}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors"
                  >
                    <span className="material-symbols-outlined text-lg">
                      remove_circle
                    </span>
                    Saída
                  </button>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 gap-4"
              >
                <AnimatePresence mode="popLayout">
                  {isLoading ? (
                    <div className="py-20 text-center opacity-50">
                      Carregando movimentações...
                    </div>
                  ) : movements.length > 0 ? (
                    movements.map((m) => (
                      <motion.div
                        key={m.id}
                        layout
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ProductStockCard movement={m} />
                      </motion.div>
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.5 }}
                      className="py-20 text-center"
                    >
                      <span className="material-symbols-outlined text-6xl mb-2 text-slate-300">
                        inventory_2
                      </span>
                      <p className="font-medium text-slate-400">
                        Nenhum registro de {activeTab} encontrado.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="hidden lg:block">
              <InventoryControlCard
                onAction={(type) => handleNavigateToRegister(type)}
              />
            </motion.div>
          </div>
        </motion.main>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default InventoryManagement;
