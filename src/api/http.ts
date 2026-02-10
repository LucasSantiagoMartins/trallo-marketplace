import type { ApiResponse } from "@/types/api";
import { BASE_URL } from "./endpoints";

type HttpHeaders = Record<string, string>;

interface RequestOptions {
  headers?: HttpHeaders;
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  options?: RequestOptions,
): Promise<ApiResponse<T>> {
  const url = `${BASE_URL}${path}`;
  const token = localStorage.getItem("auth_token");

  const headers: HttpHeaders = {
    "Content-Type": "application/json",
    ...options?.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method,
    headers,
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    const message =
      (errorBody as { message?: string })?.message ??
      `Erro HTTP ${response.status}`;
    throw new Error(message);
  }

  const data: ApiResponse<T> = await response.json();
  return data;
}

export const http = {
  get<T>(path: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return request<T>("GET", path, undefined, options);
  },

  post<T, B = unknown>(
    path: string,
    body: B,
    options?: RequestOptions,
  ): Promise<ApiResponse<T>> {
    return request<T>("POST", path, body, options);
  },

  patch<T, B = unknown>(
    path: string,
    body: B,
    options?: RequestOptions,
  ): Promise<ApiResponse<T>> {
    return request<T>("PATCH", path, body, options);
  },

  delete<T>(path: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return request<T>("DELETE", path, undefined, options);
  },
};
