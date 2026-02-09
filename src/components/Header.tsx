import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FilterDrawer from "./FilterDrawer";

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerStyles = isScrolled
    ? "fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg shadow-md border-b border-border/10 py-3 animate-in slide-in-from-top duration-300"
    : "relative bg-background border-b border-transparent py-4";

  if (showBack) {
    return (
      <header
        className={`fixed top-0 left-0 right-0 z-50 glass-header px-4 md:px-6 lg:px-8 py-3 flex items-center justify-between border-b border-border/5 animate-in fade-in duration-500`}
      >
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
    <header
      className={`${headerStyles} px-4 md:px-6 lg:px-8 transition-all duration-300`}
    >
      <div className="w-full max-w-[75.5rem] mx-auto">
        <div className="flex items-center justify-between">
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
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-card hover:bg-muted transition-colors active:scale-95"
            >
              <span className="material-symbols-outlined">shopping_cart</span>
              <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                3
              </span>
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
              className="size-10 flex items-center justify-center rounded-full bg-card hover:bg-muted transition-colors active:scale-90"
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
