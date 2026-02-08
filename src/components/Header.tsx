import React from "react";
import { Link } from "react-router-dom";
import TralloInput from "@/components/TralloInput";

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
  onBack 
}) => {
  if (showBack) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 glass-header px-4 md:px-6 lg:px-8 py-3 flex items-center justify-between border-b border-border/5">
        <div className="w-full flex items-center justify-between">
          <button 
            onClick={onBack}
            className="size-10 flex items-center justify-center bg-card rounded-full shadow-soft"
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
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md px-4 md:px-6 lg:px-8 pt-4 pb-2">
      <div className="w-full">
        <div className="flex items-center justify-between mb-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg text-primary-foreground">
              <span className="material-symbols-outlined text-2xl">shopping_bag</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight clash-style">TRALLO</h1>
          </Link>
          
          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/" className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
              Início
            </Link>
            <Link to="/explore" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Explorar
            </Link>
            <Link to="/wishlist" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Favoritos
            </Link>
            <Link to="/create-product" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Vender
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            {/* Cart - Desktop */}
            <Link to="/cart" className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-card hover:bg-muted transition-colors">
              <span className="material-symbols-outlined">shopping_cart</span>
              <span className="text-sm font-medium">Carrinho</span>
              <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">3</span>
            </Link>
            
            {/* Notifications */}
            <div className="relative">
              <button className="p-2 rounded-full hover:bg-muted transition-colors">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
              </span>
            </div>

            {/* Profile - Desktop */}
            <Link to="/profile" className="hidden lg:flex size-10 items-center justify-center rounded-full bg-card hover:bg-muted transition-colors">
              <span className="material-symbols-outlined">person</span>
            </Link>
          </div>
        </div>
        
        {showSearch && (
          <div className="relative max-w-4xl lg:mx-auto">
            <TralloInput
              label=""
              placeholder="O que procuras hoje?"
              icon="search"
              className="mb-0 pr-10"
            />
            {/* <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <span className="material-symbols-outlined text-muted-foreground text-xl">tune</span>
            </div> */}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
