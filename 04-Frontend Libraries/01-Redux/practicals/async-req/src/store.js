import { legacy_createStore as createStore } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  count: 0,
};

// Reducer function
const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        count: state.count + 1,
      };
    case "DECREMENT":
      return {
        ...state,
        count: state.count - 1,
      };
    case "API":
      setTimeout(() => {
        console.log("AFTER @ SECONDS");
      }, 2000);
      return {
        ...state,
        count: state.count + 5,
      };

    default:
      return state;
  }
};

// Create store
const store = createStore(counterReducer);

// Example: Subscribe to changes
store.subscribe(() => {
  console.log("Updated State:", store.getState());
});

// Dispatch actions
store.dispatch({ type: "INCREMENT" }); // count = 1
store.dispatch({ type: "INCREMENT" }); // count = 2
store.dispatch({ type: "DECREMENT" }); // count = 1
store.dispatch({ type: "API" }); // count = 5
