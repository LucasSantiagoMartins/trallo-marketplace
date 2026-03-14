import React, { useEffect } from "react";
import { MyOrderDTO } from "@/dtos/order";
import { BASE_UPLOAD_URL } from "@/api/endpoints";
import { formatPrice } from "@/utils/currency";
import { motion, AnimatePresence } from "framer-motion";

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: MyOrderDTO;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  isOpen,
  onClose,
  order,
}) => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-[70] flex items-end md:items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-black/50"
            />

            <motion.div
              initial={isMobile ? { y: "100%" } : { opacity: 0, scale: 0.95 }}
              animate={isMobile ? { y: 0 } : { opacity: 1, scale: 1 }}
              exit={isMobile ? { y: "100%" } : { opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              drag={isMobile ? "y" : false}
              dragConstraints={{ top: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.y > 100) onClose();
              }}
              className={`
                relative w-full md:max-w-2xl bg-white dark:bg-[#1c182d] 
                rounded-t-[2.5rem] md:rounded-[2rem] shadow-xl flex flex-col 
                pointer-events-auto overflow-hidden
                ${isMobile ? "h-[75vh]" : "h-auto md:max-h-[85vh]"}
              `}
              style={{ willChange: "transform" }}
            >
              <div className="md:hidden w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mt-4 mb-2 shrink-0" />

              <div className="flex justify-between items-center px-6 pt-4 pb-2 shrink-0">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Pedido {order.orderNumber}
                </h2>

                {!isMobile && (
                  <button
                    onClick={onClose}
                    className="p-2 rounded-full bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white active:scale-90 transition-transform"
                  >
                    <span className="material-symbols-outlined block">
                      close
                    </span>
                  </button>
                )}
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-4 scrollbar-hide space-y-4">
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
                          <span className="text-primary font-bold text-xs">
                            {item.quantity}x
                          </span>
                          <p className="text-sm font-semibold truncate dark:text-slate-100">
                            {item.name}
                          </p>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {formatPrice(item.price)}
                        </p>
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
                  <span className="text-xl font-black text-primary">
                    {formatPrice(Number(order.totalAmount))}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          <style>{`
            .scrollbar-hide::-webkit-scrollbar { display: none; }
            .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
};

export default OrderDetailsModal;
