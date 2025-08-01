# Redux-01

## Topics

`createSlice`, `configureStore` , `useSelector`, `useDispatch`, `Provider`, `prepare`, `payload`, `Async function`

## Installation

```bash
# redux library
npm install @reduxjs/toolkit
# library to use redux with react
npm install react-redux
```

## Redux toolkit Setup

`Creating Slice:`
Creating a one particular feature it takes three values

1. name: shows in redux-devtool
2. intialState of slice
3. reducers: all the functionalites

- Finally we export the actions whose name is equal to the reducer
- Finally export the main reducer which must be incorporated inside store

```jsx
// counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    count: 0,
  },
  reducers: {
    increment(state) {
      state.count += 1;
    },
    decrement(state) {
      state.count -= 1;
    },
    incrementByValue(state, action) {
      state.count += action.payload;
    },
    decrementByValue(state, action) {
      state.count -= action.payload;
    },
  },
});

export const { increment, decrement, incrementByValue, decrementByValue } =
  counterSlice.actions;
export default counterSlice.reducer;
```

`Configuring Store`

For now it takes one option which is reducer: an object which contains all the reducer of application.
`Provider` It provides store to application

```jsx
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import counterReducer from "../features/counter/counterSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export const ReduxStoreProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
```

`Providing store to Application`

```jsx
import ReactDom from "react-dom/client";
import App from "./App";
import "./index.css";

import { ReduxStoreProvider } from "./store/store";

ReactDom.createRoot(document.getElementById("root")).render(
  <ReduxStoreProvider>
    <App />
  </ReduxStoreProvider>
);
```

`Using Redux Store`

useSelector: selects store
useDispatch: dispatch an action

```jsx
import {
  increment,
  decrement,
  incrementByValue,
  decrementByValue,
} from "./features/counter/counterSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const App = () => {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();
  return (
    <>
      <h1>Welcome to counter Application</h1>
      <h2>Total Count: {count}</h2>

      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(incrementByValue(5))}>
        IncrementByValue
      </button>
      <button onClick={() => dispatch(decrementByValue(5))}>
        DecrementByValue
      </button>
    </>
  );
};

export default App;
```

## Async Operation

```jsx
import {
  increment,
  decrement,
  incrementByValue,
  decrementByValue,
  //   delayedIncrementByAmount,
} from "./features/counter/counterSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const delayedIncrementByAmount = (amount) => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByValue(amount));
  }, 1000);
};

const selectCount = (state) => state.counter.count;

const App = () => {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  return (
    <>
      <h1>Welcome to counter Application</h1>
      <h2>Total Count: {count}</h2>

      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(incrementByValue(5))}>
        IncrementByValue
      </button>
      <button onClick={() => dispatch(decrementByValue(5))}>
        DecrementByValue
      </button>
      <button onClick={() => dispatch(delayedIncrementByAmount(50))}>
        Async Increment +50
      </button>
    </>
  );
};

export default App;
```

## Preapring payload

```jsx
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, content) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
          },
        };
      },
    },
    // other reducers here
  },
});
```
