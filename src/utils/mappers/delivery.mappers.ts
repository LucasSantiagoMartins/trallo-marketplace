import { DeliveryStatus } from "@/enums/delivery.enums";

export const deliveryStatusLabel: Record<DeliveryStatus, string> = {
    [DeliveryStatus.PENDING_DELIVERY]: "Aguardando Coleta",
    [DeliveryStatus.IN_PROGRESS]: "Em Rota de Entrega",
    [DeliveryStatus.DELIVERED]: "Entregue",
};

export const deliveryStatusColor: Record<DeliveryStatus, string> = {
    [DeliveryStatus.PENDING_DELIVERY]: "bg-amber-500/10 text-amber-600",
    [DeliveryStatus.IN_PROGRESS]: "bg-blue-500/10 text-blue-600",
    [DeliveryStatus.DELIVERED]: "bg-emerald-500/10 text-emerald-600",
};

export function getDeliveryStatusLabel(status: DeliveryStatus): string {
    return deliveryStatusLabel[status] || status;
}

export function getDeliveryStatusColor(status: DeliveryStatus): string {
    return deliveryStatusColor[status] || "bg-gray-500/10 text-gray-500";
}