import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; // Importação do react-hot-toast
import TralloInput from "@/components/TralloInput";
import TralloButton from "@/components/TralloButton";
import PasswordTooltip from "@/components/PasswordTooltip";
import Sidebar from "@/components/Sidebar";
import { adminItems } from "@/constants/sidebar-items";

interface CreateStaffProps {
  type: "OPERATOR" | "ADMIN";
}

const CreateStaffForm: React.FC<CreateStaffProps> = ({ type }) => {
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

  const isAdmin = type === "ADMIN";
  const title = isAdmin ? "Novo Administrador" : "Novo Operador";
  const badge = isAdmin ? "Acesso Total" : "Acesso Operacional";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.password) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    setLoading(true);
    try {
      toast.success(`${title} criado com sucesso.`);
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
            <span
              className={`inline-block px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase mb-3 ${
                isAdmin
                  ? "bg-primary/10 text-primary"
                  : "bg-orange-100 text-orange-600"
              }`}
            >
              {badge}
            </span>
            <h1 className="text-3xl font-semibold text-[#0F172A]">{title}</h1>
            <p className="text-slate-500 text-sm mt-2">
              Preencha os dados abaixo para conceder acesso à plataforma Trallo.
            </p>
          </header>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 md:p-12 rounded-[40px] shadow-sm border border-slate-100 space-y-8"
          >
            <div
              className={`grid grid-cols-1 ${isAdmin ? "md:grid-cols-1" : "md:grid-cols-2"} gap-6`}
            >
              <TralloInput
                label="Nome Completo"
                placeholder="Nome do colaborador"
                icon="person"
                value={formData.fullName}
                onChange={updateField("fullName")}
              />
              {!isAdmin && (
                <TralloInput
                  label="Departamento / Área"
                  placeholder="Ex: Logística, Suporte..."
                  icon="work"
                  value={formData.department}
                  onChange={updateField("department")}
                />
              )}
            </div>

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

export default CreateStaffForm;
