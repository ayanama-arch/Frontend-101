import { useCounter } from "./context/CounterContext";

export default function App() {
  const { state, dispatch } = useCounter();
  return (
    <main>
      <h2>Welcome</h2>
      <h2>Count: {state.count}</h2>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>
        ➕ Increment
      </button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>
        ➖ Decrement
      </button>
      <button onClick={() => dispatch({ type: "RESET" })}>🔄 Reset</button>
    </main>
  );
}
