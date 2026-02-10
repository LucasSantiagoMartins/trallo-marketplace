import { http } from "./http";
import { endpoints } from "./endpoints";
import type { ApiResponse } from "@/types/api";
import { getUniqPayload } from "recharts/types/util/payload/getUniqPayload";

interface CreateProductPayload {
  name: string;
  description: string;
  price: number;
  condition: string;
  images: string[];
  stockQuantity: number;
  category?: string; /* Opcional por agora */
}

export async function createProduct(
  productData: CreateProductPayload
): Promise<ApiResponse<any>> {
  console.log(productData)
  const res = await http.post<any, CreateProductPayload>(
    endpoints.products.create, 
    productData
  );

  return res;
}