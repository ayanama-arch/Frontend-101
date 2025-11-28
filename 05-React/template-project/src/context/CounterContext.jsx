import { createContext, useContext, useReducer } from "react";

// counterReducer.js
export function counterReducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    case "RESET":
      return { count: 0 };
    default:
      return state;
  }
}

// 1. Create Context
const CounterContext = createContext();

// 2. Provider
export function CounterProvider({ children }) {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
}

// 3. Custom hook
export function useCounter() {
  return useContext(CounterContext);
}
