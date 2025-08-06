import { useState } from "react";
import {
  decrement,
  decrementByValue,
  increment,
  incrementByValue,
  incrementIfOdd, // 🆕
} from "../store/reducers/counterReducer";
import { useAppDispatch, useAppSelector } from "../store/store";

export default function Counter() {
  const [inputVal, setInputVale] = useState(0);
  const count = useAppSelector((store) => store.counter.count);
  const dispatch = useAppDispatch();

  const handleDecrement = () => {
    dispatch(decrementByValue(inputVal));
  };
  const handleIncrement = () => {
    dispatch(incrementByValue(inputVal));
  };
  const handleIncrementIfOdd = () => {
    dispatch(incrementIfOdd(inputVal)); // 🆕
  };

  return (
    <div>
      <h2>Count Value: {count}</h2>
      <div>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
        <div>
          <input
            type="number"
            value={inputVal}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputVale(Number(e.target.value))
            }
          />
          <br />
          <button onClick={handleIncrement}>
            Increment by Amount: {inputVal}
          </button>
          <button onClick={handleDecrement}>
            Decrement by Amount: {inputVal}
          </button>
          <button onClick={handleIncrementIfOdd}>
            Increment If Odd: {inputVal}
          </button>
        </div>
      </div>
    </div>
  );
}
