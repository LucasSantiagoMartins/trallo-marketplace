import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import MobileLayout from "@/layouts/MobileLayout";
import TralloInput from "@/components/TralloInput";
import TralloButton from "@/components/TralloButton";
import PasswordTooltip from "@/components/PasswordTooltip";
import { register } from "@/services/auth.service";
import { useAuth } from "@/context/AuthContext";

type UserRole = "buyer" | "seller";

const Register: React.FC = () => {
  const [role, setRole] = useState<UserRole>("buyer");
  const [loading, setLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    address: "",
  });
  const { setUser } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    if (!passwordRegex.test(formData.password)) {
      toast.error("A senha não cumpre todos os requisitos de segurança.");
      return;
    }

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.phoneNumber
    ) {
      toast.error("Preencha os campos obrigatórios.");
      return;
    }

    if (role === "buyer" && !formData.address) {
      toast.error("O endereço é obrigatório para compradores.");
      return;
    }

    setLoading(true);
    try {
      const apiRole = role.toUpperCase() as "BUYER" | "SELLER";

      const res = await register(
        formData.fullName,
        formData.phoneNumber,
        formData.email,
        formData.password,
        apiRole,
        formData.address || undefined,
      );
      if (res.success) {
        toast.success(res.message || "Conta criada com sucesso!");
        setUser({
          userName: res.data.userName,
          role: res.data.role as any,
          token: res.data.token,
        });
        navigate("/");
      } else {
        toast.error(res.message || "Erro ao criar conta.");
      }
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Erro ao conectar ao servidor.",
      );
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <MobileLayout className="bg-background">
      <div className="flex items-center justify-center min-h-screen w-full bg-background/50 md:py-12">
        <div className="w-full max-w-full lg:max-w-6xl min-h-screen md:min-h-0 md:h-fit bg-card shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] border-border/50 md:border md:rounded-[40px] overflow-hidden transition-all flex flex-col lg:grid lg:grid-cols-2">
          <div className="p-8 md:p-12 lg:p-16 bg-muted/30 border-b lg:border-b-0 lg:border-r border-border/50 flex flex-col justify-center relative overflow-hidden">
            <div className="relative z-10">
              <div className="mb-6">
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black tracking-[0.2em] uppercase">
                  Membro Oficial
                </span>
              </div>
              <h1 className="text-foreground text-4xl md:text-5xl lg:text-7xl clash-style leading-none mb-6">
                Criar <br /> Conta
              </h1>
              <p className="text-muted-foreground text-base md:text-xl max-w-sm leading-relaxed">
                Junte-se ao marketplace de elite que está a transformar o
                comércio em Angola.
              </p>
            </div>
          </div>

          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-card">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-foreground text-[10px] font-black uppercase tracking-[0.2em] mb-4 opacity-70">
                  Tipo de Conta
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <label className="relative cursor-pointer group">
                    <input
                      type="radio"
                      name="user_role"
                      value="buyer"
                      checked={role === "buyer"}
                      onChange={() => setRole("buyer")}
                      className="peer sr-only"
                    />
                    <div className="flex flex-col items-center justify-center p-4 rounded-2xl border-2 border-border bg-card transition-all peer-checked:border-primary peer-checked:bg-primary/5 group-hover:border-primary/30">
                      <span
                        className={`material-symbols-outlined mb-1 ${role === "buyer" ? "text-primary" : "text-muted-foreground"}`}
                      >
                        shopping_bag
                      </span>
                      <span
                        className={`text-[10px] font-bold ${role === "buyer" ? "text-primary" : "text-muted-foreground"}`}
                      >
                        COMPRADOR
                      </span>
                    </div>
                  </label>

                  <label className="relative cursor-pointer group">
                    <input
                      type="radio"
                      name="user_role"
                      value="seller"
                      checked={role === "seller"}
                      onChange={() => setRole("seller")}
                      className="peer sr-only"
                    />
                    <div className="flex flex-col items-center justify-center p-4 rounded-2xl border-2 border-border bg-card transition-all peer-checked:border-primary peer-checked:bg-primary/5 group-hover:border-primary/30">
                      <span
                        className={`material-symbols-outlined mb-1 ${role === "seller" ? "text-primary" : "text-muted-foreground"}`}
                      >
                        storefront
                      </span>
                      <span
                        className={`text-[10px] font-bold ${role === "seller" ? "text-primary" : "text-muted-foreground"}`}
                      >
                        VENDEDOR
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              <TralloInput
                label="Nome Completo"
                placeholder="Ex: Adilson Manuel"
                icon="person"
                value={formData.fullName}
                onChange={updateField("fullName")}
              />

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <TralloInput
                  label="E-mail"
                  type="email"
                  placeholder="nome@exemplo.com"
                  icon="mail"
                  value={formData.email}
                  onChange={updateField("email")}
                />
                <TralloInput
                  label="Telemóvel"
                  type="tel"
                  placeholder="9XX..."
                  icon="call"
                  value={formData.phoneNumber}
                  onChange={updateField("phoneNumber")}
                />
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <div className="relative">
                  <PasswordTooltip
                    password={formData.password}
                    isVisible={showTooltip}
                  />
                  <TralloInput
                    label="Palavra-passe"
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
                <TralloInput
                  label={`Endereço ${role === "seller" ? "(Opcional)" : ""}`}
                  placeholder="Bairro, Rua..."
                  icon="location_on"
                  value={formData.address}
                  onChange={updateField("address")}
                />
              </div>

              <TralloButton type="submit" fullWidth disabled={loading}>
                {loading ? "Criando..." : "Criar Minha Conta"}
              </TralloButton>

              <p className="text-center text-sm text-muted-foreground">
                Já tem conta?{" "}
                <Link to="/entrar" className="text-primary font-black">
                  Entrar agora
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Register;
