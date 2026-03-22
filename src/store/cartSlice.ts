import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  count: number;
  items: any[];
  loading: boolean;
}

const initialState: CartState = {
  count: 0,
  items: [],
  loading: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    setCartItems: (state, action: PayloadAction<any[]>) => {
      state.items = action.payload;
      state.count = action.payload.length;
    },
    setCartLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    incrementCart: (state) => {
      state.count += 1;
    },
    clearCart: (state) => {
      state.count = 0;
      state.items = [];
    },
  },
});

export const { 
  setCartCount, 
  setCartItems, 
  setCartLoading, 
  incrementCart, 
  clearCart 
} = cartSlice.actions;

export default cartSlice.reducer;