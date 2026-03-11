import { OrderStatus } from "@/enums/order-status";

export interface OrderItemDTO {
  name: string;
  coverImage: string;
  quantity: number;
  price: number;
}

export interface MyOrderDTO {
  orderNumber: string;
  date: string;
  status: OrderStatus;
  items: OrderItemDTO[];
  totalQuantity: number;
  totalAmount: number;
}


