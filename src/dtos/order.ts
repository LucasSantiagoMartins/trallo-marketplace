import { OrderStatus } from "@/enums/order-status";
import { PaginationDTO } from "./pagination";

export interface OrderItemDTO {
  name: string;
  coverImage: string;
  quantity: number;
  price: number;
  productSku: string;
}

export interface OrderDTO {
  orderNumber: string;
  date: string;
  status: OrderStatus;
  items: OrderItemDTO[];
  totalQuantity: number;
  totalAmount: number;
}

export interface PaginatedOrdersDTO {
  data: OrderDTO[]; 
  pagination: PaginationDTO;
}



