# Redux and Redux Toolkit Interview Questions

## Pure Redux Questions (1-25)

### Basic Concepts

1. What is Redux and what problem does it solve?

   - Redux is a global state management library widely used with React applications, though it can be used in any JavaScript project. It helps manage application state on the client side, especially in complex apps where data needs to be shared across many components. Redux provides a structured way to manage and update state, making the app more predictable and easier to debug.

2. Explain the three core principles of Redux.

   1. Store: There is a single source of truth for data i.e store
   2. Actions: You shouldn't change data directly of the store but dispatch an action
   3. Reducer: when action is dispatched it calls the reducer function which eventually changes the state of store.

3. What is a store in Redux and how do you create one?
   Redux Store is a simple javascript object with some methods availble, it's a single source of truth and central store of the application

   ```js
   const store = createStore(rootReducer);
   ```

4. What are actions in Redux? Provide an example.
   Actions are simple javascript object which contains type of action and also can hold payload, when we dispatch the actions it triggers the reducer function which changes the state of store

   ```js
   const store = createStore(rootReducer);
   store.dispatch({ type: "count/increment", payload: 2 });
   ```

5. What are action creators and why are they useful?
   Action creators are the function which returns the action object for the purpose of reusability, clear and consistence code

   ```js
   function addTodo(text) {
     return {
       type: "ADD_TODO",
       payload: text,
     };
   }
   ```

6. What is a reducer in Redux? What are the rules for writing reducers?
   A reducer is a pure function that takes the current state and an action, then returns the new state.

   `Rules:`

   - Must be pure function.
   - Should return new state of store

7. Explain the concept of immutability in Redux. Why is it important?
   Immutability means you never modify the existing state directly — instead, you create and return a new copy of the state with the changes

   - ✅ Predictability – Changes are controlled and traceable
   - ✅ Time Travel Debugging
   - ✅ Performance
   - ✅ Avoids Bugs

8. What is the difference between state and props in the context of Redux?
   Redux state holds the data while props pass the data to child component.
9. What is a dispatch function and how is it used?
   `dispatch()` is a function used to send an action to the Redux store.

10. What is the Redux data flow? Explain the unidirectional data flow.
    ```scss
    UI ➡️ dispatch(action) ➡️ reducer ➡️ new state ➡️ UI updates
    ```

### Intermediate Redux

11. What are pure functions and why must reducers be pure functions?
    Functions which returns same output for same input and doesn't have any other side effects

    - Reducers must be pure function because:-
      - Predictable changes
      - time travel debugging
      - helps in consistent rendering

    ```js
    // Pure function
    function add(a, b) {
      return a + b;
    }

    // Note Pure function
    function add(a, b) {
      console.log(a + b); // side effect
      return a + b;
    }
    ```

12. How do you handle asynchronous operations in Redux?
    All the operations in Redux is synchronous to perform asynchronous operation use thunk middleware.\

13. What is middleware in Redux? Explain how it works.
    Middleware in Redux is a function that sits between dispatching an action and the reducer receiving it.
    It lets you intercept actions, modify, log, delay, or even cancel them before they reach the reducer.

14. What is Redux Thunk and when would you use it?
    Redux think is a middleware and use to perform an asynchronous taks like fetching data in redux.

15. How do you combine multiple reducers in Redux?
    We can use combineReducer method or directly combine in store in reducer object.

16. What is the purpose of `combineReducers()` function?
    Combine Reducer combines multiple reducer into one.

    ```js
    const rootReducer = combineReducers({
      user: userReducer,
      posts: postsReducer,
    });
    ```

17. Explain the concept of normalizing state shape in Redux.
    It means **structuring state as flat objects**, like a database — store data **by ID** instead of nesting.

    ***

    ❌ Without Normalization:

    ```js
    {
      users: [
        {
          id: 1,
          name: "Boss",
          posts: [{ id: 101, title: "Hello" }],
        },
      ];
    }
    ```

    🔴 Hard to update a post or user separately.

    ***

    ✅ With Normalization:

    ```js
    {
    users: {
        byId: {
        1: { id: 1, name: "Boss", posts: [101] }
        }
    },
    posts: {
        byId: {
        101: { id: 101, title: "Hello" }
        }
    }
    }
    ```

    ✔ Easy to update, delete, or access by ID.
    ✔ Avoids duplication and deep nesting.

    ***

    📦 Tip: Use `createEntityAdapter` from Redux Toolkit for auto-normalization.

18. What are the common patterns for organizing Redux code?
19. How do you handle nested state updates in Redux?
20. What is the difference between `getState()` and accessing state directly?

### Advanced Redux

21. What are enhancers in Redux? How do they differ from middleware?
    Enhancer are higher order function which customize the store itself while middleware is sits between dispatch and reducer function.

22. How do you implement custom middleware in Redux?

    ```js
    // Logger middleware
    const logger = (store) => (next) => (action) => {
      console.log("Action:", action);
      return next(action);
    };

    // Adding to store
    const store = createStore(rootReducer, applyMiddleware(logger));
    ```

23. What is time-travel debugging in Redux?
    Lets you step through past actions and view previous state using tools like Redux DevTools — like undo/redo for app state.
    ✅ Helps debug & track changes easily.

24. How do you handle optimistic updates in Redux?

    ```js
    // 1. Immediately update UI
    dispatch({ type: "ADD_TODO_OPTIMISTIC", payload: newTodo });

    // 2. Send API request
    api.addTodo(newTodo).catch(() => {
      // 3. Rollback if failed
      dispatch({ type: "REMOVE_TODO", payload: newTodo.id });
    });
    ```

25. What are the performance considerations when using Redux?

    1. **Avoid unnecessary re-renders**
       🔸 Use `React.memo`, `useSelector` with shallow equality
       🔸 Split components smartly

    2. **Normalize state shape**
       🔸 Flatten nested data to avoid deep diff checks

    3. **Use selectors (reselect)**
       🔸 Memoize derived data to avoid recalculations

    4. **Avoid huge single reducers**
       🔸 Split logic with `combineReducers`

    5. **Don’t store non-serializable data**
       🔸 Avoid functions, class instances in state

    6. **Use Redux Toolkit**
       🔸 It's optimized for performance and DX

    7. **Lazy-load reducers (in large apps)**
       🔸 Load only what’s needed to reduce startup time

    8. **Batch actions**
       🔸 Combine multiple dispatches into one if possible

## Redux Toolkit Questions (26-50)

### RTK Basics

26. What is Redux Toolkit (RTK) and why was it created?
    Redux Toolkit is the modern, streamlined way to use Redux, designed to reduce boilerplate, handle async logic easily, and guide you toward best practices.

27. What problems does Redux Toolkit solve compared to plain Redux?
28. What is `configureStore()` and how does it differ from `createStore()`?
    `configureStore()` is the modern, hassle-free way to create a Redux store, giving you less boilerplate, built-in best practices, and a cleaner setup than `createStore()`.

29. What is `createSlice()` and what does it generate?
    Generates a Redux slice — a self-contained module of the Redux state, including the state, reducers, and action creators for one feature.

30. How does Redux Toolkit handle immutability internally?
    Redux Toolkit uses Immer to let you write simpler “mutable” code while keeping your Redux state immutable under the hood — safe, fast, and error-free.

### createSlice and Reducers

31. What is Immer and how does Redux Toolkit use it?
    Immer makes writing immutable logic easy by letting you write code as if you're mutating objects. Redux Toolkit uses Immer internally, so your reducers are simpler, cleaner, and safe

32. How do you write "mutating" logic in Redux Toolkit reducers?

33. What are the properties of the object passed to `createSlice()`?
    `createSlice()` takes an object with name, initialState, reducers, and optionally extraReducers — making it a complete module for a feature’s state and logic.

34. How do you handle multiple actions that update the same state in RTK?
35. What is the difference between `extraReducers` and `reducers` in `createSlice()`?

### Actions and Action Creators

36. How does `createSlice()` automatically generate action creators?
37. What is `createAction()` and when would you use it standalone?
38. How do you create action creators with custom payload preparation?
39. What is the `prepare` callback in action creators?
40. How do you handle actions with no payload in Redux Toolkit?

### Advanced RTK

41. What is `createAsyncThunk()` and how does it handle async operations?
42. How do you handle pending, fulfilled, and rejected states with `createAsyncThunk()`?
43. What is `createEntityAdapter()` and what problem does it solve?
44. How do you use selectors with `createEntityAdapter()`?
45. What is `createSelector()` and how does it help with performance?

### RTK Best Practices

46. What are the recommended patterns for structuring RTK slices?
47. How do you handle side effects in Redux Toolkit?
48. What is the "ducks" pattern and how does RTK relate to it?
49. How do you migrate from plain Redux to Redux Toolkit?
50. What are the debugging tools available with Redux Toolkit?

## Bonus Conceptual Questions

### Redux Philosophy

- When should you use Redux vs local component state?
- What are the trade-offs of using Redux in a small application?
- How do you decide what should go into Redux store vs component state?
- What are alternatives to Redux and when might you choose them?

### Performance and Optimization

- How can you optimize Redux applications for better performance?
- What is the role of memoization in Redux applications?
- How do you prevent unnecessary re-renders in Redux?
- What are the common performance pitfalls when using Redux?
