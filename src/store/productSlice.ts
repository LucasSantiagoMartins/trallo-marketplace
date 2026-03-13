// @/store/productSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchedProductDTO } from "@/types/product";

interface ProductState {
  items: SearchedProductDTO[];
  loading: boolean;
}

const initialState: ProductState = {
  items: [],
  loading: false,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<SearchedProductDTO[]>) => {
      state.items = action.payload;
    },
    setProductLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setProducts, setProductLoading } = productSlice.actions;
export default productSlice.reducer;