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

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null);
      
      console.log("Erro na requisição:", {
        status: response.status,
        path,
        error: errorBody
      });

      if (response.status === 401) {
        throw new Error("Sua sessão expirou. Por favor, faça login novamente.");
      }

      if (response.status === 403) {
        throw new Error("Você não tem permissão para realizar esta ação.");
      }

      if (response.status >= 500) {
        throw new Error("O sistema está temporariamente indisponível. Tente novamente mais tarde.");
      }

      throw new Error("Não foi possível processar sua solicitação no momento.");
    }

    const data: ApiResponse<T> = await response.json();
    return data;

  } catch (error) {
    if (error instanceof Error && !error.message.includes("HTTP")) {
      console.log("Erro técnico detalhado:", error.message);
      
      if (error.message.includes("fetch") || error.message.includes("NetworkError")) {
        throw new Error("Parece que você está sem internet ou o servidor está offline.");
      }
      
      throw error;
    }

    console.log("Erro desconhecido:", error);
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