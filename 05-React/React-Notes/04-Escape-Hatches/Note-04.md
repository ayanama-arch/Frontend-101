# React Effect Dependencies - Clear Notes

## Core Rule: Dependencies Must Match Code

**Every reactive value** (props, state, variables inside component) used in your Effect **must be in the dependency array**.

```jsx
function Timer({ delay }) {
  useEffect(() => {
    const timer = setInterval(() => {
      console.log("tick");
    }, delay);
    return () => clearInterval(timer);
  }, [delay]); // ✅ delay is used, so it's listed
}
```

## How to Remove Dependencies

### 1. Move Non-Reactive Values Outside Component

❌ **Problem:**

```jsx
function App() {
  const url = "https://api.example.com"; // Creates new string every render

  useEffect(() => {
    fetch(url);
  }, [url]); // Effect runs every render!
}
```

✅ **Solution:**

```jsx
const url = "https://api.example.com"; // Outside component

function App() {
  useEffect(() => {
    fetch(url);
  }, []); // No dependencies needed
}
```

### 2. Move Objects/Functions Inside Effect

❌ **Problem:**

```jsx
function Profile({ userId }) {
  const options = { method: "GET", userId }; // New object every render

  useEffect(() => {
    fetchUser(options);
  }, [options]); // Effect runs every render!
}
```

✅ **Solution:**

```jsx
function Profile({ userId }) {
  useEffect(() => {
    const options = { method: "GET", userId }; // Create inside Effect
    fetchUser(options);
  }, [userId]); // Only userId as dependency
}
```

## Common Problems & Solutions

### Problem 1: Event Logic in Effects

❌ **Wrong - Don't put event-specific logic in Effects:**

```jsx
function Form() {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitted) {
      sendEmail(); // This runs on every theme change too!
      showNotification();
    }
  }, [submitted, theme]);
}
```

✅ **Right - Put event logic in event handlers:**

```jsx
function Form() {
  function handleSubmit() {
    sendEmail(); // Only runs when form is submitted
    showNotification();
  }
}
```

### Problem 2: Multiple Unrelated Things in One Effect

❌ **Wrong - One Effect doing two things:**

```jsx
useEffect(() => {
  // Fetch cities when country changes
  fetchCities(country);

  // Fetch areas when city changes
  if (city) {
    fetchAreas(city); // This causes cities to refetch too!
  }
}, [country, city]);
```

✅ **Right - Split into separate Effects:**

```jsx
// Effect 1: Handle country changes
useEffect(() => {
  fetchCities(country);
}, [country]);

// Effect 2: Handle city changes
useEffect(() => {
  if (city) {
    fetchAreas(city);
  }
}, [city]);
```

### Problem 3: Reading State to Update State

❌ **Wrong - Creates dependency loop:**

```jsx
function Chat() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("message", (newMsg) => {
      setMessages([...messages, newMsg]); // Reads messages
    });
  }, [messages]); // Effect reruns every message!
}
```

✅ **Right - Use updater function:**

```jsx
function Chat() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("message", (newMsg) => {
      setMessages((prev) => [...prev, newMsg]); // No reading messages
    });
  }, []); // No dependencies needed
}
```

### Problem 4: Want Latest Value Without "Reacting"

Use **Effect Events** (experimental feature):

```jsx
import { useEffectEvent } from "react";

function Chat({ roomId }) {
  const [isMuted, setIsMuted] = useState(false);

  // This reads latest isMuted but doesn't cause re-sync
  const onMessage = useEffectEvent((msg) => {
    if (!isMuted) {
      playSound();
    }
  });

  useEffect(() => {
    const connection = connect(roomId);
    connection.on("message", onMessage);
  }, [roomId]); // Only roomId, not isMuted
}
```

## Key Strategies

### 1. Extract Primitive Values from Objects

❌ **Problem:**

```jsx
function Component({ config }) {
  useEffect(() => {
    doSomething(config); // config object changes every render
  }, [config]);
}
```

✅ **Solution:**

```jsx
function Component({ config }) {
  const { apiUrl, timeout } = config; // Extract primitives

  useEffect(() => {
    doSomething({ apiUrl, timeout });
  }, [apiUrl, timeout]); // Primitives are stable
}
```

### 2. Call Functions Outside Effect

❌ **Problem:**

```jsx
function Component({ getConfig }) {
  useEffect(() => {
    const config = getConfig(); // Function might change
    useConfig(config);
  }, [getConfig]);
}
```

✅ **Solution:**

```jsx
function Component({ getConfig }) {
  const config = getConfig(); // Call outside Effect

  useEffect(() => {
    useConfig(config);
  }, [config.apiUrl, config.timeout]); // Use primitive values
}
```

## Remember

1. **Never suppress the linter** - it prevents bugs
2. **Change the code, not the dependencies** - dependencies describe your code
3. **Objects and functions are recreated every render** - avoid them as dependencies
4. **Use updater functions** for state updates to avoid reading current state
5. **Split unrelated logic** into separate Effects
6. **Move event-specific logic** to event handlers
