import type { ApiResponse } from "@/types/api";
import { http } from "@/api/http";
import { endpoints } from "@/api/endpoints";
import { DashboardOverviewResponse } from "@/dtos/dashboard-overview-data.dto";
 
export async function getDashboardOverview(): Promise<ApiResponse<DashboardOverviewResponse>> {
  return http.get<DashboardOverviewResponse>(endpoints.admin.dashboardOverview);
}

 