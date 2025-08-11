import { useState } from "react";
import {
  decrement,
  decrementByValue,
  increment,
  incrementByValue,
  incrementIfOdd,
  // thunkFunction, // 🆕
} from "../store/reducers/counterReducer";
import { 
  // store,
   useAppDispatch, useAppSelector } from "../store/store";
import { addCount, selectAllTODO } from "../store/reducers/todoReducer";

export default function Counter() {
  const [inputVal, setInputVale] = useState(0);
  const count = useAppSelector((store) => store.counter.count);
  const allTodo = useAppSelector(selectAllTODO)
  console.log("ALL TODO SELECTED BY SELECTOR INSIDE SLICE: ",allTodo)
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
        <br />
        <button onClick={() => dispatch(decrement())}>Decrement</button>
        <br />
        <button onClick={() => dispatch(addCount())}>Add Count</button>

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
          </button><br />
          <button onClick={handleDecrement}>
            Decrement by Amount: {inputVal}
          </button>
          <br />
          <button onClick={handleIncrementIfOdd}>
            Increment If Odd: {inputVal}
          </button>
          <br />
          {/* <button onClick={()=>store.dispatch(thunkFunction)}>Thunk Function</button> */}
        </div>
      </div>
    </div>
  );
}
