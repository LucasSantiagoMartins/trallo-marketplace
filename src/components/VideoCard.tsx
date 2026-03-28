import React, { useState } from "react";
import VideoPlayer from "./VideoPlayer";
import { motion, AnimatePresence } from "framer-motion";

interface VideoCardProps {
  title: string;
  thumbnail: string;
  videoSrc: string;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  title,
  thumbnail,
  videoSrc,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      <div className="relative aspect-video w-full rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-slate-50 group bg-black">
        <div className="absolute inset-0 bg-black/20 z-10 flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={() => setIsPlaying(true)}
            className="w-16 h-16 bg-[#6C3EF8] text-white rounded-full flex items-center justify-center shadow-2xl shadow-[#6C3EF8]/40 hover:scale-110 transition-transform"
          >
            <span className="material-symbols-outlined text-4xl">
              play_arrow
            </span>
          </button>
        </div>

        <img
          src={thumbnail}
          className="w-full h-full object-cover"
          alt={title}
        />

        <div className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4 z-20 flex justify-between items-center bg-black/60 backdrop-blur-xl p-2 md:p-3 rounded-xl md:rounded-2xl opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-white text-[8px] md:text-[10px] font-bold uppercase tracking-widest">
            {title}
          </span>
          <button
            onClick={() => setIsPlaying(true)}
            className="text-white/80 hover:text-white"
          >
            <span className="material-symbols-outlined text-base md:text-sm">
              fullscreen
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
          >
            <button
              onClick={() => setIsPlaying(false)}
              className="absolute top-6 right-6 z-[10000] w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-3xl">close</span>
            </button>

            <div className="w-full h-full">
              <VideoPlayer src={videoSrc} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
