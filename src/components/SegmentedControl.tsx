import React from "react";

interface Option {
  id: string;
  label: string;
}

interface SegmentedControlProps {
  options: Option[];
  activeId: string;
  onChange: (id: any) => void;
  className?: string;
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options,
  activeId,
  onChange,
  className = "",
}) => {
  return (
    <div
      className={`flex p-1.5 bg-gray-200/50 dark:bg-white/5 rounded-[50px] border border-gray-200/30 dark:border-white/5 relative ${className}`}
    >
      {options.map((option) => {
        const isActive = activeId === option.id;
        return (
          <button
            key={option.id}
            onClick={() => onChange(option.id)}
            className={`flex-1 py-2.5 rounded-[50px] text-sm font-bold transition-all duration-300 relative z-10 ${
              isActive
                ? "bg-white dark:bg-[#6d3ff8] shadow-md text-[#6d3ff8] dark:text-white"
                : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export default SegmentedControl;
