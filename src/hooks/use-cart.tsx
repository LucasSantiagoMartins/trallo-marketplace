  import { useDispatch, useSelector } from "react-redux";
  import { incrementCart, setCartCount } from "@/store/cartSlice";
  import {
    getMyCart,
    addToCart as addToCartService,
  } from "@/services/cart.service";
  import toast from "react-hot-toast"; 
  import { RootState } from "@/store/main";

  export const useCart = () => {
    const dispatch = useDispatch();
    const cartCount = useSelector((state: RootState) => state.cart.count);

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
          toast.success("Produto adicionado ao carrinho.");
        }
      } catch (error) {
        toast.error("Erro ao adicionar produto.");
      }
    };

    return {
      cartCount,
      syncCartWithServer,
      addProduct,
    };
  };
