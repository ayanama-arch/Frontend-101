# Hooks

## useLayoutEffect

### **What is `useLayoutEffect`?**

- It’s just like **`useEffect`**, but the key difference is **when it runs**.
- `useLayoutEffect` runs **synchronously after DOM mutations** (the DOM is updated) **but before the browser paints the screen**.
- That means the user won’t see any flicker in the UI caused by your effect logic.

---

### **Syntax**

```jsx
import React, { useLayoutEffect, useState, useRef } from "react";

function MyComponent() {
  const boxRef = useRef(null);

  useLayoutEffect(() => {
    // Runs immediately after DOM updates, before the browser paints
    if (boxRef.current) {
      console.log("Box width:", boxRef.current.offsetWidth);
    }
  });

  return (
    <div ref={boxRef} style={{ width: "200px" }}>
      Hello
    </div>
  );
}
```

---

### **When to use `useLayoutEffect`**

- Use it when you **need to measure DOM elements** or **synchronously apply layout changes** to avoid visible flicker.
- Examples:

  - Measuring element size/position (`offsetWidth`, `getBoundingClientRect`).
  - Scrolling to a position right after render.
  - Making style changes (e.g., animations) that must happen before the screen paints.

---

### **Difference from `useEffect`**

- **`useEffect`** → runs **after paint** (asynchronous).
- **`useLayoutEffect`** → runs **before paint** (synchronous).

If you don’t need to block the paint → use `useEffect` (faster).
If you need to sync DOM reads/writes before the user sees anything → use `useLayoutEffect`.

---

### **Example: Scroll to bottom of a chat**

```jsx
import React, { useLayoutEffect, useRef } from "react";

function ChatBox({ messages }) {
  const boxRef = useRef(null);

  useLayoutEffect(() => {
    // Ensure scroll happens before the user sees the frame
    boxRef.current.scrollTop = boxRef.current.scrollHeight;
  }, [messages]);

  return (
    <div
      ref={boxRef}
      style={{ height: "200px", overflowY: "scroll", border: "1px solid gray" }}
    >
      {messages.map((msg, i) => (
        <p key={i}>{msg}</p>
      ))}
    </div>
  );
}
```

Here, using `useLayoutEffect` avoids a visible flicker where the scroll might briefly appear at the wrong position.

---

👉 In short:

- Default to **`useEffect`**.
- Reach for **`useLayoutEffect`** only if you’re measuring the DOM or doing updates that must block painting.

---

# React useCallback & useMemo - Complete Notes

**useMemo**: Memoizes (caches) a **calculated value**
**useCallback**: Memoizes (caches) a **function**

Both prevent unnecessary recalculations/recreations between renders.

## useMemo - Memoizing Values

### Basic Syntax

```jsx
const memoizedValue = useMemo(() => {
  return expensiveCalculation(a, b);
}, [a, b]); // Dependencies
```

### Simple Example

```jsx
function TodoList({ todos, filter }) {
  // Without useMemo - filters on every render
  const filteredTodos = todos.filter((todo) => todo.category === filter);

  // With useMemo - only filters when todos or filter changes
  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => todo.category === filter);
  }, [todos, filter]);

  return <div>{/* render filteredTodos */}</div>;
}
```

### When to Use useMemo

✅ **Good uses:**

- Expensive calculations
- Creating objects/arrays that are passed as props
- Preventing child component re-renders

❌ **Don't use for:**

- Simple calculations (like `a + b`)
- Values only used in event handlers
- Dependencies that change on every render anyway

## useCallback - Memoizing Functions

### Basic Syntax

```jsx
const memoizedFunction = useCallback(() => {
  doSomething(a, b);
}, [a, b]); // Dependencies
```

### Simple Example

```jsx
function Parent({ items }) {
  const [count, setCount] = useState(0);

  // Without useCallback - creates new function every render
  const handleClick = (id) => {
    console.log("clicked", id);
  };

  // With useCallback - same function reference if items don't change
  const handleClick = useCallback((id) => {
    console.log("clicked", id);
    // If you need items here, add to dependencies: [items]
  }, []);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      {items.map((item) => (
        <ExpensiveChild key={item.id} onClick={handleClick} />
      ))}
    </div>
  );
}

// Child only re-renders if handleClick changes
const ExpensiveChild = memo(({ onClick }) => {
  return <button onClick={() => onClick()}>Click me</button>;
});
```

## Common Patterns

### Pattern 1: Prevent Child Re-renders

```jsx
function App() {
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState([]);

  // Memoize the user list calculation
  const activeUsers = useMemo(
    () => users.filter((user) => user.active),
    [users]
  );

  // Memoize the click handler
  const handleUserClick = useCallback((userId) => {
    console.log("User clicked:", userId);
  }, []);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      {/* UserList won't re-render when count changes */}
      <UserList users={activeUsers} onClick={handleUserClick} />
    </div>
  );
}

const UserList = memo(({ users, onClick }) => {
  console.log("UserList rendered"); // Only logs when users/onClick change
  return (
    <div>
      {users.map((user) => (
        <div key={user.id} onClick={() => onClick(user.id)}>
          {user.name}
        </div>
      ))}
    </div>
  );
});
```

### Pattern 2: Expensive Calculations

```jsx
function DataProcessor({ rawData, settings }) {
  // Heavy computation - only recalculate when inputs change
  const processedData = useMemo(() => {
    console.log("Processing data..."); // Only logs when needed
    return rawData.map((item) => ({
      ...item,
      processed: heavyCalculation(item, settings),
    }));
  }, [rawData, settings]);

  return <Chart data={processedData} />;
}
```

### Pattern 3: Stable References for useEffect

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  // Stable function reference
  const fetchUser = useCallback(async (id) => {
    const response = await api.getUser(id);
    setUser(response.data);
  }, []); // No dependencies - function never changes

  useEffect(() => {
    fetchUser(userId);
  }, [userId, fetchUser]); // fetchUser won't cause unnecessary re-runs

  return <div>{user?.name}</div>;
}
```

## Dependencies Rules

### useMemo Dependencies

```jsx
function Component({ a, b }) {
  const [c, setC] = useState(0);

  const result = useMemo(() => {
    return a * b + c; // Uses a, b, c
  }, [a, b, c]); // Must include all three
}
```

### useCallback Dependencies

```jsx
function Component({ onSave }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = useCallback(() => {
    onSave({ name, email }); // Uses name, email, onSave
  }, [name, email, onSave]); // Must include all three
}
```

## Common Mistakes

### Mistake 1: Memoizing Everything

❌ **Wrong:**

```jsx
function Component({ name }) {
  // Unnecessary - simple string operation
  const greeting = useMemo(() => `Hello, ${name}`, [name]);

  // Unnecessary - function doesn't depend on anything
  const handleClick = useCallback(() => {
    alert("clicked");
  }, []);
}
```

✅ **Right:**

```jsx
function Component({ name }) {
  // Simple operations don't need memoization
  const greeting = `Hello, ${name}`;

  // Simple event handlers don't need memoization
  const handleClick = () => alert("clicked");
}
```

### Mistake 2: Wrong Dependencies

❌ **Wrong:**

```jsx
function Component({ items }) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return items.filter(
      (item) => item.name.includes(search) // Uses search but not in deps
    );
  }, [items]); // Missing search dependency!
}
```

✅ **Right:**

```jsx
function Component({ items }) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return items.filter((item) => item.name.includes(search));
  }, [items, search]); // All dependencies included
}
```

### Mistake 3: Objects as Dependencies

❌ **Problem:**

```jsx
function Component({ config }) {
  const processedData = useMemo(() => {
    return heavyProcess(config);
  }, [config]); // config object changes every render
}
```

✅ **Solution:**

```jsx
function Component({ config }) {
  // Extract primitive values
  const { apiUrl, timeout, retries } = config;

  const processedData = useMemo(() => {
    return heavyProcess({ apiUrl, timeout, retries });
  }, [apiUrl, timeout, retries]); // Stable primitive values
}
```

## When NOT to Use

### Don't Use If:

1. **Simple calculations**: `a + b`, string concatenation
2. **Dependencies change every render**: Makes memoization useless
3. **Premature optimization**: Profile first, optimize later
4. **Values only used in event handlers**: Not in render path

### Example of Unnecessary Usage:

```jsx
function Component({ count }) {
  // ❌ Don't memoize simple operations
  const doubled = useMemo(() => count * 2, [count]);

  // ❌ Don't memoize if used only in event handler
  const expensiveValue = useMemo(() => heavyCalculation(), []);

  const handleClick = () => {
    console.log(expensiveValue); // Only used here
  };

  // ✅ Just calculate directly
  const doubled = count * 2;

  // ✅ Calculate in event handler
  const handleClick = () => {
    const expensiveValue = heavyCalculation();
    console.log(expensiveValue);
  };
}
```

## Performance Tips

### 1. Use React.memo with useCallback

```jsx
const ExpensiveChild = memo(({ onClick, data }) => {
  // Only re-renders if onClick or data actually change
  return <div onClick={onClick}>{data}</div>;
});

function Parent() {
  // Stable function reference
  const handleClick = useCallback(() => {
    // do something
  }, []);

  return <ExpensiveChild onClick={handleClick} data="static" />;
}
```

### 2. Measure Before Optimizing

```jsx
function Component({ items }) {
  // Add logging to see if optimization helps
  const filtered = useMemo(() => {
    console.log("Filtering items..."); // Should log rarely
    return items.filter((item) => item.active);
  }, [items]);

  return <List items={filtered} />;
}
```

## Quick Reference

| Hook          | Purpose                | Returns   | Use When                                             |
| ------------- | ---------------------- | --------- | ---------------------------------------------------- |
| `useMemo`     | Cache calculated value | Any value | Expensive calculations, object/array creation        |
| `useCallback` | Cache function         | Function  | Stable function references, prevent child re-renders |

## Key Takeaways

1. **useMemo** = Cache expensive calculations
2. **useCallback** = Cache functions to prevent child re-renders
3. **Dependencies matter** - include everything the memoized code uses
4. **Don't overuse** - Profile first, optimize when needed
5. **Combine with React.memo** for maximum benefit
6. **Objects/arrays in deps** usually defeat the purpose
