import { http } from "../api/http";
import { endpoints } from "../api/endpoints";
import type { ApiResponse, User, AuthUser } from "@/types/api";
import { UserResponseDTO, UserFiltersDto, GetUsersResponseDTO } from "@/types/user";
import { ChangePasswordDto, RegisterUserDto, ReviewUserDto, UserProfileDTO } from "@/dtos/users";
import { ResetPasswordDto } from "@/dtos/reset-password";

export async function getUsers(
  filters: UserFiltersDto & { page?: number, limit?: number },
): Promise<ApiResponse<GetUsersResponseDTO>> {
  return await http.get<GetUsersResponseDTO>(endpoints.users.list, {
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


export async function resetPassword(data: ResetPasswordDto): Promise<ApiResponse<void>> {
  return await http.patch<void>(endpoints.users.resetPassword, data);
}


export async function requestResetPassword(data: ResetPasswordDto): Promise<ApiResponse<void>> {
  return await http.post<void>(endpoints.users.requestResetPassword, data);
}


export async function deleteMyAccount(code: string): Promise<ApiResponse<void>> {
  return http.delete<void>(endpoints.users.deleteMyAccount, {
    params: { code }
  });
}

export async function getSellerProfile(slug: string): Promise<ApiResponse<UserProfileDTO>> {
  return http.get<UserProfileDTO>(endpoints.users.sellerProfile(slug)
  );
}

export async function reviewUser(data: ReviewUserDto): Promise<ApiResponse<void>> {
  return http.post<void>(endpoints.users.reviewSeller, data);
}

export async function createStaff(data: RegisterUserDto): Promise<ApiResponse<any>> {
  return await http.post<void>(endpoints.users.createStaff, data);
}

export async function suspendUser(userId: string, data: { reason: string }): Promise<ApiResponse<void>> {
  return await http.patch<void>(endpoints.users.suspend(userId), data);
}

export async function reactivateUser(userId: string): Promise<ApiResponse<void>> {
  return await http.patch<void>(endpoints.users.reactivate(userId));
}

export async function deleteUser(userId: string): Promise<ApiResponse<void>> {
  return await http.delete<void>(endpoints.users.delete(userId));
}