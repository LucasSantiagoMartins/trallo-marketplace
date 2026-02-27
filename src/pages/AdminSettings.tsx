import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast"; // Importação do toast
import TralloInput from "@/components/TralloInput";
import TralloButton from "@/components/TralloButton";
import PasswordTooltip from "@/components/PasswordTooltip";
import Sidebar from "@/components/Sidebar";
import { adminItems } from "@/constants/sidebar-items";

const AdminSettings: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleSave = async () => {
    setLoading(true);

    // Simulação de chamada de API
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Configurações atualizadas com sucesso!");
    } catch (error) {
      toast.error("Erro ao salvar configurações.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-['Inter']">
      <Sidebar
        title="Painel Administrativo"
        items={adminItems}
        activePage="configuracoes"
        showSettings={true}
      />

      <main className="flex-1 flex flex-col min-w-0">
        <motion.div
          className="flex-1 p-4 lg:p-12 max-w-5xl mx-auto w-full"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <header className="mb-10">
            <h1 className="text-3xl font-semibold text-[#0F172A]">
              Definições
            </h1>
            <p className="text-slate-500 text-sm mt-2">
              Gerencie suas preferências de conta e as diretrizes de segurança
              da plataforma.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-8">
            <motion.section
              variants={itemVariants}
              className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined">
                    settings_account_box
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800">
                    Perfil Administrativo
                  </h3>
                  <p className="text-xs text-slate-400 uppercase tracking-widest font-black">
                    Informações Pessoais
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TralloInput
                  label="Nome Completo"
                  placeholder="Seu nome"
                  icon="person"
                  value="Adilson Manuel"
                  onChange={() => {}}
                />
                <TralloInput
                  label="E-mail de Recuperação"
                  type="email"
                  placeholder="email@exemplo.ao"
                  icon="mail"
                  value="admin@trallo.ao"
                  onChange={() => {}}
                />
              </div>
            </motion.section>

            <motion.section
              variants={itemVariants}
              className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="size-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
                  <span className="material-symbols-outlined">security</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800">
                    Segurança
                  </h3>
                  <p className="text-xs text-slate-400 uppercase tracking-widest font-black">
                    Proteção de Conta
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-slate-400">
                      key
                    </span>
                    <div>
                      <p className="text-sm font-bold text-slate-700">
                        Autenticação de Dois Fatores (2FA)
                      </p>
                      <p className="text-xs text-slate-500">
                        Adicione uma camada extra de segurança à sua conta.
                      </p>
                    </div>
                  </div>
                  <button className="text-[10px] font-black uppercase text-primary tracking-tighter hover:underline">
                    Ativar
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <PasswordTooltip
                      password={password}
                      isVisible={showTooltip}
                    />
                    <TralloInput
                      label="Nova Palavra-passe"
                      type="password"
                      placeholder="••••••••"
                      icon="lock"
                      showPasswordToggle
                      value={password}
                      onChange={setPassword}
                      onFocus={() => setShowTooltip(true)}
                      onBlur={() => setShowTooltip(false)}
                    />
                  </div>
                  <TralloInput
                    label="Confirmar Palavra-passe"
                    type="password"
                    placeholder="••••••••"
                    icon="lock"
                    showPasswordToggle
                    onChange={() => {}}
                  />
                </div>
              </div>
            </motion.section>

            <motion.div
              variants={itemVariants}
              className="flex justify-end gap-4 pt-4 pb-12"
            >
              <div className="w-full md:w-64">
                <TralloButton onClick={handleSave} disabled={loading} fullWidth>
                  {loading ? "Salvando..." : "Salvar Alterações"}
                </TralloButton>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default AdminSettings;
