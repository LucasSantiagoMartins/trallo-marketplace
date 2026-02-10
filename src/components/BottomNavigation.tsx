import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface NavItem {
  icon: string;
  label: string;
  path: string;
  isCenter?: boolean;
  badge?: number;
}

const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  const menuConfig: Record<string, NavItem[]> = {
    ADMIN: [
      { icon: "dashboard", label: "Painel", path: "/admin" },
      { icon: "group", label: "Usuários", path: "/admin/users" },
      {
        icon: "analytics",
        label: "Relatórios",
        path: "/admin/reports",
        isCenter: true,
      },
      { icon: "settings", label: "Config", path: "/configuracoes" },
      { icon: "person", label: "Perfil", path: "/perfil" },
    ],
    SELLER: [
      { icon: "home", label: "Início", path: "/" },
      { icon: "inventory_2", label: "Produtos", path: "/meus-produtos" },
      {
        icon: "storefront",
        label: "Vender",
        path: "/adicionar-produto",
        isCenter: true,
      },
      { icon: "account_balance_wallet", label: "Carteira", path: "/carteira" },
      { icon: "person", label: "Perfil", path: "/perfil" },
    ],
    BUYER: [
      { icon: "home", label: "Início", path: "/" },
      { icon: "wallet", label: "Carteira", path: "/carteira" },
      {
        icon: "shopping_cart",
        label: "Carrinho",
        path: "/carrinho",
        isCenter: true,
        badge: 3,
      },
      { icon: "package_2", label: "Pedidos", path: "/meus-pedidos" },
      { icon: "person", label: "Perfil", path: "/perfil" },
    ],
    OPERATOR: [
      { icon: "home", label: "Início", path: "/" },
      {
        icon: "pending_actions",
        label: "Pendentes",
        path: "/operacao/pedidos",
      },
      {
        icon: "inventory",
        label: "Estoque",
        path: "/operacao/estoque",
        isCenter: true,
      },
      { icon: "notifications", label: "Avisos", path: "/notifications" },
      { icon: "person", label: "Perfil", path: "/perfil" },
    ],
    DELIVERER: [
      { icon: "home", label: "Início", path: "/" },
      { icon: "local_shipping", label: "Entregas", path: "/entregas" },
      { icon: "map", label: "Rotas", path: "/rotas", isCenter: true },
      { icon: "history", label: "Histórico", path: "/historico" },
      { icon: "person", label: "Perfil", path: "/perfil" },
    ],
  };

  const currentNavItems =
    isAuthenticated && user
      ? menuConfig[user.role]
      : [
          { icon: "home", label: "Início", path: "/" },
          { icon: "person", label: "Entrar", path: "/perfil" },
        ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass-nav border-t border-border px-6 py-3 flex justify-between items-center z-50 rounded-t-xl lg:hidden">
      <div className="w-full max-w-md mx-auto flex justify-between items-center">
        {currentNavItems.map((item) => {
          const isActive = location.pathname === item.path;

          if (item.isCenter) {
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex flex-col items-center relative"
              >
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground -mt-10 shadow-lg shadow-primary/40 border-4 border-background">
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>
                <span className="text-[10px] font-medium mt-1 text-muted-foreground">
                  {item.label}
                </span>
                {item.badge && (
                  <span className="absolute top-[-44px] right-[-4px] bg-destructive text-destructive-foreground text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-card">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          }

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center ${isActive ? "text-primary" : "text-muted-foreground"}`}
            >
              <span
                className={`material-symbols-outlined ${isActive ? "fill-1" : ""}`}
              >
                {item.icon}
              </span>
              <span
                className={`text-[10px] mt-1 ${isActive ? "font-bold" : "font-medium"}`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
