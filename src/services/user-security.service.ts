import type { ApiResponse, AuthUser } from "@/types/api";
import { http } from "../api/http";
import { endpoints } from "../api/endpoints";
import { UpdateSecuritySettingsDTO, UserSecuritySettings } from "@/dtos/user-security-settings.dto";
import { VerificationType } from "@/enums/verification-type.enum";

export async function getUserSecuritySettings(): Promise<ApiResponse<UserSecuritySettings>> {
  return http.get<UserSecuritySettings>(endpoints.userSecuritySettings.get);
}

export async function updateUserSecuritySettings(
  data: UpdateSecuritySettingsDTO
): Promise<ApiResponse<UserSecuritySettings>> {
  return http.patch<UserSecuritySettings>(
    endpoints.userSecuritySettings.update,
    data
  )
}

