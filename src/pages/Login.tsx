import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MobileLayout from "@/layouts/MobileLayout";
import TralloInput from "@/components/TralloInput";
import TralloButton from "@/components/TralloButton";
import { login } from "@/api/auth.service";
import { useAppToast } from "@/hooks/useAppToast";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { showToast } = useAppToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      showToast("error", "Preencha todos os campos.");
      return;
    }

    setLoading(true);
    try {
      const res = await login(email, password);
      if (res.success) {
        showToast("success", res.message || "Login realizado com sucesso!");
        navigate("/");
      } else {
        showToast("error", res.message || "Credenciais inválidas.");
      }
    } catch (err) {
      showToast(
        "error",
        err instanceof Error ? err.message : "Erro ao conectar ao servidor.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <MobileLayout className="bg-background">
      <div className="flex items-center justify-center min-h-screen w-full bg-background/50 md:py-12">
        <div className="w-full max-w-full lg:max-w-5xl min-h-screen md:min-h-0 md:h-fit bg-card shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] border-border/50 md:border md:rounded-[40px] overflow-hidden transition-all flex flex-col lg:grid lg:grid-cols-2">
          <div className="p-8 md:p-12 lg:p-16 bg-muted/30 border-b lg:border-b-0 lg:border-r border-border/50 flex flex-col justify-center relative overflow-hidden">
            <div className="relative z-10">
              <div className="mb-6 md:mb-8 p-3 bg-card rounded-2xl shadow-sm w-fit">
                <div className="text-primary flex size-12 items-center justify-center">
                  <span className="material-symbols-outlined !text-4xl">
                    shopping_bag
                  </span>
                </div>
              </div>
              <h1 className="text-foreground text-4xl md:text-5xl lg:text-6xl clash-style leading-none mb-6">
                Bem-vindo <br /> de Volta
              </h1>
              <p className="text-muted-foreground text-base md:text-lg max-w-xs leading-relaxed">
                Acesse sua conta para gerenciar suas compras e vendas no maior
                marketplace de Angola.
              </p>
            </div>
            <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          </div>

          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-card">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-5">
                <TralloInput
                  label="E-mail"
                  type="email"
                  placeholder="exemplo@gmail.com"
                  icon="mail"
                  value={email}
                  onChange={setEmail}
                />

                <div className="space-y-2">
                  <TralloInput
                    label="Senha"
                    type="password"
                    placeholder="Sua senha"
                    icon="lock"
                    value={password}
                    onChange={setPassword}
                    showPasswordToggle
                  />
                  <div className="flex justify-end">
                    <Link
                      to="/forgot-password"
                      className="text-primary text-xs font-bold hover:underline"
                    >
                      Esqueceu a senha?
                    </Link>
                  </div>
                </div>
              </div>

              <TralloButton
                type="submit"
                fullWidth
                icon="arrow_forward"
                className="py-4 shadow-xl shadow-primary/20"
                disabled={loading}
                isLoading={loading}
              >
                Entrar na Conta
              </TralloButton>

              <div className="flex items-center gap-4 py-2">
                <div className="h-[1px] flex-1 bg-border" />
                <span className="text-muted-foreground text-[10px] font-black uppercase tracking-widest">
                  Ou continuar com
                </span>
                <div className="h-[1px] flex-1 bg-border" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <TralloButton
                  variant="social"
                  fullWidth
                  className="bg-muted/50 border-border/50"
                >
                  <img
                    src="https://www.google.com/favicon.ico"
                    alt="Google"
                    className="w-4 h-4"
                  />
                  <span className="text-xs font-bold">Google</span>
                </TralloButton>
                <TralloButton
                  variant="social"
                  fullWidth
                  className="bg-muted/50 border-border/50"
                >
                  <span className="material-symbols-outlined !text-xl">
                    phone_iphone
                  </span>
                  <span className="text-xs font-bold">Apple</span>
                </TralloButton>
              </div>

              <div className="pt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Ainda não tem conta?{" "}
                  <Link
                    to="/registrar"
                    className="text-primary font-black ml-1 hover:underline"
                  >
                    Criar conta agora
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

export default Login;
