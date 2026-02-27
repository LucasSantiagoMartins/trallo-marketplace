import { http } from "../api/http";
import { endpoints } from "../api/endpoints";
import type { ApiResponse } from "@/types/api";
import { OrderStatus } from "@/enums/order-status";
import { PaymentMethod, PaymentMode } from "@/enums/payment";

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