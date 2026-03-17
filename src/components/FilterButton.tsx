import React from "react";

interface FilterButtonProps {
  onClick: () => void;
  label?: string;
  icon?: string;
  className?: string;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  onClick,
  label = "Filtrar",
  icon = "filter_list",
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`text-primary text-xs font-black flex items-center gap-2 bg-primary/5 px-4 py-2.5 rounded-2xl uppercase tracking-widest hover:bg-primary/10 transition-colors active:scale-95 ${className}`}
    >
      {label}
      <span className="material-symbols-outlined text-base">{icon}</span>
    </button>
  );
};

export default FilterButton;
