import { http } from "../api/http";
import { endpoints } from "../api/endpoints";
import type { ApiResponse, User, AuthUser } from "@/types/api";
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

const updateSessionCache = (updatedData: any): any => {
  const session = localStorage.getItem("user_session");
  if (session) {
    const currentSession = JSON.parse(session);

    const newSession = {
      ...currentSession,
      ...updatedData,
      fullName: updatedData.fullName || currentSession.fullName,
      email: updatedData.email || currentSession.email,
      profilePicture: updatedData.profilePicture || currentSession.profilePicture,
      address: updatedData.address || currentSession.address,
      role: updatedData.role || currentSession.role,
    };

    localStorage.setItem("user_session", JSON.stringify(newSession));
    return newSession;
  }
  return updatedData;
};

export async function updateProfilePicture(
  file: File,
  setUser: (user: any) => void
): Promise<ApiResponse<{ profilePicture?: string; fullName?: string; email?: string; role?: any }>> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await http.patch<{ profilePicture?: string; fullName?: string; email?: string; role?: any }>(
    endpoints.users.updateProfilePicture,
    formData
  );

  if (res.success && res.data) {
    const updatedFullUser = updateSessionCache(res.data);
    setUser(updatedFullUser);
  }

  return res;
}

export async function updateUser(
  data: {
    fullName?: string;
    email?: string;
    phone?: string;
    address?: string;
  },
  setUser: (user: any) => void
): Promise<ApiResponse<UserResponseDTO>> {
  const res = await http.patch<UserResponseDTO>(endpoints.users.updateUser, data);

  if (res.success && res.data) {
    const updatedFullUser = updateSessionCache(res.data);
    setUser(updatedFullUser);
  }

  return res;
}

export async function getMyInfo(): Promise<ApiResponse<User>> {
  return await http.get<User>(endpoints.users.myInfo);
}