import React from "react";
import { useNavigate } from "react-router-dom";
import {
  getOrderStatusColor,
  getOrderStatusLabel,
} from "@/utils/mappers/order.mapper";
import { OrderStatus } from "@/enums/order-status";
import { OrderDTO } from "@/dtos/order";
import OrderDetailsModal from "./OrderDetailsModal";
import { formatPrice } from "@/utils/currency";

interface OrderItemProps {
  order: OrderDTO;
  active?: boolean;
  isSeller?: boolean;
  isAdmin?: boolean;
}

const OrderCard: React.FC<OrderItemProps> = ({
  order,
  active,
  isSeller,
  isAdmin,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();

  const firstItemName =
    order.items.length > 0 ? order.items[0].name : "Sem itens";
  const extraItemsCount = order.items.length - 1;

  const openTralloMap = () => {
    const address = "Trallo Instalação, Luanda, Angola";
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`,
      "_blank",
    );
  };

  return (
    <>
      <div className="bg-white dark:bg-white/5 rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 dark:border-white/10 lg:hover:border-[#6d3ff8]/30 transition-all duration-300">
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="size-10 sm:size-14 rounded-xl bg-gray-100 dark:bg-white/10 flex items-center justify-center overflow-hidden border border-gray-200 dark:border-white/5 flex-shrink-0">
              <span className="material-symbols-outlined text-gray-400 text-xl sm:text-2xl">
                shopping_bag
              </span>
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-xs sm:text-base leading-tight text-gray-900 dark:text-white truncate">
                {order.orderNumber}
              </h3>
              <p className="text-[9px] sm:text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                {order.date}
              </p>
            </div>
          </div>
          
          <div
            className={`${getOrderStatusColor(order.status)} px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full flex items-center justify-center flex-shrink-0`}
          >
            <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-tight sm:tracking-wider whitespace-nowrap">
              {getOrderStatusLabel(order.status, isSeller)}
            </span>
          </div>
        </div>

        {isSeller && order.status === OrderStatus.AWAITING_SHIPMENT && (
          <div className="mb-5 p-4 bg-purple-50/50 dark:bg-purple-500/5 border border-purple-100 dark:border-purple-500/20 rounded-2xl">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 size-8 rounded-lg bg-purple-100 dark:bg-purple-500/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-purple-600 text-lg">
                  priority_high
                </span>
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-purple-900 dark:text-purple-200 mb-1">
                  Entrega pendente
                </p>
                <p className="text-[11px] text-purple-700/80 dark:text-purple-300/70 leading-relaxed">
                  Por favor, leve este produto até à instalação da{" "}
                  <span className="font-semibold text-purple-600">Trallo</span>{" "}
                  em até 24h.
                </p>
                <button
                  onClick={openTralloMap}
                  className="mt-3 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-purple-600 hover:text-purple-700 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">
                    location_on
                  </span>
                  Ver no mapa
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-1 mb-5">
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-1">
            {firstItemName}
            {extraItemsCount > 0 && (
              <span className="text-[#6d3ff8] font-medium">
                {" "}
                + {extraItemsCount} {extraItemsCount === 1 ? "item" : "itens"}
              </span>
            )}
          </p>
          <p className="text-xl font-black text-[#6d3ff8]">
            {formatPrice(order.totalAmount)}
          </p>
        </div>

        <div className="flex gap-2">
          {active && order.status === OrderStatus.SHIPPED && (
            <button
              onClick={() => navigate("/detalhe-pedido")}
              className="flex-[2] bg-[#6d3ff8] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-sm shadow-lg shadow-[#6d3ff8]/25 lg:hover:bg-[#5a32d1] transition-all"
            >
              <span className="material-symbols-outlined text-lg">
                local_shipping
              </span>
              Rastrear
            </button>
          )}
          <button
            onClick={() => setIsOpen(true)}
            className="flex-1 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-200 font-bold py-3 rounded-xl text-sm lg:hover:bg-gray-200 dark:lg:hover:bg-white/20 transition-all"
          >
            Detalhes
          </button>
        </div>
      </div>

      <OrderDetailsModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        order={order}
        isAdmin={isAdmin}
      />
    </>
  );
};

export default OrderCard;