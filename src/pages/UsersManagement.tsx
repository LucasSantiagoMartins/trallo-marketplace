import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import PageHeader from "../components/PageHeader";
import BottomNavigation from "../components/BottomNavigation";
import UserListItem from "../components/UserListItem";
import Pagination from "../components/Pagination";
import Sidebar  from "@/components/Sidebar";
import { adminItems } from "@/constants/sidebar-items";

const UsersManagement: React.FC = () => {
  const [filter, setFilter] = useState("Todos");
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = 3;

  // Variantes de animação com tipagem explícita para evitar erros de Easing
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // Entrada rápida em cascata
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

  const users = [
    {
      name: "João Manuel",
      email: "joao.manuel@email.ao",
      role: "Vendedor",
      status: "ATÍVO",
      image: "https://i.pravatar.cc/150?u=7",
    },
    {
      name: "Ana Sofia",
      email: "anasofia@trallo.com",
      role: "Comprador",
      status: "ATÍVO",
      image: "https://i.pravatar.cc/150?u=8",
    },
    {
      name: "Ricardo Costa",
      email: "ricardo.c@provider.ao",
      role: "Vendedor",
      status: "SUSPENSO",
      image: "https://i.pravatar.cc/150?u=9",
    },
    {
      name: "Maria Luísa",
      email: "maria.luisa.ao@gmail.com",
      role: "Comprador",
      status: "ATÍVO",
      image: "https://i.pravatar.cc/150?u=10",
    },
    {
      name: "António José",
      email: "antonio@trallo.ao",
      role: "Vendedor",
      status: "ATÍVO",
      image: "https://i.pravatar.cc/150?u=11",
    },
    {
      name: "Carla Dias",
      email: "carla.dias@email.com",
      role: "Comprador",
      status: "ATÍVO",
      image: "https://i.pravatar.cc/150?u=12",
    },
  ] as const;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-['Inter']">
      <Sidebar
        title="Painel Administrativo"
        items={adminItems}
        activePage="usuarios"
        showSettings={true}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <motion.main
          className="flex-1 px-4 lg:px-12 pt-12 pb-44 max-w-7xl mx-auto w-full"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.header variants={itemVariants} className="mb-8">
            <p className="text-[#6C3EF8] font-bold text-[10px] tracking-[0.2em] mb-1 uppercase">
              Gerenciamento
            </p>
            <h1 className="text-3xl font-semibold text-[#0F172A]">
              Usuários da Plataforma
            </h1>
          </motion.header>

          <motion.div
            variants={itemVariants}
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8"
          >
            <div className="flex-1 w-full lg:max-w-md">
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">
                Pesquisar registros
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Buscar por nome ou e-mail..."
                  className="w-full bg-white border-none rounded-2xl py-4 pl-12 pr-4 shadow-sm focus:ring-2 focus:ring-[#6C3EF8]/20 transition-all text-sm font-medium outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 ml-1 lg:text-right">
                Filtrar por tipo
              </label>
              <div className="flex gap-3 overflow-visible py-4 px-2 -my-2 no-scrollbar lg:justify-end">
                {["Todos", "Vendedores", "Compradores"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setFilter(tab)}
                    className={`px-6 py-3 rounded-full text-[11px] font-black uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${
                      filter === tab
                        ? "bg-[#6C3EF8] text-white shadow-[0_10px_25px_-5px_rgba(108,62,248,0.4)] -translate-y-1"
                        : "bg-white text-slate-500 shadow-sm border border-slate-100 hover:border-slate-200 hover:shadow-md"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Grid de Usuários com animação Individual */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user, index) => (
              <motion.div key={index} variants={itemVariants}>
                <UserListItem {...user} />
              </motion.div>
            ))}
          </div>
        </motion.main>

        <div className="mt-auto">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>

        <BottomNavigation />
      </div>
    </div>
  );
};

export default UsersManagement;
