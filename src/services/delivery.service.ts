import { http } from "../api/http";
import { endpoints } from "../api/endpoints";
import type { ApiResponse } from "@/types/api";
import { PaginatedDeliveriesDTO } from "@/dtos/delivery-response";

export const deliveryService = {

    async getDeliveryOrders(page: number, limit: number): Promise<ApiResponse<PaginatedDeliveriesDTO>> {
        return await http.get<PaginatedDeliveriesDTO>(endpoints.deliverers.deliveries, {
            params: { page, limit }
        });
    },

    async getMyShippingFee(): Promise<ApiResponse<{ shippingFee: number }>> {
        return  await http.get<{ shippingFee: number }>(endpoints.deliverers.getMyShippingFee,);
    },

    async getAdminDeliveries(page: number, limit: number): Promise<ApiResponse<PaginatedDeliveriesDTO>> {
        return await http.get<PaginatedDeliveriesDTO>("/deliveries", {
            params: { page, limit }
        });
    },

    async confirmDelivery(orderNumber: string): Promise<ApiResponse<void>> {
        return await http.post<void>(
            endpoints.deliverers.confirmDelivery(orderNumber),
            {}
        );
    }
};