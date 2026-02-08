import React from "react";
import { Link, useLocation } from "react-router-dom";

interface NavItem {
  icon: string;
  label: string;
  path: string;
  isCenter?: boolean;
  badge?: number;
}

const navItems: NavItem[] = [
  { icon: "home", label: "Início", path: "/" },
  { icon: "explore", label: "Explorar", path: "/explore" },
  { icon: "shopping_cart", label: "Carrinho", path: "/cart", isCenter: true, badge: 3 },
  { icon: "favorite", label: "Desejos", path: "/wishlist" },
  { icon: "person", label: "Perfil", path: "/profile" },
];

const BottomNavigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass-nav border-t border-border px-6 py-3 flex justify-between items-center z-50 rounded-t-xl max-w-[430px] mx-auto">
      {navItems.map((item) => {
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
            className={`flex flex-col items-center ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
          >
            <span className={`material-symbols-outlined ${isActive ? 'fill-1' : ''}`}>
              {item.icon}
            </span>
            <span className={`text-[10px] mt-1 ${isActive ? 'font-bold' : 'font-medium'}`}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNavigation;
