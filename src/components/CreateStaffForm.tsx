import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import TralloInput from "@/components/TralloInput";
import TralloButton from "@/components/TralloButton";
import PasswordTooltip from "@/components/PasswordTooltip";
import Sidebar from "@/components/Sidebar";
import RoleSelectionModal from "@/components/RoleSelectionModal";
import { adminItems } from "@/constants/sidebar-items";
import BottomNavigation from "./BottomNavigation";
import { UserRole } from "@/enums/user";
import { RegisterUserDto } from "@/dtos/users";
import { getUserRoleLabel } from "@/utils/mappers/user.mapper";
import { createStaff } from "@/services/user.service";

const CreateOperatorForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "" as UserRole | "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.role
    ) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    setLoading(true);

    const payload: RegisterUserDto = {
      fullName: formData.fullName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      password: formData.password,
      role: formData.role as UserRole,
    };

    try {
      const response = await createStaff(payload);

      if (response.success) {
        toast.success(response.message ?? "Novo Operador criado com sucesso.");
        navigate("/area-administrativa");
      } else {
        toast.error(response.message ?? "Não foi possível criar o operador.");
      }
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

  const handleRoleSelect = (role: UserRole) => {
    setFormData((prev) => ({ ...prev, role }));
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-['Inter'] relative">
      <Sidebar
        title="Painel Administrativo"
        items={adminItems}
        activePage="dashboard"
        showSettings={true}
      />

      <main className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 p-4 lg:p-12 max-w-5xl mx-auto w-full">
          <header className="mb-10">
            <span className="inline-block px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase mb-3 bg-purple-100 text-purple-600">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TralloInput
                label="Nome Completo"
                placeholder="Nome do colaborador"
                icon="person"
                value={formData.fullName}
                onChange={updateField("fullName")}
              />

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  Cargo / Função
                </label>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="w-full flex items-center justify-between pl-4 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:outline-none hover:border-purple-500 transition-all group"
                >
                  <div className="flex items-center gap-4 text-slate-600">
                    <span className="material-symbols-outlined text-slate-400 group-hover:text-purple-500">
                      work
                    </span>
                    <span>
                      {formData.role
                        ? getUserRoleLabel(formData.role as UserRole)
                        : "Selecionar cargo"}
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-slate-400">
                    expand_more
                  </span>
                </button>
              </div>
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

            <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => navigate("/area-administrativa")}
                className="w-full py-4 px-6 rounded-2xl text-sm font-bold text-slate-500 hover:bg-slate-50 transition-colors border border-slate-100"
              >
                Cancelar
              </button>
              <TralloButton type="submit" fullWidth disabled={loading}>
                {loading ? "Processando..." : "Confirmar Cadastro"}
              </TralloButton>
            </div>
          </form>
        </div>
      </main>

      <BottomNavigation />

      <RoleSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedRole={formData.role}
        onSelect={handleRoleSelect}
      />
    </div>
  );
};

export default CreateOperatorForm;
