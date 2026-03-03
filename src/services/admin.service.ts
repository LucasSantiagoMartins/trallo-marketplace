import type { ApiResponse } from "@/types/api";
import { http } from "@/api/http";
import { endpoints } from "@/api/endpoints";
import {
  DashboardOverviewResponse,
  PaymentMetricsResponse,
  TransactionMetricsResponse,
  WalletMetricsResponse,
} from "@/dtos/admin-metrics.dto";
import {
  AdminPaymentListResponse,
  AdminTransactionListResponse,
  AdminWalletListResponse,
} from "@/dtos/admin-management";

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

export async function getAdminWallets(
  page: number = 1,
  limit: number = 10,
): Promise<ApiResponse<AdminWalletListResponse>> {
  return http.get<AdminWalletListResponse>(endpoints.admin.wallets.list, {
    params: { page, limit },
  });
}

export async function getAdminTransactions(
  page: number = 1,
  limit: number = 10,
): Promise<ApiResponse<AdminTransactionListResponse>> {
  return http.get<AdminTransactionListResponse>(
    endpoints.admin.transactions.list,
    {
      params: { page, limit },
    },
  );
}

export async function getAdminPayments(
  page: number = 1,
  limit: number = 10,
): Promise<ApiResponse<AdminPaymentListResponse>> {
  return http.get<AdminPaymentListResponse>(endpoints.admin.payments.list, {
    params: { page, limit },
  });
}
