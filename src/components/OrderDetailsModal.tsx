import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { OrderDTO } from "@/dtos/order";
import { BASE_UPLOAD_URL } from "@/api/endpoints";
import { formatPrice } from "@/utils/currency";
import { toast } from "react-hot-toast";

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderDTO;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  isOpen,
  onClose,
  order,
}) => {
  const [mounted, setMounted] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [copiedSku, setCopiedSku] = useState<string | null>(null);
  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 1024);
    checkDevice();
    window.addEventListener("resize", checkDevice);

    if (isOpen) {
      setMounted(true);
      setDragY(0);
      document.body.style.overflow = "hidden";
      setTimeout(() => setAnimate(true), 10);
    } else {
      setAnimate(false);
      const timer = setTimeout(() => {
        setMounted(false);
        document.body.style.overflow = "";
      }, 300);
      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener("resize", checkDevice);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = () => {
    setAnimate(false);
    setDragY(0);
    setTimeout(onClose, 300);
  };

  const handleCopySku = (
    e: React.MouseEvent | React.TouchEvent,
    sku: string,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(sku).then(() => {
        setCopiedSku(sku);
        setTimeout(() => setCopiedSku(null), 2000);
      });
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = sku;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopiedSku(sku);
      setTimeout(() => setCopiedSku(null), 2000);
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return;
    touchStart.current = e.targetTouches[0].clientY;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isMobile || touchStart.current === null) return;
    const currentTouch = e.targetTouches[0].clientY;
    const diff = currentTouch - touchStart.current;
    if (diff > 0) setDragY(diff);
  };

  const onTouchEnd = () => {
    if (dragY > 100) {
      handleClose();
    } else {
      setDragY(0);
    }
    touchStart.current = null;
  };

  if (!mounted) return null;

  const currentTranslateY = isMobile
    ? animate
      ? dragY
      : "100%"
    : animate
      ? 0
      : "40px";

  const modalContent = (
    <div
      className="fixed inset-0 w-full h-[100dvh] z-[9999] flex items-end lg:items-center justify-center overflow-hidden"
      onWheel={(e) => e.stopPropagation()}
    >
      <div
        className={`absolute inset-0 w-full h-full bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
          animate ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      <div
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{
          transform: `translateY(${typeof currentTranslateY === "number" ? currentTranslateY + "px" : currentTranslateY})`,
          transition:
            isMobile && touchStart.current !== null
              ? "none"
              : "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
        className={`
          relative w-full lg:max-w-2xl bg-white dark:bg-[#1c182d] 
          rounded-t-[2.5rem] lg:rounded-[2rem] shadow-2xl flex flex-col 
          pointer-events-auto overflow-hidden
          max-h-[92dvh] lg:h-auto lg:max-h-[85vh]
          ${!isMobile ? `transition-all duration-300 ${animate ? "opacity-100 scale-100" : "opacity-0 scale-95"}` : ""}
        `}
      >
        {isMobile && (
          <div className="w-full pt-4 pb-2 shrink-0">
            <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto" />
          </div>
        )}

        {!isMobile && (
          <div className="absolute top-6 right-6 z-[110]">
            <button
              onClick={handleClose}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white hover:bg-slate-200 transition-all"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        )}

        <div className="px-6 pt-6 pb-2 shrink-0">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Pedido {order.orderNumber}
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 no-scrollbar">
          <div className="bg-slate-50 dark:bg-white/5 rounded-2xl p-4 space-y-4">
            <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
              Itens ({order.totalQuantity})
            </p>

            {order.items.map((item, index) => (
              <div
                key={`${order.orderNumber}-${index}`}
                className="flex items-center gap-4 border-b border-slate-200/50 dark:border-white/5 last:border-0 pb-3 last:pb-0"
              >
                <img
                  src={BASE_UPLOAD_URL + item.coverImage}
                  alt={item.name}
                  className="size-14 rounded-xl object-cover bg-slate-200 dark:bg-white/10 shrink-0"
                />

                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[#6d3ff8] font-bold text-xs">
                      {item.quantity}x
                    </span>
                    <p className="text-sm font-semibold truncate dark:text-slate-100">
                      {item.name}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-0.5">
                    <p className="text-xs text-slate-500">
                      {formatPrice(item.price)}
                    </p>

                    <button
                      type="button"
                      onClick={(e) => handleCopySku(e, item.productSku)}
                      className="flex items-center gap-1 text-[10px] font-medium text-slate-400 hover:text-[#6d3ff8] p-2 -m-2"
                    >
                      <span className="truncate max-w-[80px]">
                        {item.productSku}
                      </span>
                      <span
                        className={`material-symbols-outlined text-sm ${copiedSku === item.productSku ? "text-green-500" : ""}`}
                      >
                        {copiedSku === item.productSku
                          ? "check"
                          : "content_copy"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-[#1c182d] border-t border-slate-100 dark:border-white/5 shrink-0">
          <div className="flex justify-between items-center p-4 rounded-xl bg-slate-50 dark:bg-white/5">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Total
            </span>
            <span className="text-2xl font-black text-[#6d3ff8]">
              {formatPrice(Number(order.totalAmount))}
            </span>
          </div>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default OrderDetailsModal;
