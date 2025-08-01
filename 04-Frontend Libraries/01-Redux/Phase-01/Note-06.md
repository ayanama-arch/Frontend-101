# Async and Data Fetching

Async Logic says what if instead of dispatching action object we dispatch a function and the middleware passed in store checks whether it's a function of object and perform operation according to that.

```js
// Write a function that has `dispatch` and `getState` as arguments
const fetchSomeData = (dispatch, getState) => {
  // Make an async HTTP request
  client.get("todos").then((todos) => {
    // Dispatch an action with the todos we received
    dispatch({ type: "todos/todosLoaded", payload: todos });
    // Check the updated store state after dispatching
    const allTodos = getState().todos;
    console.log("Number of todos after loading: ", allTodos.length);
  });
};

const asyncFunctionMiddleware = (storeAPI) => (next) => (action) => {
  // If the "action" is actually a function instead...
  if (typeof action === "function") {
    // then call the function and pass `dispatch` and `getState` as arguments
    return action(storeAPI.dispatch, storeAPI.getState);
  }

  // Otherwise, it's a normal action - send it onwards
  return next(action);
};

const middlewareEnhancer = applyMiddleware(asyncFunctionMiddleware);
const store = createStore(rootReducer, middlewareEnhancer);

// Pass the _function_ we wrote to `dispatch`
store.dispatch(fetchSomeData);
// logs: 'Number of todos after loading: ###'
```

## Redux Thunk

Instead of writing the middleware which handles asynchronous logic redux provides it's own middleware called redux-thunk

```bash
npm install redux-thunk
```

```js
// store.js
import { createStore, applyMiddleware } from "redux";

import { thunk } from "redux-thunk";
import rootReducer from "./reducers/countReducer.js";
const composedEnhancer = applyMiddleware(thunk);
const store = createStore(rootReducer, composedEnhancer);

export default store;

// passing asycn function in dispatch
import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();

  function handleDispatch(e) {
    switch (e.target.innerText) {
      case "Increment":
        return dispatch({ type: "count/incremented" });
      case "Decrement":
        return dispatch({ type: "count/decremented" });
    }
  }

  async function handleAPICall(dispatch2, getState) {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      console.log(data);
      dispatch2({ type: "count/incremented" });
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Re-throw the error for further handling (optional)
    }
  }

  function handleFunc() {
    dispatch(handleAPICall);
  }

  return (
    <>
      <h1>Application</h1>
      <h3>Number of todos: {count}</h3>
      <button type="button" onClick={handleDispatch}>
        Increment
      </button>
      <button type="button" onClick={handleDispatch}>
        Decrement
      </button>
      <button
        type="button"
        onClick={() => dispatch({ type: "count/decremented" })}
      >
        DecrementOnButton
      </button>
      <button
        type="button"
        // onClick={() => handleAPICall("https://fakestoreapi.com/products")}
        onClick={handleFunc}
      >
        IncreaseByAPI
      </button>
    </>
  );
};

export default App;
```

## SUMMARY

- Redux middleware were designed to enable writing logic that has side effects
  - "Side effects" are code that changes state/behavior outside a function, like AJAX calls, modifying function arguments, or generating random values
- Middleware add an extra step to the standard Redux data flow
  - Middleware can intercept other values passed to dispatch
  - Middleware have access to dispatch and getState, so they can dispatch more actions as part of async logic
- The Redux "Thunk" middleware lets us pass functions to dispatch
  - "Thunk" functions let us write async logic ahead of time, without knowing what Redux store is being used
  - A Redux thunk function receives dispatch and getState as arguments, and can dispatch actions like "this data was received from an API response"
