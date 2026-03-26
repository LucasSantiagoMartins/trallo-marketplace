import { http } from "../api/http";
import { endpoints } from "../api/endpoints";
import type { ApiResponse } from "@/types/api";
import {
  OrderStockResponseDto,
  PaginatedOrdersDTO,
  ProcessOrderDecisionDto
} from "@/dtos/order";
import { PaginatedDeliveriesDTO } from "@/dtos/delivery-response";
import { OrderProductsForDisputeResponseDto } from "@/dtos/order-products-for-dispute-response.dto";

export const orderService = {
  async getBuyerOrders(page: number, limit: number): Promise<ApiResponse<PaginatedOrdersDTO[]>> {
    return await http.get<PaginatedOrdersDTO[]>(endpoints.orders.buyerOrders, {
      params: { page, limit }
    });
  },

  async getBuyerOrderProducts(orderNumber: string): Promise<ApiResponse<OrderProductsForDisputeResponseDto>> {
    return await http.get<OrderProductsForDisputeResponseDto>(endpoints.orders.getBuyerOrderProducts(orderNumber));
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
};