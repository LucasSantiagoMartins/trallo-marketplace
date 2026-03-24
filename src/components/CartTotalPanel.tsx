import React, { useState, useRef, useEffect } from "react";
import TralloButton from "@/components/TralloButton";
import { formatPrice } from "@/utils/currency";

interface CartTotalPanelProps {
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  total: number;
  onCheckout: () => void;
}

const CartTotalPanel: React.FC<CartTotalPanelProps> = ({
  subtotal,
  deliveryFee,
  serviceFee,
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
    const currentY = clientY - startY.current;

    if (currentY >= 0) {
      setDragY(currentY);
      lastY.current = currentY;
    }
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // Se arrastar mais de 80px para baixo, ele minimiza (fica 190px para baixo)
    // Se estiver minimizado e arrastar para cima, ele volta ao 0
    if (lastY.current > 80) {
      setDragY(190);
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
      className={`fixed bottom-0 left-0 right-0 z-[70] bg-white dark:bg-[#1c182d] rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.15)] border-t border-gray-100 dark:border-white/10 px-6 pb-12 pt-4 select-none touch-none ${
        isDragging
          ? "transition-none cursor-grabbing"
          : "transition-transform duration-500 ease-out cursor-grab"
      }`}
    >
      <div className="max-w-3xl mx-auto flex flex-col">
        <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mb-6 self-center" />

        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>Subtotal</span>
            <span className="font-semibold text-gray-700 dark:text-gray-200">
              {subtotal.toLocaleString("pt-AO")} Kz
            </span>
          </div>
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>Taxa de Entrega</span>
            <span className="font-semibold text-gray-700 dark:text-gray-200">
              {deliveryFee === 0
                ? "Grátis"
                : `${deliveryFee.toLocaleString("pt-AO")} Kz`}
            </span>
          </div>
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>Taxa de Serviço (3.5%)</span>
            <span className="font-semibold text-gray-700 dark:text-gray-200">
              {serviceFee.toLocaleString("pt-AO")} Kz
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-1 mb-6">
          <span className="text-[10px] text-gray-400 uppercase font-black tracking-wider">
            Total Final a Pagar
          </span>
          <span className="font-black text-3xl text-[#6d3ff8]">
            {formatPrice(total)}
          </span>
        </div>

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
