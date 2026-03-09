import { http } from "../api/http";
import { endpoints } from "../api/endpoints";
import type { ApiResponse } from "@/types/api";
import { WithdrawalRequestDTO } from "@/dtos/withdrawal";

export const withdrawalService = {
  async requestWithdrawal(data: WithdrawalRequestDTO): Promise<ApiResponse<void>> {
    return await http.post<void>(endpoints.withdrawals.request, data);
  },
};
