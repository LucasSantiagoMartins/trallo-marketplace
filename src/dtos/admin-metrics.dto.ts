export interface PaymentMetricsResponse {
  stats: {
    totalPayments: number;
    totalConfirmedAmount: number;
    totalPendingAmount: number;
    totalProcessingAmount: number;
    totalFailedAmount: number;
    confirmedCount: number;
    pendingCount: number;
    processingCount: number;
    failedCount: number;
    successRate: number;
  };
  performance: {
    confirmedToday: number;
    confirmedThisMonth: number;
    growthVsLastMonth: number;
    growthVsLastYear: number;
  };
  alerts: {
    highFailureRate: boolean;
    stuckProcessingPayments: number;
    inconsistentPaymentStates: number;
  };
}

export interface TransactionMetricsResponse {
  stats: {
    totalTransactions: number;
    totalCredits: number;
    totalDebits: number;
    platformCredits: number;
    platformDebits: number;
    sellersCredits: number;
    sellersDebits: number;
    totalCommissionAmount: number;
    commissionTransactionsCount: number;
    commissionToday: number;
    commissionThisMonth: number;
    averageCommissionPerOrder: number;
    commissionGrowthVsLastMonth: number;
    commissionGrowthVsLastYear: number;
  };
  distribution: {
    sellerTransactionsCount: number;
    platformTransactionsCount: number;
    refundTransactionsCount: number;
  };
  alerts: {
    negativeWallets: number;
    inconsistentBalances: number;
    largeTransactions: number;
    abnormalCommissionDrop: boolean;
    highRefundImpactOnCommission: boolean;
  };
}

export interface WalletMetricsResponse {
  stats: {
    totalWallets: number;
    totalSellerWallets: number;
    totalSellersBalance: number;
    totalSellersHoldBalance: number;
    platformBalance: number;
  };
  health: {
    negativeWalletsCount: number;
    inactiveWalletsCount: number;
    highBalanceWalletsCount: number;
  };
  flow: {
    totalPendingWithdrawal: number;
    totalWithdrawnThisMonth: number;
    withdrawalTransactionsCount: number;
    withdrawalTransactionsAmount: number;
  };
}


export interface DashboardOverviewResponse {
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

