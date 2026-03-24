export interface DeliveryResponseDto {
    id: string;
    status: string;
    trackingCode: string;
    shippedAt: Date;
    deliveredAt: Date;
    order: {
        orderNumber: string;
        totalAmount: number;
        status: string;
        buyerName: string;
        address: string;
    };
    deliverer?: {
        id: number;
        name: string;
        phone: string;
    };
}

export interface PaginatedDeliveriesDTO {
    deliveries: DeliveryResponseDto[];
    pagination: {
        totalItems: number;
        itemCount: number;
        itemsPerPage: number;
        totalPages: number;
        currentPage: number;
    };
}