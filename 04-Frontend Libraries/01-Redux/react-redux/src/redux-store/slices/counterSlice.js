import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  initialState: { count: 0 },
  name: "counter",
  reducers: {
    increment: (state, action) => {
      state.count += 5;
    },
    decrement: (state, action) => {
      state.count -= 5;
    },
    dynamicValueChange: (state, action) => {
      console.log(action.payload);
      state.count += action.payload;
    },
  },
});

export const { increment, decrement, dynamicValueChange } =
  counterSlice.actions;
export default counterSlice.reducer;
