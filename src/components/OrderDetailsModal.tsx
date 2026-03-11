import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MyOrderDTO } from "@/dtos/order";
import { BASE_UPLOAD_URL } from "@/api/endpoints";
import { formatPrice } from "@/utils/currency";

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
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 flex items-end md:items-center justify-center z-[70] md:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              drag={isMobile ? "y" : false}
              dragConstraints={{ top: 0 }}
              dragElastic={0.4}
              onDragEnd={(_, info) => {
                if (isMobile && info.offset.y > 150) {
                  onClose();
                }
              }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{
                type: "spring",
                damping: 32,
                stiffness: 300,
                mass: 0.8,
              }}
              className="relative w-full h-[92vh] md:h-auto md:max-w-2xl bg-white dark:bg-[#1c182d] rounded-t-[3rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="md:hidden w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mt-4 mb-2 shrink-0" />

              <div className="flex justify-between items-start px-8 pt-6 pb-4 shrink-0">
                <div>
                  <h2 className="text-[20px] font-black text-gray-900 dark:text-white">
                    Detalhes do Pedido | {order.orderNumber}
                  </h2>
                  <p className="text-gray-500 font-medium">
                    
                  </p>
                </div>

                {!isMobile && (
                  <button
                    onClick={onClose}
                    className="size-10 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
                  >
                    <span className="material-symbols-outlined text-gray-900 dark:text-white">
                      close
                    </span>
                  </button>
                )}
              </div>

              <div className="flex-1 overflow-y-auto px-8 space-y-4 scrollbar-hide">
                <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl space-y-4">
                  <p className="text-xs uppercase font-black text-gray-400">
                    Itens do Pedido ({order.totalQuantity})
                  </p>

                  {order.items.map((item, index) => (
                    <div
                      key={`${order.orderNumber}`}
                      className="flex items-center gap-4 border-b border-gray-100 dark:border-white/5 last:border-0 pb-3 last:pb-0"
                    >
                      <div className="size-16 rounded-xl overflow-hidden bg-gray-200 dark:bg-white/10 flex-shrink-0">
                        <img
                          src={BASE_UPLOAD_URL + item.coverImage}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="bg-[#6d3ff8]/10 text-[#6d3ff8] text-[10px] font-black px-2 py-0.5 rounded-md">
                            {item.quantity}x
                          </span>
                          <p className="text-sm font-bold line-clamp-1 text-gray-900 dark:text-gray-100">
                            {item.name}
                          </p>
                        </div>
                        <p className="text-xs text-gray-500 font-medium mt-1">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 pt-4 bg-white dark:bg-[#1c182d] border-t border-gray-100 dark:border-white/5 shrink-0">
                <div className="flex justify-between items-center p-5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                  <span className="font-bold text-gray-600 dark:text-gray-300">
                    Total Pago
                  </span>
                  <span className="text-lg md:text-2xl font-black text-[#6d3ff8]">
                    {formatPrice(Number(order.totalAmount))}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
};

export default OrderDetailsModal;
