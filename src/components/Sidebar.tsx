import React, { useState, useEffect } from "react";
import SidebarLink from "./SidebarLink";
import { logout } from "../services/auth.service";
import { ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SidebarItem {
  icon: string;
  label: string;
  path: string;
  id: string;
}

interface SidebarProps {
  title: string;
  items: SidebarItem[];
  activePage: string;
  showSettings?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  title,
  items,
  activePage,
  showSettings = false,
}) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(() => {
    const saved = localStorage.getItem("sidebar_expanded");
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem("sidebar_expanded", JSON.stringify(isExpanded));
  }, [isExpanded]);

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  const handleLogout = async () => {
    await logout();
    navigate("/entrar");
  };

  return (
    <aside
      className={`hidden lg:flex flex-col bg-white border-r border-[#F1F5F9] transition-all duration-300 sticky top-0 h-screen shrink-0 z-[100] ${
        isExpanded ? "w-72 pr-4 py-6" : "w-20 py-6 items-center"
      }`}
    >
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-9 bg-white border border-[#F1F5F9] rounded-full size-7 shadow-lg hover:bg-slate-50 flex items-center justify-center z-[110] transition-transform active:scale-90"
      >
        {isExpanded ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
      </button>

      {isExpanded ? (
        <div className="mb-8 px-6 flex items-center justify-start w-full shrink-0">
          <h2 className="text-2xl font-black text-slate-900 whitespace-normal leading-tight tracking-tight">
            {title}
          </h2>
        </div>
      ) : (
        <div className="mb-8 h-10 shrink-0 flex items-center justify-center">
          <div className="size-2 bg-[#6C3EF8] rounded-full" />
        </div>
      )}

      <nav
        className={`space-y-2 flex-1 w-full overflow-y-auto overflow-x-hidden flex flex-col no-scrollbar ${
          !isExpanded ? "items-center px-0" : ""
        }`}
      >
        {items.map((item) => (
          <SidebarLink
            key={item.id}
            icon={item.icon}
            label={isExpanded ? item.label : ""}
            path={item.path}
            active={activePage === item.id}
          />
        ))}
      </nav>

      <div
        className={`pt-4 mt-auto border-t border-slate-100 w-full flex flex-col shrink-0 ${isExpanded ? "px-6" : "items-center px-2"}`}
      >
        <button
          onClick={handleLogout}
          className={`group flex items-center text-red-600 transition-all hover:bg-red-50/50 ${
            isExpanded
              ? "w-full px-4 py-3 rounded-xl justify-start"
              : "size-12 rounded-[20px] justify-center"
          }`}
        >
          <LogOut size={20} className="shrink-0" />
          {isExpanded && (
            <span className="ml-4 font-bold text-sm whitespace-nowrap">
              Sair
            </span>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
