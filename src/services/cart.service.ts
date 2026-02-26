import type { ApiResponse } from "@/types/api";
import { http } from "../api/http";
import { endpoints } from "../api/endpoints";

export interface ApiCartItem {
    id: string;
    quantity: number;
    priceSnapshot: number;
    product: {
        id: string;
        name: string;
        description: string;
        coverImage: string | null;
    };
}

export interface ApiCart {
    id: string;
    items: ApiCartItem[];
    totalAmount: number;
}


export async function getMyCart(): Promise<ApiResponse<ApiCart>> {
    return http.get<ApiCart>(endpoints.carts.getMyCart);
}


export async function addToCart(
    productId: string,
): Promise<ApiResponse<ApiCart>> {
    return http.post<ApiCart>(
        endpoints.carts.addToCart(productId),
        {}, 
    );
}