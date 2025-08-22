import getProducts from "../../utils/getProducts";
import { Link, NavLink, useLoaderData, useNavigation } from "react-router-dom";
import Product from "./Product";

export const productLoader = async () => {
  const products = await getProducts("https://dummyjson.com/products");
  return products;
};

const ProductsList = () => {
  const { products } = useLoaderData();
  const navigation = useNavigation();
  console.log(navigation);
  console.log(products);

  return (
    <div className="layout">
      <div className="products">
        {products.length ? (
          products.map((product) => (
            <NavLink
              to={`${product.id}`}
              className={({ isActive, isPending }) => {
                isActive ? "active" : isPending ? "pending" : "";
              }}
              key={product.id}
            >
              <li className="product" key={product.id}>
                <img src={product.thumbnail} alt={product.title} />
                <h2>{product.title}</h2>
                <p>{product.description.substring(10)}</p>
                <p>
                  Price: <i>{product.price}</i>
                </p>
              </li>
            </NavLink>
          ))
        ) : (
          <p>No Contacts</p>
        )}
      </div>
      <Product />
    </div>
  );
};

export default ProductsList;
