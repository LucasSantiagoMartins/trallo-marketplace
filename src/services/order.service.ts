import { http } from "../api/http";
import { endpoints } from "../api/endpoints";
import type { ApiResponse } from "@/types/api";
import {
  OrderStockResponseDto,
  PaginatedOrdersDTO,
  ProcessOrderDecisionDto
} from "@/dtos/order";
import { PaginatedDeliveriesDTO } from "@/dtos/delivery-response";

export const orderService = {
  async getBuyerOrders(page: number, limit: number): Promise<ApiResponse<PaginatedOrdersDTO[]>> {
    return await http.get<PaginatedOrdersDTO[]>(endpoints.orders.buyerOrders, {
      params: { page, limit }
    });
  },

  async getSellerOrders(page: number, limit: number): Promise<ApiResponse<PaginatedOrdersDTO[]>> {
    return await http.get<PaginatedOrdersDTO[]>(endpoints.orders.sellerOrders, {
      params: { page, limit }
    });
  },

  async getOrdersManagement(page: number, limit: number): Promise<ApiResponse<PaginatedOrdersDTO>> {
    return await http.get<PaginatedOrdersDTO>(endpoints.orders.adminOrders, {
      params: { page, limit }
    });
  },

  async getOrderByNumber(orderNumber: string): Promise<ApiResponse<OrderStockResponseDto>> {
    return await http.get<OrderStockResponseDto>(endpoints.orders.getByOrderNumber(orderNumber));
  },

  async processOrderDecision(
    orderNumber: string,
    decision: ProcessOrderDecisionDto
  ): Promise<ApiResponse<void>> {
    return await http.patch<void>(
      endpoints.orders.processDecision(orderNumber),
      decision
    );
  },

  async getDeliveryOrders(page: number, limit: number): Promise<ApiResponse<PaginatedDeliveriesDTO>> {
    return await http.get<PaginatedDeliveriesDTO>(endpoints.deliverers.deliveries, {
      params: { page, limit }
    });
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