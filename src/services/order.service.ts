import { http } from "../api/http";
import { endpoints } from "../api/endpoints";
import type { ApiResponse } from "@/types/api";
import { OrderDTO, PaginatedOrdersDTO } from "@/dtos/order";

export const orderService = {
  async getBuyerOrders(): Promise<ApiResponse<OrderDTO[]>> {
    return await http.get<OrderDTO[]>(endpoints.orders.buyerOrders);
  },

  async getSellerOrders(): Promise<ApiResponse<OrderDTO[]>> {
    return await http.get<OrderDTO[]>(endpoints.orders.sellerOrders);
  },
  async getOrdersManagement(page: number, limit: number): Promise<ApiResponse<PaginatedOrdersDTO>> {
    const j= await http.get<PaginatedOrdersDTO>(endpoints.orders.adminOrders, {
      params: { page, limit }
    });
    console.log(j)
    return j
  }
};
