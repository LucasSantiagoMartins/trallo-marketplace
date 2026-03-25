import { useState, useEffect, useCallback } from "react";
import {
    getUsers,
    suspendUser,
    reactivateUser,
    deleteUser
} from "@/services/user.service";
import { UserResponseDTO } from "@/types/user";
import { UserRole } from "@/enums/user";
import { toast } from "react-hot-toast";

export const useUserManagement = (
    filter: string,
    searchTerm: string,
    currentPage: number,
    dateAfter: string,
    dateBefore: string
) => {
    const [users, setUsers] = useState<UserResponseDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const roleMap: Record<string, UserRole | undefined> = {
                Vendedores: UserRole.SELLER,
                Compradores: UserRole.BUYER,
                ADMIN: UserRole.ADMIN,
                Todos: undefined,
            };

            const response = await getUsers({
                role: roleMap[filter],
                query: searchTerm,
                createdAfter: dateAfter ? new Date(dateAfter) : undefined,
                createdBefore: dateBefore ? new Date(dateBefore) : undefined,
                page: currentPage,
            });

            if (response.success && response.data) {
                setUsers(response.data.users);
                setTotalPages(response.data.pagination.totalPages);
            }
        } catch (err: any) {
            toast.error(err.message ?? "Erro ao carregar a lista de usuários");
        } finally {
            setLoading(false);
        }
    }, [filter, searchTerm, currentPage, dateAfter, dateBefore]);

    const updateLocalUser = (userId: string | number, updatedData: Partial<UserResponseDTO>) => {
        setUsers((prev) =>
            prev.map((user) =>
                String(user.id) === String(userId) ? { ...user, ...updatedData } : user
            )
        );
    };

    const removeUserFromState = (userId: string | number) => {
        setUsers((prev) => prev.filter((user) => String(user.id) !== String(userId)));
    };

    const handleSuspend = async (userId: number | string, reason: string) => {
        const response = await suspendUser(String(userId), { reason });
        if (response.success) {
            toast.success(response.message ?? "Usuário suspenso com sucesso");
            updateLocalUser(userId, { isSuspended:true });
        } else {
            toast.error(response.message ?? "Não foi possível suspender o usuário");
        }
        return response;
    };

    const handleReactivate = async (userId: number | string) => {
        const response = await reactivateUser(String(userId));
        if (response.success) {
            toast.success(response.message ?? "Conta reativada com sucesso");
            updateLocalUser(userId, { isSuspended: false });
        } else {
            toast.error(response.message ?? "Erro ao reativar a conta");
        }
        return response;
    };

    const handleDelete = async (userId: number | string) => {
        const response = await deleteUser(String(userId));
        if (response.success) {
            toast.success(response.message ?? "Usuário excluído permanentemente");
            removeUserFromState(userId);
        } else {
            toast.error(response.message ?? "Erro ao tentar excluir o usuário");
        }
        return response;
    };

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchUsers();
        }, 400);
        return () => clearTimeout(delayDebounce);
    }, [fetchUsers]);

    return {
        users,
        loading,
        totalPages,
        fetchUsers,
        handleSuspend,
        handleReactivate,
        handleDelete
    };
};