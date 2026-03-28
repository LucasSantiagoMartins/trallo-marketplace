import React from "react";

interface VideoCardProps {
  title: string;
  thumbnail: string;
}

export const VideoCard: React.FC<VideoCardProps> = ({ title, thumbnail }) => {
  return (
    <div className="relative aspect-video w-full rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-slate-50 group">
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100">
        <button className="w-16 h-16 bg-[#6C3EF8] text-white rounded-full flex items-center justify-center shadow-2xl shadow-[#6C3EF8]/40 hover:scale-110 transition-transform">
          <span className="material-symbols-outlined text-4xl">play_arrow</span>
        </button>
      </div>

      <img src={thumbnail} className="w-full h-full object-cover" alt={title} />

      <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-center bg-black/60 backdrop-blur-xl p-3 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-white text-[10px] font-bold uppercase tracking-widest">
          {title}
        </span>
      </div>
    </div>
  );
};
