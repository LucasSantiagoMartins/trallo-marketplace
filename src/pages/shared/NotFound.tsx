import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import TralloButton from "@/components/TralloButton";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[100dvh] w-full flex items-center justify-center p-6 bg-gray-50 dark:bg-[#0B0F1A]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="bg-white dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700/50 p-10 rounded-[2.5rem] shadow-xl shadow-gray-200/50 dark:shadow-none text-center relative overflow-hidden">
          <div className="mb-8 flex justify-center">
            <div className="size-24 rounded-3xl bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center text-primary relative">
              <span className="material-symbols-outlined text-5xl">
                explore_off
              </span>
              <div className="absolute -top-2 -right-2 size-8 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-black shadow-lg">
                404
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-black text-foreground mb-3">
            Página Não Encontrada
          </h1>

          <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
            A página acessada não foi encontrada ou não existe mais.
          </p>

          <div className="flex flex-col gap-3">
            <TralloButton
              variant="primary"
              fullWidth
              icon="home"
              onClick={() => navigate("/")}
            >
              Voltar ao Início
            </TralloButton>

            <TralloButton
              variant="outline"
              fullWidth
              onClick={() => navigate(-1)}
            >
              Voltar Anterior
            </TralloButton>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
            TRALLO — Marketplace de Angola
          </p>
          <p className="text-slate-400/60 text-[10px] mt-1">
            Compre e venda de forma segura.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
