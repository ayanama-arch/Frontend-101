import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state using a type
interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 10,
};

// Create the slice
const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    decrementByAmount: (state, action: PayloadAction<number>) => {
      state.value -= action.payload;
    },
  },
});

// Export the actions and reducer
export const { increment, decrement, incrementByAmount, decrementByAmount } =
  counterSlice.actions;
export default counterSlice.reducer;
