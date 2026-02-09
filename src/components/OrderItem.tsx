import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface OrderItemProps {
  id: string;
  name: string;
  date: string;
  status: "A Caminho" | "Preparando" | "Entregue";
  items: string;
  price: string;
  image: string;
  active?: boolean;
}

const OrderItem: React.FC<OrderItemProps> = ({
  id,
  name,
  date,
  status,
  items,
  price,
  image,
  active,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();

  const getStatusColor = () => {
    switch (status) {
      case "A Caminho":
        return "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400";
      case "Preparando":
        return "bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400";
      case "Entregue":
        return "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-500";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-white/5 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-white/10 hover:border-[#6d3ff8]/30 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="size-14 rounded-xl bg-gray-100 dark:bg-white/10 flex items-center justify-center overflow-hidden border border-gray-200 dark:border-white/5">
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">{name}</h3>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                ID: {id} • {date}
              </p>
            </div>
          </div>
          <div
            className={`${getStatusColor()} px-3 py-1.5 rounded-full flex items-center justify-center gap-1.5 min-w-[90px]`}
          >
            <span className="text-[10px] font-black uppercase tracking-wider">
              {status}
            </span>
          </div>
        </div>

        <div className="space-y-1 mb-5">
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-1">
            {items}
          </p>
          <p className="text-xl font-bold text-[#6d3ff8]">{price} AOA</p>
        </div>

        <div className="flex gap-2">
          {active && (
            <button
              onClick={() => navigate("/detalhe-pedido")}
              className="flex-[2] bg-[#6d3ff8] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-sm shadow-lg shadow-[#6d3ff8]/25"
            >
              <span className="material-symbols-outlined text-lg">
                local_shipping
              </span>
              Rastrear
            </button>
          )}
          <button
            onClick={() => setIsOpen(true)}
            className="flex-1 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-200 font-bold py-3 rounded-xl text-sm hover:bg-gray-200 dark:hover:bg-white/20 transition-all"
          >
            Detalhes
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 flex items-end md:items-center justify-center z-[70]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              drag="y"
              dragConstraints={{ top: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.y > 100) setIsOpen(false);
              }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="relative w-full md:max-w-md bg-white dark:bg-[#1c182d] rounded-t-[2.5rem] md:rounded-[2.5rem] p-8 shadow-2xl overflow-hidden"
            >
              <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mb-6 cursor-grab active:cursor-grabbing" />

              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-black">{name}</h2>
                  <p className="text-gray-500">{id}</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="size-10 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl">
                  <p className="text-xs uppercase font-black text-gray-400 mb-1">
                    Itens do Pedido
                  </p>
                  <p className="text-sm">{items}</p>
                </div>
                <div className="flex justify-between items-center p-4 border border-gray-100 dark:border-white/10 rounded-2xl">
                  <span className="font-bold">Total Pago</span>
                  <span className="text-xl font-black text-[#6d3ff8]">
                    {price} AOA
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default OrderItem;
