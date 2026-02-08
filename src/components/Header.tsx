import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TralloInput from "@/components/TralloInput";
import FilterDrawer from "./FilterDrawer";

interface HeaderProps {
  showSearch?: boolean;
  showBack?: boolean;
  title?: string;
  rightActions?: React.ReactNode;
  onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  showSearch = false,
  showBack = false,
  title,
  rightActions,
  onBack,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Bloqueia o scroll da página quando o drawer de filtros está aberto
  useEffect(() => {
    if (isFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isFilterOpen]);

  if (showBack) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 glass-header px-4 md:px-6 lg:px-8 py-3 flex items-center justify-between border-b border-border/5 animate-in fade-in duration-500">
        <div className="w-full flex items-center justify-between">
          <button
            onClick={onBack}
            className="size-10 flex items-center justify-center bg-card rounded-full shadow-soft active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined text-foreground">
              arrow_back
            </span>
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
    <>
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md px-4 md:px-6 lg:px-8 pt-4 pb-2 border-b border-border/5">
        <div className="w-full max-w-[75.5rem] mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-primary p-1.5 rounded-lg text-primary-foreground group-active:scale-90 transition-transform">
                <span className="material-symbols-outlined text-2xl">
                  shopping_bag
                </span>
              </div>
              <h1 className="text-xl font-bold tracking-tight clash-style">
                TRALLO
              </h1>
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              <Link
                to="/"
                className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
              >
                Início
              </Link>
              <Link
                to="/explore"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Explorar
              </Link>
              <Link
                to="/wishlist"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Favoritos
              </Link>
              <Link
                to="/adicionar-produto"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Vender
              </Link>
            </nav>

            <div className="flex items-center gap-2">
              <Link
                to="/cart"
                className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-card hover:bg-muted transition-colors"
              >
                <span className="material-symbols-outlined">shopping_cart</span>
                <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                  3
                </span>
              </Link>

              <div className="relative">
                <button className="p-2 rounded-full hover:bg-muted transition-colors active:scale-90">
                  <span className="material-symbols-outlined">
                    notifications
                  </span>
                </button>
                <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
                </span>
              </div>

              <Link
                to="/perfil"
                className="size-10 flex items-center justify-center rounded-full bg-card hover:bg-muted transition-colors active:scale-90"
              >
                <span className="material-symbols-outlined">person</span>
              </Link>
            </div>
          </div>

          {showSearch && (
            <div className="relative max-w-4xl lg:mx-auto pb-2 animate-in fade-in slide-in-from-top-2 duration-700">
              <div className="relative group">
                <TralloInput
                  label=""
                  placeholder="O que procuras hoje?"
                  icon="search"
                  className="mb-0"
                />

                <button
                  onClick={() => setIsFilterOpen(true)}
                  type="button"
                  className="absolute right-2 top-[50%] -translate-y-1/2 size-10 flex items-center justify-center rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                >
                  <span className="material-symbols-outlined text-xl">
                    tune
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Drawer de Filtros com animações suaves de entrada e saída simuladas por duration */}
      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
    </>
  );
};

export default Header;
