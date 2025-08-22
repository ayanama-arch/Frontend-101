import { useLoaderData, NavLink } from "react-router-dom";
import getProducts from "../../utils/getProducts";

export const productLoader = async ({ params }) => {
  console.log(params);
  console.log("hello");
  const products = await getProducts(
    `https://dummyjson.com/products/${params.productId}`
  );
  return products;
};

const Product = () => {
  const data = useLoaderData();
  console.log(data);
  // if (!data.length) {
  //   return <h2>No data</h2>;
  // }
  return (
    <>
      <div className="product">
        <img src={data?.thumbnail} alt={data?.title} />
        <h2>{data?.title}</h2>
        <p>{data?.description}</p>
      </div>
    </>
  );
};

export default Product;
