import React, { useState, useEffect } from "react";
import SidebarLink from "./SidebarLink";
import { logout } from "../services/auth.service";
import { ChevronLeft, ChevronRight, LogOut } from "lucide-react";

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
  const [isExpanded, setIsExpanded] = useState(() => {
    const saved = localStorage.getItem("sidebar_expanded");
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem("sidebar_expanded", JSON.stringify(isExpanded));
  }, [isExpanded]);

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  return (
    <aside
      className={`hidden lg:flex flex-col bg-white border-r border-[#F1F5F9] transition-all duration-300 sticky top-0 h-screen z-40 shrink-0 ${
        isExpanded ? "w-72 p-6" : "w-20 p-2 items-center"
      }`}
    >
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-9 bg-white border border-[#F1F5F9] rounded-full p-1 shadow-md hover:bg-slate-50 z-50 flex items-center justify-center"
      >
        {isExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>

      {isExpanded ? (
        <div className="mb-8 flex items-center justify-start w-full shrink-0">
          <h2 className="text-2xl font-bold whitespace-normal leading-tight">
            {title}
          </h2>
        </div>
      ) : (
        <div className="mb-8 h-8 shrink-0" />
      )}

      <nav
        className={`space-y-4 flex-1 w-full overflow-y-auto overflow-x-hidden flex flex-col no-scrollbar ${
          !isExpanded ? "items-center" : ""
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

        {showSettings && (
          <div className="pt-4 mt-4 border-t border-slate-100 w-full flex justify-center shrink-0">
            <SidebarLink
              icon="settings"
              label={isExpanded ? "Configurações" : ""}
              path="/area-administrativa/configuracoes"
              active={activePage === "configuracoes"}
            />
          </div>
        )}
      </nav>

      <div className="pt-2 mt-auto border-t border-slate-100 w-full flex flex-col items-center shrink-0">
        <button
          onClick={logout}
          className={`group flex items-center text-red-600 transition-all hover:bg-red-50 ${
            isExpanded
              ? "w-full px-4 py-2.5 rounded-lg justify-start"
              : "w-12 h-12 rounded-full justify-center"
          }`}
        >
          <LogOut size={20} className="shrink-0" />
          {isExpanded && (
            <span className="ml-4 font-medium text-sm whitespace-nowrap">
              Sair
            </span>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;