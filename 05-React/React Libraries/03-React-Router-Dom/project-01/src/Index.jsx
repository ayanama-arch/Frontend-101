import {
  Form,
  useFetcher,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import getProducts from "./utils/getProducts";

export async function indexLoader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const products = await getProducts("https://dummyjson.com/products");
  return { products, q };
}

const productList = (param, { products }) => {
  if (param) {
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(param.toLowerCase())
    );
    return filteredProducts;
  }
  return products;
};

const Index = () => {
  const { products, q } = useLoaderData();

  const navigation = useNavigation();
  console.log();

  const submit = useSubmit();

  const fetcher = useFetcher();

  let searchProducts;
  if (products) {
    searchProducts = productList(q, products);
  }

  return (
    <>
      <Form>
        <input
          type="text"
          name="q"
          placeholder="Search"
          defaultValue={q}
          onChange={(event) => {
            const isFirstSearch = q == null;
            submit(event.currentTarget.form, {
              replace: !isFirstSearch,
            });
          }}
        />
      </Form>
      <h2>This is home page | Index Page</h2>
      <div
        className={`products ${navigation.state == "loading" ? "loading" : ""}`}
      >
        {searchProducts
          ? searchProducts.map((product) => (
              <ul className="product" key={product.id}>
                <img src={product.thumbnail} alt="" />
                <h2>{product.title}</h2>
                <p>{product.description}</p>
              </ul>
            ))
          : "No items to show"}
      </div>
      <fetcher.Form method="post">
        {/* <button
          name="favorite"
          value={favorite ? "false" : "true"}
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          {favorite ? "★" : "☆"}
        </button> */}
      </fetcher.Form>
    </>
  );
};

export default Index;
