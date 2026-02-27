import { http } from "../api/http";
import { endpoints } from "../api/endpoints";
import type { ApiResponse } from "@/types/api";
import { OrderStatus } from "@/enums/order-status";

export interface MyOrderDTO {
  orderNumber: string;
  date: string;
  status: OrderStatus;
  summary: string;
  totalAmount: string;
}

export const orderService = {
  async getBuyerOrders(): Promise<ApiResponse<MyOrderDTO[]>> {
    return await http.get<MyOrderDTO[]>(endpoints.orders.buyerOrders);
  },
};
