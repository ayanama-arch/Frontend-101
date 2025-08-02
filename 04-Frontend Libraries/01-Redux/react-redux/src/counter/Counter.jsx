import { useSelector, useDispatch } from "react-redux";
import {
  decrement,
  dynamicValueChange,
  increment,
} from "../redux-store/slices/counterSlice";
import { useState } from "react";
export default function Counter() {
  const [inputValue, setInputValue] = useState(0);
  const count = useSelector((store) => store.counter.count);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <br />
      <br />
      <input
        type="number"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={() => dispatch(dynamicValueChange(Number(inputValue)))}>
        Dynamic Incrment
      </button>
    </div>
  );
}
