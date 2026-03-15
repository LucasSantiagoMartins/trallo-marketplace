import React, { useState, useRef, useEffect } from "react";
import TralloButton from "@/components/TralloButton";
import { formatPrice } from "@/utils/currency";

interface CartTotalPanelProps {
  total: number;
  onCheckout: () => void;
}

const CartTotalPanel: React.FC<CartTotalPanelProps> = ({
  total,
  onCheckout,
}) => {
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startY = useRef(0);
  const lastY = useRef(0);

  const handleStart = (clientY: number) => {
    startY.current = clientY - dragY;
    setIsDragging(true);
  };

  const handleMove = (clientY: number) => {
    if (!isDragging) return;
    const deltaY = clientY - startY.current;

    // Permite arrastar, mas limita o topo em 0
    if (deltaY >= 0) {
      setDragY(deltaY);
      lastY.current = deltaY;
    }
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // Se arrastou mais de 50px para baixo, completa o movimento para esconder (180px)
    // Caso contrário, volta para a posição inicial (0)
    if (lastY.current > 50) {
      setDragY(180);
    } else {
      setDragY(0);
    }
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientY);
    const onMouseUp = () => handleEnd();

    if (isDragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      onMouseDown={(e) => handleStart(e.clientY)}
      onTouchStart={(e) => handleStart(e.touches[0].clientY)}
      onTouchMove={(e) => handleMove(e.touches[0].clientY)}
      onTouchEnd={handleEnd}
      style={{
        transform: `translateY(${dragY}px)`,
      }}
      className={`fixed bottom-0 left-0 right-0 z-[70] bg-white dark:bg-[#1c182d] rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] border-t border-gray-100 dark:border-white/10 px-6 pb-12 pt-4 select-none touch-none ${
        isDragging
          ? "transition-none cursor-grabbing"
          : "transition-transform duration-500 ease-out cursor-grab"
      }`}
    >
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mb-6" />
        <span className="text-xs text-gray-400 uppercase font-black">
          Total a pagar
        </span>
        <span className="font-black text-3xl mb-6">{formatPrice(total)}</span>
        <TralloButton
          onClick={onCheckout}
          className="w-full bg-[#6d3ff8] text-lg shadow-lg active:scale-95 transition-transform"
        >
          Finalizar Compra
        </TralloButton>
      </div>
    </div>
  );
};

export default CartTotalPanel;
