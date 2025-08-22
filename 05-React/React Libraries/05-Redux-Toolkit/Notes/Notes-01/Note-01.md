# Redux-Fundamentals

Redux toolkit is recommended way of using redux but here we will learn about it's fundamental first.

## What is Redux

Redux is pattern or library used to manage and update the state of application using an event called "actions", It serves as the central store of an application.

## Why should use?

It manages the global state for an application and pattern and tool provided by redux help us to change, update and how those changes will execute in app.

Only use redux when you have bigger application where you need to frequently work with the state of an application.

## Redux Libaries and Toolkit

`React-Redux` This libarary helps in working with react.
`Redux Toolkit` It is a main redux package.
`Redux Devtools extension` This tool show the history of changes which helps in debugging.

## Redux Store

Redux store holds the golbal state of an application.
A store is a JS object with a few special function and abilities.
You should never modify store directly.
When you want to update you need to `dispatch` an `action` which runs a `reducer` function which will eventually update the global state you can notified by `subscribers` that the state has been updated.

### Installation of redux

```bash
npm install redux
```

## Working Store

When a user dispatch an action by `store.dispatch(action)` it calls a reducer function which determines the type of action based on that it changes the state of a store.

```js
// Importing createStore
import { createStore } from "redux";

// Initial Value of Store
const initialState = {
  value: 0,
};

// Reducer function which has store's original state and action object dispatched by user.
function counterReducer(state = initialState, action) {
  switch (action.type) {
    case "counter/incremented":
      return { ...state, value: state.value + 1 };
    case "counter/decremented":
      return { ...state, value: state.value - 1 };
    default:
      return state;
  }
}

// Creating a Store and reducer Function as it's argument
const store = createStore(counterReducer);

// State of a Store
console.log("State:", store.getState());

// Whenever state changes callback function of subscribe will be called by observer design pattern.
store.subscribe(() => {
  console.log("New State: ", store.getState());
});

// Dispatching an action
store.dispatch({ type: "counter/incremented" });
store.dispatch({ type: "counter/decremented" });
```

`NOTE:`

- Redux is a library for managing global application state
- Redux is typically used with the React-Redux library for integrating Redux and React together
- Redux Toolkit is the recommended way to write Redux logic
- Redux uses several types of code
- Actions are plain objects with a type field, and describe "what happened" in the app
- Reducers are functions that calculate a new state value based on previous state + an action
- A Redux store runs the root reducer whenever an action is dispatched
