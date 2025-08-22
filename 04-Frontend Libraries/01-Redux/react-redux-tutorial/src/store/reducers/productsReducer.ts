import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// 1. Product type
export interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    inStock: boolean;
    rating: number;
}

// 2. New Product type (for adding)
export type NewProduct = Omit<Product, "id">;

// 3. Product Update type (partial changes allowed)
export type ProductUpdate = Partial<Product> & { id: number };

// 4. API Slice
export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:3000` }),
    tagTypes: ["Product"],
    endpoints: (builder) => ({

        // Fetch all products
        getProducts: builder.query<Product[], void>({
            query: () => "/products",
            providesTags: (result = []) => [
                { type: "Product", id: "LIST" },
                ...result.map((product) => ({ type: "Product" as const, id: product.id }))
            ]
        }),

        // Fetch a single product
        getProduct: builder.query<Product, number>({
            query: (id) => `/products/${id}`,
            providesTags: (_, __, id) => [{ type: "Product", id }]
        }),

        // Add a product
        addProduct: builder.mutation<Product, NewProduct>({
            query: (newProduct) => ({
                url: "/products",
                method: "POST",
                body: newProduct
            }),
            invalidatesTags: [{ type: "Product", id: "LIST" }]
        }),

        // Edit a product
        editProduct: builder.mutation<Product, ProductUpdate>({
            query: (product) => ({
                url: `/products/${product.id}`,
                method: "PATCH",
                body: product
            }),
            invalidatesTags: (_, __, arg) => [
                { type: "Product", id: arg.id }
            ]
        }),

        // Delete a product
        deleteProduct: builder.mutation<{ success: boolean; id: number }, number>({
            query: (id) => ({
                url: `/products/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: (_, __, id) => [
                { type: "Product", id },
                { type: "Product", id: "LIST" }
            ]
        })
    })
});

// 5. Export hooks
export const {
    useGetProductsQuery,
    useGetProductQuery,
    useAddProductMutation,
    useEditProductMutation,
    useDeleteProductMutation
} = productsApi;
