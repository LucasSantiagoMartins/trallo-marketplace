import { useState, useCallback } from "react";
import { identityVerificationService } from "@/services/identity-verification.service";
import { toast } from "react-hot-toast";
import { IdentityVerificationStatus } from "@/enums/identity-verification.enums";
import { useNavigate } from "react-router-dom";

export const useIdentityVerification = (page = 1, limit = 10) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any>(null);
    const navigate = useNavigate();

    const fetchVerifications = useCallback(async () => {
        setLoading(true);
        try {
            const response = await identityVerificationService.list(page, limit);
            setData(response.data);
        } catch (error: any) {
            toast.error("Erro ao carregar verificações");
        } finally {
            setLoading(false);
        }
    }, [page, limit]);

    const submitVerification = async (images: { front: string | null; back: string | null; selfie: string | null; }) => {
        if (!images.front || !images.back || !images.selfie) {
            toast.error("Por favor, capture todas as fotos antes de enviar");
            return;
        }
        setLoading(true);
        try {
            const formData = new FormData();
            const appendFile = async (base64: string, name: string) => {
                const res = await fetch(base64);
                const blob = await res.blob();
                formData.append("identity-docs", blob, `${name}.jpg`);
            };
            await appendFile(images.front, "front");
            await appendFile(images.back, "back");
            await appendFile(images.selfie, "selfie");

            const res = await identityVerificationService.submit(formData);
            if (res.success) {
                toast.success("Documentos enviados com sucesso");
                navigate("/perfil");
            }
            else {
                toast.error(res.message || "Erro ao enviar os documentos");
            }
        } catch (err: any) {
            toast.error(err.message || "Erro ao enviar os documentos");
        } finally {
            setLoading(false);
        }
    };

    const reviewVerification = async (id: number, status: "APPROVED" | "REJECTED", reason?: string) => {
        setLoading(true);
        try {
            await identityVerificationService.review(id, { status, reason });
            toast.success("Verificação atualizada");
            await fetchVerifications();
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Erro ao processar");
        } finally {
            setLoading(false);
        }
    };

    return {
        submitVerification,
        reviewVerification,
        fetchVerifications,
        loading,
        verifications: data?.submissions || [],
        totalPages: data?.pagination?.totalPages || 0
    };
};