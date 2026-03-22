import toast from "react-hot-toast";
import { ProductCategory } from "@/enums/product-category.enum";
import { validateRequiredFields } from "@/utils/product-utils";

export const useProductValidation = () => {
    const validate = (formData: any, fileObjects: File[], dynamicFields: any[]) => {
        if (!formData.name.trim()) {
            toast.error("Por favor, informe o nome do produto");
            return false;
        }

        if (!formData.category) {
            toast.error("Selecione uma categoria para o produto");
            return false;
        }

        if (!formData.price || formData.price === "0") {
            toast.error("Faltou definir o preço de venda do produto");
            return false;
        }

        if (fileObjects.length === 0) {
            toast.error("Adicione pelo menos uma foto do produto");
            return false;
        }

        const validation = validateRequiredFields(
            dynamicFields,
            formData.specifications,
        );

        if (!validation.isValid) {
            toast.error(
                `O campo "${validation.missingField}" é obrigatório para esta categoria`,
            );
            return false;
        }

        return true;
    };

    return { validate };
};