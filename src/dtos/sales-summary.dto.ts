import { OrderItemDTO } from "./order";

export interface SalesPerformance {
    day?: string;
    week?: string;
    value: number;
}


export interface SalesMetrics {
    monthOverMonth: {
        percentage: number;
        value: number;
        isGrowth: boolean;
    };
}



export interface SalesPayment {
    amount: number;
    status: string;
    netAmount: number;
    platformFee: number;
    confirmedAt: string | null;
}

export interface RecentOrder {
    orderNumber: string;
    createdAt: string;
    status: string;
    buyerName: string;
    totalQuantity: number;
    totalAmount: number;
    payments: SalesPayment[];
    items: OrderItemDTO[];
}

export interface SalesSummary {
    total: {
        count: number;
        totalValue: number;
    };
    performance: {
        weekly: SalesPerformance[];
        monthly: SalesPerformance[];
    };
    metrics: SalesMetrics;
    recentOrders: RecentOrder[];
}