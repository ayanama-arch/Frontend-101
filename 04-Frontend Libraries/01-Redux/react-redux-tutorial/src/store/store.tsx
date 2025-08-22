import {
  configureStore,
  type Action,
  type ThunkAction,
} from "@reduxjs/toolkit";
import countReducer from "./reducers/counterReducer";
import {
  Provider,
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import type { ReactNode } from "react";
import todoReducer from "./reducers/todoReducer";
import { productsApi } from "./reducers/productsReducer";

export const store = configureStore({
  reducer: {
    counter: countReducer,
    todos: todoReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

// STORE TYPES
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// HOOKS
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// WRAPPER
export const StoreProvider = ({ children }: { children: ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);
