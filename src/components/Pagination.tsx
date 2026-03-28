import React, { useState, useEffect } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      if (scrollTop + windowHeight >= documentHeight - 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (totalPages <= 1) return null;

  const maxVisibleButtons = 4;
  
  let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
  
  if (startPage + maxVisibleButtons - 1 > totalPages) {
    startPage = Math.max(1, totalPages - maxVisibleButtons + 1);
  }

  const visiblePages = Array.from(
    { length: Math.min(maxVisibleButtons, totalPages) },
    (_, i) => startPage + i
  );

  return (
    <div
      className={`fixed bottom-[110px] md:bottom-6 left-0 right-0 px-6 flex justify-center items-center z-40 pointer-events-none transition-all duration-500 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
    >
      <div className="flex items-center gap-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg p-1.5 rounded-full border border-slate-200/50 dark:border-slate-700/50 shadow-xl pointer-events-auto">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="size-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700 disabled:opacity-20 transition-all active:scale-95 shadow-sm"
        >
          <span className="material-symbols-outlined text-lg">
            chevron_left
          </span>
        </button>

        <div className="flex gap-1.5 px-1">
          {visiblePages.map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`size-10 rounded-full font-black text-[10px] transition-all active:scale-95 ${
                currentPage === page
                  ? "bg-[#6C3EF8] text-white shadow-md shadow-[#6C3EF8]/20"
                  : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="size-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700 disabled:opacity-20 transition-all active:scale-95 shadow-sm"
        >
          <span className="material-symbols-outlined text-lg">
            chevron_right
          </span>
        </button>
      </div>
    </div>
  );
};

export default Pagination;