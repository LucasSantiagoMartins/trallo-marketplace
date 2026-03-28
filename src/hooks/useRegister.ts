import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { register } from "@/services/auth.service";
import { useAuth } from "@/context/AuthContext";
import { RegisterDTO } from "@/types/user";

export type UserRole = "buyer" | "seller";

export const useRegister = () => {
    const [role, setRole] = useState<UserRole>("buyer");
    const [loading, setLoading] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        address: "",
        latitude: undefined as number | undefined,
        longitude: undefined as number | undefined,
    });

    const { setUser } = useAuth();
    const navigate = useNavigate();

    const updateField = (field: string) => (value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const validate = () => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

        if (!formData.fullName.trim()) {
            toast.error("O nome completo é obrigatório.");
            return false;
        }

        if (!formData.email.trim() || !formData.email.includes("@")) {
            toast.error("Introduza um e-mail válido.");
            return false;
        }

        if (!formData.phoneNumber.trim()) {
            toast.error("O número de telemóvel é obrigatório.");
            return false;
        }

        if (!passwordRegex.test(formData.password)) {
            toast.error("A senha não cumpre os requisitos de segurança.");
            return false;
        }

        // Regra condicional para Compradores
        if (role === "buyer" && !formData.address.trim()) {
            toast.error("O endereço é obrigatório para compradores garantirem a entrega.");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            const apiRole = role.toUpperCase() as "BUYER" | "SELLER";

            const registerData: RegisterDTO = {
                fullName: formData.fullName,
                phoneNumber: formData.phoneNumber,
                email: formData.email,
                password: formData.password,
                role: apiRole,
                address: formData.address || undefined,
                latitude: formData.latitude,
                longitude: formData.longitude,
            };

            const res = await register(registerData);

            if (res.success) {
                toast.success(res.message || "Conta criada com sucesso.");
                setUser({
                    id: res.data.id,
                    fullName: res.data.fullName,
                    role: res.data.role as any,
                    token: res.data.token,
                    secureLogin: false,
                    secureOperations: false,
                    isVerified: res.data.isVerified,
                });
                navigate("/");
            } else {
                toast.error(res.message || "Erro ao criar conta.");
            }
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Erro ao conectar ao servidor.");
        } finally {
            setLoading(false);
        }
    };

    return {
        role,
        setRole,
        loading,
        formData,
        showTooltip,
        setShowTooltip,
        updateField,
        handleSubmit,
    };
};