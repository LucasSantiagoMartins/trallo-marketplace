import { OrderStatus } from "@/enums/order-status";
import { PaginationDTO } from "./pagination";
import { PaymentMethod } from "@/enums/payment";

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
  paymentMethod?: PaymentMethod
}

export interface PaginatedOrdersDTO {
  orders: OrderDTO[];
  pagination: PaginationDTO;
}


export interface OrderStockItem {
  productSku: string;
  name: string;
  quantity: number;
  coverImage: string;
}

export interface OrderStockResponseDto {
  orderNumber: string;
  status: string;
  items: OrderStockItem[];
}


export interface ProcessOrderDecisionDto {
  isAccepted: boolean,
  cancellationReason?: string,
}