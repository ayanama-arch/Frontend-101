import { useSelector, useDispatch } from "react-redux";

import { AppDispatch } from "../../store/Store";
import { useEffect } from "react";
import {
  fetchProducts,
  selectAllProducts,
  selectProductsError,
  selectProductsStatus,
} from "./productSlice";

const Products: React.FC = () => {
  const products = useSelector(selectAllProducts);
  const status = useSelector(selectProductsStatus);
  const error = useSelector(selectProductsError);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  // Handling different loading states
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Product List</h1>
      <ul className="mx-auto flex w-3/4 flex-wrap content-around items-center justify-between gap-8 border-2">
        {products.map((product) => (
          <li key={product.id} className="w-96 shadow-2xl">
            <h2 className="text-lg font-bold">{product.title}</h2>
            <p>{product.description}</p>
            <img
              src={product.thumbnail}
              alt={product.title}
              className="aspect-square w-full border-2"
            />
            <br />
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
