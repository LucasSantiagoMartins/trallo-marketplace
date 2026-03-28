import React from "react";

interface InfoCardProps {
  title: string;
  description: string;
  icon: string;
  gradientFrom?: string;
  gradientTo?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  description,
  icon,
  gradientFrom = "#8B5CF6",
  gradientTo = "#6D28D9",
}) => {
  return (
    <div className="p-5 md:p-6 bg-gradient-to-b from-white to-gray-50 dark:from-slate-900/40 dark:to-slate-900/60 rounded-[2rem] border border-gray-100 dark:border-white/5 shadow-sm lg:mb-10">
      <div
        className="size-10 rounded-full flex items-center justify-center text-white mb-3 shadow-lg shadow-purple-500/20"
        style={{
          background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        }}
      >
        <span className="material-symbols-outlined text-xl">{icon}</span>
      </div>
      <h4 className="font-black text-base mb-1.5 tracking-tight text-[#181112] dark:text-white">
        {title}
      </h4>
      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default InfoCard;
