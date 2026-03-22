import { useDispatch, useSelector } from "react-redux";
import {
  incrementCart,
  setCartCount,
  setCartItems,
  setCartLoading,
} from "@/store/cartSlice";
import {
  getMyCart,
  addToCart as addToCartService,
} from "@/services/cart.service";
import toast from "react-hot-toast";
import { RootState } from "@/store/main";
import { useCallback } from "react";

export const useCart = () => {
  const dispatch = useDispatch();
  const cartCount = useSelector((state: RootState) => state.cart.count);
  const items = useSelector((state: RootState) => state.cart.items);
  const loading = useSelector((state: RootState) => state.cart.loading);

  const fetchCart = useCallback(
    async (forceRefresh = false) => {
      if (items.length > 0 && !forceRefresh) return;
      try {
        dispatch(setCartLoading(true));
        const res = await getMyCart();
        if (res.success && res.data) {
          dispatch(setCartItems(res.data.items));
          dispatch(setCartCount(res.data.items.length));
        }
      } catch (error) {
        console.error("Erro ao carregar carrinho");
      } finally {
        dispatch(setCartLoading(false));
      }
    },
    [dispatch, items.length],
  );

  const syncCartWithServer = async () => {
    try {
      const res = await getMyCart();
      if (res.success && res.data) {
        dispatch(setCartItems(res.data.items));
        dispatch(setCartCount(res.data.items.length));
      }
    } catch (error) {
      console.error("Erro ao sincronizar carrinho");
    }
  };

  const addProduct = async (productId: string) => {
    try {
      const res = await addToCartService(productId);
      if (res.success) {
        dispatch(incrementCart());
        toast.success("Produto adicionado ao carrinho.");
        syncCartWithServer(); 
        // Atualiza a lista global após adicionar
      }
    } catch (error) {
      toast.error("Erro ao adicionar produto.");
    }
  };

  return {
    cartCount,
    items,
    loading,
    fetchCart,
    syncCartWithServer,
    addProduct,
  };
};
