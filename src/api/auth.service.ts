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
): Promise<ApiResponse<User>> {
  const res = await http.post<User, LoginPayload>(endpoints.auth.login, {
    identifier,
    password,
  });

  if (res.success && res.data) {
    localStorage.setItem("user_session", JSON.stringify(res.data));
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
): Promise<ApiResponse<User>> {
  const res = await http.post<User, RegisterPayload>(endpoints.auth.register, {
    fullName,
    phoneNumber,
    email,
    password,
    address,
    role,
  });

  if (res.success && res.data) {
    localStorage.setItem("user_session", JSON.stringify(res.data));
  }

  return res;
}

export function logout() {
  localStorage.removeItem("user_session");
  window.location.href = "/entrar";
}
