// @/hooks/use-products.ts
import { useDispatch, useSelector } from "react-redux";
import { searchProducts } from "@/services/product.service";
import { RootState } from "@/store/main";
import { ProductCondition } from "@/types/product";
import { useCallback } from "react";
import { setProductLoading, setProducts } from "@/store/productSlice";

export const useProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.product.items);
  const loading = useSelector((state: RootState) => state.product.loading);

  const fetchProducts = useCallback(
    async (filters?: {
      search?: string;
      minPrice?: number;
      maxPrice?: number;
      condition?: ProductCondition;
    }) => {
      try {
        dispatch(setProductLoading(true));
        const response = await searchProducts(filters);
        if (response.success && response.data) {
          dispatch(setProducts(response.data));
        }
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        dispatch(setProductLoading(false));
      }
    },
    [dispatch],
  );

  return {
    products,
    loading,
    fetchProducts,
  };
};
