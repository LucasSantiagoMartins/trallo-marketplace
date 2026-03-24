import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getOrderStatusColor,
  getOrderStatusLabel,
} from "@/utils/mappers/order.mapper";
import { formatPrice } from "@/utils/currency";
import { formatDateFriendly } from "@/utils/date";
import TralloButton from "@/components/TralloButton";
import OrderDetailsModal from "./OrderDetailsModal";
import { DeliveryResponseDto } from "@/dtos/delivery-response";

interface DeliveryCardProps {
  delivery: DeliveryResponseDto;
  active?: boolean;
  onRefresh?: () => void;
  isAdminView?: boolean;
}

const DeliveryOrderCard: React.FC<DeliveryCardProps> = ({
  delivery,
  active,
  isAdminView = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleUpdateStatus = () => {
    if (isAdminView) return;
    navigate("/detalhe-pedido", {
      state: { order: delivery.order, deliveryId: delivery.id },
    });
  };

  const openMaps = () => {
    const query = encodeURIComponent(delivery.order.address);
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${query}`,
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
                local_shipping
              </span>
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-xs sm:text-base leading-tight text-gray-900 dark:text-white truncate">
                {delivery.order.orderNumber}
              </h3>
              <p className="text-[9px] sm:text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                {formatDateFriendly(delivery.shippedAt || new Date())}
              </p>
            </div>
          </div>

          <div
            className={`${getOrderStatusColor(delivery.status as any)} px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full flex items-center justify-center flex-shrink-0`}
          >
            <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-tight whitespace-nowrap">
              {getOrderStatusLabel(delivery.status as any, false)}
            </span>
          </div>
        </div>

        <div className="space-y-1 mb-5">
          <p className="text-sm font-bold text-gray-800 dark:text-gray-200">
            {delivery.order.buyerName}
          </p>

          {isAdminView && delivery.deliverer && (
            <p className="text-[10px] font-bold text-[#6d3ff8] flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">person</span>
              Entregador: {delivery.deliverer.name}
            </p>
          )}

          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">
              location_on
            </span>
            {delivery.order.address}
          </p>
          <div className="flex items-center justify-between pt-2">
            <p className="text-xl font-black text-[#6d3ff8]">
              {formatPrice(delivery.order.totalAmount)}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          {active && !isAdminView ? (
            <>
              <TralloButton
                variant="primary"
                icon="map"
                iconPosition="left"
                onClick={openMaps}
                className="flex-[2] !h-12 !text-sm"
              >
                Ver Rota
              </TralloButton>
              <TralloButton
                variant="primary"
                onClick={handleUpdateStatus}
                className="flex-1 !h-12 !text-sm"
              >
                Status
              </TralloButton>
            </>
          ) : (
            <TralloButton
              variant="gray"
              onClick={() => setIsOpen(true)}
              className="w-full !h-12 !text-sm"
              icon="visibility"
            >
              Ver Detalhes do Pedido
            </TralloButton>
          )}

          {!active && !isAdminView && (
            <TralloButton
              variant="gray"
              onClick={() => setIsOpen(true)}
              className="flex-1 !h-12 !text-sm"
            >
              Detalhes
            </TralloButton>
          )}
        </div>
      </div>

      <OrderDetailsModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        order={delivery.order as any}
      />
    </>
  );
};

export default DeliveryOrderCard;
