import type { ApiResponse, AuthUser, MfaRequiredDto } from "@/types/api";
import { http } from "../api/http";
import { endpoints } from "../api/endpoints";
import { VerificationType } from "@/enums/verification-type.enum";

interface LoginPayload {
  identifier: string;
  password: string;
}

interface RegisterPayload {
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
  address?: string;
  role: "BUYER" | "SELLER";
}

export async function login(
  identifier: string,
  password: string,
): Promise<ApiResponse<AuthUser | MfaRequiredDto>> {
  return await http.post<AuthUser | MfaRequiredDto, LoginPayload>(
    endpoints.auth.login,
    { identifier, password }
  );
}

export async function verify2faCode(
  code: string,
  mfaToken: string
): Promise<ApiResponse<AuthUser>> {
  return await http.post<AuthUser, { code: string; type: VerificationType }>(
    endpoints.auth.verify2faCode,
    {
      code,
      type: VerificationType.LOGIN
    },
    {
      headers: {
        Authorization: `Bearer ${mfaToken}`
      }
    }
  );
}

export async function register(
  fullName: string,
  phoneNumber: string,
  email: string,
  password: string,
  role: "BUYER" | "SELLER",
  address?: string,
): Promise<ApiResponse<{ token: string; role: string; fullName: string, id: number }>> {
  const res = await http.post<
    { token: string; role: string; fullName: string, id: number },
    RegisterPayload
  >(endpoints.auth.register, {
    fullName,
    phoneNumber,
    email,
    password,
    address,
    role,
  });

  if (res.success && res.data) {
    localStorage.setItem("user_session", JSON.stringify(res.data));
    localStorage.setItem("auth_token", res.data.token);
  }

  return res;
}

export function logout() {
  localStorage.removeItem("user_session");
  localStorage.removeItem("auth_token");
}
