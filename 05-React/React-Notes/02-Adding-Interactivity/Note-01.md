# Adding Interactivity in React

Interactivity means something on the screen changes in response to **user input**—like clicks, typing, or submitting a form.

## Responding to Events

### Adding Handlers

In React, you attach event handlers to JSX elements as props.

1. Define a function.
2. Pass it to the JSX element as an event prop.

Convention: Event handler names usually start with `handle` (e.g., `handleClick`).

```js
export default function Button() {
  function handleClick() {
    alert("You clicked me!");
  }

  return <button onClick={handleClick}>Click me</button>;
}
```

✅ React event names are camelCase (`onClick`, `onSubmit`, `onChange`).
✅ All events bubble (propagate upwards) **except `onScroll`**, which only works on the element you attach it to.

---

### Stopping Propagation

Sometimes you don’t want an event to bubble up (e.g., a button inside a clickable card). Use `stopPropagation()`.

```js
function Button({ onClick, children }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation(); // stops the event from reaching parent
        onClick();
      }}
    >
      {children}
    </button>
  );
}
```

---

### Preventing Default Behavior

Some browser events have default actions (e.g., form submission refreshes the page). Use `preventDefault()` to stop them.

```js
export default function Signup() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault(); // stops the page reload
        alert("Submitting!");
      }}
    >
      <input />
      <button>Send</button>
    </form>
  );
}
```

---

⚡ **Quick Recap**:

- Use `onEventName={handler}` to handle events.
- `stopPropagation()` → stops bubbling.
- `preventDefault()` → cancels default browser behavior.

---

# State: A Component’s Memory

Components in React need a way to “remember” information across re-renders. That’s what **state** does.

For a component to update with new data, two things must happen:

1. **Retain data** between renders.
2. **Trigger a re-render** so the UI reflects the new data.

---

## Adding a State Variable

You declare state using the `useState` Hook:

```js
import { useState } from "react";

const [index, setIndex] = useState(0);
```

Here:

- `index` → the current state value.
- `setIndex` → the function that updates the value and triggers a re-render.
- `0` → the initial state.

---

## Rules of Hooks

- Always start with `use` (e.g., `useState`, `useEffect`).
- Must be called **at the top level** of a component or another Hook.

  - ❌ Not inside loops, conditions, or nested functions.
  - ✅ Only at the top level.

- React relies on **the order** of Hook calls to match them internally. That’s why order must be consistent.

---

## Key Facts About State

- Use a **state variable** when a component needs to “remember” something between renders (e.g., a counter, input text, toggle).
- `useState` returns a pair: `[value, updaterFunction]`.
- You can declare **multiple state variables** in one component.
- Each component instance has its **own private state**.

  - If you render the same component twice, they don’t share state.

---

⚡ **Quick Recap**

- State = component’s memory.
- `useState(initialValue)` → returns `[current, update]`.
- Updating state re-renders the component.
- Rules: call Hooks only at the top level, always in the same order.

---

## Render and Commit: How React Updates the UI

React updates the screen in **three steps**:

1. **Trigger** – A render starts when:

   - The app loads (initial render).
   - State (or props) update in a component or ancestor.

2. **Render** – React calls your components to figure out what the UI _should_ look like.

   - Initial render → creates DOM nodes.
   - Re-render → recalculates changes (but doesn’t touch DOM yet).
   - Rendering must be **pure**: same input → same output, no side effects.

3. **Commit** – React applies the minimal DOM updates needed.

   - Initial → append all DOM nodes.
   - Re-render → only change what’s different.
   - Unchanged elements (like `<input>` value) are preserved.

Finally, the **browser paints** the updated DOM to the screen.

⚡ **Recap:**
Trigger → Render → Commit → Paint.
React only updates what’s necessary, keeping things fast and predictable.

---

## State as a Snapshot

State in React isn’t a normal variable—it’s more like a **snapshot in time**. Updating state doesn’t instantly change its value in the current render. Instead, it tells React: _“On the next render, use this new value.”_

---

### Key Ideas

- **Setting state triggers a re-render** → the UI updates only after React calls your component again.
- **Rendering = snapshot** → when React calls your component, it takes a “photo” of the state for that render.
- State lives **outside the component, in React itself**. Each render gets its own fixed snapshot.
- **Event handlers see the snapshot** they were created with. Even async code (like `setTimeout`) runs with the state values from that render.

---

### Example Pitfalls

#### 1. Multiple updates in one handler

```jsx
export default function Counter() {
  const [number, setNumber] = useState(0);

  function handleClick() {
    setNumber(number + 1);
    setNumber(number + 1);
    setNumber(number + 1);
  }

  return (
    <>
      <h1>{number}</h1>
      <button onClick={handleClick}>+3</button>
    </>
  );
}
```

**Expectation:** `+3`
**Reality:** `+1`
Because all three calls used the same snapshot (`0`).

---

#### 2. Async callbacks capture old state

```jsx
export default function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setTimeout(() => {
      alert("Count is: " + count);
    }, 3000);
  }

  return (
    <>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={handleClick}>Show after 3s</button>
    </>
  );
}
```

If you click `+1` twice (UI shows `2`), the alert might still say **“Count is: 1”**—because the async callback closed over the **old snapshot**.

---

#### 3. Seeing snapshots in logs

```jsx
export default function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
    console.log("During render snapshot:", count);
  }

  console.log("Rendered with count =", count);

  return (
    <>
      <h1>{count}</h1>
      <button onClick={handleClick}>+1</button>
    </>
  );
}
```

- Logs inside the handler show the **old snapshot**.
- Logs at the top show the **new snapshot** after re-render.

---

### Recap

- State requests a new render, it doesn’t mutate instantly.
- Each render = new snapshot of state + new event handlers.
- Old handlers keep the old snapshot.
- To always read the freshest state, you’ll need a **state updater function** (next topic).

---

💡 **Mental Model Trick:**
Think of state as a **Polaroid photo** of your component at render time. Every event handler is written on the back of that photo. No matter what happens later, that handler only knows what was in _that specific shot_.

---
