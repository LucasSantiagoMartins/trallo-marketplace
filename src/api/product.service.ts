import { http } from "./http";
import { endpoints } from "./endpoints";
import type { ApiResponse } from "@/types/api";

export async function createProduct(
  productData: FormData,
): Promise<ApiResponse<any>> {
  const res = await http.post<any, FormData>(
    endpoints.products.create,
    productData,
  );

  return res;
}
