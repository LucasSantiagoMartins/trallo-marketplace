import type { ApiResponse, User } from "@/types/api";
import { http } from "./http";
import { endpoints } from "./endpoints";

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
): Promise<ApiResponse<{ token: string; role: string }>> {
  const res = await http.post<{ token: string; role: string }, LoginPayload>(
    endpoints.auth.login,
    {
      identifier,
      password,
    },
  );


  if (res.success && res.data) {
    const sessionData = {
      role: res.data.role,
      token: res.data.token,
    };

    localStorage.setItem("user_session", JSON.stringify(sessionData));
    localStorage.setItem("auth_token", res.data.token);

  }

  return res;
}

export async function register(
  fullName: string,
  phoneNumber: string,
  email: string,
  password: string,
  role: "BUYER" | "SELLER",
  address?: string,
): Promise<ApiResponse<User & { token: string }>> {
  const res = await http.post<User & { token: string }, RegisterPayload>(
    endpoints.auth.register,
    {
      fullName,
      phoneNumber,
      email,
      password,
      address,
      role,
    },
  );
  if (res.success && res.data) {
    localStorage.setItem("user_session", JSON.stringify(res.data));
    localStorage.setItem("auth_token", res.data.token);
  }

  return res;
}

export function logout() {
  localStorage.removeItem("user_session");
  localStorage.removeItem("auth_token");
  window.location.href = "/entrar";
}
