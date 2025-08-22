# Async Operations

## createAsyncThunk and extraReducers

```js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/");
  const data = await response.json();
  return data;
});

const initialState = {
  todos: [],
  status: "idle",
  error: null,
};

const todoReducer = createSlice({
  name: "todo",
  initialState,
  reducers: {
    postAdd,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.todos = state.todos.concat(action.payload);
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(fetchTodos.pending, (state, action) => {
      state.status = "loading";
    });
  },
});

export default todoReducer.reducer;
```

## Adding Todo by POST MEHTOD

```js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await fetch("https://dummyjson.com/todos");
  const data = await response.json();
  return data;
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (intialPost) => {
    const response = await fetch("https://dummyjson.com/todos/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(intialPost),
    });
    const data = await response.json();
    return data;
  }
);

const initialState = {
  todos: [],
  status: "idle",
  error: null,
};

const todoReducer = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.todos = state.todos.concat(action.payload);
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(fetchTodos.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(addNewPost.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.todos = state.todos.concat(action.payload);
    });
  },
});

export default todoReducer.reducer;
```

`NOTE:` unwrap() method is used to handle error at the time of calling a async function rather than on both places.

## Improving Render Behaviour

`useSelector()` will re-run everytime when action is dispatched.
Our goal is to "memoize" the data for same input so that we don't need to re-render everytime dispatch is called.

`createSelector` (provided by the Reselect library) is a function that helps you create memoized selector functions. Memoization is an optimization technique that caches the results of a function call based on its arguments. This can significantly improve performance in Redux applications by avoiding redundant calculations when the input data hasn't changed.

How Does createSelector Work?

createSelector takes two or more arguments:

`Input Selectors:` These are regular selector functions that extract specific pieces of data from the Redux state object.
`Output Selector (Result Function):` This function receives the results (return values) of the input selectors as its arguments and combines or processes them to produce the final value you need in your component.

### Benefits of Using createSelector

`Performance Optimization:` By memoizing calculations, createSelector ensures that the output selector is only re-evaluated when the input state values it depends on have actually changed. This prevents unnecessary re-renders of components that rely on the selector's output.
`Readability and Maintainability:` createSelector promotes a clear separation of concerns. Input selectors focus on fetching specific data, while the output selector performs the necessary transformations. This makes your code easier to understand and reason about.
`Error Handling:` You can handle potential errors within the output selector, providing better feedback in case of unexpected state values.
Example:

```js
import { createSelector } from "reselect";

// Input selectors
const selectTodos = (state) => state.todos;
const selectFilter = (state) => state.filter;

// Output selector (memoized)
const selectFilteredTodos = createSelector(
  [selectTodos, selectFilter], // Dependencies (input selectors)
  (todos, filter) => {
    switch (filter) {
      case "SHOW_ALL":
        return todos;
      case "SHOW_COMPLETED":
        return todos.filter((todo) => todo.completed);
      case "SHOW_PENDING":
        return todos.filter((todo) => !todo.completed);
      default:
        throw new Error("Unknown filter: " + filter);
    }
  }
);
```

selectTodos retrieves the entire todos array from the Redux state.
selectFilter retrieves the current filter value ('SHOW_ALL', 'SHOW_COMPLETED', etc.).
selectFilteredTodos is a memoized selector created using createSelector. When it's called with the current state, it first checks whether the input state values (todos and filter) have changed since the last call. If they haven't, it returns the cached result. Otherwise, it executes the provided output selector function to re-calculate the filtered todos based on the current filter value.
When to Use createSelector:

When you need to derive a value from multiple slices of state in your Redux application.
When the calculation to derive the desired value is complex or expensive, and you want to avoid redundant computations.
When you want to improve the overall performance of your Redux application by reducing unnecessary re-renders of components.

## CreateSelector vs Simple Selector

**Before (Without Memoization):**

```JavaScript
import React from 'react';
import { useSelector } from 'react-redux';

const MyComponent = () => {
  const allTodos = useSelector(state => state.todos); // Selects entire todos array
  const completedTodos = allTodos.filter(todo => todo.completed); // Filters completed todos in every render

  return (
    <div>
      <h2>Completed Todos</h2>
      <ul>
        {completedTodos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
};
```

In this example, MyComponent retrieves the entire todos array from the Redux store using useSelector. Then, it filters the completed todos within the component's render method. This filtering happens on every render, even if the todos array hasn't changed. If the todos array is large, this can lead to performance issues.

**After (With Memoization Using createSelector):**

```JavaScript
import React from 'react';
import { useSelector, createSelector } from 'react-redux';

const getTodos = state => state.todos; // Selector to retrieve todos array
const getCompletedTodos = createSelector(
getTodos, // Input selector
todos => todos.filter(todo => todo.completed) // Transformation function
);

const MyComponent = () => {
const completedTodos = useSelector(getCompletedTodos); // Selects filtered todos

return (
  <div>
  <h2>Completed Todos</h2>
  <ul>
    {completedTodos.map(todo => (
      <li key={todo.id}>{todo.text}</li>
    ))}
  </ul>
  </div>
);
};
```

Here, we've created two selectors:

`getTodos:` This simple selector retrieves the entire todos array from the state.
`getCompletedTodos:` This is a memoized selector created using createSelector. It takes getTodos as an input selector and a transformation function that filters the completed todos.

Now, when MyComponent renders, it uses useSelector with getCompletedTodos. The createSelector function internally stores the result of the filtering based on the todos array. If the todos array hasn't changed since the last render, createSelector will return the cached value (filtered completed todos) without re-filtering. This significantly improves performance, especially when the todos array is large or changes infrequently.

## Normalizing Data

When we are dealing with large data set it is wise to store data in a Normalized state:-

- Only one copy of each particular piece of data.
- Data can be normalized in a lookup table where key is ID and Object as value.
- There can be an array of only IDs of an object for the ease of an operation.

```js
// Simple Example
const users = [
  { id: 1, name: "John", email: "john@gmail.com" },
  { id: 2, name: "Jane", email: "jane@gmail.com" },
  { id: 3, name: "Morgan", email: "morgan@gmail.com" },
  { id: 4, name: "Jim", email: "jimmy@gmail.com" },
];

// Normalized state
const users = {
  ids: [1, 2, 3, 4],
  entities: {
    1: { id: 1, name: "John", email: "john@gmail.com" },
    2: { id: 2, name: "Jane", email: "jane@gmail.com" },
    3: { id: 3, name: "Morgan", email: "morgan@gmail.com" },
    4: { id: 4, name: "Jim", email: "jimmy@gmail.com" },
  },
};
```

## createEntitySelector

`createEntityAdapter` is a utility provided by Redux Toolkit that simplifies the management of normalized data in a Redux store.

createEntityAdapter helps in managing normalized data by providing predefined reducer functions and selectors tailored for common CRUD (Create, Read, Update, Delete) operations on entities.

- createEntityAdapter just manages data of the store and nothing else not fetching

## Using createEntityAdpater

```js
import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("https://dummyjson.com/users");
  const data = await response.json();
  return data.users;
});

const usersAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.id - a.id,
});

const initialState = usersAdapter.getInitialState({
  status: "idle",
  error: null,
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.status = "succeeded";
      usersAdapter.upsertMany(state, action.payload);
    });
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.status = "loading";
    });
  },
});

export const { selectAll, selectById, selectEntities, selectIds, selectTotal } =
  usersAdapter.getSelectors((state) => state.users);

export default userSlice.reducer;
```

## Using Data fetched in component

```js
// User.jsx
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  selectAll,
  selectById,
  selectEntities,
  selectIds,
  selectTotal,
} from "./usersSlice";
import { useEffect } from "react";

const User = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector(selectAll);
  console.log(allUsers);

  const userById = useSelector((state) => selectById(state, 2));
  console.log(userById);

  const entities = useSelector(selectEntities);
  console.log(entities);

  const allIds = useSelector(selectIds);
  console.log(allIds);

  const total = useSelector(selectTotal);
  console.log(total);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  return <div>User</div>;
};

export default User;
```
