import React from "react";

interface StatCardProps {
  label: string;
  value: string | undefined;
  icon: string;
  color: "primary" | "slate" | "success" | "danger" | "warning" | "info";
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, color }) => {
  const colorConfig = {
    primary: {
      bg: "bg-[#6C3EF8]/10",
      text: "text-[#6C3EF8]",
      value: "text-[#6C3EF8]",
    },
    slate: {
      bg: "bg-slate-100 dark:bg-slate-700",
      text: "text-slate-500",
      value: "text-slate-900 dark:text-white",
    },
    success: {
      bg: "bg-emerald-500/10",
      text: "text-emerald-600",
      value: "text-emerald-700",
    },
    danger: {
      bg: "bg-rose-500/10",
      text: "text-rose-600",
      value: "text-rose-700",
    },
    warning: {
      bg: "bg-amber-500/10",
      text: "text-amber-600",
      value: "text-amber-700",
    },
    info: {
      bg: "bg-blue-500/10",
      text: "text-blue-600",
      value: "text-blue-700",
    },
  };

  const config = colorConfig[color];

  return (
    <div className="flex flex-col gap-3 p-4 h-full min-w-[160px] md:min-w-0 bg-white dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800/50 shadow-sm hover:shadow-md transition-all duration-300 shrink-0 md:shrink group">
      <div
        className={`size-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${config.bg} ${config.text}`}
      >
        <span className="material-symbols-outlined text-[20px] font-medium">
          {icon}
        </span>
      </div>

      <div className="flex flex-col gap-0.5">
        <span
          className={`text-lg font-black tracking-tight leading-tight ${config.value}`}
        >
          {value || "---"}
        </span>
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
          {label}
        </span>
      </div>
    </div>
  );
};

export default StatCard;