# Redux Reactive Logic - Key Concepts & Examples

## 1. Imperative vs Reactive Programming

### Concept: Different Approaches to Application Logic
Understanding the shift from manual event handling to automatic response patterns.

```javascript
// ❌ IMPERATIVE - Manual, explicit control
const AddPostButton = () => {
  const handleClick = () => {
    // Step 1: Dispatch action
    dispatch(addNewPost(postData))
    
    // Step 2: Manually show toast
    toast.show('Post added!')
    
    // Step 3: Manually update analytics
    analytics.track('post_created')
    
    // Step 4: Manually clear form
    setFormData({})
  }
  
  return <button onClick={handleClick}>Add Post</button>
}

// ✅ REACTIVE - Automatic responses to events
const AddPostButton = () => {
  const handleClick = () => {
    // Only dispatch the main action
    dispatch(addNewPost(postData))
    // Everything else happens automatically via listeners!
  }
  
  return <button onClick={handleClick}>Add Post</button>
}

// Separate reactive listeners handle side effects
startAppListening({
  actionCreator: addNewPost.fulfilled,
  effect: () => toast.show('Post added!')
})

startAppListening({
  actionCreator: addNewPost.fulfilled,  
  effect: () => analytics.track('post_created')
})
```

**Key Difference**: Reactive logic automatically responds to events rather than requiring manual coordination.

## 2. Why Middleware for Side Effects?

### Concept: Pure Reducers vs Side Effect Logic
Reducers must be pure - middleware handles "impure" operations.

```javascript
// ❌ FORBIDDEN - Side effects in reducers
const badSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: (state, action) => {
      state.posts.push(action.payload)
      
      // ❌ These are NOT allowed in reducers:
      toast.show('Post added!')           // DOM manipulation
      fetch('/api/analytics')             // Network request  
      localStorage.setItem('lastPost', id) // Browser API
      console.log('Post added')           // Console output
      setTimeout(() => {}, 1000)          // Async operations
    }
  }
})

// ✅ CORRECT - Side effects in middleware
const goodSlice = createSlice({
  name: 'posts', 
  initialState,
  reducers: {
    postAdded: (state, action) => {
      // Only pure state updates
      state.posts.push(action.payload)
    }
  }
})

// Side effects handled separately in middleware
startAppListening({
  actionCreator: postAdded,
  effect: async (action) => {
    // All side effects are allowed here:
    toast.show('Post added!')
    fetch('/api/analytics', { method: 'POST' })
    localStorage.setItem('lastPost', action.payload.id)
  }
})
```

**Rule**: Reducers = pure state updates, Middleware = side effects

## 3. createListenerMiddleware Setup

### Concept: Setting Up Reactive Logic Infrastructure
Multi-step process to enable listener-based reactive logic.

```javascript
// Step 1: Create listener middleware instance
import { createListenerMiddleware } from '@reduxjs/toolkit'

export const listenerMiddleware = createListenerMiddleware()

// Step 2: Create typed helper functions
export const startAppListening = listenerMiddleware.startListening.withTypes<
  RootState,
  AppDispatch
>()

// Step 3: Add to store configuration  
export const store = configureStore({
  reducer: { /* ... */ },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware)
})

// Step 4: Import and register listeners
import { addPostsListeners } from '@/features/posts/postsSlice'
addPostsListeners(startAppListening)
```

**Architecture**: One middleware instance handles all listeners across your app.

## 4. Listener Trigger Patterns

### Concept: Different Ways to Match Actions
Three main patterns for specifying when listeners should run.

```javascript
// Pattern 1: Specific Action Creator
startAppListening({
  actionCreator: addNewPost.fulfilled,
  effect: (action) => {
    console.log('New post added:', action.payload.title)
  }
})

// Pattern 2: Matcher Function (multiple actions)
import { isAnyOf } from '@reduxjs/toolkit'

startAppListening({
  matcher: isAnyOf(addNewPost.fulfilled, updatePost.fulfilled),
  effect: (action) => {
    console.log('Post was created or updated')
  }
})

// Pattern 3: Predicate Function (custom logic)
startAppListening({
  predicate: (action, currentState, previousState) => {
    // Run when user count changes
    return currentState.users.ids.length !== previousState.users.ids.length
  },
  effect: (action, listenerApi) => {
    const userCount = listenerApi.getState().users.ids.length
    analytics.track('user_count_changed', { count: userCount })
  }
})

// Pattern 4: Action Type String
startAppListening({
  type: 'posts/postAdded',
  effect: (action) => {
    console.log('Post added via string matching')
  }
})
```

## 5. Listener Effect Capabilities

### Concept: What You Can Do Inside Listener Effects
Effects have access to powerful APIs for complex async workflows.

```javascript
startAppListening({
  actionCreator: startLongProcess,
  effect: async (action, listenerApi) => {
    // Access current state
    const currentUser = listenerApi.getState().auth.currentUser
    
    // Dispatch other actions
    listenerApi.dispatch(showLoading())
    
    try {
      // Async operations
      const result = await api.processData(action.payload)
      
      // Wait for specific conditions
      await listenerApi.condition(processCompleted.match)
      
      // Dynamic delays
      await listenerApi.delay(2000)
      
      // Cancel current operation
      if (listenerApi.signal.aborted) {
        return
      }
      
      listenerApi.dispatch(processSuccess(result))
      
    } catch (error) {
      listenerApi.dispatch(processFailed(error.message))
    } finally {
      listenerApi.dispatch(hideLoading())
    }
  }
})
```

**Available APIs**:
- `getState()` - Access current Redux state
- `dispatch()` - Trigger other actions
- `delay(ms)` - Wait for specified time
- `condition(predicate)` - Wait for specific conditions
- `signal` - AbortController for cancellation
- `unsubscribe()` - Remove this listener
- `subscribe()` - Re-activate this listener

## 6. Organizing Listener Logic

### Concept: Modular Listener Organization
Best practices for structuring reactive logic across your application.

```javascript
// features/posts/postsListeners.ts
export const addPostsListeners = (startAppListening) => {
  // Toast notifications
  startAppListening({
    actionCreator: addNewPost.fulfilled,
    effect: async () => {
      const { toast } = await import('react-tiny-toast')
      toast.show('Post created successfully!', { variant: 'success' })
    }
  })
  
  // Analytics tracking
  startAppListening({
    actionCreator: addNewPost.fulfilled,
    effect: async (action) => {
      await analytics.track('post_created', {
        postId: action.payload.id,
        userId: action.payload.user
      })
    }
  })
  
  // Auto-save draft
  startAppListening({
    predicate: (action, current, previous) => {
      return current.posts.draft !== previous.posts.draft
    },
    effect: async (action, listenerApi) => {
      const draft = listenerApi.getState().posts.draft
      await saveDraftToLocalStorage(draft)
    }
  })
}

// app/listenerMiddleware.ts - Register all listeners
import { addPostsListeners } from '@/features/posts/postsListeners'
import { addAuthListeners } from '@/features/auth/authListeners'
import { addNotificationListeners } from '@/features/notifications/notificationListeners'

addPostsListeners(startAppListening)
addAuthListeners(startAppListening)  
addNotificationListeners(startAppListening)
```

## 7. Dynamic Import Pattern

### Concept: Loading Libraries On-Demand in Effects
Import heavy libraries only when needed to improve initial bundle size.

```javascript
startAppListening({
  actionCreator: exportData,
  effect: async (action) => {
    // Import heavy library only when needed
    const { saveAs } = await import('file-saver')
    const XLSX = await import('xlsx')
    
    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.json_to_sheet(action.payload.data)
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data')
    
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    
    saveAs(blob, 'export.xlsx')
  }
})
```

**Benefits**: 
- Smaller initial bundle size
- Libraries loaded only when features are used
- Better performance for users who don't use certain features

## 8. Middleware Order and Pipeline

### Concept: Middleware Execution Order Matters
Middleware forms a pipeline where order affects behavior.

```javascript
// Middleware pipeline: m1 → m2 → m3 → reducer → m3 → m2 → m1

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => 
    getDefaultMiddleware()
      .prepend(listenerMiddleware.middleware)  // Runs FIRST
      .concat(analyticsMiddleware)            // Runs LAST
})

// Execution flow for dispatch(someAction()):
// 1. listenerMiddleware processes action first
// 2. thunk middleware (from getDefaultMiddleware)  
// 3. analyticsMiddleware processes action
// 4. Action reaches reducer
// 5. Middleware get notified in reverse order
```

**Why prepend()**: Listener middleware needs early access to intercept and process actions.

## 9. Listener vs useEffect Comparison

### Concept: When to Use Which Approach
Understanding the differences between component effects and Redux listeners.

```javascript
// ❌ useEffect - Tied to component lifecycle
const PostForm = () => {
  const [showToast, setShowToast] = useState(false)
  
  useEffect(() => {
    if (showToast) {
      toast.show('Post added!')
      setShowToast(false)
    }
  }, [showToast])
  
  const handleSubmit = () => {
    dispatch(addNewPost(data))
    setShowToast(true)  // Manual coordination required
  }
}

// ✅ Listener - Decoupled from components
startAppListening({
  actionCreator: addNewPost.fulfilled,
  effect: () => {
    toast.show('Post added!')
    // Works regardless of which component dispatched the action
    // Works even if no components are mounted
  }
})
```

**Use Listeners When**:
- Logic should run regardless of component state
- Multiple components might trigger the same behavior
- You want to decouple side effects from UI components
- Complex async workflows that span multiple actions

**Use useEffect When**:
- Logic is specific to component lifecycle
- Responding to prop/state changes within a component
- Component-specific cleanup needed

## 10. Complex Reactive Workflows

### Concept: Building Multi-Step Async Workflows
Listeners can implement sophisticated business logic flows.

```javascript
// Example: Multi-step user onboarding flow
startAppListening({
  actionCreator: userRegistered,
  effect: async (action, listenerApi) => {
    const { userId, email } = action.payload
    
    try {
      // Step 1: Send welcome email
      await api.sendWelcomeEmail(email)
      listenerApi.dispatch(welcomeEmailSent({ userId }))
      
      // Step 2: Wait for email verification
      await listenerApi.condition(emailVerified.match)
      
      // Step 3: Create default profile
      const profileData = await api.createDefaultProfile(userId)
      listenerApi.dispatch(profileCreated(profileData))
      
      // Step 4: Show onboarding tour
      listenerApi.dispatch(startOnboardingTour())
      
    } catch (error) {
      listenerApi.dispatch(onboardingFailed({ userId, error: error.message }))
    }
  }
})

// Cancellable operations
startAppListening({
  actionCreator: startFileUpload,
  effect: async (action, listenerApi) => {
    const uploadPromise = uploadFile(action.payload.file)
    
    // Listen for cancellation
    listenerApi.condition(cancelUpload.match).then(() => {
      uploadPromise.cancel()
    })
    
    try {
      const result = await uploadPromise
      listenerApi.dispatch(uploadComplete(result))
    } catch (error) {
      if (!listenerApi.signal.aborted) {
        listenerApi.dispatch(uploadFailed(error))
      }
    }
  }
})
```

## 11. State Change Detection

### Concept: Reacting to State Changes vs Actions
Using predicates to respond to state modifications rather than specific actions.

```javascript
// React to state changes regardless of which action caused them
startAppListening({
  predicate: (action, currentState, previousState) => {
    // Trigger when cart total changes
    return currentState.cart.total !== previousState.cart.total
  },
  effect: async (action, listenerApi) => {
    const total = listenerApi.getState().cart.total
    
    // Update shipping cost based on new total
    if (total > 100) {
      listenerApi.dispatch(setShipping({ cost: 0, type: 'free' }))
    } else {
      listenerApi.dispatch(setShipping({ cost: 10, type: 'standard' }))
    }
  }
})

// React to authentication status changes
startAppListening({
  predicate: (action, current, previous) => {
    const wasLoggedIn = !!previous.auth.user
    const isLoggedIn = !!current.auth.user
    return wasLoggedIn !== isLoggedIn
  },
  effect: async (action, listenerApi) => {
    const isLoggedIn = !!listenerApi.getState().auth.user
    
    if (isLoggedIn) {
      // User just logged in
      listenerApi.dispatch(fetchUserPreferences())
      analytics.track('user_login')
    } else {
      // User just logged out
      listenerApi.dispatch(clearSensitiveData())
      analytics.track('user_logout')
    }
  }
})
```

## 12. Listener API Methods

### Concept: Powerful Async Control Flow Tools
The listenerApi provides sophisticated tools for complex async patterns.

```javascript
startAppListening({
  actionCreator: startComplexWorkflow,
  effect: async (action, listenerApi) => {
    // Method 1: delay() - Simple waiting
    await listenerApi.delay(1000)
    console.log('1 second passed')
    
    // Method 2: condition() - Wait for specific actions
    await listenerApi.condition(dataLoaded.match)
    console.log('Data finished loading')
    
    // Method 3: condition() with timeout
    const success = await listenerApi.condition(
      processComplete.match,
      10000  // 10 second timeout
    )
    
    if (!success) {
      console.log('Process timed out')
      return
    }
    
    // Method 4: condition() with predicate
    await listenerApi.condition((action, currentState) => {
      return currentState.users.ids.length > 0
    })
    
    // Method 5: fork() - Start background task
    const backgroundTask = listenerApi.fork(async (forkApi) => {
      while (!forkApi.signal.aborted) {
        await forkApi.delay(5000)
        forkApi.dispatch(refreshData())
      }
    })
    
    // Method 6: signal - Check for cancellation
    if (listenerApi.signal.aborted) {
      console.log('Listener was cancelled')
      return
    }
    
    // Method 7: unsubscribe() - Stop listening
    if (someCondition) {
      listenerApi.unsubscribe()
    }
  }
})
```

## 13. Listener Organization Patterns

### Concept: Structuring Listeners in Large Applications
Best practices for organizing reactive logic as your app grows.

```javascript
// Pattern 1: Slice-based organization
// features/posts/postsListeners.ts
export const addPostsListeners = (startAppListening) => {
  startAppListening({ /* post-related listeners */ })
}

// features/auth/authListeners.ts  
export const addAuthListeners = (startAppListening) => {
  startAppListening({ /* auth-related listeners */ })
}

// Pattern 2: Feature-based organization
// features/notifications/notificationListeners.ts
export const addNotificationListeners = (startAppListening) => {
  // Show toast for any successful action
  startAppListening({
    matcher: (action) => action.type.endsWith('/fulfilled'),
    effect: (action) => {
      if (action.meta?.showToast) {
        toast.show(action.meta.toastMessage || 'Success!')
      }
    }
  })
  
  // Track all user actions for analytics
  startAppListening({
    predicate: (action) => action.type.startsWith('user/'),
    effect: (action) => {
      analytics.track(action.type, action.payload)
    }
  })
}

// Pattern 3: Central registration
// app/listenerMiddleware.ts
import { addPostsListeners } from '@/features/posts/postsListeners'
import { addAuthListeners } from '@/features/auth/authListeners'

// Register all listeners in one place
addPostsListeners(startAppListening)
addAuthListeners(startAppListening)
```

## 14. Toast Management Example

### Concept: Complete Toast System Implementation
Real-world example showing toast lifecycle management.

```javascript
// Complete toast notification system
startAppListening({
  actionCreator: addNewPost.fulfilled,
  effect: async (action, listenerApi) => {
    // Dynamic import to reduce bundle size
    const { toast } = await import('react-tiny-toast')
    
    // Show toast with configuration
    const toastId = toast.show('New post added!', {
      variant: 'success',
      position: 'bottom-right',
      pause: true  // Pause timer on hover
    })
    
    // Auto-remove after delay
    await listenerApi.delay(5000)
    toast.remove(toastId)
  }
})

// Toast for different scenarios
const addToastListeners = (startAppListening) => {
  // Success toasts
  startAppListening({
    matcher: (action) => action.type.endsWith('/fulfilled'),
    effect: async (action) => {
      const { toast } = await import('react-tiny-toast')
      toast.show('Operation completed!', { variant: 'success' })
    }
  })
  
  // Error toasts
  startAppListening({
    matcher: (action) => action.type.endsWith('/rejected'),
    effect: async (action) => {
      const { toast } = await import('react-tiny-toast')
      toast.show(`Error: ${action.error.message}`, { variant: 'error' })
    }
  })
}
```

## 15. Middleware Pipeline Understanding

### Concept: How Actions Flow Through Middleware
Understanding the complete action flow from dispatch to reducer.

```javascript
// Complete middleware pipeline visualization
const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .prepend(listenerMiddleware.middleware)  // Position 1
      // thunk middleware (from getDefaultMiddleware) // Position 2  
      .concat(loggingMiddleware)               // Position 3
})

// Action flow for: dispatch(addNewPost(data))
/*
1. listenerMiddleware.middleware
   ↓ (action continues to next middleware)
2. thunk middleware 
   ↓ (processes async thunk, action continues)
3. loggingMiddleware
   ↓ (logs action, action continues)  
4. reducer (addNewPost.fulfilled action)
   ↓ (state updated)
5. Listeners fire (in reverse order)
   ↓ 
6. Components re-render with new state
*/

// Example of middleware coordination:
startAppListening({
  actionCreator: addNewPost.pending,
  effect: () => console.log('Post creation started')
})

startAppListening({
  actionCreator: addNewPost.fulfilled,  
  effect: () => console.log('Post creation completed')
})

startAppListening({
  actionCreator: addNewPost.rejected,
  effect: () => console.log('Post creation failed')
})
```

## Key Takeaways

1. **Reactive vs Imperative** - Automatic responses vs manual coordination
2. **Pure Reducers** - Keep side effects out of reducers, use middleware instead
3. **Listener Setup** - Multi-step configuration process for reactive logic
4. **Multiple Trigger Patterns** - actionCreator, matcher, predicate for different scenarios
5. **Powerful Effect APIs** - delay, condition, fork for complex async workflows
6. **Modular Organization** - Structure listeners by feature/domain for maintainability  
7. **Dynamic Imports** - Load libraries on-demand to optimize bundle size
8. **Middleware Pipeline** - Understanding action flow and execution order
9. **State Change Detection** - React to state changes rather than just actions
10. **Separation of Concerns** - Decouple side effects from UI components