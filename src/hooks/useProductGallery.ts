import { useState, useRef } from "react";

export const useProductGallery = (imagesCount: number) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.targetTouches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (!touchStartX.current || !touchEndX.current) return;
        const distance = touchStartX.current - touchEndX.current;
        if (distance > 50 && currentImageIndex < imagesCount - 1) {
            setCurrentImageIndex((prev) => prev + 1);
        } else if (distance < -50 && currentImageIndex > 0) {
            setCurrentImageIndex((prev) => prev - 1);
        }
        touchStartX.current = null;
        touchEndX.current = null;
    };

    return {
        currentImageIndex,
        setCurrentImageIndex,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
    };
};