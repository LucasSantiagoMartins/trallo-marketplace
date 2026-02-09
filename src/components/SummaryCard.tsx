import React from "react";

interface SummaryCardProps {
  title: string;
  value: string;
  color?: string;
  icon: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  // Gradiente vibrante do WalletPage como padrão
  color = "from-indigo-700 via-purple-700 to-pink-600",
  icon,
}) => (
  <div
    className={`p-4 md:p-6 rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-r ${color} text-white shadow-lg relative overflow-hidden h-32 md:h-44 flex flex-col justify-between`}
  >
    {/* Círculos decorativos do WalletPage para dar o mesmo estilo */}
    <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/10 rounded-full rotate-45"></div>

    <div className="size-8 md:size-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center relative z-10">
      <span className="material-symbols-outlined text-lg md:text-2xl">
        {icon}
      </span>
    </div>

    <div className="relative z-10">
      <p className="text-white/80 text-[10px] font-bold uppercase">{title}</p>
      <div className="flex items-baseline gap-1">
        <h3 className="text-lg md:text-3xl font-black tracking-tight truncate">
          {value}
        </h3>
        <span className="text-[8px] font-bold opacity-80">AOA</span>
      </div>
    </div>
  </div>
);

export default SummaryCard;
