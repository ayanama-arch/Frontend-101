# UI and React

To work with react we need a library which interacts with react component and redux store called `react-redux`

First provide value of store to application then useDispatch and useSelector hook

```jsx
// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// App.jsx
import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();

  function handleDispatch(e) {
    console.log(e.target.innerText);
    switch (e.target.innerText) {
      case "Increment":
        return dispatch({ type: "count/incremented" });
      case "Decrement":
        return dispatch({ type: "count/decremented" });
    }
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
    </>
  );
};

export default App;
```

## SUMMARY

- Redux stores can be used with any UI layer
  - UI code always subscribes to the store, gets the latest state, and redraws itself
- React-Redux is the official Redux UI bindings library for React
  - React-Redux is installed as a separate react-redux package
- The useSelector hook lets React components read data from the store
  - Selector functions take the entire store state as an argument, and return a value based on that state
  - useSelector calls its selector function and returns the result from the selector
  - useSelector subscribes to the store, and re-runs the selector each time an action is dispatched.
  - Whenever the selector result changes, useSelector forces the component to re-render with the new data
- The useDispatch hook lets React components dispatch actions to the store
  - useDispatch returns the actual store.dispatch function
  - You can call dispatch(action) as needed inside your components
- The `<Provider>` component makes the store available to other React components
  - Render `<Provider store={store}>` around your entire `<App>`
