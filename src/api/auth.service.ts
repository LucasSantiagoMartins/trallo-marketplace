import type { ApiResponse, User } from "@/types/api";
import { http } from "./http";
import { endpoints } from "./endpoints";

interface LoginPayload {
  identifier: string;
  password: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export function login(identifier: string, password: string): Promise<ApiResponse<User>> {
  return http.post<User, LoginPayload>(endpoints.auth.login, { identifier, password });
}

export function register(name: string, email: string, password: string): Promise<ApiResponse<User>> {
  return http.post<User, RegisterPayload>(endpoints.auth.register, { name, email, password });
}
