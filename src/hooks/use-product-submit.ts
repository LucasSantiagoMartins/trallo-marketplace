import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createProduct } from "@/services/product.service";

export const useProductSubmit = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const submitProduct = async (formData: any, fileObjects: File[]) => {
        setLoading(true);
        try {
            const data = new FormData();
            data.append("name", formData.name);
            data.append("description", formData.description);
            data.append("price", formData.price.replace(/\D/g, ""));
            data.append("condition", formData.condition);
            data.append("category", formData.category);
            data.append("stockQuantity", String(formData.stockQuantity));
            data.append("productDetails", JSON.stringify(formData.specifications));

            fileObjects.forEach((file) => {
                data.append("images", file);
            });

            const res = await createProduct(data);

            if (res.success) {
                toast.success(res.message ?? "Produto criado com sucesso!");
                navigate("/meus-produtos");
                return true;
            }
            return false;
        } catch (err: any) {
            toast.error(err.message ?? "Erro ao conectar ao servidor");
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { submitProduct, loading };
};