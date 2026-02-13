import React from "react";
import { BASE_UPLOAD_URL } from "@/api/endpoints";

interface ProductImageGalleryProps {
  images: string[];
  currentIndex: number;
  productName: string;
  category?: string;
  onIndexChange: (index: number) => void;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  currentIndex,
  productName,
  category,
  onIndexChange,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}) => {
  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex > 0) onIndexChange(currentIndex - 1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex < images.length - 1) onIndexChange(currentIndex + 1);
  };

  return (
    <div
      className="relative w-full h-[420px] md:h-[500px] lg:h-[600px] bg-card overflow-hidden lg:rounded-2xl touch-pan-y group"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <img
        key={currentIndex}
        src={`${BASE_UPLOAD_URL}${images[currentIndex]}`}
        alt={productName}
        className="w-full h-full object-cover animate-in fade-in zoom-in-95 duration-500"
      />

      {images.length > 1 && (
        <>
          {/* Container das Setas - Visibilidade aumentada */}
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3 pointer-events-none">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`pointer-events-auto size-12 flex items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md transition-all hover:bg-black/50 active:scale-90 disabled:opacity-0 ${
                currentIndex === 0 ? "cursor-default" : "cursor-pointer"
              }`}
            >
              <span className="material-symbols-outlined text-[32px]">
                chevron_left
              </span>
            </button>

            <button
              onClick={handleNext}
              disabled={currentIndex === images.length - 1}
              className={`pointer-events-auto size-12 flex items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md transition-all hover:bg-black/50 active:scale-90 disabled:opacity-0 ${
                currentIndex === images.length - 1
                  ? "cursor-default"
                  : "cursor-pointer"
              }`}
            >
              <span className="material-symbols-outlined text-[32px]">
                chevron_right
              </span>
            </button>
          </div>

          {/* Pontos Decorativos */}
          <div className="absolute bottom-12 lg:bottom-6 left-0 right-0 flex justify-center gap-3 z-20 pointer-events-none">
            {images.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? "w-8 bg-white shadow-lg"
                    : "w-1.5 bg-white/40"
                }`}
              />
            ))}
          </div>
        </>
      )}

      <div className="absolute top-6 left-4">
        <span className="bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
          {category || "Produto"}
        </span>
      </div>
    </div>
  );
};

export default ProductImageGallery;
