import { http } from "../api/http";
import { endpoints } from "../api/endpoints";
import type { ApiResponse } from "@/types/api";
import {
    VerifyIdentityDTO,
    IdentityVerificationResponseDTO
} from "@/dtos/identity-verification";
import { verify } from "crypto";

export const identityVerificationService = {
    async submit(data: FormData): Promise<ApiResponse<void>> {
        return await http.post<void>(
            endpoints.identityVerifications.base,
            data,
        );
    },

    async list(page: number, limit: number): Promise<ApiResponse<IdentityVerificationResponseDTO[]>> {
        return await http.get<IdentityVerificationResponseDTO[]>(
            endpoints.identityVerifications.base, {
            params: {
                page,
                limit
            }
        }
        );
    },

    async review(id: number, data: VerifyIdentityDTO): Promise<ApiResponse<IdentityVerificationResponseDTO>> {
        return await http.patch<IdentityVerificationResponseDTO>(
            endpoints.identityVerifications.review(id.toString()),
            data
        );
    }
};