# Standard Redux Patterns

## Action Creators

It is more wise to use reusable function and component to dispatch an action as it is less error prone and writing cleaner code.

```js
function countIncrease(text) {
  return {
    type: "count/incremented",
    payload: text,
  };
}
store.dispatch(countIncrease("increase"));
```

## Memoized Selectors

Memoized selectors are the function which caches the same output so component doesn't re-render if value doesn't changes.

To be continued...

## Async Request Status

## Flux Standard Actions

- All actiosn must have:
  1. plain JS object
  2. type field
- Actions can have
  1. payload field
  2. error field
  3. meta field
