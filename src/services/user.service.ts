import { http } from "../api/http";
import { endpoints } from "../api/endpoints";
import type { ApiResponse } from "@/types/api";
import { UserResponseDTO, UserFiltersDto } from "@/types/user";

export async function getUsers(
  filters: UserFiltersDto & { page?: number },
): Promise<ApiResponse<UserResponseDTO[]>> {
  return await http.get<UserResponseDTO[]>(endpoints.users.list, {
    params: {
      ...filters,
    },
  });
}
