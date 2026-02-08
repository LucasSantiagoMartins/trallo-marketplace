import React, { useState } from "react";
import { Link } from "react-router-dom";
import MobileLayout from "@/layouts/MobileLayout";
import TralloInput from "@/components/TralloInput";
import TralloButton from "@/components/TralloButton";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // navigate to home
    console.log("Login submitted", { email, password });
  };

  return (
    <MobileLayout className="p-6">
      <div className="flex items-center justify-center min-h-screen w-full">
        <div className="w-full max-w-md lg:max-w-lg">
        {/* Top Section / Branding */}
        <div className="flex flex-col items-center pt-8 md:pt-12 pb-8 md:pb-10">
          <div className="mb-6 md:mb-8 p-3 bg-card rounded-2xl shadow-sm">
            <div className="text-primary flex size-12 shrink-0 items-center justify-center">
              <span className="material-symbols-outlined !text-4xl">shopping_bag</span>
            </div>
          </div>
          <h1 className="clash-style text-foreground text-2xl md:text-3xl font-bold leading-tight text-center">
            Entrar no TRALLO
          </h1>
          <p className="text-muted-foreground text-sm font-normal leading-normal pt-2 text-center max-w-[280px]">
            Bem-vindo de volta ao marketplace favorito de Angola
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-5">
          <TralloInput
            label="E-mail"
            type="email"
            placeholder="exemplo@gmail.com"
            value={email}
            onChange={setEmail}
          />

          <TralloInput
            label="Senha"
            type="password"
            placeholder="Sua senha"
            value={password}
            onChange={setPassword}
            showPasswordToggle
          />

          {/* Forgot Password */}
          <div className="flex justify-end">
            <Link to="/forgot-password" className="text-primary text-sm font-semibold hover:underline">
              Esqueceu a senha?
            </Link>
          </div>

          {/* Main Login Button */}
          <TralloButton type="submit" fullWidth icon="arrow_forward">
            Entrar
          </TralloButton>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 py-6 md:py-8">
          <div className="h-[1px] flex-1 bg-border" />
          <span className="text-muted-foreground text-xs font-medium uppercase tracking-wider">
            Ou entrar com
          </span>
          <div className="h-[1px] flex-1 bg-border" />
        </div>

        {/* Social Logins */}
        <div className="grid grid-cols-2 gap-4">
          <TralloButton variant="social" fullWidth>
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-5 h-5"
            />
            <span>Google</span>
          </TralloButton>
          <TralloButton variant="social" fullWidth>
            <span className="material-symbols-outlined !text-xl">phone_iphone</span>
            <span>Apple</span>
          </TralloButton>
        </div>

        {/* Footer Link */}
        <div className="pt-8 md:pt-10 pb-6 text-center">
          <p className="text-muted-foreground text-sm">
            Ainda não tem uma conta?{" "}
            <Link to="/registrar" className="text-primary font-bold hover:underline ml-1">
              Criar conta
            </Link>
          </p>
        </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Login;
