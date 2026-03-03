import React from "react";

interface TabButtonProps {
  id: string;
  label: string;
  icon: string;
  isActive: boolean;
  onClick: (id: any) => void;
}

const TabButton: React.FC<TabButtonProps> = ({ id, label, icon, isActive, onClick }) => {
  return (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
        isActive
          ? "bg-[#6C3EF8] text-white shadow-lg shadow-[#6C3EF8]/20"
          : "bg-white text-slate-400 hover:bg-slate-50 border border-slate-100"
      }`}
    >
      <span className="material-symbols-outlined text-sm">{icon}</span>
      {label}
    </button>
  );
};

export default TabButton;