import { useDispatch, useSelector } from "react-redux";
import { orderService } from "@/services/order.service";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  setOrderNumber,
  setSearchResults,
  addStockItem,
  removeStockItem,
  clearAllocation,
  setDelivererId,
  confirmProductExit,
  removeProductExit, // Adicione esta action no seu orderSlice
  clearExitData,
} from "@/store/orderSlice";
import { RootState } from "@/store/main";
import { StockEntryItem } from "@/types/warehouse-inventory";
import { OrderStockItem } from "@/dtos/order";

export const useOrderSearch = () => {
  const dispatch = useDispatch();
  const [isSearching, setIsSearching] = useState(false);

  const {
    orderNumber,
    searchResults,
    lastSearchedOrder,
    addedItems,
    confirmedProducts,
    delivererId,
  } = useSelector((state: RootState) => state.orderSearch);

  const handleSearch = async () => {
    if (!orderNumber) {
      toast.error("Por favor, digite o número do pedido");
      return;
    }

    if (orderNumber === lastSearchedOrder && searchResults?.length > 0) return;

    setIsSearching(true);
    try {
      const response = await orderService.getOrderByNumber(orderNumber);
      if (response.success && response.data) {
        dispatch(setSearchResults(response.data.items));
        toast.success("Pedido localizado");
      } else {
        toast.error(response.message || "Pedido não encontrado");
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Erro ao conectar com o servidor.",
      );
    } finally {
      setIsSearching(false);
    }
  };

  return {
    orderNumber,
    searchResults,
    addedItems,
    confirmedProducts,
    delivererId,
    isSearching,
    handleSearch,

    // Métodos de atualização de estado simples
    updateOrderNumber: (val: string) => dispatch(setOrderNumber(val)),
    updateDelivererId: (id: number) => dispatch(setDelivererId(id)),

    // Métodos para Registrar Entrada (Allocation)
    addItemToAllocation: (item: StockEntryItem) => dispatch(addStockItem(item)),
    removeItemFromAllocation: (sku: string) => dispatch(removeStockItem(sku)),
    clearLocalAllocation: () => dispatch(clearAllocation()),

    // Métodos para Registrar Saída (Exit)
    confirmExit: (product: OrderStockItem) =>
      dispatch(confirmProductExit(product)),
    removeItemFromExit: (sku: string) => dispatch(removeProductExit(sku)),
    resetExit: () => dispatch(clearExitData()),
  };
};
