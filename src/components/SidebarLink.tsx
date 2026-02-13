import React from "react";
import { useNavigate } from "react-router-dom";

interface SidebarLinkProps {
  icon: string;
  label: string;
  path: string;
  active?: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  icon,
  label,
  path,
  active = false,
}) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(path)}
      className={`w-full flex items-center gap-4 px-5 py-4 rounded-[1.5rem] transition-all ${
        active
          ? "bg-[#6C3EF8] text-white shadow-lg shadow-[#6C3EF8]/30"
          : "text-slate-400 hover:bg-slate-50"
      }`}
    >
      <span className="material-symbols-outlined">{icon}</span>
      <span className="text-sm font-bold">{label}</span>
    </button>
  );
};

export default SidebarLink;
