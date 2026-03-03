export interface DashboardOverviewData {
  financial: {
    grossMerchandiseVolume: number;
    totalPlatformRevenue: number;
    platformWalletBalance: number;
    sellersTotalBalance: number;
  };
  orders: {
    totalOrders: number;
    awaitingPayment: number;
    paid: number;
    cancelled: number;
  };
  payments: {
    confirmed: number;
    pending: number;
    processing: number;
    failed: number;
  };
  performance: {
    revenueToday: number;
    revenueThisMonth: number;
    growthVsLastMonth: number;
    growthVsLastYear: number;
  };
  alerts: {
    inconsistentTransactions: number;
  };
  growth: {
    monthlyActiveFinancialUsers: number;
    averageTicket: number;
    revenuePerActiveSeller: number;
  };
  risk: {
    liquiditySafetyMargin: number;
    riskExposureRatio: number;
    paymentFailureRiskIndex: number;
  };
  sustainability: {
    financialSustainabilityScore: number;
    platformTakeRate: number;
    averageSellerLifetimeRevenue: number;
    averageCustomerFinancialLifetimeValue: number;
  };
}

export interface DashboardOverviewResponse {
  success: boolean;
  message: string;
  data: DashboardOverviewData;
}