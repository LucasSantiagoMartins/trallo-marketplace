import { http } from "../api/http";
import { endpoints } from "../api/endpoints";
import type { ApiResponse } from "@/types/api";

export const withdrawalService = {
  async requestWithdrawal(amount: number): Promise<ApiResponse<void>> {
    return await http.post<void>(endpoints.withdrawals.request, { amount });
  },
};
