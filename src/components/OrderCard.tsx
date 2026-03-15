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
import { formatDateFriendly } from "@/utils/date";
import TralloButton from "@/components/TralloButton";

interface OrderItemProps {
  order: OrderDTO;
  active?: boolean;
  isSeller?: boolean;
  isAdmin?: boolean;
}

const TRACKING_STATUSES = [
  OrderStatus.READY_FOR_SHIPMENT,
  OrderStatus.PREPARING_ORDER,
  OrderStatus.SHIPPED,
  OrderStatus.OUT_FOR_DELIVERY,
  OrderStatus.DELIVERED,
  OrderStatus.DELIVERY_FAILED,
];

function canTrackOrder(status: OrderStatus) {
  return TRACKING_STATUSES.includes(status);
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

  const handleTrackOrder = () => {
    navigate("/detalhe-pedido", { state: { order } });
  };

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
                {formatDateFriendly(order.date)}
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
          <div className="flex items-center justify-between">
            <p className="text-xl font-black text-[#6d3ff8]">
              {formatPrice(order.totalAmount)}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          {active && canTrackOrder(order.status) && !isSeller && (
            <TralloButton
              variant="primary"
              icon="local_shipping"
              iconPosition="left"
              onClick={handleTrackOrder}
              className="flex-[2] !h-12 !text-sm"
            >
              Rastrear
            </TralloButton>
          )}

          {isSeller && order.status === OrderStatus.AWAITING_SHIPMENT && (
            <TralloButton
              variant="primary"
              iconPosition="left"
              onClick={openTralloMap}
              className="flex-[2] !h-12 !text-sm"
            >
              Onde Entregar?
            </TralloButton>
          )}

          <TralloButton
            variant="gray"
            onClick={() => setIsOpen(true)}
            className="flex-1 !h-12 !text-sm"
          >
            Detalhes
          </TralloButton>
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