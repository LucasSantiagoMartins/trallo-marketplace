import React, { useState } from "react";
import { Link } from "react-router-dom";
import MobileLayout from "@/layouts/MobileLayout";
import TralloInput from "@/components/TralloInput";
import TralloButton from "@/components/TralloButton";

type UserRole = "buyer" | "seller";

const Register: React.FC = () => {
  const [role, setRole] = useState<UserRole>("buyer");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register submitted", { role, ...formData });
  };

  const updateField = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <MobileLayout className="p-6">
      <div className="flex items-center justify-center min-h-screen w-full">
        <div className="w-full max-w-md lg:max-w-lg">
        {/* Header Section */}
        <div className="flex flex-col px-6 pt-8 md:pt-12 pb-6">
          <div className="mb-2">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase">
              Junte-se à Elite
            </span>
          </div>
          <h1 className="text-foreground text-3xl md:text-4xl clash-style leading-none mb-2">
            Criar Conta
          </h1>
          <p className="text-muted-foreground text-sm md:text-base font-normal">
            Faça parte do marketplace que está a mudar Angola.
          </p>
        </div>

        {/* Role Selection */}
        <div className="px-6 mb-6 md:mb-8">
          <h3 className="text-foreground text-sm font-bold uppercase tracking-wider mb-4">
            Eu sou um...
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
              <div className="flex flex-col items-center justify-center p-4 md:p-5 rounded-xl border-2 border-border bg-card transition-all peer-checked:border-primary peer-checked:bg-primary/5">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <span className={`material-symbols-outlined ${role === "buyer" ? "text-primary" : "text-muted-foreground"}`}>
                    shopping_bag
                  </span>
                </div>
                <span className={`text-xs font-bold ${role === "buyer" ? "text-primary" : "text-muted-foreground"}`}>
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
              <div className="flex flex-col items-center justify-center p-4 md:p-5 rounded-xl border-2 border-border bg-card transition-all peer-checked:border-primary peer-checked:bg-primary/5">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <span className={`material-symbols-outlined ${role === "seller" ? "text-primary" : "text-muted-foreground"}`}>
                    storefront
                  </span>
                </div>
                <span className={`text-xs font-bold ${role === "seller" ? "text-primary" : "text-muted-foreground"}`}>
                  VENDEDOR
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="px-6 space-y-5">
          <TralloInput
            label="Nome Completo"
            placeholder="Ex: Adilson Manuel"
            icon="person"
            value={formData.name}
            onChange={updateField("name")}
          />

          <TralloInput
            label="E-mail"
            type="email"
            placeholder="nome@exemplo.com"
            icon="mail"
            value={formData.email}
            onChange={updateField("email")}
          />

          {/* Phone with Country Code */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-muted-foreground ml-1 uppercase tracking-tight">
              Telemóvel (Angola)
            </label>
            <div className="flex gap-2">
              <div className="flex items-center gap-2 px-3 py-4 rounded-xl bg-muted border border-border shrink-0">
                <img
                  src="https://flagcdn.com/ao.svg"
                  alt="Angola"
                  className="w-5 h-auto rounded-sm"
                />
                <span className="text-foreground font-semibold">+244</span>
              </div>
              <div className="relative grow">
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField("phone")(e.target.value)}
                  placeholder="9XX XXX XXX"
                  className="w-full px-4 py-4 rounded-xl bg-card border border-border focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none text-foreground"
                />
              </div>
            </div>
          </div>

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
            label="Endereço"
            placeholder="Bairro, Rua, Casa nº"
            icon="location_on"
            optional
            value={formData.address}
            onChange={updateField("address")}
          />

          <div className="pt-4">
            <TralloButton type="submit" fullWidth>
              Criar Minha Conta
            </TralloButton>
          </div>

          <p className="text-[11px] text-muted-foreground text-center px-4 leading-relaxed">
            Ao clicar em Criar Minha Conta, você concorda com os nossos{" "}
            <a href="#" className="text-primary font-bold">Termos de Serviço</a> e{" "}
            <a href="#" className="text-primary font-bold">Política de Privacidade</a>.
          </p>
        </form>

        {/* Footer Link */}
        <div className="mt-8 px-6 text-center">
          <p className="text-muted-foreground text-sm">
            Já tem uma conta?{" "}
            <Link to="/entrar" className="text-primary font-bold ml-1">
              Fazer Login
            </Link>
          </p>
        </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Register;
