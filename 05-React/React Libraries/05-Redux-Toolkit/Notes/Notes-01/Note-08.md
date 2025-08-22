# Redux Toolkit

```bash
    npm install @reduxjs/toolkit
```

## Configure Store

Instead of createStore using configureStore

```js
import { configureStore } from "@reduxjs/toolkit";
import { countReducer, scoreReducer } from "../reducers/countReducer";

const store = configureStore({
  reducer: {
    counter: countReducer,
    score: scoreReducer,
  },
});

export default store;
```

- It combined `combineReducer` and `scoreReducer` in the root reducer, and their root state will be `counter` and `score` as name defined in configureStore.
- It created a redux store using root reducer
- IT automatically added the thunk middleware
- It automatically setup Redux Devtools extension

Redux toolkit already includes redux, redux-thunk, reselect

## createSlice

Creating reducers using createSlice

```js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  score: 15,
};
const scoreSlice = createSlice({
  name: "scoreReducer",
  initialState,
  reducers: {
    scoreIncrement(state, action) {
      state.score += 20;
    },
    scoreDecrement(state, action) {
      state.score -= 20;
    },
  },
});

export const { scoreIncrement, scoreDecrement } = scoreSlice.actions;

export default scoreSlice.reducer;
```

createSlice takes an object with three main field

`name`: It will be used as prefix for generate action type.
`initialState`: Initial state of reducer
`reducers`: all the cases of reducers lies here.

- createSlice will automatically generate action creators that correspond to each case.
- It will automatically return the existing case in the default state
- Generate actions will be available inside `slice.actions`
- Complete reducer will be available inside `slice.reducer`
- To update states redux uses `immer` library

`NOTE:`
Usually when we use actions created by Action Creator we pass one object but what if we need to pass more than one object we use special functions `prepare` and `reducer`,
`prepare`: It creates a single object and then pass to the `reducer`

```js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  score: 15,
};
const scoreSlice = createSlice({
  name: "scoreReducer",
  initialState,
  reducers: {
    scoreIncrement(state, action) {
      state.score += 20;
    },
    scoreDecrement(state, action) {
      state.score -= 20;
    },
    scoreWin: {
      prepare(arg1, arg2) {
        console.log("INSDE Pre: ", arg1, arg2);
        return {
          payload: { arg1, arg2 },
        };
      },
      reducer(state, action) {
        console.log("INSIDE REDUCER", action.payload);
      },
    },
  },
});

export const { scoreIncrement, scoreDecrement, scoreWin } = scoreSlice.actions;

export default scoreSlice.reducer;
```

## createAsyncThunk

It is a function which helps in fetching the data, it takes two arguments string which is action type and second callback function which creates a payload which should return a promise.

- As this function is declared outside of the createSlice, so we need to pass it's reference inside it so it can read it's status.
- We pass it's reference as `extraReducer` inside `createSlice` which is callback function with a builder parameter.
- We can listen to the function as `builder.addCase(actionCreator,caseReducer)`

Action creators can be of three types:-

1. fetchtTodos.pending:todos/fetchTodos/pending
2. fetchtTodos.fullfilled:todos/fetchTodos/fulfilled
3. fetchtTodos.rejected:todos/fetchTodos/rejected

```js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// https://jsonplaceholder.typicode.com/todos/1

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/");
  const data = await response.json();
  console.log("TODO:", data);
  return data;
});

const initialState = {
  score: 15,
  status: null,
  todo: [],
};
const scoreSlice = createSlice({
  name: "scoreReducer",
  initialState,
  reducers: {
    scoreIncrement(state, action) {
      state.score += 20;
    },
    scoreDecrement(state, action) {
      state.score -= 20;
    },
    scoreWin: {
      prepare(arg1, arg2) {
        console.log("INSDE Pre: ", arg1, arg2);
        return {
          payload: { arg1, arg2 },
        };
      },
      reducer(state, action) {
        console.log("INSIDE REDUCER", action.payload);
      },
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        console.log(action.payload);
        state.todo.push(action.payload);
        state.status = "idle";
      });
  },
});

export const { scoreIncrement, scoreDecrement, scoreWin } = scoreSlice.actions;

export default scoreSlice.reducer;

// App.jsx
// We can call createAsync function by importing inside component and dispatching it from there.
import { fetchTodos } from "./reducers/reducerSlice";
<button type="button" onClick={() => dispatch(fetchTodos())}>
  Call Todo
</button>;
```
