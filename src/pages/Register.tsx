import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MobileLayout from "@/layouts/MobileLayout";
import TralloInput from "@/components/TralloInput";
import TralloButton from "@/components/TralloButton";
import { register } from "@/api/auth.service";
import { useAppToast } from "@/hooks/useAppToast";

type UserRole = "buyer" | "seller";

const Register: React.FC = () => {
  const [role, setRole] = useState<UserRole>("buyer");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
  });
  const { showToast } = useAppToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      showToast("error", "Preencha os campos obrigatórios.");
      return;
    }

    setLoading(true);
    try {
      const res = await register(formData.name, formData.email, formData.password);
      if (res.success) {
        showToast("success", res.message || "Conta criada com sucesso!");
        navigate("/entrar");
      } else {
        showToast("error", res.message || "Erro ao criar conta.");
      }
    } catch (err) {
      showToast("error", err instanceof Error ? err.message : "Erro ao conectar ao servidor.");
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

              <div className="mt-16 hidden lg:block">
                <div className="flex items-center gap-4 text-sm text-muted-foreground bg-card/50 p-4 rounded-2xl border border-border/50 w-fit">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full border-2 border-card bg-muted flex items-center justify-center"
                      >
                        <span className="material-symbols-outlined text-xs">
                          person
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="font-medium">
                    +500 empreendedores aderiram hoje.
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
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
                value={formData.name}
                onChange={updateField("name")}
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
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground ml-1 uppercase tracking-tight">
                    Telemóvel
                  </label>
                  <div className="flex gap-2">
                    <div className="flex items-center gap-1.5 px-3 py-3.5 rounded-xl bg-muted border border-border shrink-0">
                      <img
                        src="https://flagcdn.com/ao.svg"
                        alt="AO"
                        className="w-4 h-auto"
                      />
                      <span className="text-foreground text-xs font-bold">
                        +244
                      </span>
                    </div>

                    <TralloInput
                      type="tel"
                      value={formData.phone}
                      onChange={updateField("phone")}
                      placeholder="9XX..."
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <TralloInput
                  label="Palavra-passe"
                  type="password"
                  placeholder="••••••••"
                  icon="lock"
                  showPasswordToggle
                  value={formData.password}
                  onChange={updateField("password")}
                />
                <TralloInput
                  label="Endereço (Opcional)"
                  placeholder="Bairro, Rua..."
                  icon="location_on"
                  value={formData.address}
                  onChange={updateField("address")}
                />
              </div>

              <div className="pt-2">
                <TralloButton
                  type="submit"
                  fullWidth
                  className="py-4 shadow-xl shadow-primary/20 text-base"
                  disabled={loading}
                >
                  {loading ? "Criando..." : "Criar Minha Conta"}
                </TralloButton>
              </div>

              <div className="text-center space-y-4 pb-10">
                <p className="text-[10px] text-muted-foreground leading-relaxed px-6">
                  Ao clicar em continuar, você aceita os{" "}
                  <span className="text-primary font-bold">
                    Termos de Serviço
                  </span>{" "}
                  e a{" "}
                  <span className="text-primary font-bold">Privacidade</span>.
                </p>
                <p className="text-sm text-muted-foreground">
                  Já tem conta?{" "}
                  <Link
                    to="/entrar"
                    className="text-primary font-black ml-1 hover:underline"
                  >
                    Entrar agora
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Register;
