import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { RootState } from "../../store/Store";

type Product = {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
};
type ProductState = {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: null | string | undefined;
};

// Create an entity adapter for products
const productsAdapter = createEntityAdapter<Product>();

// Define the initial state using the adapter's getInitialState method
const initialState = productsAdapter.getInitialState<ProductState>({
  status: "idle",
  error: null,
});

// Thunk to fetch products from the API
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch("https://dummyjson.com/products");
    const { products: data } = await response.json();
    return data;
  },
);

// Create the slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = "succeeded";
      productsAdapter.upsertMany(state, action.payload);
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error?.message || "Failed to fetch products";
    });
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = "loading";
    });
  },
});

// Export the reducer
export default productSlice.reducer;

// Create selectors using the adapter's getSelectors method
export const {
  selectAll: selectAllProducts,
  selectById: selectProductById,
  selectIds: selectProductIds,
} = productsAdapter.getSelectors<RootState>((state) => state.products);

// You can also add custom selectors like this
export const selectProductsStatus = (state: RootState) => state.products.status;
export const selectProductsError = (state: RootState) => state.products.error;
