import React from "react";

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
  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar">
        {slides.map((slide, index) => (
          <div key={slide.id} className="min-w-full snap-start pr-2 last:pr-0">
            <div
              className="relative w-full h-48 rounded-2xl overflow-hidden flex items-center"
              style={{ backgroundColor: slide.backgroundColor }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-40"
                style={{ backgroundImage: `url('${slide.backgroundImage}')` }}
              />
              <div className="relative z-10 px-6 w-2/3">
                <span
                  className={`text-primary-foreground text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest mb-2 inline-block ${
                    slide.tagColor || 'bg-white/20'
                  }`}
                >
                  {slide.tag}
                </span>
                <h3 className="text-primary-foreground text-2xl font-bold leading-tight mb-2 clash-style">
                  {slide.title}
                </h3>
                <p className="text-white/80 text-sm mb-4">{slide.description}</p>
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-bold shadow-lg ${
                    slide.buttonColor || 'bg-white text-primary'
                  }`}
                >
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Carousel Indicators */}
      <div className="absolute bottom-4 right-0 left-0 flex items-center justify-center gap-1.5 z-20">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`rounded-full ${
              index === activeIndex
                ? 'w-2.5 h-1.5 bg-white shadow-sm'
                : 'w-1.5 h-1.5 bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
