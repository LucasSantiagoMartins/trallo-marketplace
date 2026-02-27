import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  count: number;
}

const initialState: CartState = {
  count: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    incrementCart: (state) => {
      state.count += 1;
    },
    clearCart: (state) => {
      state.count = 0;
    },
  },
});

export const { setCartCount, incrementCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
