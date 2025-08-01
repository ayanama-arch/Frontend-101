// 1. Reducer
function reducer(state = { count: 0 }, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

// 2. Logger Middleware (3-layer)
function loggerMiddleware(store) {
  return function (next) {
    return function (action) {
      console.log("[Logger] Action Type:", action.type);
      return next(action); // Pass to next middleware or reducer
    };
  };
}

// 3. Create Store (Basic Redux-like)
function createStore(reducer, initialState) {
  let state = initialState;
  const listeners = [];

  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  }

  function subscribe(listener) {
    listeners.push(listener);
  }

  return {
    getState,
    dispatch,
    subscribe,
  };
}

// 4. Apply Middleware (enhance dispatch)
function applyMiddleware(store, ...middlewares) {
  let dispatch = store.dispatch;

  middlewares.reverse().forEach((middleware) => {
    dispatch = middleware(store)(dispatch);
  });

  store.dispatch = dispatch;
}

// 5. Setup Everything
const store = createStore(reducer, { count: 0 });
applyMiddleware(store, loggerMiddleware);

// Subscribe to state changes
store.subscribe(() => {
  console.log("Updated State:", store.getState());
});

// 6. Dispatch some actions
store.dispatch({ type: "INCREMENT" });
// Output:
// [Logger] Action Type: INCREMENT
// Updated State: { count: 1 }

store.dispatch({ type: "INCREMENT" });
// [Logger] Action Type: INCREMENT
// Updated State: { count: 2 }

store.dispatch({ type: "DECREMENT" });
// [Logger] Action Type: DECREMENT
// Updated State: { count: 1 }

store.dispatch({ type: "UNKNOWN" });
// [Logger] Action Type: UNKNOWN
// Updated State: { count: 1 }
