import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import MobileLayout from "@/layouts/MobileLayout";
import TralloInput from "@/components/TralloInput";
import TralloButton from "@/components/TralloButton";
import SecurityVerificationModal from "@/components/SecurityVerificationModal";
import { login, verify2faCode } from "@/services/auth.service";
import { useAuth } from "@/context/AuthContext";
import { AuthUser } from "@/types/api";
import { VerificationType } from "@/enums/verification-type.enum";

const Login: React.FC = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [showMfaModal, setShowMfaModal] = useState(false);
  const [mfaToken, setMfaToken] = useState("");
  const [mfaMethod, setMfaMethod] = useState("");

  const navigate = useNavigate();
  const { setUser } = useAuth();

  const finalizeLogin = (data: AuthUser) => {
    const sessionData = {
      id: data.id,
      role: data.role,
      token: data.token,
      fullName: data.fullName,
      profilePicture: data.profilePicture,
      address: data.address,
      secureLogin: data.secureLogin,
      secureOperations: data.secureOperations,
    };

    localStorage.setItem("user_session", JSON.stringify(sessionData));
    localStorage.setItem("auth_token", data.token);

    setUser(sessionData as any);

    const roleRoutes: Record<string, string> = {
      ADMIN: "/area-administrativa",
      OPERATOR: "/area-operacional",
      SELLER: "/centro-vendas",
      BUYER: "/",
    };

    navigate(roleRoutes[data.role] || "/");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier || !password) {
      toast.error("Preencha todos os campos");
      return;
    }

    setLoading(true);
    try {
      const res = await login(identifier, password);

      if (res.success && res.data) {
        if ("mfaRequired" in res.data && res.data.mfaRequired) {
          setMfaToken(res.data.mfaToken);
          setMfaMethod(res.data.method || "E-mail");
          setShowMfaModal(true);
        } else {
          toast.success("Bem-vindo de volta");
          finalizeLogin(res.data as AuthUser);
        }
      } else {
        toast.error(res.message || "Credenciais inválidas");
      }
    } catch (err: any) {
      toast.error(err.message || "Erro de conexão");
    } finally {
      setLoading(false);
    }
  };

  const handleMfaVerify = async (code: string) => {
    setLoading(true);
    try {
      const res = await verify2faCode(code, mfaToken);
      if (res.success && res.data) {
        toast.success("Sessão iniciada com sucesso");
        setShowMfaModal(false);
        finalizeLogin(res.data as AuthUser);
      }
    } catch (err: any) {
      toast.error(err.message || "Código inválido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MobileLayout className="bg-background">
      <div className="flex items-center justify-center min-h-screen w-full bg-background/50 md:p-0">
        <div className="w-full min-h-screen bg-card shadow-2xl border-border/50 flex flex-col lg:grid lg:grid-cols-2 lg:max-w-7xl lg:min-h-[85vh] lg:rounded-[40px] lg:border lg:overflow-hidden">
          <div className="p-8 md:p-16 lg:p-20 bg-muted/30 border-b lg:border-b-0 lg:border-r border-border/50 flex flex-col justify-center relative overflow-hidden">
            <div className="relative z-10">
              <div className="mb-8 p-3 bg-card rounded-2xl shadow-sm w-fit">
                <div className="text-primary flex size-12 items-center justify-center">
                  <span className="material-symbols-outlined !text-4xl">
                    shopping_bag
                  </span>
                </div>
              </div>
              <h1 className="text-foreground text-4xl md:text-6xl lg:text-7xl clash-style leading-none mb-6">
                Bem-vindo {"\n"} de Volta
              </h1>
              <p className="text-muted-foreground text-base md:text-xl max-w-md leading-relaxed">
                Acesse sua conta para gerenciar suas compras e vendas no maior
                marketplace de Angola.
              </p>
            </div>
          </div>

          <div className="p-8 md:p-16 lg:p-20 flex flex-col justify-center bg-card">
            <form
              onSubmit={handleSubmit}
              className="space-y-6 md:space-y-8 w-full max-w-2xl mx-auto lg:max-w-none"
            >
              <div className="space-y-5 md:space-y-6">
                <TralloInput
                  label="Identificação"
                  placeholder="E-mail ou Telefone"
                  icon="person"
                  value={identifier}
                  onChange={setIdentifier}
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
                      to="/esqueceu-senha"
                      className="text-primary text-sm md:text-base font-bold hover:underline"
                    >
                      Esqueceu a senha?
                    </Link>
                  </div>
                </div>
              </div>

              <TralloButton
                type="submit"
                fullWidth
                isLoading={loading}
                disabled={loading}
                className="py-6 md:text-lg"
              >
                Entrar na Conta
              </TralloButton>

              <p className="text-center text-sm md:text-base text-muted-foreground">
                Não tens uma conta?{" "}
                <Link to="/criar-conta" className="text-primary font-black">
                  Criar conta agora
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      <SecurityVerificationModal
        isOpen={showMfaModal}
        isLoading={loading}
        method={mfaMethod}
        onClose={() => setShowMfaModal(false)}
        onSubmit={handleMfaVerify}
        type={VerificationType.LOGIN}
      />
    </MobileLayout>
  );
};

export default Login;
