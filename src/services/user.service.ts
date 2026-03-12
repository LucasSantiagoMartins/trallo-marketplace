import { http } from "../api/http";
import { endpoints } from "../api/endpoints";
import type { ApiResponse, User, AuthUser } from "@/types/api";
import { UserResponseDTO, UserFiltersDto } from "@/types/user";
import { ChangePasswordDto } from "@/dtos/users";

export async function getUsers(
  filters: UserFiltersDto & { page?: number },
): Promise<ApiResponse<UserResponseDTO[]>> {
  return await http.get<UserResponseDTO[]>(endpoints.users.list, {
    params: {
      ...filters,
    },
  });
}
const updateSessionCache = (updatedData: AuthUser | User): any => {
  const session = localStorage.getItem("user_session");
  if (session) {
    const currentSession = JSON.parse(session);

    const newSession = {
      ...currentSession,
      ...updatedData,
    };

    localStorage.setItem("user_session", JSON.stringify(newSession));
    return newSession;
  }
  return updatedData;
};

export async function updateProfilePicture(
  file: File,
  setUser: (user: any) => void
): Promise<ApiResponse<User | AuthUser>> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await http.patch<User | AuthUser>(
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
): Promise<ApiResponse<User | AuthUser>> {
  const res = await http.patch<User | AuthUser>(
    endpoints.users.updateUser,
    data
  );

  if (res.success && res.data) {
    const updatedFullUser = updateSessionCache(res.data);

    if ('token' in res.data && res.data.token) {
      localStorage.setItem("token", res.data.token);
    }

    setUser(updatedFullUser);
  }

  return res;
}

export async function getMyInfo(): Promise<ApiResponse<User>> {
  return await http.get<User>(endpoints.users.myInfo);
}


export async function changePassword(data: ChangePasswordDto): Promise<ApiResponse<void>> {
  return await http.patch<void>(endpoints.users.changePassword, data);
}
