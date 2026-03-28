const StatsOverviewCard = ({ icon, value, label, color }: any) => {
  const colorMap: any = {
    emerald: "text-emerald-500 bg-emerald-500/10",
    blue: "text-blue-500 bg-blue-500/10",
    amber: "text-amber-500 bg-amber-500/10",
  };

  return (
    <div className="flex-shrink-0 lg:flex-1 w-36 md:w-40 lg:w-full bg-white dark:bg-gray-800/60 p-4 lg:p-5 rounded-[1.8rem] border border-gray-100 dark:border-gray-700/50 shadow-sm transition-all">
      <div
        className={`${colorMap[color]} size-9 lg:size-12 rounded-xl flex items-center justify-center mb-2 lg:mb-3`}
      >
        <span className="material-symbols-outlined text-xl lg:text-2xl">
          {icon}
        </span>
      </div>
      <div className="text-xl lg:text-2xl font-black truncate leading-tight">
        {value}
      </div>
      <div className="text-[9px] lg:text-[10px] text-slate-400 font-black uppercase tracking-wider mt-0.5">
        {label}
      </div>
    </div>
  );
};
export default StatsOverviewCard;
