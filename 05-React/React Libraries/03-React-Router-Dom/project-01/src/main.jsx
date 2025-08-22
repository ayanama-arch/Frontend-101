import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import Error from "./Error.jsx";
import Product from "./features/products/Product.jsx";
import ProductsList from "./features/products/ProductList.jsx";
import { productLoader } from "./features/products/ProductList.jsx";
import { productLoader as PL } from "./features/products/Product.jsx";
import Index, { indexLoader } from "./Index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,

    children: [
      {
        index: true,
        element: <Index />,
        errorElement: <h2>Index is not rendered</h2>,
        loader: indexLoader,
      },
      {
        path: "products",
        children: [
          {
            path: "",
            loader: productLoader,
            element: <ProductsList />,
          },
          {
            path: ":productId",
            element: <Product />,
            loader: PL,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
