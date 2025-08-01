# TypeScript with Redux Toolkit and RTK Query

## Table of Contents

1. [Setting Up Redux Toolkit with TypeScript](#setting-up-redux-toolkit-with-typescript)
2. [Type-Safe Store Configuration](#type-safe-store-configuration)
3. [Creating Type-Safe Slices](#creating-type-safe-slices)
4. [Typing Redux Toolkit's createAsyncThunk](#typing-createasyncthunk)
5. [RTK Query with TypeScript](#rtk-query-with-typescript)
6. [Advanced TypeScript Patterns](#advanced-typescript-patterns)
7. [Best Practices](#best-practices)

## Setting Up Redux Toolkit with TypeScript

### Installation

```bash
npm install @reduxjs/toolkit react-redux
npm install --save-dev typescript @types/react-redux
```

### Basic Files Structure

```
src/
├── store/
│   ├── index.ts               # Main store configuration
│   ├── hooks.ts               # Custom Redux hooks
│   └── slices/                # Redux slices
│       ├── userSlice.ts
│       └── ...
└── services/                  # RTK Query services
    └── api.ts
```

## Type-Safe Store Configuration

### store/index.ts

```typescript
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import { apiSlice } from "../services/api";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### store/hooks.ts

```typescript
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./index";

// Use these typed hooks throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

## Creating Type-Safe Slices

### store/slices/userSlice.ts

```typescript
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../index";

// Define a type for the slice state
interface User {
  id: string;
  name: string;
  email: string;
}

// Define the initial state using the interface
interface UserState {
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearUser: (state) => {
      state.currentUser = null;
    },
  },
});

// Export actions and reducer
export const { setUser, setLoading, setError, clearUser } = userSlice.actions;

// Selectors
export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const selectUserLoading = (state: RootState) => state.user.isLoading;
export const selectUserError = (state: RootState) => state.user.error;

export default userSlice.reducer;
```

## Typing createAsyncThunk

```typescript
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../index";

// Define types for our data
interface Product {
  id: string;
  title: string;
  price: number;
}

interface ProductsState {
  items: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Define initial state
const initialState: ProductsState = {
  items: [],
  status: "idle",
  error: null,
};

// Define async thunk function
export const fetchProducts = createAsyncThunk<
  Product[], // Return type
  void, // Arg type (void means no argument)
  {
    // ThunkAPI configuration
    rejectValue: string; // Type for rejectValue
    state: RootState; // State type for getState
  }
>("products/fetchProducts", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch("https://api.example.com/products");
    if (!response.ok) {
      throw new Error("Server error");
    }
    const data = await response.json();
    return data as Product[];
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Unknown error"
    );
  }
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Unknown error";
      });
  },
});

export default productsSlice.reducer;
```

## RTK Query with TypeScript

### services/api.ts

```typescript
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define interfaces for your data
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}

interface CreatePostRequest {
  title: string;
  body: string;
  userId: number;
}

// Define your API service
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    // Define typed endpoints
    getPosts: builder.query<PostResponse, void>({
      query: () => "/posts",
      providesTags: (result) =>
        result
          ? [
              ...result.posts.map(({ id }) => ({ type: "Post" as const, id })),
              { type: "Post", id: "LIST" },
            ]
          : [{ type: "Post", id: "LIST" }],
    }),

    getPostById: builder.query<Post, number>({
      query: (id) => `/posts/${id}`,
      providesTags: (_, __, id) => [{ type: "Post", id }],
    }),

    addPost: builder.mutation<Post, CreatePostRequest>({
      query: (newPost) => ({
        url: "/posts/add",
        method: "POST",
        body: newPost,
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),

    updatePost: builder.mutation<Post, Partial<Post> & { id: number }>({
      query: ({ id, ...patch }) => ({
        url: `/posts/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: "Post", id }],
    }),

    deletePost: builder.mutation<{ id: number; deleted: boolean }, number>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, id) => [{ type: "Post", id }],
    }),
  }),
});

// Export auto-generated hooks for your endpoints
export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = apiSlice;
```

### Using RTK Query hooks:

```typescript
// Component using RTK Query hooks
import React from "react";
import { useGetPostsQuery, useAddPostMutation } from "../services/api";

const PostsList: React.FC = () => {
  const { data, error, isLoading, isFetching, refetch } = useGetPostsQuery();
  const [addPost, { isLoading: isAddingPost }] = useAddPostMutation();

  const handleAddPost = async () => {
    try {
      await addPost({
        title: "New Post",
        body: "This is a new post content",
        userId: 1,
      }).unwrap();
      // Success handling
    } catch (error) {
      // Error handling
      console.error("Failed to add post:", error);
    }
  };

  if (isLoading) return <div>Loading posts...</div>;
  if (error) return <div>Error loading posts!</div>;

  return (
    <div>
      <h1>Posts</h1>
      {isFetching && <div>Refreshing...</div>}
      <button onClick={() => refetch()}>Refresh Posts</button>
      <button onClick={handleAddPost} disabled={isAddingPost}>
        {isAddingPost ? "Adding..." : "Add New Post"}
      </button>
      <ul>
        {data?.posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default PostsList;
```

## Advanced TypeScript Patterns

### Enhanced Action Types

```typescript
// With additional metadata
interface MetaPayload {
  timestamp: number;
  source: string;
}

// Using createAction with metadata
import { createAction } from "@reduxjs/toolkit";

const logAction = createAction<string, string, MetaPayload>(
  "log/event",
  (message) => ({
    payload: message,
    meta: {
      timestamp: Date.now(),
      source: "user-action",
    },
  })
);

// Usage
dispatch(logAction("User clicked the button"));
```

### Type-Safe Selectors with Parameters

```typescript
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Base selectors
const selectTodos = (state: RootState) => state.todos.items;

// Parameterized selector
export const selectTodoById = createSelector(
  [
    selectTodos,
    (_state: RootState, todoId: string) => todoId, // The second argument is passed through
  ],
  (todos, todoId) => todos.find((todo) => todo.id === todoId)
);

// Usage
const specificTodo = useAppSelector((state) =>
  selectTodoById(state, "todo-123")
);
```

### Type-Safe Normalized State

```typescript
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define your entity type
interface TodoEntity {
  id: string;
  text: string;
  completed: boolean;
  userId: string;
}

// Create the entity adapter
const todosAdapter = createEntityAdapter<TodoEntity>({
  // Optional: Customize how entities are stored
  selectId: (todo) => todo.id,
  // Optional: Customize how entities are sorted
  sortComparer: (a, b) => a.text.localeCompare(b.text),
});

// Create the slice
const todosSlice = createSlice({
  name: "todos",
  initialState: todosAdapter.getInitialState({
    status: "idle" as "idle" | "loading" | "succeeded" | "failed",
    error: null as string | null,
  }),
  reducers: {
    // Use the adapter's CRUD functions as reducers
    todoAdded: todosAdapter.addOne,
    todosAdded: todosAdapter.addMany,
    todoUpdated: todosAdapter.updateOne,
    todoRemoved: todosAdapter.removeOne,
  },
});

// Export actions and reducer
export const { todoAdded, todosAdded, todoUpdated, todoRemoved } =
  todosSlice.actions;
export default todosSlice.reducer;

// Create and export the normalized selectors
export const {
  selectAll: selectAllTodos,
  selectById: selectTodoById,
  selectIds: selectTodoIds,
  // Additional selectors can be created with `createSelector`
} = todosAdapter.getSelectors<RootState>((state) => state.todos);
```

## Best Practices

### 1. Organize Type Definitions

Keep your type definitions organized:

```typescript
// types/index.ts
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
}

// Import from a central location
import { User, Post } from "../types";
```

### 2. Use `immer` Correctly

Redux Toolkit uses Immer under the hood, which allows for "mutating" logic in reducers while actually producing immutable updates. TypeScript works well with this:

```typescript
const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // This looks like mutation but is safe thanks to Immer
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.entities[action.payload];
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});
```

### 3. Type-Safe Middleware

```typescript
import { Middleware } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export const loggerMiddleware: Middleware<
  {}, // extra argument supplied to the middleware
  RootState // type of state
> = (store) => (next) => (action) => {
  console.log("dispatching", action);
  const result = next(action);
  console.log("next state", store.getState());
  return result;
};
```

### 4. TypeScript with Redux DevTools

```typescript
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  // Type-safe middleware array
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware).prepend(otherMiddleware),
});
```

### 5. Async Action Type Safety

Ensure both success and error cases are properly typed:

```typescript
interface MyData {
  id: string;
  name: string;
}

export const fetchData = createAsyncThunk<
  MyData[], // Return type on success
  void, // First argument to the payloadCreator
  {
    rejectValue: {
      // Return type on error
      errorMessage: string;
      statusCode: number;
    };
  }
>("data/fetch", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch("https://api.example.com/data");
    if (!response.ok) {
      return rejectWithValue({
        errorMessage: `Server error: ${response.statusText}`,
        statusCode: response.status,
      });
    }
    return await response.json();
  } catch (err) {
    return rejectWithValue({
      errorMessage: err instanceof Error ? err.message : "Unknown error",
      statusCode: 500,
    });
  }
});
```

### 6. Configuration Type Safety

For apps with configuration, ensure type safety:

```typescript
// Ensure environment variables are type-safe
interface EnvConfig {
  API_URL: string;
  DEBUG_MODE: boolean;
}

// Validate at runtime that all required config is present
const validateConfig = (): EnvConfig => {
  if (!process.env.REACT_APP_API_URL) {
    throw new Error("Missing REACT_APP_API_URL environment variable");
  }

  return {
    API_URL: process.env.REACT_APP_API_URL,
    DEBUG_MODE: process.env.REACT_APP_DEBUG_MODE === "true",
  };
};

// Use the validated config in your app
export const config = validateConfig();
```

### 7. Use TypeScript Path Aliases

Configure TypeScript path aliases for cleaner imports:

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "@store/*": ["store/*"],
      "@services/*": ["services/*"],
      "@components/*": ["components/*"],
      "@hooks/*": ["hooks/*"],
      "@types": ["types/index"]
    }
  }
}
```

Then use them in your code:

```typescript
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { selectUser } from "@store/userSlice";
import { User } from "@types";
```
