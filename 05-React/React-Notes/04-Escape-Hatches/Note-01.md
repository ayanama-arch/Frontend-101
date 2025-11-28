# Escape Hatches

Escape hatches let's you step outside of the React environment.

Perfect, Boss. Let’s enrich the cheat notes with **tiny examples** so each point sticks like chewing gum under a school desk (but less gross).

---

## **What is a Ref?**

A ref is like a secret pocket that survives re-renders.

```js
import { useRef } from "react";

function Example() {
  const myRef = useRef(0); // { current: 0 }
  console.log(myRef.current); // logs 0
}
```

---

### **Key Traits**

- **Mutable**

```js
myRef.current = 5; // You can just overwrite it
```

- **Does not cause re-render**

```js
function Counter() {
  const countRef = useRef(0);

  function handleClick() {
    countRef.current++; // changes value
    console.log(countRef.current); // logs correctly
  }

  return <button onClick={handleClick}>Clicked {countRef.current}</button>;
}
// UI will not update, only console shows changes
```

---

### **When to Use State vs Ref**

**State (for rendering):**

```js
const [count, setCount] = useState(0);
<button onClick={() => setCount(count + 1)}>Clicked {count}</button>;
// Updates UI every click
```

**Ref (for memory, not rendering):**

```js
const countRef = useRef(0);
<button onClick={() => countRef.current++}>Clicked {countRef.current}</button>;
// UI stays same, value updates in background
```

---

### **Common Uses**

1. **Storing interval IDs**

```js
const intervalRef = useRef();

function startTimer() {
  intervalRef.current = setInterval(() => {
    console.log("tick");
  }, 1000);
}

function stopTimer() {
  clearInterval(intervalRef.current);
}
```

2. **DOM nodes**

```js
const inputRef = useRef();

function focusInput() {
  inputRef.current.focus(); // focuses input box
}

return (
  <>
    <input ref={inputRef} />
    <button onClick={focusInput}>Focus Input</button>
  </>
);
```

---

### **Rules & Best Practices**

- **Escape hatch**: Use refs for special cases (like timeouts, DOM).
- **Don’t read/write during render**:

```js
// ❌ Bad: causes unpredictable behavior
const badRef = useRef(0);
const value = badRef.current; // reading during render
badRef.current++; // mutating during render
```

- **Safe mutation** (in handlers, effects):

```js
function handleClick() {
  myRef.current++; // ✅ safe, outside rendering
}
```

---

### **Differences: Refs vs State**

| Refs                                      | State                                     |
| ----------------------------------------- | ----------------------------------------- |
| `useRef(initial)` → `{ current: value }`  | `useState(initial)` → `[value, setValue]` |
| Mutable                                   | Immutable                                 |
| No re-render on change                    | Re-render on change                       |
| Good for side-effect values (timers, DOM) | Good for rendering logic                  |

---

### **Mental Model**

Refs = sticky notes inside your component.
State = official paperwork that React re-checks and redraws when it changes.

```js
// OOP analogy
class OldClass {
  this.count = 0; // instance field
}

// React functional
const countRef = useRef(0); // instance field replacement
```

---

### **DOM Use Case**

```js
const boxRef = useRef();

return <div ref={boxRef}>Hello</div>;
// boxRef.current → <div>Hello</div>

// After unmount
boxRef.current → null
```

---

Refs = sticky notes you can scribble on anytime.
State = legal documents React notarizes before showing to the world.

---

## Manipulating the DOM with Ref

```js
import { useRef } from "react";

export default function Form() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleClick}>Focus the input</button>
    </>
  );
}
```

### **2. Creating a Ref**

```js
import { useRef } from "react";

function MyComponent() {
  const myRef = useRef(null); // initial value null
  return <div ref={myRef}>Hello</div>;
}
```

- `myRef.current` will point to the `<div>` DOM element after render.

---

### **3. Common Use Cases**

1. **Focus an input**

```js
function FocusInput() {
  const inputRef = useRef(null);

  const handleClick = () => inputRef.current.focus();

  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleClick}>Focus</button>
    </>
  );
}
```

2. **Scroll to an element**

```js
function ScrollToItem() {
  const itemRef = useRef(null);

  const scrollToItem = () => {
    itemRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <button onClick={scrollToItem}>Go</button>
      <div ref={itemRef}>Item</div>
    </>
  );
}
```

---

### **4. Refs for Lists**

- You **cannot call `useRef` in a loop**.
- Use a **ref callback** or store refs in a `Map`/array.

```js
const itemsRef = useRef(new Map());

{
  items.map((item) => (
    <li
      key={item.id}
      ref={(node) => {
        if (node) itemsRef.current.set(item.id, node);
        else itemsRef.current.delete(item.id);
      }}
    >
      {item.name}
    </li>
  ));
}
```

- Access any DOM node later: `itemsRef.current.get(itemId).scrollIntoView()`.

---

### **5. Accessing Child Components’ DOM**

- Pass a ref from parent to child.

```js
function MyInput({ ref }) {
  return <input ref={ref} />;
}

function Form() {
  const inputRef = useRef(null);
  return (
    <>
      <MyInput ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>Focus</button>
    </>
  );
}
```

- **Optional:** Restrict what the parent can access using `useImperativeHandle`.

```js
function MyInput({ ref }) {
  const realRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => realRef.current.focus(),
  }));
  return <input ref={realRef} />;
}
```

- Now parent can only call `focus()`.

---

### **6. Timing**

- `ref.current` is **null during render**.
- Safe to use in:

  - **Event handlers**
  - **useEffect** (after DOM is painted)

- React sets refs **during commit phase**, not render phase.

---

### **7. Flush DOM updates (optional)**

- When state updates lag (like scrolling after adding an item), use `flushSync`.

```js
import { flushSync } from "react-dom";

flushSync(() => setTodos([...todos, newTodo]));
listRef.current.lastChild.scrollIntoView();
```

---

### **8. Best Practices**

- Use refs **only for non-destructive actions**: focus, scroll, measure.
- **Avoid modifying React-managed DOM** (`.remove()`, `.appendChild()`) – can crash your app.
- Safe to modify **areas React doesn’t touch**.

---

### ✅ **Recap**

- Refs = direct access to DOM or mutable values.
- Created with `useRef()` and attached via `ref` prop.
- Common uses: focus, scroll, measure.
- Lists need **callback refs**.
- Parent can access child DOM via ref + `useImperativeHandle`.
- Avoid direct DOM mutations unless React won’t manage it.

---
