# React Effects Lifecycle - Clear Notes

## Key Concept: Effects vs Components Have Different Lifecycles

**Components:** Mount → Update → Unmount  
**Effects:** Start synchronizing → Stop synchronizing (can happen multiple times)

## Core Understanding

Think of Effects as **synchronization processes**, not lifecycle events. Each Effect should handle one specific synchronization task.

## Simple Example

```jsx
function ChatRoom({ roomId }) {
  useEffect(() => {
    // Start synchronizing
    const connection = createConnection(roomId);
    connection.connect();

    // Stop synchronizing (cleanup)
    return () => connection.disconnect();
  }, [roomId]); // Dependencies
}
```

## How Re-synchronization Works

1. **roomId changes** from "general" → "travel"
2. **React calls cleanup** (disconnect from "general")
3. **React runs Effect again** (connect to "travel")

## Dependencies Rule

**Include ALL reactive values** (props, state, variables calculated during render)

```jsx
// ✅ Correct
const [serverUrl, setServerUrl] = useState('localhost');
useEffect(() => {
  connect(serverUrl, roomId);
}, [serverUrl, roomId]); // Both are reactive

// ❌ Wrong - missing serverUrl
}, [roomId]);
```

## Empty Dependencies `[]`

Means Effect uses **no reactive values** - runs only on mount/unmount:

```jsx
useEffect(() => {
  // No reactive values used
  const connection = createConnection("localhost", "general");
  connection.connect();
  return () => connection.disconnect();
}, []); // Empty - no dependencies needed
```

## Key Rules

1. **One Effect = One synchronization process**
2. **All reactive values must be dependencies**
3. **Trust the linter** - it catches missing dependencies
4. **Think from Effect's perspective**, not component's

## Mental Model

Stop thinking "on mount/unmount" → Start thinking "when to sync/unsync"
