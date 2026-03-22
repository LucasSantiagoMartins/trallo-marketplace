import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { updateProduct } from "@/services/product.service";
import { ProductDTO } from "@/types/product";

export const useProductUpdate = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleUpdate = async (
        productId: string,
        formData: any,
        fileObjects: (File | string)[],
        productFromState: ProductDTO
    ) => {
        setLoading(true);
        try {
            const form = new FormData();
            let hasChanges = false;

            if (formData.name !== productFromState.name) {
                form.append("name", formData.name);
                hasChanges = true;
            }

            if (formData.description !== (productFromState.description || "")) {
                form.append("description", formData.description);
                hasChanges = true;
            }

            const numericPrice = Number(formData.price.replace(/\D/g, ""));
            if (numericPrice !== productFromState.price) {
                form.append("price", String(numericPrice));
                hasChanges = true;
            }

            if (formData.category !== productFromState.category) {
                form.append("category", formData.category);
                hasChanges = true;
            }

            if (formData.condition !== productFromState.condition) {
                form.append("condition", formData.condition);
                hasChanges = true;
            }

            if (formData.stockQuantity !== productFromState.stock.availableQuantity) {
                form.append("stockQuantity", String(formData.stockQuantity));
                hasChanges = true;
            }

            if (JSON.stringify(formData.specifications) !== JSON.stringify(productFromState.details)) {
                form.append("productDetails", JSON.stringify(formData.specifications));
                hasChanges = true;
            }

            const newFiles = fileObjects.filter(f => f instanceof File) as File[];
            const remainingExistingUrls = fileObjects.filter(f => typeof f === "string") as string[];

            let originalImages = [...(productFromState.images || [])];
            if (productFromState.coverImage && !originalImages.includes(productFromState.coverImage)) {
                originalImages = [productFromState.coverImage, ...originalImages];
            }

            if (newFiles.length > 0) {
                newFiles.forEach(file => form.append("images", file));
                hasChanges = true;
            }

            const removedImages = originalImages.filter(img => !remainingExistingUrls.includes(img));
            if (removedImages.length > 0) {
                form.append("removedImages", JSON.stringify(removedImages));
                hasChanges = true;
            }

            if (!hasChanges) {
                toast("Nenhuma alteração detectada.", { icon: "ℹ️" });
                return false;
            }

            const res = await updateProduct(productId, form as any);
            if (res.success) {
                toast.success(res.message ?? "Produto atualizado com sucesso.");
                navigate("/meus-produtos");
                return true;
            }
        } catch (err: any) {
            toast.error(err.message ?? "Erro ao conectar ao servidor.");
        } finally {
            setLoading(false);
        }
    };

    return { handleUpdate, loading };
};