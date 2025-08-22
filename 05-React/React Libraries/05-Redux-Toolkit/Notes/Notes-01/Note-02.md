# Redux Concepts and Data flow

## Immutibility

In redux we assume the object of state is immutable which means we can't directly change it's value it is useful in recording history of a state.

## Actions

Action is an event describes something happened in application.
It's an object, which has a type field, it can have other fields called `payload`

`Example:`

```js
const addTodoAction = {
  type: "todos/todoAdded",
  payload: "Buy milk",
};
```

## Reducer

It is an event listener which handles event based on the receive action type.
It receives current state and action object.

- It should only calculate new value of state.
- Cannot modify existing state.
- Must be synchronous.

## Dispatch

Redux store has a method called dispatch, it recieves an action object which is only way to update the state of a store.

`Example:`

```js
store.dispatch({ type: "counter/incremented" });
```

## Selectors

It is a function which extracts the specific info of store state value.

```js
const selectCounterValue = (state) => state.value;

const currentValue = selectCounterValue(store.getState());
```

## Core Concepts and Principles

- Single Source of Truth
- State is read only
- Changes are made with pure reducer functions

## Summary

- Redux's intent can be summarized in three principles
  - Global app state is kept in a single store
  - The store state is read-only to the rest of the app
  - Reducer functions are used to update the state in response to actions
- Redux uses a "one-way data flow" app structure
  - State describes the condition of the app at a point in time, and UI renders based on that state
  - When something happens in the app:
    - The UI dispatches an action
    - The store runs the reducers, and the state is updated based on what occurred
    - The store notifies the UI that the state has changed
  - The UI re-renders based on the new state
