import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "../components/BottomNavigation";
import PageHeader from "../components/PageHeader";
import ConfirmAction from "../components/ConfirmAction";
import { logout } from "../services/auth.service";
import { useAuth } from "../context/AuthContext";
import { BASE_UPLOAD_URL } from "@/api/endpoints";
import toast from "react-hot-toast";

interface StatItemProps {
  label: string;
  value: string | number;
  showBorder?: boolean;
  hasStar?: boolean;
}

interface MenuLinkProps {
  icon: string;
  label: string;
  sublabel?: string;
  isWallet?: boolean;
  to?: string;
}

const UserProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = useCallback(async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    try {
      logout();
      toast.success("Sessão encerrada com sucesso.");
      setIsModalOpen(false);
      navigate("/entrar", { replace: true });
    } catch (error) {
      toast.error("Erro ao sair. Tente novamente.");
    } finally {
      setIsLoggingOut(false);
    }
  }, [isLoggingOut, navigate]);

  if (!user) return null;

  return (
    <div className="bg-background-light dark:bg-background-dark text-[#111118] dark:text-white min-h-screen transition-colors">
      <ConfirmAction
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleLogout}
        isLoading={isLoggingOut}
        title="Terminar Sessão?"
        description="Tem certeza que deseja sair da sua conta? Você precisará fazer login novamente para acessar seus dados."
        confirmText={isLoggingOut ? "Saindo..." : "Sim, sair agora"}
        icon="logout"
        variant="danger"
      />

      <div className="relative mx-auto min-h-screen flex flex-col pb-24 lg:pb-10 lg:max-w-4xl lg:px-8">
        <PageHeader title="Perfil" backTo="/" />

        <main className="px-6 lg:px-0 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-20 lg:pt-24">
          {/* Coluna Esquerda: FIXA no scroll Desktop */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-4 shadow-sm border border-gray-100 dark:border-gray-700/50">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="size-32 rounded-full border-[3px] border-accent p-1 flex items-center justify-center overflow-hidden">
                    {user.profilePicture ? (
                      <div
                        className="w-full h-full rounded-full bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${BASE_UPLOAD_URL + user.profilePicture})`,
                        }}
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                        <span className="material-symbols-outlined text-slate-400 text-6xl">
                          account_circle
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-1 right-1 size-8 bg-primary rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-[18px]">
                      verified
                    </span>
                  </div>
                </div>

                <div className="mt-5 text-center">
                  <h2 className="clash-font text-2xl lg:text-3xl font-extrabold">
                    {user?.fullName || "Usuário"}
                  </h2>
                  <div className="flex items-center justify-center gap-1 text-gray-500 dark:text-gray-400 mt-1">
                    <span className="material-symbols-outlined text-sm">
                      location_on
                    </span>
                    <span className="text-sm font-medium">
                      {user?.address || "Localização não definida"}
                    </span>
                  </div>
                </div>
{/* 
                <div className="flex justify-center w-full mt-8 pt-6 border-t border-gray-50 dark:border-gray-700">
                  <StatItem label="Avaliação" value="4.9" hasStar />
                </div> */}
              </div>
            </div>
          </div>

          {/* Coluna Direita: Conteúdo com Scroll */}
          <div className="lg:col-span-7 space-y-6">
            <section className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700">
                <MenuLink
                  icon="person_edit"
                  label="Editar Perfil"
                  to="/editar-perfil"
                />
                <div className="mx-4 border-t border-gray-50 dark:border-gray-700" />

                {user.role === "SELLER" && (
                  <>
                    <MenuLink
                      icon="storefront"
                      label="Centro de Vendas"
                      to="/centro-vendas"
                    />
                    <div className="mx-4 border-t border-gray-50 dark:border-gray-700" />
                    <MenuLink
                      icon="account_balance_wallet"
                      label="Carteira TRALLO"
                      isWallet
                      to="/carteira"
                    />
                    <div className="mx-4 border-t border-gray-50 dark:border-gray-700" />
                    <MenuLink
                      icon="account_balance"
                      label="Contas Bancárias"
                      to="/contas-bancarias"
                    />
                    <div className="mx-4 border-t border-gray-50 dark:border-gray-700" />
                  </>
                )}
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="clash-font text-sm font-bold uppercase tracking-widest text-gray-400 ml-1">
                Suporte & App
              </h3>
              <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700">
                <MenuLink
                  icon="help_center"
                  label="Ajuda e Suporte"
                  to="/suporte"
                />
                <div className="mx-4 border-t border-gray-50 dark:border-gray-700" />
                <MenuLink
                  icon="settings"
                  label="Configurações"
                  to="/configuracoes"
                />
              </div>
            </section>

            <button
              onClick={() => setIsModalOpen(true)}
              disabled={isLoggingOut}
              className="w-full flex items-center justify-center gap-2 p-4 text-red-500 font-bold clash-font text-sm bg-red-50 dark:bg-red-900/10 rounded-2xl hover:bg-red-100 dark:hover:bg-red-900/20 transition-all disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[20px]">
                logout
              </span>
              <span>{isLoggingOut ? "Encerrando..." : "Terminar Sessão"}</span>
            </button>
          </div>
        </main>

        <BottomNavigation />
      </div>
    </div>
  );
};

const StatItem: React.FC<StatItemProps> = ({
  label,
  value,
  showBorder,
  hasStar,
}) => (
  <div
    className={`flex flex-col items-center ${
      showBorder ? "border-x border-gray-50 dark:border-gray-700" : ""
    }`}
  >
    <div className="flex items-center gap-0.5">
      <span className="clash-font text-lg lg:text-xl font-bold">{value}</span>
      {hasStar && (
        <span className="material-symbols-outlined text-yellow-400 text-xs fill-1">
          star
        </span>
      )}
    </div>
    <span className="text-[10px] lg:text-[11px] uppercase tracking-wider text-gray-400 font-bold">
      {label}
    </span>
  </div>
);

const MenuLink: React.FC<MenuLinkProps> = ({
  icon,
  label,
  sublabel,
  isWallet,
  to,
}) => {
  const navigate = useNavigate();

  const handleNavigate = useCallback(() => {
    if (to) navigate(to);
  }, [navigate, to]);

  return (
    <button
      onClick={handleNavigate}
      className="w-full flex items-center gap-4 p-5 hover:bg-gray-50 dark:hover:bg-gray-700/30 active:bg-gray-100 transition-colors group text-left"
    >
      <div
        className={`size-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
          isWallet
            ? "bg-green-100 text-green-600 dark:bg-green-900/30"
            : "bg-primary/10 text-primary"
        }`}
      >
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <div className="flex-1">
        <p className="font-bold text-sm lg:text-base">{label}</p>
        {sublabel && (
          <p className="text-xs text-green-600 font-bold">{sublabel}</p>
        )}
      </div>
      <span className="material-symbols-outlined text-gray-300 group-hover:text-primary transition-colors">
        chevron_right
      </span>
    </button>
  );
};

export default UserProfileScreen;
