import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppThunk, RootState } from "../store";

// Selector to get current count from state
export const selectCount = (state: RootState) => state.counter.count;

// Thunk: increment only if the count is odd
export const incrementIfOdd = (amount: number): AppThunk => {
  return (dispatch, getState) => {
    const currentValue = selectCount(getState());
    if (currentValue % 2 === 1) {
      dispatch(incrementByValue(amount));
    }
  };
};

// export const thunkFunction = (a, b) => {
//   console.log("A: ", a)
//   console.log("B: ", b)
//   console.log("Counter: ", b().counter.count)
//   a(increment())
// }

export interface CounterState {
  count: number;
  status: "idle" | "loading" | "failed";
}

const initialState: CounterState = {
  count: 0,
  status: "idle",
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    incrementByValue: (state, action: PayloadAction<number>) => {
      state.count += action.payload;
    },
    decrementByValue: (state, action: PayloadAction<number>) => {
      state.count -= action.payload;
    },
  },
});

export const { decrement, decrementByValue, increment, incrementByValue } =
  counterSlice.actions;

export default counterSlice.reducer;
