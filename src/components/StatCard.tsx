import React from "react";

interface StatCardProps {
  label: string;
  value: string;
  icon: string;
  color: "primary" | "slate";
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, color }) => {
  const isPrimary = color === "primary";

  return (
    <div className="flex flex-col gap-1.5 p-3 h-full min-w-[140px] md:min-w-0 bg-white dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800/50 shadow-sm shrink-0 md:shrink">
      <div
        className={`size-8 rounded-lg flex items-center justify-center ${
          isPrimary
            ? "bg-[#6C3EF8]/10 text-[#6C3EF8]"
            : "bg-slate-100 dark:bg-slate-700 text-slate-500"
        }`}
      >
        <span className="material-symbols-outlined text-[18px]">{icon}</span>
      </div>

      <div className="flex flex-col">
        <span
          className={`text-base font-bold leading-tight ${
            isPrimary ? "text-[#6C3EF8]" : "text-slate-900 dark:text-white"
          }`}
        >
          {value}
        </span>
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
          {label}
        </span>
      </div>
    </div>
  );
};

export default StatCard;
