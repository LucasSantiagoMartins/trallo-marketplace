import { http } from "../api/http";
import { endpoints } from "../api/endpoints";
import type { ApiResponse } from "@/types/api";

export enum OrderStatus {
    AWAITING_PAYMENT = 'AWAITING_PAYMENT',
    PAID = 'PAID',
    PROCESSING = 'PROCESSING',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED',
}

export enum PaymentMode {
    ONLINE_PAYMENT = 'ONLINE_PAYMENT',
    ONSITE_PAYMENT = 'ONSITE_PAYMENT',
}

export enum PaymentMethod {
    MULTICAIXA_EXPRESS = 'MULTICAIXA_EXPRESS',
    REFERENCE = 'REFERENCE',
    ONSITE_CARD = 'ONSITE_CARD',
}

export interface CheckoutPayload {
    paymentMode: PaymentMode;
    paymentMethod: PaymentMethod;
}

export interface OrderDTO {
    orderNumber: string;
    date: string;
    status: OrderStatus;
    summary: string;
    totalAmount: string;
}

export async function getBuyerOrders(): Promise<ApiResponse<OrderDTO[]>> {
    return await http.get<OrderDTO[]>(endpoints.orders.buyerOrders);
}

export async function checkoutFromCart(
    payload: CheckoutPayload,
): Promise<ApiResponse<OrderDTO>> {
    return await http.post<OrderDTO, CheckoutPayload>(
        endpoints.checkouts.fromCart,
        payload,
    );
}

export async function checkoutFromProduct(
    productId: string,
    payload: CheckoutPayload,
): Promise<ApiResponse<OrderDTO>> {
    return await http.post<OrderDTO, CheckoutPayload>(
        endpoints.checkouts.fromProduct(productId),
        payload,
    );
}

export function getAvailablePaymentMethods(): PaymentMethod[] {
    return [
        PaymentMethod.MULTICAIXA_EXPRESS,
        PaymentMethod.REFERENCE
    ];
}