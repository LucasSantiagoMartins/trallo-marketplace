import { OrderStatus } from "@/enums/order-status";

export interface OrderItemDTO {
  name: string;
  quantity: number;
  price: string;
}

export interface MyOrderDTO {
  orderNumber: string;
  date: string;
  status: OrderStatus;
  items: OrderItemDTO[];
  totalQuantity: number;
  totalAmount: string;
}