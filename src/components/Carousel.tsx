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
    const child = container.children[index] as HTMLElement | undefined;
    if (child) {
      // Use container.scrollTo to only scroll the carousel, not the page
      const scrollLeft = child.offsetLeft - container.offsetLeft;
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused.current) {
        setCurrent((prev) => (prev + 1) % slides.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    scrollTo(current);
  }, [current]);

  const handleIndicatorClick = (index: number) => {
    isPaused.current = true;
    setCurrent(index);
    setTimeout(() => {
      isPaused.current = false;
    }, 1000);
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
      if (delta < 0 && current < slides.length - 1) {
        setCurrent(current + 1);
      } else if (delta > 0 && current > 0) {
        setCurrent(current - 1);
      }
    }

    touchStartX.current = null;
    setTimeout(() => {
      isPaused.current = false;
    }, 1000);
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div
        ref={containerRef}
        className="flex overflow-x-hidden snap-x snap-mandatory no-scrollbar"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="min-w-full snap-start p-2">
            <div
              className="relative w-full h-56 md:h-64 lg:h-80 rounded-2xl overflow-hidden flex items-center"
              style={{ backgroundColor: slide.backgroundColor }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-40"
                style={{ backgroundImage: `url('${slide.backgroundImage}')` }}
              />
              <div className="relative z-10 p-6 md:p-10 lg:p-12 w-full md:w-2/3 lg:w-1/2 flex flex-col items-start">
                <span
                  className={`text-primary-foreground text-[10px] md:text-xs font-bold px-2 py-1 rounded-full uppercase tracking-widest mb-3 inline-block ${
                    slide.tagColor || "bg-white/20"
                  }`}
                >
                  {slide.tag}
                </span>
                <h3 className="text-primary-foreground text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-2">
                  {slide.title}
                </h3>
                <p className="text-white/80 text-sm md:text-base mb-5 line-clamp-2 md:line-clamp-none">
                  {slide.description}
                </p>
                <button
                  className={`px-4 py-2 md:px-6 md:py-3 rounded-lg text-sm md:text-base font-bold shadow-lg transition-transform active:scale-95 ${
                    slide.buttonColor || "bg-white text-primary"
                  }`}
                >
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-6 right-0 left-0 flex items-center justify-center gap-1.5 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleIndicatorClick(index)}
            className={`rounded-full transition-all duration-300 focus:outline-none ${
              index === current
                ? "w-8 h-2 bg-white shadow-sm"
                : "w-2 h-2 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
