import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "./cartSlice";
import productReducer from "./productSlice";
import orderSearchReducer from "./orderSlice";

const persistConfig = {
  key: "trallo-root",
  storage,
  whitelist: ["orderSearch"],
};

const rootReducer = combineReducers({
  cart: cartReducer,
  product: productReducer,
  orderSearch: orderSearchReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;