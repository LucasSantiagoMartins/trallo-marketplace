import { useDispatch, useSelector } from "react-redux";
import { incrementCart, setCartCount } from "@/store/cartSlice";
import {
  getMyCart,
  addToCart as addToCartService,
} from "@/services/cart.service";
import { useAppToast } from "./useAppToast";
import { RootState } from "@/store/main";

export const useCart = () => {
  const dispatch = useDispatch();
  const cartCount = useSelector((state: RootState) => state.cart.count);
  const { showToast } = useAppToast();

  const syncCartWithServer = async () => {
    try {
      const res = await getMyCart();
      if (res.success && res.data) {
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
        showToast("success", "Produto adicionado ao carrinho!");
      }
    } catch (error) {
      showToast("error", "Erro ao adicionar produto.");
    }
  };

  return {
    cartCount,
    syncCartWithServer,
    addProduct,
  };
};
