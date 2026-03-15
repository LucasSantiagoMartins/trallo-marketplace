import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "@/hooks/use-cart";
import { adminItems, operatorItems } from "@/constants/sidebar-items";

interface NavItem {
  icon: string;
  label: string;
  path: string;
  isCenter?: boolean;
  isCart?: boolean;
}

const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  const { cartCount } = useCart();

  const getNavItems = (): NavItem[] => {
    let items: NavItem[] = [];

    if (!isAuthenticated || !user) {
      items = [
        { icon: "home", label: "Início", path: "/" },
        { icon: "person", label: "Entrar", path: "/perfil" },
      ];
    } else {
      switch (user.role) {
        case "ADMIN":
          items = [
            ...adminItems.slice(0, 4).map((item, index) => ({
              ...item,
              isCenter: index === 2,
            })),
            { icon: "person", label: "Perfil", path: "/perfil" },
          ];
          break;

        case "OPERATOR":
          // Criamos a lista: Visão Geral, Pedidos, VER. PENDENTES (Centro), Estoque, Perfil
          const baseOperatorItems = [
            operatorItems.find((i) => i.id === "dashboard"),
            operatorItems.find((i) => i.id === "pedidos"),
            operatorItems.find((i) => i.id === "verificacoes-pendentes"), // Este será o centro
            operatorItems.find((i) => i.id === "gestao-estoque"),
          ].filter(Boolean) as NavItem[];

          items = [
            ...baseOperatorItems.map((item, index) => ({
              ...item,
              isCenter: index === 2, // O terceiro item (índice 2) fica no centro realçado
            })),
            { icon: "person", label: "Perfil", path: "/perfil" },
          ];
          break;

        case "SELLER":
          items = [
            { icon: "home", label: "Início", path: "/" },
            { icon: "inventory_2", label: "Produtos", path: "/meus-produtos" },
            {
              icon: "add_circle",
              label: "Publicar",
              path: "/adicionar-produto",
              isCenter: true,
            },
            {
              icon: "account_balance_wallet",
              label: "Carteira",
              path: "/carteira",
            },
            { icon: "storefront", label: "Vendas", path: "/centro-vendas" },
          ];
          break;

        case "BUYER":
          items = [
            { icon: "home", label: "Início", path: "/" },
            { icon: "favorite", label: "Favoritos", path: "/favoritos" },
            {
              icon: "shopping_cart",
              label: "Carrinho",
              path: "/carrinho",
              isCenter: true,
              isCart: true,
            },
            { icon: "package_2", label: "Pedidos", path: "/meus-pedidos" },
            { icon: "person", label: "Perfil", path: "/perfil" },
          ];
          break;

        default:
          items = [
            { icon: "home", label: "Início", path: "/" },
            { icon: "person", label: "Perfil", path: "/perfil" },
          ];
      }
    }

    return items;
  };

  const currentNavItems = getNavItems();

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
                {item.isCart && cartCount > 0 && (
                  <span className="absolute top-[-44px] right-[-4px] bg-destructive text-destructive-foreground text-[12px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-background animate-in zoom-in">
                    {cartCount}
                  </span>
                )}
              </Link>
            );
          }

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <div className="relative">
                <span
                  className={`material-symbols-outlined ${
                    isActive ? "fill-1" : ""
                  }`}
                >
                  {item.icon}
                </span>
                {item.isCart && cartCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-destructive text-destructive-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-background">
                    {cartCount}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] mt-1 ${
                  isActive ? "font-bold" : "font-medium"
                }`}
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
