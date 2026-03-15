import type { ApiResponse } from "@/types/api";
import { http } from "../api/http";
import { endpoints } from "../api/endpoints";
import { ApiCartItemDto } from "@/dtos/cart";


export interface ApiCart {
  id: string;
  items: ApiCartItemDto[];
  totalAmount: number;
}

export async function getMyCart(): Promise<ApiResponse<ApiCart>> {
  return http.get<ApiCart>(endpoints.carts.getMyCart);
}

export async function addToCart(
  productId: string,
): Promise<ApiResponse<ApiCart>> {
  return http.post<ApiCart>(endpoints.carts.addToCart(productId), {});
}

export async function updateCartItemQuantity(
  productId: string,
  quantity: number,
): Promise<ApiResponse<ApiCart>> {
  return http.patch<ApiCart>(endpoints.carts.updateQuantity(productId), {
    quantity,
  });
}

export async function removeFromCart(
  productId: string,
): Promise<ApiResponse<ApiCart>> {
  return http.delete<ApiCart>(endpoints.carts.removeItem(productId));
}

export async function clearCart(): Promise<ApiResponse<void>> {
  return http.delete<void>(endpoints.carts.clear);
}
