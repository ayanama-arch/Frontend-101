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

function loggerMiddleware(state, action, reducer) {
  console.log(action.type);
  return (state = reducer(state, action));
}

function createStore(reducer, initialState) {
  let state = initialState;
  const listeners = [];

  function getState() {
    return state;
  }

  function dispatch(action) {
    state = loggerMiddleware(state, action, reducer);
    // state = reducer(state, action);
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

const store = createStore(reducer, { count: 5 });
console.log(store.getState());
store.dispatch({ type: "INCREMENT" });
console.log(store.getState());
