import type { ApiResponse } from "@/types/api";
import { http } from "../api/http";
import { endpoints } from "../api/endpoints";
import { SalesSummary } from "@/dtos/sales-summary.dto";

export async function getSalesSummary(): Promise<ApiResponse<SalesSummary>> {
    return http.get<SalesSummary>(endpoints.salesCenter.summary);
}