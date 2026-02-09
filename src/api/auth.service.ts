import type { ApiResponse, User } from "@/types/api";
import { http } from "./http";
import { endpoints } from "./endpoints";

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export function login(email: string, password: string): Promise<ApiResponse<User>> {
  return http.post<User, LoginPayload>(endpoints.auth.login, { email, password });
}

export function register(name: string, email: string, password: string): Promise<ApiResponse<User>> {
  return http.post<User, RegisterPayload>(endpoints.auth.register, { name, email, password });
}
