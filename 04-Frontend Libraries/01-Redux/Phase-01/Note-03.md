# State Actions and Reducers

## Combining Reducer

### With Combine Reducer

```js
import { createStore, combineReducers } from "redux";
import { counterReducer } from "./reducers/countReducer.js";
import { todoReducer } from "./reducers/todoReducer.js";

const rootReducer = combineReducers({
  todos: todoReducer,
  counter: counterReducer,
});

const store = createStore(rootReducer);

// State of a Store
console.log("State:", store.getState());
console.log("new line");

// Whenever state changes
store.subscribe(() => {
  console.log("New State: ", store.getState());
});

store.dispatch({ type: "counter/incremented" });
store.dispatch({ type: "counter/decremented" });
store.dispatch({ type: "todo/incremented" });
store.dispatch({ type: "todo/decremented" });
```

### Without combineReducer

```js
import { createStore, combineReducers } from "redux";
import { counterReducer } from "./reducers/countReducer.js";
import { todoReducer } from "./reducers/todoReducer.js";
import { intialCount } from "./reducers/countReducer.js";
import { initialTodo } from "./reducers/todoReducer.js";

const initialState = {
  todos: initialTodo,
  counter: intialCount,
};

const rootReducer = (state = initialState, action) => {
  return {
    todos: todoReducer(state.todos, action),
    counter: counterReducer(state.counter, action),
  };
};

// const rootReducer = combineReducers({
//   todos: todoReducer,
//   counter: counterReducer,
// });

const store = createStore(rootReducer);

// State of a Store
console.log("State:", store.getState());
console.log("new line");

// Whenever state changes
store.subscribe(() => {
  console.log("New State: ", store.getState());
});

store.dispatch({ type: "counter/incremented" });
store.dispatch({ type: "counter/decremented" });
store.dispatch({ type: "todo/incremented" });
store.dispatch({ type: "todo/decremented" });
```
