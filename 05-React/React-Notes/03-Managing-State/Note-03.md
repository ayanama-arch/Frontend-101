# 📝 Notes — Extracting State Logic into a Reducer

## 1) What is a reducer?

- A **pure function** that takes the current state and an action, then returns the **next state**.
- Signature:

  ```js
  function reducer(state, action) {
    // return new state
  }
  ```

---

## 2) Why useReducer instead of useState?

- `useState` → good for simple updates.
- `useReducer` → good when:

  - Many event handlers update the same state.
  - Updates are complex, spread out, or repetitive.
  - You want centralized, testable logic.

Think: **useReducer = control center for state updates.**

---

## 3) Migration steps

1. **Dispatch actions instead of setting state directly.**

   ```js
   dispatch({ type: "added", id: 1, text: "Task" });
   ```

2. **Write a reducer** to handle all update logic.

   ```js
   function tasksReducer(tasks, action) {
     switch (action.type) {
       case "added":
         return [...tasks, { id: action.id, text: action.text, done: false }];
       case "changed":
         return tasks.map((t) => (t.id === action.task.id ? action.task : t));
       case "deleted":
         return tasks.filter((t) => t.id !== action.id);
       default:
         throw Error("Unknown action: " + action.type);
     }
   }
   ```

3. **Use useReducer** in your component.

   ```js
   const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
   ```

---

## 4) Anatomy of an action

- An **object** describing “what happened.”
- Has a `type` string + minimal data.
- Example:

  ```js
  { type: 'deleted', id: 3 }
  ```

---

## 5) Rules for reducers

- **Must be pure** → no API calls, no side effects, no mutations.
- Each **action = one user interaction**.
- Use `switch` (or `if/else`) to handle cases.
- Debugging trick → log every action in reducer.

---

## 6) Bonus

- **Testing:** Reducers are easy to test in isolation.
- **Immer:** Lets you “mutate” state safely (`useImmerReducer`).

---

# ⚡ Example: Todo App with Reducer

```jsx
import { useReducer, useState } from "react";

// Reducer function
function tasksReducer(tasks, action) {
  switch (action.type) {
    case "added": {
      return [...tasks, { id: action.id, text: action.text, done: false }];
    }
    case "changed": {
      return tasks.map((t) => (t.id === action.task.id ? action.task : t));
    }
    case "deleted": {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

// Initial tasks
let nextId = 3;
const initialTasks = [
  { id: 0, text: "Visit Kafka Museum", done: true },
  { id: 1, text: "Watch a puppet show", done: false },
  { id: 2, text: "Lennon Wall pic", done: false },
];

// Main component
export default function TaskApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  const [text, setText] = useState("");

  function handleAdd() {
    dispatch({ type: "added", id: nextId++, text });
    setText("");
  }

  return (
    <div>
      <h1>Prague itinerary</h1>

      {/* Add Task */}
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleAdd}>Add</button>

      {/* Task List */}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.done}
              onChange={(e) =>
                dispatch({
                  type: "changed",
                  task: { ...task, done: e.target.checked },
                })
              }
            />
            {task.text}
            <button onClick={() => dispatch({ type: "deleted", id: task.id })}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

# 🔑 Quick Recap

- `useState` = local, simple.
- `useReducer` = centralized, structured.
- Reducer = pure function: `(state, action) → newState`.
- Actions describe **what happened**, reducer decides **how to update**.
- Great for debugging, testing, and scaling state logic.

---

## Context Hook

### 1) Problem: Prop Drilling

- **Normal way:** Pass data via props down the tree.
- **Issue:** If many layers in between don’t use the data, they still need to pass it forward → **prop drilling**.
- Pain point: Becomes verbose and hard to maintain.

---

### 2) Solution: Context

- **Definition:** Context lets a parent component provide data to _all descendants_, no matter how deep.
- **Mental model:** Like _teleporting data_ directly to where it’s needed.
- **Analogy:** Similar to CSS inheritance (e.g., `color` applied at a parent flows down until overridden).

---

### 3) Steps to Use Context

#### Step 1: Create Context

```js
import { createContext } from "react";

export const LevelContext = createContext(1); // default value
```

#### Step 2: Use Context in Child

```js
import { useContext } from "react";
import { LevelContext } from "./LevelContext.js";

export default function Heading({ children }) {
  const level = useContext(LevelContext); // read from nearest provider
  return React.createElement(`h${level}`, null, children);
}
```

#### Step 3: Provide Context in Parent

```js
import { LevelContext } from "./LevelContext.js";

export default function Section({ level, children }) {
  return (
    <section>
      <LevelContext.Provider value={level}>{children}</LevelContext.Provider>
    </section>
  );
}
```

---

### 4) Advanced Pattern: Self-Managing Sections

- Instead of passing `level` manually to each `<Section>`, let each Section read its parent’s level and increment it:

```js
import { useContext } from "react";
import { LevelContext } from "./LevelContext.js";

export default function Section({ children }) {
  const parentLevel = useContext(LevelContext);
  return (
    <section>
      <LevelContext.Provider value={parentLevel + 1}>
        {children}
      </LevelContext.Provider>
    </section>
  );
}
```

Now `<Page>` needs no `level` props at all:

```jsx
<Section>
  <Heading>Title</Heading>
  <Section>
    <Heading>Heading</Heading>
    <Section>
      <Heading>Sub-heading</Heading>
    </Section>
  </Section>
</Section>
```

---

### 5) Key Rules

- Context **passes through** intermediate components automatically.
- `useContext` always reads the **closest Provider value above**.
- If no Provider is found → fallback to **default value** passed in `createContext`.
- Different contexts are **independent** (ThemeContext, UserContext, etc.).

---

### 6) Common Use Cases

- **Theming** (light/dark mode).
- **Authentication / current user** info.
- **Routing** (current route).
- **Global state with reducer + context.**

---

### 7) Alternatives (before using Context)

- **Props first**: Explicit and clear.
- **Extract components + pass children**: Can reduce prop-drilling.
- Context only when: data needed by many distant components.

---

### 🔑 Recap

- Prop drilling = pain → context = solution.
- Flow: `createContext` → `useContext` → `<Provider value={...}>`.
- Context is like CSS inheritance: nearest provider wins.
- Don’t overuse context → prefer props if possible.

---
