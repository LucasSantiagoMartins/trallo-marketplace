import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "@/hooks/use-cart";
 

interface HeaderProps {
  showBack?: boolean;
  title?: string;
  rightActions?: React.ReactNode;
  onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  showBack = false,
  title,
  rightActions,
  onBack,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { cartCount, syncCartWithServer } = useCart();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      syncCartWithServer();
    }
  }, [isAuthenticated, syncCartWithServer]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuConfig = {
    ADMIN: [
      { name: "Área Administrativa", path: "/area-administrativa" },
      { name: "Pagamentos", path: "/area-administrativa/pagamentos" },
      { name: "Transacões", path: "/area-administrativa/transacoes" },
    ],
    SELLER: [
      { name: "Início", path: "/" },
      { name: "Produtos adicionados", path: "/meus-produtos" },
      { name: "Publicar produto", path: "/adicionar-produto" },
      { name: "Minha carteira", path: "/carteira" },
    ],
    BUYER: [
      { name: "Início", path: "/" },
      { name: "Meus Pedidos", path: "/meus-pedidos" },
      { name: "Favoritos", path: "/favoritos" },
    ],
    OPERATOR: [
      { name: "Pedidos Pendentes", path: "/operacao/pedidos" },
      { name: "Verificações Pendentes", path: "/area-operacional/verificacoes-pendentes" },
      { name: "Estoque", path: "/area-operacional/gestao-estoque" },
    ],
    DELIVERER: [
      { name: "Minhas Entregas", path: "/entregas" },
      { name: "Mapa de Rotas", path: "/rotas" },
    ],
  };

  const navItems =
    isAuthenticated && user
      ? menuConfig[user.role as keyof typeof menuConfig]
      : [{ name: "Início", path: "/" }];

  const headerStyles = isScrolled
    ? "fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg shadow-md border-b border-border/10 py-3 animate-in slide-in-from-top duration-300"
    : "relative bg-background border-b border-transparent py-4";

  if (showBack) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 glass-header px-4 md:px-6 lg:px-8 py-3 flex items-center justify-between border-b border-border/5 animate-in fade-in duration-500">
        <div className="w-full flex items-center justify-between">
          <button
            onClick={onBack}
            className="size-10 flex items-center justify-center bg-card rounded-full shadow-soft active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined text-foreground">arrow_back</span>
          </button>
          {title && (
            <h2 className="text-foreground text-sm font-bold uppercase tracking-widest">
              {title}
            </h2>
          )}
          {rightActions || <div className="w-10" />}
        </div>
      </header>
    );
  }

  return (
    <header className={`${headerStyles} px-4 md:px-6 lg:px-8 transition-all duration-300`}>
      <div className="w-full max-w-[75.5rem] mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary p-1.5 rounded-lg text-primary-foreground group-active:scale-90 transition-transform">
              <span className="material-symbols-outlined text-2xl">shopping_bag</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight clash-style">TRALLO</h1>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative py-1 text-sm transition-colors group/link ${
                  location.pathname === item.path
                    ? "font-semibold text-primary"
                    : "font-medium text-muted-foreground hover:text-primary"
                }`}
              >
                {item.name}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-300 ease-in-out ${
                    location.pathname === item.path ? "w-full" : "w-0 group-hover/link:w-full"
                  }`}
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/carrinho"
              className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-card hover:bg-muted transition-colors active:scale-95"
            >
              <span className="material-symbols-outlined">shopping_cart</span>
              {cartCount > 0 && (
                <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full animate-in zoom-in">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              to="/notifications"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-card hover:bg-muted transition-colors active:scale-95"
            >
              <span className="material-symbols-outlined">notifications</span>
              <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                +3
              </span>
            </Link>

            <Link
              to="/perfil"
              className="hidden lg:flex size-10 items-center justify-center rounded-full bg-card hover:bg-muted transition-colors active:scale-90"
            >
              <span className="material-symbols-outlined">person</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;