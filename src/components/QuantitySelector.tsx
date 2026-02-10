import React from "react";

interface QuantitySelectorProps {
  value: number;
  onChange: (delta: number) => void;
  className?: string;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  value,
  onChange,
  className = "",
}) => {
  return (
    <div
      className={`flex items-center justify-between bg-gray-100 dark:bg-white/5 rounded-full px-1.5 gap-2 ${className}`}
    >
      <button
        type="button"
        onClick={() => onChange(-1)}
        className="size-9 flex items-center justify-center rounded-full bg-white dark:bg-white/10 shadow-sm text-[#6d3ff8] transition-all active:scale-90 shrink-0"
      >
        <span className="material-symbols-outlined text-[20px]">remove</span>
      </button>

      <span className="font-bold text-base min-w-[20px] text-center select-none">
        {value}
      </span>

      <button
        type="button"
        onClick={() => onChange(1)}
        className="size-9 flex items-center justify-center rounded-full bg-[#6d3ff8] text-white shadow-sm transition-all active:scale-90 shrink-0"
      >
        <span className="material-symbols-outlined text-[20px]">add</span>
      </button>
    </div>
  );
};

export default QuantitySelector;
