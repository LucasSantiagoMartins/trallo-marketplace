import { http } from "../api/http";
import { endpoints } from "../api/endpoints";
import type { ApiResponse } from "@/types/api";
import { ProductDTO } from "@/types/product";

export async function createProduct(
  productData: FormData,
): Promise<ApiResponse<any>> {
  const res = await http.post<any, FormData>(
    endpoints.products.create,
    productData,
  );

  return res;
}

export async function getMyProducts(): Promise<ApiResponse<ProductDTO[]>> {
  const res = await http.get<ProductDTO[]>(endpoints.products.myProducts);
  return res;
}

export async function submitProductForValidation(
  productId: string,
  notes: string,
  videoFile: File,
): Promise<ApiResponse<any>> {
  const formData = new FormData();
  formData.append("notes", notes);
  formData.append("video", videoFile);

  const res = await http.post<any, FormData>(
    endpoints.products.submitValidation(productId),
    formData,
  );

  return res;
}
