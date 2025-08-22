import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  incrementByAmount,
  decrementByAmount,
} from "./counterSlice";
import { AppDispatch, RootState } from "../../store/Store";

const Counter: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="mx-6 my-4 w-[320px]">
      <div className="flex flex-col gap-4">
        <button
          className="rounded-md bg-blue-700 px-10 py-1 font-bold text-white"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <span className="bg-red-50 py-2 text-center text-2xl font-bold">
          [ {count} ]
        </span>
        <button
          className="rounded-md bg-blue-700 px-10 py-1 font-bold text-white"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>
      <div>
        <button
          className="my-4 w-[320px] rounded-md bg-blue-700 px-10 py-1 text-lg font-bold text-white"
          onClick={() => dispatch(incrementByAmount(5))}
        >
          Increment by 5
        </button>
      </div>
      <div>
        <button
          className="my-4 w-[320px] rounded-md bg-blue-700 px-10 py-1 text-lg font-bold text-white"
          onClick={() => dispatch(decrementByAmount(5))}
          // onMouseDown={() => dispatch(decrementByAmount(5))}
        >
          Decrement by 5
        </button>
      </div>
    </div>
  );
};

export default Counter;
