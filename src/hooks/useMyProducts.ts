import { useState, useEffect, useCallback } from "react";
import { ProductDTO, ProductStatus } from "@/types/product";
import { getMyProducts } from "@/services/product.service";
import { dispatchService } from "@/services/dispatch.service";
import toast from "react-hot-toast";

export const useMyProducts = () => {
    const [products, setProducts] = useState<ProductDTO[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<ProductDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeFilters, setActiveFilters] = useState({
        category: "Todas",
        status: "Todos",
        sortBy: "Preço",
    });

    const fetchProducts = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await getMyProducts();
            if (response.data) {
                setProducts(response.data);
            }
        } catch (err) {
            toast.error(err.message || "Ocorreu um erro ao carregar os produtos");
        } finally {
            setIsLoading(false);
        }
    }, []);

    const activateDispatch = async (data: {
        productId: string;
        minPrice: number;
        durationInMinutes: number;
    }) => {
        try {
            const response = await dispatchService.activate(data);
            if (response.success) {

                toast.success(response.message || "Despacho ativado com sucesso");
                await fetchProducts();
            } else {
                toast.error(response.message || "Não foi possível colocar o produto em despacho");
            }
        } catch (err) {
            ;
            toast.error(err.message ?? "Erro ao ativar o despacho");
            throw err;
        }
    };

    const deleteProduct = (productId: string) => {
        setProducts((prev) => prev.filter((p) => p.id !== productId));
    };

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    useEffect(() => {
        let result = [...products];
        if (activeFilters.status !== "Todos") {
            result = result.filter((p) => p.status === activeFilters.status);
        }
        if (activeFilters.category !== "Todas") {
            result = result.filter((p) => p.category === activeFilters.category);
        }
        if (activeFilters.sortBy === "Preço") {
            result.sort((a, b) => Number(a.price) - Number(b.price));
        } else if (activeFilters.sortBy === "Novos") {
            result.sort(
                (a, b) =>
                    new Date(b.createdAt || 0).getTime() -
                    new Date(a.createdAt || 0).getTime(),
            );
        }
        setFilteredProducts(result);
    }, [products, activeFilters]);

    const stats = {
        active: products.filter((p) => p.status === ProductStatus.ONLINE_VERIFIED).length,
        pending: products.filter((p) => p.status === ProductStatus.AWAITING_SUBMISSION).length,
        verifying: products.filter(
            (p) => p.status === ProductStatus.SUBMITTED || p.status === ProductStatus.TRALLO_VERIFIED
        ).length,
    };

    return {
        products,
        filteredProducts,
        isLoading,
        activeFilters,
        setActiveFilters,
        stats,
        deleteProduct,
        activateDispatch,
        refresh: fetchProducts,
    };
};