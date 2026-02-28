import { http } from "../api/http";
import { endpoints } from "../api/endpoints";
import type { ApiResponse } from "@/types/api";
import { WalletSummaryDTO } from "@/dtos/wallet";

export const walletService = {
  async getWalletSummary(): Promise<ApiResponse<WalletSummaryDTO>> {
    return await http.get<WalletSummaryDTO>(endpoints.wallets.summary);
  },
};
