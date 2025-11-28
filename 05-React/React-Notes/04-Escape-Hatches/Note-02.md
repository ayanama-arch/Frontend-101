---
# ⚡ React `useEffect` Hook — Concise Notes

## What is `useEffect`?

- Lets components perform **side effects** after render.
- Side effects = API calls, DOM updates, subscriptions, timers.
---

## Effects vs Events

- **Events** → Triggered by user actions (click, type).
- **Effects** → Triggered by rendering (mount, update, unmount).

---

## Basic Syntax

```jsx
useEffect(() => {
  // runs after render
}, [dependencies]);
```

---

## Dependencies

```jsx
// Every render
useEffect(() => {...});

// Once on mount
useEffect(() => {...}, []);

// Only when count changes
useEffect(() => {...}, [count]);
```

---

## Cleanup

```jsx
useEffect(() => {
  const id = setInterval(() => console.log("tick"), 1000);
  return () => clearInterval(id); // cleanup on unmount
}, []);
```

---

## Common Patterns

### 1. Fetching Data

```jsx
useEffect(() => {
  let ignore = false;
  fetch(`/api/users/${userId}`)
    .then((res) => res.json())
    .then((data) => {
      if (!ignore) setUser(data);
    });
  return () => {
    ignore = true;
  };
}, [userId]);
```

### 2. Event Listener

```jsx
useEffect(() => {
  function update() {
    setSize({ w: innerWidth, h: innerHeight });
  }
  window.addEventListener("resize", update);
  update();
  return () => window.removeEventListener("resize", update);
}, []);
```

### 3. Subscriptions

```jsx
useEffect(() => {
  const conn = createConnection(roomId);
  conn.connect();
  conn.onMessage((m) => setMsgs((p) => [...p, m]));
  return () => conn.disconnect();
}, [roomId]);
```

---

## Rules & Pitfalls

- **Always list dependencies** → don’t lie.
- **Use functional updates** if skipping deps:

```jsx
setCount((c) => c + 1);
```

- **Don’t use for event handlers or derived state** → handle directly in render.
- **Infinite loop danger** if updating state without proper deps.
- **Always cleanup** timers, subscriptions, listeners.

---

## Strict Mode

- Dev-only: Effects run twice to catch bugs.
- Prod: Run once as expected.

---

## Summary

1. **Effects run after render.**
2. Add **dependencies** → tell React when to re-run.
3. Use **cleanup** to avoid leaks.
4. Don’t abuse `useEffect` for things render can handle.

---

# React Effects: When You DON'T Need Them

## Core Principle

**Effects are for syncing with external systems, not for updating state based on props/state changes.**

## ❌ DON'T Use Effects For:

### 1. **Calculating Derived State**

```jsx
// ❌ Bad
const [firstName, setFirstName] = useState("John");
const [lastName, setLastName] = useState("Doe");
const [fullName, setFullName] = useState("");

useEffect(() => {
  setFullName(firstName + " " + lastName);
}, [firstName, lastName]);

// ✅ Good
const fullName = firstName + " " + lastName;
```

### 2. **Expensive Calculations**

```jsx
// ❌ Bad
useEffect(() => {
  setFilteredItems(expensiveFilter(items, filter));
}, [items, filter]);

// ✅ Good
const filteredItems = useMemo(
  () => expensiveFilter(items, filter),
  [items, filter]
);
```

### 3. **Resetting State on Prop Change**

```jsx
// ❌ Bad
useEffect(() => {
  setComment("");
}, [userId]);

// ✅ Good - Use key to reset entire component
<Profile userId={userId} key={userId} />;
```

### 4. **Event-Triggered Logic**

```jsx
// ❌ Bad
useEffect(() => {
  if (product.isInCart) {
    showNotification("Added to cart!");
  }
}, [product]);

// ✅ Good
function handleBuyClick() {
  addToCart(product);
  showNotification("Added to cart!");
}
```

### 5. **Chaining State Updates**

```jsx
// ❌ Bad - Multiple Effects triggering each other
useEffect(() => {
  if (card?.gold) setGoldCount((c) => c + 1);
}, [card]);
useEffect(() => {
  if (goldCount > 3) setRound((r) => r + 1);
}, [goldCount]);

// ✅ Good - Calculate in event handler
function handlePlaceCard(nextCard) {
  setCard(nextCard);
  if (nextCard.gold && goldCount <= 3) {
    setGoldCount(goldCount + 1);
  }
}
```

## ✅ DO Use Effects For:

### 1. **External System Sync**

```jsx
// Subscribing to browser APIs
useEffect(() => {
  const handler = () => setOnline(navigator.onLine);
  window.addEventListener("online", handler);
  return () => window.removeEventListener("online", handler);
}, []);
```

### 2. **Component Mount Side Effects**

```jsx
// Analytics, initial data load
useEffect(() => {
  trackPageView("/dashboard");
}, []);
```

### 3. **Data Fetching** (with cleanup)

```jsx
useEffect(() => {
  let ignore = false;
  fetchData(query).then((data) => {
    if (!ignore) setResults(data);
  });
  return () => {
    ignore = true;
  };
}, [query]);
```

## Key Decision Framework

**Ask yourself:** "Why does this code need to run?"

- **Because user did something** → Event Handler
- **Because component appeared on screen** → Effect
- **Because some state changed** → Usually neither! Calculate during render instead.

## Quick Patterns

### Instead of Effects:

- **Derived state** → Calculate during render
- **Expensive calculations** → `useMemo`
- **Reset on prop change** → `key` prop
- **Parent-child communication** → Lift state up
- **One-time setup** → Module-level code

### Memory Aid

**Effects = External. Everything else = Event handlers or render calculations.**
