import type { ApiResponse } from "@/types/api";
import { http } from "../api/http";
import { endpoints } from "../api/endpoints";
import { UpdateSecuritySettingsDTO, UserSecuritySettings } from "@/dtos/user-security-settings.dto";


export async function getUserSecuritySettings(): Promise<ApiResponse<UserSecuritySettings>> {
    return http.get<UserSecuritySettings>(endpoints.userSecuritySettings.get);
}


export async function updateUserSecuritySettings(
    data: UpdateSecuritySettingsDTO
): Promise<ApiResponse<UserSecuritySettings>> {
    console.log(data);
    return http.patch<UserSecuritySettings>(
        endpoints.userSecuritySettings.update,
        data
    )
}