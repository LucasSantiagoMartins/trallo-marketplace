import React, { useState } from "react";
import {
  getDeliveryStatusColor,
  getDeliveryStatusLabel,
} from "@/utils/mappers/delivery.mappers";
import { formatDateFriendly } from "@/utils/date";
import TralloButton from "@/components/TralloButton";
import { DeliveryResponseDto } from "@/dtos/delivery-response";
import { deliveryService } from "@/services/delivery.service";
import { toast } from "react-hot-toast";

interface DeliveryCardProps {
  delivery: DeliveryResponseDto;
  active?: boolean;
  onRefresh?: () => void;
  isAdminView?: boolean;
  onShowDetails?: () => void;
}

const DeliveryOrderCard: React.FC<DeliveryCardProps> = ({
  delivery,
  active,
  onRefresh,
  isAdminView = false,
  onShowDetails,
}) => {
  const [isConfirming, setIsConfirming] = useState(false);

  const openMaps = () => {
    const query = encodeURIComponent(delivery.order.address);
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${query}`,
      "_blank",
    );
  };

  const handleConfirmDelivery = async () => {
    try {
      setIsConfirming(true);
      const response = await deliveryService.confirmDelivery(
        delivery.order.orderNumber,
      );

      if (response.success) {
        toast.success("Entrega confirmada com sucesso!");
        if (onRefresh) onRefresh();
      } else {
        toast.error(response.message || "Erro ao confirmar entrega");
      }
    } catch (error) {
      toast.error("Erro na comunicação com o servidor");
    } finally {
      setIsConfirming(false);
    }
  };

  return (
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
          className={`${getDeliveryStatusColor(delivery.status as any)} px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full flex items-center justify-center flex-shrink-0`}
        >
          <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-tight whitespace-nowrap">
            {getDeliveryStatusLabel(delivery.status as any)}
          </span>
        </div>
      </div>

      <div className="space-y-1 mb-5">
        <p className="text-sm font-bold text-gray-800 dark:text-gray-200">
          {delivery.order.buyerName}
        </p>

        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">location_on</span>
          {delivery.order.address}
        </p>
      </div>

      <div className="flex gap-2">
        {active && !isAdminView ? (
          <>
            {delivery.status === "IN_PROGRESS" ? (
              <>
                <TralloButton
                  variant="primary"
                  onClick={openMaps}
                  className="flex-1 !h-12 !text-sm"
                >
                  Ver Rota
                </TralloButton>

                <button
                  disabled={isConfirming}
                  onClick={handleConfirmDelivery}
                  className="flex-[1.5] h-12 text-sm font-bold bg-gray-200 text-black rounded-xl hover:bg-gray-300 transition-colors flex items-center justify-center disabled:opacity-50"
                >
                  {isConfirming ? "Confirmando..." : "Confirmar Entrega"}
                </button>
              </>
            ) : null}
          </>
        ) : (
          <TralloButton
            variant="gray"
            onClick={onShowDetails}
            className="w-full !h-12 !text-sm"
          >
            Ver Detalhes {isAdminView ? "do Entregador" : ""}
          </TralloButton>
        )}
      </div>
    </div>
  );
};

export default DeliveryOrderCard;
