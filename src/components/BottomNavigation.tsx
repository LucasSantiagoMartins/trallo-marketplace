import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "@/hooks/use-cart";
import { adminItems, operatorItems } from "@/constants/sidebar-items";
import {
  Home,
  User,
  ShoppingCart,
  Truck,
  PlusCircle,
  Wallet,
  Store,
  LayoutDashboard,
  ClipboardList,
  ShieldCheck,
  Boxes,
  LucideIcon,
  ShoppingBag,
  LucideLayoutDashboard,
  ListOrderedIcon,
  UserCircle,
} from "lucide-react";

interface NavItem {
  icon: LucideIcon;
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
        { icon: Home, label: "Início", path: "/" },
        { icon: User, label: "Entrar", path: "/perfil" },
      ];
    } else {
      switch (user.role) {
        case "ADMIN":
          items = [
            { icon: LucideLayoutDashboard, label: "Dashboard", path: "/admin" },
            { icon: ShoppingBag, label: "Produtos", path: "/admin/produtos" },
            {
              icon: ListOrderedIcon,
              label: "Pedidos",
              path: "/admin/pedidos",
              isCenter: true,
            },
            { icon: User, label: "Usuários", path: "/area-adminstrativa/usuarios" },
            { icon: UserCircle, label: "Perfil", path: "/perfil" },
          ];
          break;

        case "OPERATOR":
          items = [
            { icon: LayoutDashboard, label: "Início", path: "/operador" },
            {
              icon: ClipboardList,
              label: "Pedidos",
              path: "/operador/pedidos",
            },
            {
              icon: ShieldCheck,
              label: "Verificar",
              path: "/operador/verificacoes",
              isCenter: true,
            },
            { icon: Boxes, label: "Estoque", path: "/operador/estoque" },
            { icon: User, label: "Perfil", path: "/perfil" },
          ];
          break;

        case "DELIVERER":
          items = [
            { icon: Home, label: "Início", path: "/" },
            {
              icon: Truck,
              label: "Entregas",
              path: "/area-entregas/minhas-entregas",
              isCenter: true,
            },
            { icon: User, label: "Perfil", path: "/perfil" },
          ];
          break;

        case "SELLER":
          items = [
            { icon: Home, label: "Início", path: "/" },
            { icon: ShoppingBag, label: "Produtos", path: "/meus-produtos" },
            {
              icon: PlusCircle,
              label: "Publicar",
              path: "/adicionar-produto",
              isCenter: true,
            },
            { icon: Wallet, label: "Carteira", path: "/carteira" },
            { icon: Store, label: "Vendas", path: "/centro-vendas" },
          ];
          break;

        case "BUYER":
          items = [
            { icon: Home, label: "Início", path: "/" },
            {
              icon: ShoppingCart,
              label: "Carrinho",
              path: "/carrinho",
              isCenter: true,
              isCart: true,
            },
            { icon: ShoppingBag, label: "Pedidos", path: "/meus-pedidos" },
            { icon: User, label: "Perfil", path: "/perfil" },
          ];
          break;

        default:
          items = [
            { icon: Home, label: "Início", path: "/" },
            { icon: User, label: "Perfil", path: "/perfil" },
          ];
      }
    }
    return items;
  };

  const currentNavItems = getNavItems();
  const canShowCenter = currentNavItems.length % 2 !== 0;

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass-nav border-t border-border px-6 py-2 flex justify-between items-center z-50 rounded-t-xl lg:hidden">
      <div className="w-full max-w-md mx-auto flex justify-between items-center">
        {currentNavItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          const shouldHighlight = item.isCenter && canShowCenter;
          const Icon = item.icon;

          if (shouldHighlight) {
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex flex-col items-center relative"
              >
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground -mt-10 shadow-lg shadow-primary/40 border-4 border-background">
                  <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
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
              className={`flex flex-col items-center transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <div className="relative">
                <Icon
                  size={24}
                  strokeWidth={isActive ? 2.5 : 2}
                  className={
                    isActive ? "drop-shadow-[0_0_8px_rgba(108,62,248,0.3)]" : ""
                  }
                />
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
