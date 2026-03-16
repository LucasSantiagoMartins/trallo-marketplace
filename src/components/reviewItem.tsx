import { defaultFilter } from "cmdk";

interface ReviewItemProps {
  name: string;
  initials: string;
  rating: number;
  comment: string;
  date: string;
  colorClass: string;
}
const ReviewItem: React.FC<ReviewItemProps> = ({
  name,
  initials,
  rating,
  comment,
  date,
  colorClass,
}) => (
  <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-50 dark:border-slate-800 shadow-sm space-y-2">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div
          className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-[10px] ${colorClass}`}
        >
          {initials}
        </div>
        <div>
          <p className="text-[11px] font-bold leading-none">{name}</p>
          <p className="text-[9px] text-slate-400 mt-1 uppercase font-medium">
            {date}
          </p>
        </div>
      </div>
      <div className="flex text-amber-400">
        <span className="text-[11px] font-black text-slate-700 dark:text-slate-300">
          {rating}.0
        </span>
        <span className="material-symbols-outlined text-[14px] fill-1 ml-0.5">
          star
        </span>
      </div>
    </div>
    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal italic">
      "{comment}"
    </p>
  </div>
);

export default ReviewItem;
