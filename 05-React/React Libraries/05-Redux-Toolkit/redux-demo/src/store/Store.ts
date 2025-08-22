import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../components/counter/counterSlice";
import productSlice from "../components/products/productSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    products: productSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
