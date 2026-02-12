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

  const isFormData = body instanceof FormData;

  const headers: HttpHeaders = {
    ...options?.headers,
  };

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method,
    headers,
    body: isFormData
      ? (body as FormData)
      : body !== undefined
        ? JSON.stringify(body)
        : undefined,
  };
  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null);

      const errorMessage =
        errorBody?.message ||
        errorBody?.error ||
        "Não foi possível processar sua solicitação no momento.";

      if (response.status === 401) {
        throw new Error("Sua sessão expirou. Por favor, faça login novamente.");
      }

      if (response.status === 403) {
        throw new Error("Você não tem permissão para realizar esta ação.");
      }

      if (response.status >= 500) {
        throw new Error(
          "O sistema está temporariamente indisponível. Tente novamente mais tarde.",
        );
      }

      throw new Error(errorMessage);
    }

    const data: ApiResponse<T> = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message.includes("fetch") ||
        error.message.includes("NetworkError")
      ) {
        throw new Error(
          "Parece que você está sem internet ou o servidor está offline.",
        );
      }
      throw error;
    }

    throw new Error("Ocorreu um erro inesperado. Verifique sua conexão.");
  }
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
