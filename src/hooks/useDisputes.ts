import { useState, useCallback, useEffect } from "react";
import { disputeService } from "@/services/dispute.service";
import { DisputeDto, RespondDisputeDto } from "@/dtos/disputes";

export const useDisputes = (currentPage: number, itemsPerPage: number) => {
    const [disputes, setDisputes] = useState<DisputeDto[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const fetchDisputes = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await disputeService.getDisputes(currentPage, itemsPerPage);
            // Verifica se response e response.data existem antes de acessar
            if (response?.success && response.data) {
                setDisputes(response.data.disputes || []);
                setTotalPages(response.data.pagination?.totalPages || 1);
            } else {
                setDisputes([]);
                setTotalPages(1);
            }
        } catch (error) {
            console.error("Erro ao carregar disputas:", error);
            setDisputes([]);
            setTotalPages(1);
        } finally {
            setIsLoading(false);
        }
    }, [currentPage, itemsPerPage]);

    const handleRespond = async (id: string, data: RespondDisputeDto) => {
        try {
            const response = await disputeService.respondDispute(id, data);
            if (response?.success) {
                await fetchDisputes();
                return true;
            }
        } catch (error) {
            console.error("Erro ao responder disputa:", error);
        }
        return false;
    };

    useEffect(() => {
        fetchDisputes();
    }, [fetchDisputes]);

    return { disputes, totalPages, isLoading, handleRespond, refresh: fetchDisputes };
};