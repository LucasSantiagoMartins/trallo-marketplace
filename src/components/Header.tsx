import React from "react";
import { Link } from "react-router-dom";

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
      <header className="fixed top-0 left-0 right-0 z-50 glass-header px-4 py-3 flex items-center justify-between border-b border-border/5 max-w-[430px] mx-auto">
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
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md px-4 pt-4 pb-2 max-w-[430px] mx-auto">
      <div className="flex items-center justify-between mb-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary p-1.5 rounded-lg text-primary-foreground">
            <span className="material-symbols-outlined text-2xl">shopping_bag</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight clash-style">TRALLO</h1>
        </Link>
        <div className="relative">
          <button className="p-2 rounded-full hover:bg-muted transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
          </span>
        </div>
      </div>
      
      {showSearch && (
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-muted-foreground">search</span>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-4 py-3 bg-card border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/50 shadow-sm placeholder:text-muted-foreground transition-all"
            placeholder="O que procuras hoje?"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <span className="material-symbols-outlined text-muted-foreground text-xl">tune</span>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
