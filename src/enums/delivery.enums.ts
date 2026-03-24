export enum DeliveryStatus {
    PENDING_DELIVERY = 'PENDING_DELIVERY', // vendedor já despachou, aguardando transportador
    IN_PROGRESS = 'IN_PROGRESS', // entregador iniciou a entrega
    DELIVERED = 'DELIVERED', // entrega concluída
}
