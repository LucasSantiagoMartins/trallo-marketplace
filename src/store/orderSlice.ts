import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderStockItem } from "@/dtos/order";
import { StockEntryItem } from "@/types/warehouse-inventory";

interface OrderState {
    orderNumber: string;
    searchResults: OrderStockItem[];
    lastSearchedOrder: string | null;
    addedItems: StockEntryItem[];
    // Novos estados para Saída
    confirmedProducts: OrderStockItem[];
    delivererId: number;
}

const initialState: OrderState = {
    orderNumber: "",
    searchResults: [],
    lastSearchedOrder: null,
    addedItems: [],
    confirmedProducts: [],
    delivererId: 0,
};

const orderSlice = createSlice({
    name: "orderSearch",
    initialState,
    reducers: {
        setOrderNumber: (state, action: PayloadAction<string>) => {
            state.orderNumber = action.payload;
        },
        setSearchResults: (state, action: PayloadAction<OrderStockItem[]>) => {
            state.searchResults = action.payload;
            state.lastSearchedOrder = state.orderNumber;
        },
        addStockItem: (state, action: PayloadAction<StockEntryItem>) => {
            if (!state.addedItems) state.addedItems = [];
            state.addedItems.push(action.payload);
        },
        clearAllocation: (state) => {
            state.addedItems = [];
        },
        // Actions para Saída
        setDelivererId: (state, action: PayloadAction<number>) => {
            state.delivererId = action.payload;
        },
        confirmProductExit: (state, action: PayloadAction<OrderStockItem>) => {
            if (!state.confirmedProducts) state.confirmedProducts = [];
            const exists = state.confirmedProducts.find(p => p.productSku === action.payload.productSku);
            if (!exists) {
                state.confirmedProducts.push(action.payload);
            }
        },
        clearExitData: (state) => {
            state.confirmedProducts = [];
            state.delivererId = 0;
            state.orderNumber = "";
            state.searchResults = [];
            state.lastSearchedOrder = null;
        },
        clearSearch: (state) => {
            state.orderNumber = "";
            state.searchResults = [];
            state.lastSearchedOrder = null;
        },
    },
});

export const {
    setOrderNumber,
    setSearchResults,
    addStockItem,
    clearAllocation,
    setDelivererId,
    confirmProductExit,
    clearExitData,
    clearSearch
} = orderSlice.actions;

export default orderSlice.reducer;