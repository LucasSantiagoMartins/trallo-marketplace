import { http } from "../api/http";
import { endpoints } from "../api/endpoints";
import type { ApiResponse } from "@/types/api";
import { OrderStatus } from "@/enums/order-status";
import { MyOrderDTO } from "@/dtos/order";

export const orderService = {
  async getBuyerOrders(): Promise<ApiResponse<MyOrderDTO[]>> {
    return await http.get<MyOrderDTO[]>(endpoints.orders.buyerOrders);
  },
};
