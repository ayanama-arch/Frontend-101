# Redux Essentials: Async Logic & Data Fetching - Complete Notes

## 🎯 Key Learning Goals
- Use Redux "thunk" middleware for async logic
- Handle async request state patterns
- Use `createAsyncThunk` API for managing async calls

## 🔧 Prerequisites Setup
- Mock API server using Mock Service Worker (MSW)
- Fake REST API endpoints: `/fakeApi/posts`, `/fakeApi/users`, `/fakeApi/notifications`
- HTTP client object with `.get()` and `.post()` methods

## 🔄 Redux Async Flow

### Why Middleware is Needed
Redux store by itself only knows:
- ✅ Synchronous action dispatch
- ✅ State updates via reducers
- ✅ UI notifications
- ❌ Async logic (HTTP calls, timers, etc.)

### Middleware Capabilities
```javascript
// Middleware extends the store to:
// 1. Execute extra logic on any action dispatch
// 2. Pause, modify, delay, replace, or halt actions
// 3. Access dispatch and getState
// 4. Accept functions and promises instead of plain objects
```

### Updated Data Flow
```
UI Event → Middleware (HTTP request) → Action Dispatch → Reducer → Store Update → UI Update
```

## 🎣 Thunks Explained

### What is a Thunk?
> A "thunk" = "a piece of code that does some delayed work"

### Basic Thunk Function
```javascript
const exampleThunk = (dispatch, getState) => {
  const stateBefore = getState()
  console.log(`Counter before: ${stateBefore.counter}`)
  dispatch(increment())
  const stateAfter = getState()
  console.log(`Counter after: ${stateAfter.counter}`)
}

store.dispatch(exampleThunk)
```

### Thunk Action Creator Pattern
```javascript
const logAndAdd = (amount) => {
  return (dispatch, getState) => {
    const stateBefore = getState()
    console.log(`Counter before: ${stateBefore.counter}`)
    dispatch(incrementByAmount(amount))
    const stateAfter = getState()
    console.log(`Counter after: ${stateAfter.counter}`)
  }
}

store.dispatch(logAndAdd(5))
```

## 📊 Loading State Pattern

### Standard Request States
```typescript
interface RequestState {
  status: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null
}
```

### State Meanings
- **idle**: Request hasn't started yet
- **pending**: Request is in progress
- **succeeded**: Request completed successfully
- **failed**: Request failed with error

### Updated Posts State Structure
```typescript
interface PostsState {
  posts: Post[]
  status: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: PostsState = {
  posts: [],
  status: 'idle',
  error: null
}
```

## 🚀 createAsyncThunk API

### Basic Usage
```javascript
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchItemById = createAsyncThunk(
  'items/fetchItemById',        // Action type prefix
  async (itemId) => {           // Payload creator function
    const item = await someHttpRequest(itemId)
    return item                 // This becomes action.payload
  }
)
```

### Real Example - Fetching Posts
```javascript
export const fetchPosts = createAppAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts')
  return response.data
})
```

### Generated Actions
When you call `dispatch(fetchPosts())`:
1. `posts/fetchPosts/pending` - immediately dispatched
2. `posts/fetchPosts/fulfilled` - dispatched on success with data
3. `posts/fetchPosts/rejected` - dispatched on error

## 🎛️ Handling Async Actions in Reducers

### Using extraReducers
```javascript
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // regular reducers
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.posts.push(...action.payload) // Add fetched posts
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Unknown Error'
      })
  }
})
```

## 🔍 Component Integration

### Dispatching Thunks in Components
```javascript
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './hooks'

export const PostsList = () => {
  const dispatch = useAppDispatch()
  const posts = useAppSelector(selectAllPosts)
  const postStatus = useAppSelector(selectPostsStatus)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  // Render based on status...
}
```

### Conditional Rendering Based on Status
```javascript
let content

if (postStatus === 'pending') {
  content = <Spinner text="Loading..." />
} else if (postStatus === 'succeeded') {
  content = posts.map(post => <PostExcerpt key={post.id} post={post} />)
} else if (postStatus === 'failed') {
  content = <div>Error: {error}</div>
}

return <section>{content}</section>
```

## 🚫 Preventing Duplicate Requests

### Problem: React StrictMode
In development, React runs `useEffect` twice, causing duplicate requests.

### Solution: Condition Function
```javascript
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const response = await client.get('/fakeApi/posts')
    return response.data
  },
  {
    condition(arg, thunkApi) {
      const postsStatus = selectPostsStatus(thunkApi.getState())
      if (postsStatus !== 'idle') {
        return false // Cancel the thunk
      }
    }
  }
)
```

## 📤 Sending Data with Thunks

### Creating New Posts
```javascript
export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (initialPost) => {
    const response = await client.post('/fakeApi/posts', initialPost)
    return response.data // Server returns complete post with ID
  }
)
```

### Handling in Reducer
```javascript
extraReducers(builder) {
  builder.addCase(addNewPost.fulfilled, (state, action) => {
    state.posts.push(action.payload) // Add the new post
  })
}
```

## 🎯 Component-Level Request Handling

### Tracking Request Status in Component
```javascript
export const AddPostForm = () => {
  const [addRequestStatus, setAddRequestStatus] = useState('idle')
  const dispatch = useAppDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      setAddRequestStatus('pending')
      await dispatch(addNewPost({ title, content, user: userId })).unwrap()
      form.reset() // Clear form on success
    } catch (err) {
      console.error('Failed to save the post:', err)
    } finally {
      setAddRequestStatus('idle')
    }
  }
}
```

### Key Points about `.unwrap()`
- `dispatch(asyncThunk())` returns a Promise that always "succeeds"
- `.unwrap()` returns a Promise that throws on rejection
- Allows normal try/catch error handling

## 📝 TypeScript Integration

### Defining Pre-typed createAsyncThunk
```typescript
// app/withTypes.ts
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
}>()
```

### Using Typed Thunks
```typescript
export const fetchPosts = createAppAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const response = await client.get<Post[]>('/fakeApi/posts')
    return response.data
  }
)
```

### Reusable AppThunk Type
```typescript
export type AppThunk = ThunkAction<void, RootState, unknown, Action>

const logAndAdd = (amount: number): AppThunk => {
  return (dispatch, getState) => {
    // TypeScript knows the types automatically
  }
}
```

## 🔄 Complete Data Flow Example

1. **Component mounts** → `useEffect` runs
2. **Check status** → Only proceed if `status === 'idle'`
3. **Dispatch thunk** → `dispatch(fetchPosts())`
4. **Pending action** → Status becomes `'pending'`, UI shows spinner
5. **HTTP request** → API call made in background
6. **Success/Failure** → Fulfilled or rejected action dispatched
7. **Update state** → Posts added or error stored
8. **Re-render** → Component shows new data or error

## 🎖️ Best Practices Summary

### ✅ Do:
- Use `createAsyncThunk` for API calls
- Track loading states with status enums
- Use condition functions to prevent duplicate requests
- Handle errors gracefully with `.unwrap()`
- Fetch data on app startup when appropriate

### ❌ Don't:
- Make API calls directly in reducers
- Ignore loading and error states
- Forget to handle rejected actions
- Dispatch the same request multiple times unnecessarily

### 🔮 Future: RTK Query
> RTK Query (covered in Part 7) automates most of this:
> - Automatic request deduplication
> - Built-in caching
> - No manual thunk writing needed
> - Handles loading states automatically

## 📋 Quick Reference

### Essential Selectors
```javascript
export const selectAllPosts = (state) => state.posts.posts
export const selectPostsStatus = (state) => state.posts.status
export const selectPostsError = (state) => state.posts.error
```

### Common Patterns
```javascript
// Fetch on mount
useEffect(() => {
  if (status === 'idle') {
    dispatch(fetchData())
  }
}, [status, dispatch])

// Handle form submission
const handleSubmit = async (e) => {
  try {
    await dispatch(createItem(data)).unwrap()
    // Success handling
  } catch (err) {
    // Error handling
  }
}
```