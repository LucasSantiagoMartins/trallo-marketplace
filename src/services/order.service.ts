import { http } from "../api/http";
import { endpoints } from "../api/endpoints";
import type { ApiResponse } from "@/types/api";
import { OrderDTO, PaginatedOrdersDTO } from "@/dtos/order";

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
  }
};
