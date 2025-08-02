import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import counterReducer from "./slices/counterSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export const StoreProvider = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);
