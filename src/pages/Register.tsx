import React from "react";
import { Link } from "react-router-dom";
import MobileLayout from "@/layouts/MobileLayout";
import TralloInput from "@/components/TralloInput";
import TralloButton from "@/components/TralloButton";
import PasswordTooltip from "@/components/PasswordTooltip";
import LocationPicker from "@/components/LocationPicker";
import { useRegister } from "@/hooks/useRegister";

const Register: React.FC = () => {
  const {
    role,
    setRole,
    loading,
    formData,
    showTooltip,
    setShowTooltip,
    updateField,
    handleSubmit,
  } = useRegister();

  return (
    <MobileLayout className="bg-background">
      <div className="flex items-center justify-center min-h-screen w-full bg-background/50 lg:p-6">
        <div className="w-full min-h-screen bg-card shadow-2xl border-border/50 flex flex-col lg:grid lg:grid-cols-[1fr_1.6fr] lg:max-w-5xl lg:w-full lg:min-h-0 lg:h-fit lg:rounded-[32px] lg:border lg:overflow-hidden">
          <div className="p-8 md:p-16 lg:p-10 bg-muted/30 border-b lg:border-b-0 lg:border-r border-border/50 flex flex-col justify-center relative">
            <div className="relative z-10">
              <div className="mb-4 lg:mb-6 p-2 bg-card rounded-xl shadow-sm w-fit">
                <div className="text-primary flex size-10 lg:size-12 items-center justify-center">
                  <span className="material-symbols-outlined !text-3xl lg:!text-4xl">
                    shopping_bag
                  </span>
                </div>
              </div>
              <h1 className="text-foreground text-4xl md:text-6xl lg:text-4xl clash-style leading-none mb-4 lg:whitespace-nowrap">
                Criar Conta
              </h1>
              <p className="text-muted-foreground text-base md:text-xl lg:text-sm max-w-xs leading-relaxed">
                Junte-se ao marketplace de elite que está a transformar o
                comércio em Angola.
              </p>
            </div>
          </div>

          <div className="p-8 md:p-16 lg:p-10 flex flex-col justify-center bg-card">
            <form
              onSubmit={handleSubmit}
              className="space-y-3 lg:space-y-4 w-full max-w-2xl mx-auto lg:max-w-none"
            >
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <label className="relative cursor-pointer group">
                  <input
                    type="radio"
                    checked={role === "buyer"}
                    onChange={() => setRole("buyer")}
                    className="peer sr-only"
                  />
                  <div className="flex flex-col items-center justify-center p-3 lg:p-2 rounded-xl border-2 border-border bg-card transition-all peer-checked:border-primary peer-checked:bg-primary/5">
                    <span
                      className={`material-symbols-outlined text-xl lg:text-lg ${role === "buyer" ? "text-primary" : "text-muted-foreground"}`}
                    >
                      shopping_bag
                    </span>
                    <span
                      className={`text-[9px] lg:text-[10px] font-bold ${role === "buyer" ? "text-primary" : "text-muted-foreground"}`}
                    >
                      COMPRADOR
                    </span>
                  </div>
                </label>
                <label className="relative cursor-pointer group">
                  <input
                    type="radio"
                    checked={role === "seller"}
                    onChange={() => setRole("seller")}
                    className="peer sr-only"
                  />
                  <div className="flex flex-col items-center justify-center p-3 lg:p-2 rounded-xl border-2 border-border bg-card transition-all peer-checked:border-primary peer-checked:bg-primary/5">
                    <span
                      className={`material-symbols-outlined text-xl lg:text-lg ${role === "seller" ? "text-primary" : "text-muted-foreground"}`}
                    >
                      storefront
                    </span>
                    <span
                      className={`text-[9px] lg:text-[10px] font-bold ${role === "seller" ? "text-primary" : "text-muted-foreground"}`}
                    >
                      VENDEDOR
                    </span>
                  </div>
                </label>
              </div>

              <TralloInput
                label="Nome Completo"
                placeholder="Ex: Adilson Manuel"
                icon="person"
                value={formData.fullName}
                onChange={updateField("fullName")}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-3 gap-4">
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
                  icon="person" // Alterado para person conforme seu TralloInput icon switch
                  value={formData.phoneNumber}
                  onChange={updateField("phoneNumber")}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-3 gap-4 items-end">
                <div className="relative">
                  <PasswordTooltip
                    password={formData.password}
                    isVisible={showTooltip}
                  />
                  <TralloInput
                    label="Senha"
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

                <LocationPicker
                  role={role}
                  address={formData.address}
                  onAddressChange={updateField("address")}
                  onCoordsChange={(coords) => {
                    updateField("latitude")(coords.lat);
                    updateField("longitude")(coords.lng);
                  }}
                />
              </div>

              <TralloButton
                type="submit"
                fullWidth
                isLoading={loading}
                disabled={loading}
                className="py-6 lg:py-4 md:text-lg lg:text-sm mt-2"
              >
                {loading ? "Criando..." : "Criar Minha Conta"}
              </TralloButton>

              <p className="text-center text-sm lg:text-xs text-muted-foreground">
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
