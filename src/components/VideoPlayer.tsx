import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface VideoPlayerProps {
  src: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);

  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, []);

  const skip = (amount: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += amount;
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTo = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = seekTo;
      setProgress((seekTo / duration) * 100);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentProgress =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      } else if (e.code === "ArrowRight") {
        skip(10);
      } else if (e.code === "ArrowLeft") {
        skip(-10);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [togglePlay]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const moveHandler = () => {
      setShowControls(true);
      clearTimeout(timeout);

      if (isPlaying) {
        timeout = setTimeout(() => {
          setShowControls(false);
        }, 3000);
      }
    };

    const container = containerRef.current;
    container?.addEventListener("mousemove", moveHandler);
    container?.addEventListener("touchstart", moveHandler);
    container?.addEventListener("click", moveHandler);

    if (!isPlaying) {
      setShowControls(true);
      clearTimeout(timeout);
    }

    return () => {
      container?.removeEventListener("mousemove", moveHandler);
      container?.removeEventListener("touchstart", moveHandler);
      container?.removeEventListener("click", moveHandler);
      clearTimeout(timeout);
    };
  }, [isPlaying]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden group"
      style={{ cursor: showControls ? "default" : "none" }}
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay
        playsInline
        loop
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
        onClick={(e) => {
          e.stopPropagation();
          togglePlay();
        }}
        className="w-full h-full object-cover md:object-contain cursor-pointer"
      />

      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 flex flex-col justify-center bg-black/30 transition-colors pointer-events-none"
          >
            <div className="flex items-center justify-center gap-6 md:gap-10 pointer-events-auto">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  skip(-10);
                }}
                className="text-white/80 hover:text-white transition-transform active:scale-75 md:hover:scale-110"
              >
                <span className="material-symbols-outlined text-4xl md:text-5xl drop-shadow-md">
                  replay_10
                </span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                className="size-16 md:size-20 flex items-center justify-center bg-white/10 rounded-full backdrop-blur-md border border-white/20 text-white shadow-2xl md:hover:bg-white/20 transition-all"
              >
                <span className="material-symbols-outlined text-5xl md:text-6xl">
                  {isPlaying ? "pause" : "play_arrow"}
                </span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  skip(10);
                }}
                className="text-white/80 hover:text-white transition-transform active:scale-75 md:hover:scale-110"
              >
                <span className="material-symbols-outlined text-4xl md:text-5xl drop-shadow-md">
                  forward_10
                </span>
              </button>
            </div>

            <div
              className="absolute bottom-0 left-0 right-0 p-6 pb-12 md:pb-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col gap-2 max-w-4xl mx-auto">
                <div className="flex items-center justify-between text-white/90 text-[11px] font-bold tabular-nums px-1 drop-shadow-md">
                  <span>{formatTime(videoRef.current?.currentTime || 0)}</span>
                  <span>{formatTime(duration)}</span>
                </div>

                <div className="relative group/slider w-full h-6 flex items-center">
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    step="0.1"
                    value={videoRef.current?.currentTime || 0}
                    onChange={handleSeek}
                    className="absolute w-full h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer accent-white z-10"
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 left-0 h-1.5 bg-white rounded-full pointer-events-none"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoPlayer;
