import { useQuery } from "@tanstack/react-query";

type ProductType = {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
};

const Product = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["dummy data"],
    queryFn: async () => {
      const response = await fetch("https://dummyjson.com/products");
      return await response.json();
    },
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const products: ProductType[] = data.products;

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <img src={product.thumbnail} alt="image" />
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Product;
