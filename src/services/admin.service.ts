import type { ApiResponse } from "@/types/api";
import { http } from "@/api/http";
import { endpoints } from "@/api/endpoints";
import {
  DashboardOverviewResponse,
  PaymentMetricsResponse,
  TransactionMetricsResponse,
  WalletMetricsResponse,
} from "@/dtos/admin-metrics.dto";

export async function getDashboardOverview(): Promise<
  ApiResponse<DashboardOverviewResponse>
> {
  return http.get<DashboardOverviewResponse>(endpoints.admin.dashboardOverview);
}

export async function getPaymentMetrics(): Promise<
  ApiResponse<PaymentMetricsResponse>
> {
  return http.get<PaymentMetricsResponse>(endpoints.admin.dashboards.payments);
}

export async function getTransactionMetrics(): Promise<
  ApiResponse<TransactionMetricsResponse>
> {
  return http.get<TransactionMetricsResponse>(
    endpoints.admin.dashboards.transactions,
  );
}

export async function getWalletMetrics(): Promise<
  ApiResponse<WalletMetricsResponse>
> {
  return http.get<WalletMetricsResponse>(endpoints.admin.dashboards.wallets);
}
