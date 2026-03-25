import React, { useEffect, useRef, useState } from "react";

interface CarouselSlide {
  id: string;
  tag: string;
  tagColor?: string;
  title: string;
  description: string;
  buttonText: string;
  buttonColor?: string;
  backgroundImage: string;
  backgroundColor: string;
}

interface CarouselProps {
  slides: CarouselSlide[];
  activeIndex?: number;
}

const Carousel: React.FC<CarouselProps> = ({ slides, activeIndex = 0 }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [current, setCurrent] = useState<number>(activeIndex);
  const touchStartX = useRef<number | null>(null);
  const isPaused = useRef<boolean>(false);

  const scrollTo = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const slideWidth = container.offsetWidth;
    container.scrollTo({
      left: slideWidth * index,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused.current) {
        setCurrent((prev) => (prev + 1) % slides.length);
      }
    }, 20000);
    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    scrollTo(current);
  }, [current]);

  const handlePrev = () => {
    isPaused.current = true;
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setTimeout(() => (isPaused.current = false), 2500);
  };

  const handleNext = () => {
    isPaused.current = true;
    setCurrent((prev) => (prev + 1) % slides.length);
    setTimeout(() => (isPaused.current = false), 2500);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    isPaused.current = true;
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const endX = e.changedTouches[0].clientX;
    const delta = endX - touchStartX.current;

    if (Math.abs(delta) > 50) {
      if (delta < 0) handleNext();
      else handlePrev();
    }

    touchStartX.current = null;
    setTimeout(() => (isPaused.current = false), 1500);
  };

  return (
    <div className="relative w-full group">
      <div
        ref={containerRef}
        className="flex overflow-x-hidden snap-x snap-mandatory no-scrollbar"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="min-w-full snap-start px-1 md:p-2">
            <div
              className="relative w-full h-50 md:h-64 lg:h-80 rounded-2xl md:rounded-[3rem] overflow-hidden flex items-center shadow-md border border-white/5"
              style={{ backgroundColor: slide.backgroundColor }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-50 transition-transform duration-1000"
                style={{ backgroundImage: `url('${slide.backgroundImage}')` }}
              />

              <div className="relative z-10 p-6 pb-10 md:p-14 lg:p-16 w-full md:w-3/4 flex flex-col items-start">
                <span
                  className={`text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-[0.2em] mb-2 md:mb-4 shadow-sm backdrop-blur-md ${
                    slide.tagColor || "bg-white/20 border border-white/10"
                  }`}
                >
                  {slide.tag}
                </span>
                <h3 className="text-white text-2xl md:text-4xl lg:text-5xl font-black leading-[1.1] mb-1 md:mb-3">
                  {slide.title}
                </h3>
                <p className="text-white/90 text-xs md:text-base mb-3 md:mb-6 max-w-md font-medium line-clamp-2 md:line-clamp-none">
                  {slide.description}
                </p>
                <button
                  className={`px-5 py-2.5 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-black shadow-sm transition-all active:scale-95 ${
                    slide.buttonColor || "bg-white text-slate-900"
                  }`}
                >
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute inset-y-0 left-6 md:left-8 right-6 md:right-8 hidden md:flex items-center justify-between z-30 pointer-events-none">
        <button
          onClick={handlePrev}
          className="size-9 md:size-10 rounded-full bg-white/10 md:bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white pointer-events-auto md:opacity-0 md:group-hover:opacity-100 transition-all hover:bg-white/40 active:scale-90 shadow-lg"
        >
          <span className="material-symbols-outlined text-xl md:text-2xl font-bold">
            chevron_left
          </span>
        </button>
        <button
          onClick={handleNext}
          className="size-9 md:size-10 rounded-full bg-white/10 md:bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white pointer-events-auto md:opacity-0 md:group-hover:opacity-100 transition-all hover:bg-white/40 active:scale-90 shadow-lg"
        >
          <span className="material-symbols-outlined text-xl md:text-2xl font-bold">
            chevron_right
          </span>
        </button>
      </div>

      <div className="absolute bottom-3 md:bottom-8 right-0 left-0 flex items-center justify-center gap-2 z-20 pointer-events-none">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`rounded-full transition-all duration-500 ${
              index === current
                ? "w-8 md:w-10 h-1 md:h-1.5 bg-white shadow-sm"
                : "w-1 md:w-1.5 h-1 md:h-1.5 bg-white/30"
            }`}
          />
        ))}
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Carousel;
