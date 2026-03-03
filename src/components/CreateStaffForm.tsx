import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import TralloInput from "@/components/TralloInput";
import TralloButton from "@/components/TralloButton";
import PasswordTooltip from "@/components/PasswordTooltip";
import Sidebar from "@/components/Sidebar";
import { adminItems } from "@/constants/sidebar-items";

const CreateOperatorForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    department: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.department
    ) {
      toast.error(
        "Preencha todos os campos obrigatórios, incluindo o departamento.",
      );
      return;
    }

    setLoading(true);
    try {
      // Aqui viria a sua chamada de API: await api.post('/operators', formData);
      toast.success("Novo Operador criado com sucesso.");
      navigate("/area-administrativa");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Erro ao processar solicitação.",
      );
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-['Inter']">
      <Sidebar
        title="Painel Administrativo"
        items={adminItems}
        activePage="dashboard"
        showSettings={true}
      />

      <main className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 p-4 lg:p-12 max-w-5xl mx-auto w-full">
          <header className="mb-10">
            <span className="inline-block px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase mb-3 bg-orange-100 text-orange-600">
              Acesso Operacional
            </span>
            <h1 className="text-3xl font-semibold text-[#0F172A]">
              Novo Operador
            </h1>
            <p className="text-slate-500 text-sm mt-2">
              Preencha os dados abaixo para conceder acesso operacional à
              plataforma Trallo.
            </p>
          </header>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 md:p-12 rounded-[40px] shadow-sm border border-slate-100 space-y-8"
          >
            {/* Seção: Identificação */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TralloInput
                label="Nome Completo"
                placeholder="Nome do colaborador"
                icon="person"
                value={formData.fullName}
                onChange={updateField("fullName")}
              />
              <TralloInput
                label="Departamento / Área"
                placeholder="Ex: Logística, Suporte..."
                icon="work"
                value={formData.department}
                onChange={updateField("department")}
              />
            </div>

            {/* Seção: Contacto */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TralloInput
                label="E-mail Corporativo"
                type="email"
                placeholder="email@trallo.ao"
                icon="mail"
                value={formData.email}
                onChange={updateField("email")}
              />
              <TralloInput
                label="Telemóvel"
                type="tel"
                placeholder="9XX XXX XXX"
                icon="call"
                value={formData.phoneNumber}
                onChange={updateField("phoneNumber")}
              />
            </div>

            {/* Seção: Segurança */}
            <div className="relative">
              <PasswordTooltip
                password={formData.password}
                isVisible={showTooltip}
              />
              <TralloInput
                label="Definir Palavra-passe"
                type="password"
                placeholder="••••••••"
                icon="lock"
                showPasswordToggle
                value={formData.password}
                onChange={updateField("password")}
                onFocus={() => setShowTooltip(true)}
                onBlur={() => setShowTooltip(false)}
              />
            </div>

            {/* Ações */}
            <div className="pt-4 flex flex-col md:flex-row gap-4">
              <button
                type="button"
                onClick={() => navigate("/area-administrativa")}
                className="flex-1 py-4 px-6 rounded-2xl text-sm font-bold text-slate-500 hover:bg-slate-50 transition-colors border border-slate-100"
              >
                Cancelar
              </button>
              <TralloButton type="submit" fullWidth disabled={loading}>
                {loading ? "Processando..." : `Confirmar Cadastro`}
              </TralloButton>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateOperatorForm;
