import Counter from "./components/counter/Counter";
import Products from "./components/products/Products";

export default function App() {
  return (
    <main>
      <div>
        <h2 className="bg-blue-500 font-bold">Welcome to the application</h2>
      </div>
      <Counter />
      <Products />
    </main>
  );
}
