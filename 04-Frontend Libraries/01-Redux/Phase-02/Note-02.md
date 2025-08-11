# Redux Essentials Part 4: Key Concepts and Examples

## List of Concepts Covered

1. **Component Data Selection** - Reading specific data from Redux store
2. **URL Parameters with Redux** - Using React Router params with Redux selectors
3. **State Updates with Actions** - Creating actions to modify existing data
4. **Prepare Callbacks** - Customizing action payloads before dispatch
5. **Selector Functions** - Reusable functions for accessing state
6. **Multiple State Slices** - Managing different data domains
7. **Cross-Slice Data Relationships** - Connecting data between slices
8. **Action Payload Design** - Structuring action data effectively
9. **State Normalization Patterns** - Organizing related data
10. **ExtraReducers** - Handling actions from other slices
11. **Conditional UI Rendering** - Using Redux state for UI decisions
12. **State Reset Patterns** - Clearing state on specific actions

---

## Detailed Concept Explanations with Examples

### 1. Component Data Selection

**Concept**: Components should select only the minimal data they need from the Redux store.

**Example**:

```tsx
// ❌ Bad - selecting entire state
const allData = useAppSelector((state) => state);

// ✅ Good - selecting only needed data
const posts = useAppSelector((state) => state.posts);
const currentUser = useAppSelector((state) => state.auth.username);

// ✅ Even better - selecting specific item
const post = useAppSelector((state) =>
  state.posts.find((post) => post.id === postId)
);
```

### 2. URL Parameters with Redux

**Concept**: Combine React Router's `useParams` with Redux selectors to fetch specific data.

**Example**:

```tsx
import { useParams } from "react-router-dom";
import { useAppSelector } from "./hooks";

const ProductPage = () => {
  const { productId } = useParams();

  const product = useAppSelector((state) =>
    state.products.find((p) => p.id === productId)
  );

  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
    </div>
  );
};
```

### 3. State Updates with Actions

**Concept**: Create specific actions and reducers to update existing data in the store.

**Example**:

```tsx
// Slice definition
const todosSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    // Adding new todo
    todoAdded(state, action) {
      state.push(action.payload);
    },
    // Updating existing todo
    todoUpdated(state, action) {
      const { id, text, completed } = action.payload;
      const existingTodo = state.find((todo) => todo.id === id);
      if (existingTodo) {
        existingTodo.text = text;
        existingTodo.completed = completed;
      }
    },
  },
});

// Component usage
const TodoItem = ({ todo }) => {
  const dispatch = useAppDispatch();

  const handleUpdate = () => {
    dispatch(
      todoUpdated({
        id: todo.id,
        text: "Updated text",
        completed: !todo.completed,
      })
    );
  };

  return (
    <div>
      <span>{todo.text}</span>
      <button onClick={handleUpdate}>Toggle</button>
    </div>
  );
};
```

### 4. Prepare Callbacks

**Concept**: Use prepare callbacks to customize action payloads, generate IDs, timestamps, etc.

**Example**:

```tsx
const postsSlice = createSlice({
  name: "posts",
  initialState: [],
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      // Prepare callback - runs before the reducer
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(), // Generate unique ID
            title,
            content,
            userId,
            timestamp: Date.now(),
            likes: 0,
          },
        };
      },
    },
  },
});

// Component usage - simpler dispatch
const AddPost = () => {
  const dispatch = useAppDispatch();

  const handleSubmit = (title, content, userId) => {
    // Just pass the raw values, prepare callback handles the rest
    dispatch(postAdded(title, content, userId));
  };
};
```

### 5. Selector Functions

**Concept**: Create reusable selector functions to encapsulate state access logic.

**Example**:

```tsx
// In slice file
export const selectAllTodos = (state) => state.todos;
export const selectTodoById = (state, todoId) =>
  state.todos.find((todo) => todo.id === todoId);
export const selectCompletedTodos = (state) =>
  state.todos.filter((todo) => todo.completed);

// In components
const TodoList = () => {
  const todos = useAppSelector(selectAllTodos);
  const completedTodos = useAppSelector(selectCompletedTodos);

  return (
    <div>
      <h3>All Todos: {todos.length}</h3>
      <h3>Completed: {completedTodos.length}</h3>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

const EditTodo = () => {
  const { todoId } = useParams();
  const todo = useAppSelector((state) => selectTodoById(state, todoId));

  if (!todo) return <div>Todo not found</div>;

  return <form>...</form>;
};
```

### 6. Multiple State Slices

**Concept**: Organize different data domains into separate slices for better maintainability.

**Example**:

```tsx
// usersSlice.ts
const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    userAdded(state, action) {
      state.push(action.payload);
    },
  },
});

// postsSlice.ts
const postsSlice = createSlice({
  name: "posts",
  initialState: [],
  reducers: {
    postAdded(state, action) {
      state.push(action.payload);
    },
  },
});

// store.ts
export const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
  },
});

// State shape: { users: [...], posts: [...] }
```

### 7. Cross-Slice Data Relationships

**Concept**: Connect data between different slices using selectors and relationships.

**Example**:

```tsx
// Posts have authorId field referencing users
const postsSlice = createSlice({
  name: "posts",
  initialState: [],
  reducers: {
    postAdded: {
      prepare(title, content, authorId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            authorId, // Reference to user
          },
        };
      },
    },
  },
});

// Selector to get post with author info
export const selectPostWithAuthor = (state, postId) => {
  const post = selectPostById(state, postId);
  const author = selectUserById(state, post?.authorId);
  return { post, author };
};

// Component using related data
const PostDetail = () => {
  const { postId } = useParams();
  const { post, author } = useAppSelector((state) =>
    selectPostWithAuthor(state, postId)
  );

  return (
    <article>
      <h2>{post.title}</h2>
      <p>By: {author?.name}</p>
      <p>{post.content}</p>
    </article>
  );
};
```

### 8. Action Payload Design

**Concept**: Design action payloads to contain minimal necessary information.

**Example**:

```tsx
// ✅ Good - minimal payload
const likesSlice = createSlice({
  name: "likes",
  initialState: {},
  reducers: {
    postLiked(state, action) {
      const { postId } = action.payload;
      state[postId] = (state[postId] || 0) + 1;
    },
  },
});

// Usage
dispatch(postLiked({ postId: "123" }));

// ❌ Avoid - don't pre-calculate in component
dispatch(
  postLiked({
    postId: "123",
    newCount: currentCount + 1, // Let reducer calculate this
  })
);
```

### 9. State Normalization Patterns

**Concept**: Structure related data efficiently for easy access and updates.

**Example**:

```tsx
// Normalized state structure
const initialState = {
  posts: [
    { id: "1", title: "Post 1", authorId: "user1", categoryId: "tech" },
    { id: "2", title: "Post 2", authorId: "user2", categoryId: "life" },
  ],
  users: [
    { id: "user1", name: "Alice" },
    { id: "user2", name: "Bob" },
  ],
  categories: [
    { id: "tech", name: "Technology" },
    { id: "life", name: "Lifestyle" },
  ],
};

// Selectors for normalized data
export const selectPostsWithDetails = (state) => {
  return state.posts.map((post) => ({
    ...post,
    author: state.users.find((u) => u.id === post.authorId),
    category: state.categories.find((c) => c.id === post.categoryId),
  }));
};
```

### 10. ExtraReducers

**Concept**: Handle actions from other slices to coordinate state updates.

**Example**:

```tsx
// authSlice.ts
const authSlice = createSlice({
  name: "auth",
  initialState: { user: null },
  reducers: {
    userLoggedOut(state) {
      state.user = null;
    },
  },
});

// postsSlice.ts - listens to auth actions
const postsSlice = createSlice({
  name: "posts",
  initialState: [],
  reducers: {
    postAdded(state, action) {
      state.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLoggedOut, (state) => {
      // Clear posts when user logs out
      return [];
    });
  },
});

// One action, multiple state updates
dispatch(userLoggedOut()); // Updates both auth and posts slices
```

### 11. Conditional UI Rendering

**Concept**: Use Redux state to conditionally show/hide UI elements.

**Example**:

```tsx
const PostActions = ({ post }) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const isAuthor = currentUser?.id === post.authorId;
  const isAdmin = currentUser?.role === "admin";

  return (
    <div>
      {/* Anyone can like */}
      <button onClick={() => dispatch(postLiked({ postId: post.id }))}>
        Like ({post.likes})
      </button>

      {/* Only author can edit */}
      {isAuthor && <Link to={`/edit/${post.id}`}>Edit</Link>}

      {/* Only admin can delete */}
      {isAdmin && (
        <button onClick={() => dispatch(postDeleted({ postId: post.id }))}>
          Delete
        </button>
      )}
    </div>
  );
};
```

### 12. State Reset Patterns

**Concept**: Reset specific state when certain conditions are met.

**Example**:

```tsx
const shoppingCartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    total: 0,
  },
  reducers: {
    itemAdded(state, action) {
      state.items.push(action.payload);
      state.total += action.payload.price;
    },
    cartCleared(state) {
      state.items = [];
      state.total = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderCompleted, (state) => {
        // Clear cart after successful order
        state.items = [];
        state.total = 0;
      })
      .addCase(userLoggedOut, (state) => {
        // Clear cart when user logs out
        return { items: [], total: 0 };
      });
  },
});
```

### 13. Builder Methods in ExtraReducers

**Concept**: Use different builder methods to handle various action patterns.

**Example**:

```tsx
const notificationsSlice = createSlice({
  name: "notifications",
  initialState: { items: [], unreadCount: 0 },
  reducers: {
    notificationAdded(state, action) {
      state.items.push(action.payload);
      state.unreadCount++;
    },
  },
  extraReducers: (builder) => {
    // addCase - handle specific action
    builder.addCase(userLoggedOut, (state) => {
      return { items: [], unreadCount: 0 };
    });

    // addMatcher - handle multiple related actions
    builder.addMatcher(
      (action) => action.type.endsWith("/pending"),
      (state, action) => {
        state.loading = true;
      }
    );

    builder.addMatcher(
      (action) => action.type.endsWith("/fulfilled"),
      (state, action) => {
        state.loading = false;
      }
    );

    // addDefaultCase - handle any unmatched actions
    builder.addDefaultCase((state, action) => {
      console.log("Unhandled action:", action.type);
    });
  },
});
```

### 14. Selectors Inside createSlice

**Concept**: Define selectors directly inside the slice definition for automatic scoping.

**Example**:

```tsx
const todosSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    todoAdded(state, action) {
      state.push(action.payload);
    },
  },
  selectors: {
    // Note: these receive only the slice state, not full RootState
    selectAllTodos: (todosState) => todosState,
    selectTodoById: (todosState, todoId) =>
      todosState.find((todo) => todo.id === todoId),
    selectCompletedTodos: (todosState) =>
      todosState.filter((todo) => todo.completed),
  },
  
});

// Export the auto-generated selectors
export const { selectAllTodos, selectTodoById, selectCompletedTodos } =
  todosSlice.selectors;

// Usage in components (same as before)
const TodoList = () => {
  const todos = useAppSelector(selectAllTodos);
  const completedTodos = useAppSelector(selectCompletedTodos);

  return <div>{/* render todos */}</div>;
};
```

### 15. Composed Selectors

**Concept**: Create selectors that use other selectors to build complex data.

**Example**:

```tsx
// Basic selectors
export const selectCurrentUserId = (state) => state.auth.currentUserId;
export const selectUserById = (state, userId) =>
  state.users.find((user) => user.id === userId);

// Composed selector
export const selectCurrentUser = (state) => {
  const currentUserId = selectCurrentUserId(state);
  return selectUserById(state, currentUserId);
};

// More complex composition
export const selectUserPosts = (state, userId) => {
  const posts = selectAllPosts(state);
  return posts.filter((post) => post.authorId === userId);
};

export const selectCurrentUserPosts = (state) => {
  const currentUser = selectCurrentUser(state);
  if (!currentUser) return [];
  return selectUserPosts(state, currentUser.id);
};
```

### 16. Protected Routes Pattern

**Concept**: Use Redux state to control route access and navigation.

**Example**:

```tsx
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAppSelector((state) => !!state.auth.user);
  const userRole = useAppSelector((state) => state.auth.user?.role);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const AdminRoute = ({ children }) => {
  const userRole = useAppSelector((state) => state.auth.user?.role);

  if (userRole !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

// Usage in routing
function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminPanel />
          </AdminRoute>
        }
      />
    </Routes>
  );
}
```

### 17. Meta and Error Fields in Actions

**Concept**: Use meta and error fields in prepare callbacks for additional action metadata.

**Example**:

```tsx
const postsSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],
    error: null,
    lastUpdated: null,
  },
  reducers: {
    postAdded: {
      reducer(state, action) {
        if (action.error) {
          state.error = action.payload;
          return;
        }
        state.items.push(action.payload);
        state.lastUpdated = action.meta.timestamp;
        state.error = null;
      },
      prepare(title, content) {
        const isValid = title.length > 0 && content.length > 0;

        if (!isValid) {
          return {
            payload: "Title and content are required",
            error: true,
            meta: { timestamp: Date.now() },
          };
        }

        return {
          payload: {
            id: nanoid(),
            title,
            content,
            createdAt: Date.now(),
          },
          meta: {
            timestamp: Date.now(),
            source: "user_input",
          },
        };
      },
    },
  },
});
```

### 18. Form Integration Patterns

**Concept**: Handle form data and validation with Redux state.

**Example**:

```tsx
// Form handling with controlled inputs
const PostForm = ({ initialPost = null }) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    title: initialPost?.title || "",
    content: initialPost?.content || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (initialPost) {
      // Update existing post
      dispatch(
        postUpdated({
          id: initialPost.id,
          ...formData,
        })
      );
    } else {
      // Create new post
      dispatch(postAdded(formData.title, formData.content));
    }

    // Reset form
    setFormData({ title: "", content: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formData.title}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            title: e.target.value,
          }))
        }
        required
      />
      <textarea
        value={formData.content}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            content: e.target.value,
          }))
        }
        required
      />
      <button type="submit">{initialPost ? "Update" : "Create"} Post</button>
    </form>
  );
};
```

### 19. Timestamp and Date Handling

**Concept**: Store dates as serializable strings and format them in components.

**Example**:

```tsx
// In slice - store as ISO strings
const postsSlice = createSlice({
  name: "posts",
  initialState: [],
  reducers: {
    postAdded: {
      prepare(title, content) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            createdAt: new Date().toISOString(), // Serializable string
            updatedAt: new Date().toISOString(),
          },
        };
      },
    },
    postUpdated(state, action) {
      const { id, ...updates } = action.payload;
      const post = state.find((p) => p.id === id);
      if (post) {
        Object.assign(post, updates);
        post.updatedAt = new Date().toISOString();
      }
    },
  },
});

// Component for displaying relative time
const TimeAgo = ({ timestamp }) => {
  const date = parseISO(timestamp);
  const timeAgo = formatDistanceToNow(date);

  return (
    <time dateTime={timestamp} title={timestamp}>
      {timeAgo} ago
    </time>
  );
};

// Usage
const PostItem = ({ post }) => (
  <article>
    <h3>{post.title}</h3>
    <TimeAgo timestamp={post.createdAt} />
    <p>{post.content}</p>
  </article>
);
```

### 20. Data Sorting and Filtering Patterns

**Concept**: Sort and filter data in selectors or components for display.

**Example**:

```tsx
// Sorting selector
export const selectPostsSortedByDate = (state) => {
  const posts = selectAllPosts(state);
  return posts.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
};

// Filtering selector
export const selectPostsByCategory = (state, category) => {
  const posts = selectAllPosts(state);
  return posts.filter((post) => post.category === category);
};

// Combined sorting and filtering
export const selectRecentPostsByUser = (state, userId, limit = 5) => {
  const posts = selectAllPosts(state);
  return posts
    .filter((post) => post.authorId === userId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, limit);
};

// Usage in component
const PostsList = () => {
  const [sortBy, setSortBy] = useState("date");
  const [filterCategory, setFilterCategory] = useState("all");

  const posts = useAppSelector((state) => {
    let selectedPosts = selectAllPosts(state);

    // Apply filtering
    if (filterCategory !== "all") {
      selectedPosts = selectPostsByCategory(state, filterCategory);
    }

    // Apply sorting
    if (sortBy === "date") {
      selectedPosts = selectPostsSortedByDate(state);
    }

    return selectedPosts;
  });

  return (
    <div>
      <select onChange={(e) => setFilterCategory(e.target.value)}>
        <option value="all">All Categories</option>
        <option value="tech">Technology</option>
        <option value="lifestyle">Lifestyle</option>
      </select>

      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};
```

## Key Takeaways

1. **Keep components focused** - Select minimal data needed
2. **Use selectors** - Encapsulate state access logic
3. **Design actions as events** - Think "what happened" not "set this value"
4. **Prepare callbacks** - Generate IDs and timestamps in actions
5. **ExtraReducers** - Coordinate updates across slices
6. **Normalize state** - Structure data for efficient access
7. **Conditional rendering** - Use Redux state for UI decisions
8. **State reset** - Clear data when appropriate events occur
9. **Builder patterns** - Use addCase, addMatcher, addDefaultCase appropriately
10. **Composed selectors** - Build complex selectors from simpler ones
11. **Protected routes** - Control navigation with Redux state
12. **Form integration** - Handle form state and validation patterns
