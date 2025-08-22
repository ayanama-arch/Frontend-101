# Store

- Holds the current application state inside
- Allows access to the current state via store.getState();
- Allows state to be updated via store.dispatch(action);
- Registers listener callbacks via store.subscribe(listener);
- Handles unregistering of listeners via the unsubscribe function returned by store.subscribe(listener).

## Loading intitial state

We can create store with intitial values

```js
import { createStore } from "redux";
import rootReducer from "./reducer";

let preloadedState = {
  todos: 3,
  counter: 4,
};

const store = createStore(rootReducer, preloadedState);
```

## Store Example-01

```js
import store from "./store.js";

// Initial State
console.log("STATE:", store.getState());

// Log everytime state of store changes
const unsubscribe = store.subscribe(() => {
  console.log("State after dispatch: ", store.getState());
});

// Dispatching an action
store.dispatch({ type: "todo/incremented" });
store.dispatch({ type: "todo/decremented" });

// After unsubscribing listener will stop working
unsubscribe();

store.dispatch({ type: "counter/incremented" });
store.dispatch({ type: "counter/decremented" });
```

## Middleware

```js
import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducers/reducer.js";

const returnHello = (storeAPI) => (next) => (action) => {
  setInterval(() => {
    console.log("insie middleware");
  }, 1000);

  return next(action);
};

const middlewareEnhancer = applyMiddleware(returnHello);
const store = createStore(rootReducer, middlewareEnhancer);

store.subscribe(() => {
  console.log("After change: ", store.getState());
});

const dispatchResult = store.dispatch({ type: "todo/incremented" });
console.log(dispatchResult);
```

## Writing custom middleware

Redux middleware are written as a series of three nested functions.

```js
// Middleware written as ES5 functions

// Outer function:
function exampleMiddleware(storeAPI) {
  return function wrapDispatch(next) {
    return function handleAction(action) {
      // Do anything here: pass the action onwards with next(action),
      // or restart the pipeline with storeAPI.dispatch(action)
      // Can also use storeAPI.getState() here

      return next(action);
    };
  };
}

// Same middleware in shorter format
const anotherExampleMiddleware = (storeAPI) => (next) => (action) => {
  // Do something in here, when each action is dispatched

  return next(action);
};
```

`exampleMiddleware:` The outer function is actually the "middleware" itself. It will be called by applyMiddleware, and receives a storeAPI object containing the store's {dispatch, getState} functions. These are the same dispatch and getState functions that are actually part of the store. If you call this dispatch function, it will send the action to the start of the middleware pipeline. This is only called once.
`wrapDispatch:` The middle function receives a function called next as its argument. This function is actually the next middleware in the pipeline. If this middleware is the last one in the sequence, then next is actually the original store.dispatch function instead. Calling next(action) passes the action to the next middleware in the pipeline. This is also only called once
`handleAction:` Finally, the inner function receives the current action as its argument, and will be called every time an action is dispatched.

## Adding redux devtools

```js
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducer";
import { print1, print2, print3 } from "./exampleAddons/middleware";

const composedEnhancer = composeWithDevTools(
  // EXAMPLE: Add whatever middleware you actually want to use here
  applyMiddleware(print1, print2, print3)
  // other store enhancers if any
);

const store = createStore(rootReducer, composedEnhancer);
export default store;
```

## Summary

- Redux apps always have a single store
  - Stores are created with the Redux `createStore` API
  - Every store has a single root reducer function
- Stores have three main methods
  - `getState` returns the current state
  - `dispatch` sends an action to the reducer to update the state
  - `subscribe` takes a listener callback that runs each time an action is dispatched
- Store enhancers let us customize the store when it's created
  - Enhancers wrap the store and can override its methods
  - `createStore` accepts one enhancer as an argument
  - Multiple enhancers can be merged together using the `compose` API
- Middleware are the main way to customize the store
  - Middleware are written as three nested functions inside each other
  - Middleware are added using the `applyMiddleware` enhancer
  - Middleware run each time an action is dispatched
  - Middleware can have side effects inside
- The Redux DevTools let you see what's changed in your app over time
  - The DevTools Extension can be installed in your browser
  - The store needs the DevTools enhancer added, using composeWithDevTools
  - The DevTools show dispatched actions and changes in state over time
