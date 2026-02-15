import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import PageHeader from "../components/PageHeader";
import BottomNavigation from "../components/BottomNavigation";
import UserListItem from "../components/UserListItem";
import Pagination from "../components/Pagination";
import OperatorListItem from "@/components/OperatorListItem";
import { Link } from "react-router-dom";
import { adminItems } from "@/constants/sidebar-items";
import Sidebar from "@/components/Sidebar";

const OperatorsManagement: React.FC = () => {
  const [filter, setFilter] = useState("Todos");
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = 2;

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const operators = [
    {
      name: "Marcos Venâncio",
      email: "marcos.v@trallo.ao",
      role: "Administrador",
      status: "ATÍVO",
      image: "https://i.pravatar.cc/150?u=22",
    },
    {
      name: "Sílvia Patrick",
      email: "silvia.p@trallo.ao",
      role: "Suporte",
      status: "ATÍVO",
      image: "https://i.pravatar.cc/150?u=23",
    },
    {
      name: "André Filomeno",
      email: "andre.f@trallo.ao",
      role: "Logística",
      status: "OCUPADO",
      image: "https://i.pravatar.cc/150?u=24",
    },
    {
      name: "Teresa Bento",
      email: "teresa.b@trallo.ao",
      role: "Suporte",
      status: "ATÍVO",
      image: "https://i.pravatar.cc/150?u=25",
    },
    {
      name: "Luís Magalhães",
      email: "luis.m@trallo.ao",
      role: "Financeiro",
      status: "INATIVO",
      image: "https://i.pravatar.cc/150?u=26",
    },
  ] as const;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-['Inter']">
      <Sidebar
        title="Painel Administrativo"
        items={adminItems}
        activePage="operadores"
        showSettings={true}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <motion.main
          className="flex-1 px-4 lg:px-12 pt-12 pb-44 max-w-7xl mx-auto w-full"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.header
            variants={itemVariants}
            className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4"
          >
            <div>
              <p className="text-[#6C3EF8] font-bold text-[10px] tracking-[0.2em] mb-1 uppercase">
                Equipe Interna
              </p>
              <h1 className="text-3xl font-semibold text-[#0F172A]">
                Operadores do Sistema
              </h1>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 bg-[#6C3EF8] text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-[#6C3EF8]/20 transition-all w-fit"
            >
              <span className="material-symbols-outlined text-sm">
                person_add
              </span>
              <Link to="/area-administrativa/adicionar-operador">
                Novo Operador
              </Link>
            </motion.button>
          </motion.header>

          <motion.div
            variants={itemVariants}
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8"
          >
            <div className="flex-1 w-full lg:max-w-md">
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">
                Pesquisar Operador
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Nome, e-mail ou cargo..."
                  className="w-full bg-white border-none rounded-2xl py-4 pl-12 pr-4 shadow-sm focus:ring-2 focus:ring-[#6C3EF8]/20 transition-all text-sm font-medium outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 ml-1 lg:text-right">
                Nível de Acesso
              </label>
              <div className="flex gap-3 overflow-visible py-4 px-2 -my-2 no-scrollbar lg:justify-end">
                {["Todos", "Suporte", "Logística"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setFilter(tab)}
                    className={`px-6 py-3 rounded-full text-[11px] font-black uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${
                      filter === tab
                        ? "bg-[#6C3EF8] text-white shadow-[0_10px_25px_-5px_rgba(108,62,248,0.4)] -translate-y-1"
                        : "bg-white text-slate-500 shadow-sm border border-slate-100 hover:border-slate-200 hover:shadow-md active:scale-95"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {operators.map((op, index) => (
              <motion.div key={index} variants={itemVariants}>
                <OperatorListItem {...op} />
              </motion.div>
            ))}
          </div>
        </motion.main>

        <motion.div variants={itemVariants} className="mt-auto">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </motion.div>

        <BottomNavigation />
      </div>
    </div>
  );
};

export default OperatorsManagement;
