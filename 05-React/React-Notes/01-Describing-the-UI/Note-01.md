## Component

React component is Javascript function and in which you can write the markup.

```js
export default function Profile() {
  return <img src="./image.png" alt="profile image" />;
}
```

1. Export the component for so that you can use anywhere.
2. Component name must start with Capital Letters (react diffrentiate components with markup with capital letters at beginning).
3. While Returning markup return in single line or wrap in parent container because funciton can only return single object if multiple then array of an object.

## Import & Export

1. In Root Component you can import child components and use it.
2. You can both default and name import from file but only one default export from one file..

## Writing Markup with JSX

JSX is javascript extension to let write HTML inside javascript file.

- JSX and React are two separate things. JSX is syntax extension while react is js library.

```js
// ---------- Using JSX ----------

// JSX
const elWithJSX = <h1>Hello JSX</h1>;

// Compiled JSX
const elWithoutJSX = React.createElement("h1", null, "Hello JSX");
```

### Rules of JSX

1. Return a single root element
2. Close all the tags
3. camelCase for most of the things.

### Javascript in JSX

1. JSX attributes inside quotes are passed as strings.
2. Curly brackets let's you write js logic or variables inside jsx.
3. For styles pass style object inside attribute in double braces {{}}
4. Styles with dashes get converted into camelCase "background-color` -> backgroundColor

## Passing Props

Props are the information that you pass to a JSX tag.

---

- Pass props like HTML attrs:

  ```jsx
  <Avatar person="Ayan" size={120} />
  ```

- Read props via destructuring:

  ```js
  function Avatar({ person, size = 100 }) { ... }
  ```

  _(default values supported)_

- Spread props (use sparingly):

  ```jsx
  <Avatar {...props} />
  ```

- Nested JSX → becomes `children` prop:

  ```jsx
  <Card>
    <Avatar />
  </Card>
  ```

- Props = **read-only**, new snapshot on each render.

- To change data → use **state**, not props.

---

## Conditional Rendering

```js
import React from "react";

export default function ConditionalDemo({ isLoggedIn, hasAvatar }) {
  // --- Plain if/else ---
  if (!isLoggedIn) {
    return <h2>Please log in</h2>;
  }

  // --- Save JSX in variable ---
  let avatar;
  if (hasAvatar) {
    avatar = <img src="/avatar.png" alt="Avatar" />;
  } else {
    avatar = <span>No Avatar</span>;
  }

  return (
    <div>
      <h2>Welcome!</h2>

      {/* Using variable */}
      {avatar}

      {/* Ternary operator */}
      {hasAvatar ? <p>Custom avatar loaded</p> : <p>Using default avatar</p>}

      {/* Logical AND */}
      {isLoggedIn && <button>Logout</button>}
    </div>
  );
}
```

---

### **Conditional Rendering – Quick Notes**

- **if/else** → return different JSX.
- **return null** → render nothing.
- **Ternary (? :)** → inline if/else in JSX.
- **Logical AND (&&)** → render if true, nothing if false _(watch out: 0 shows as 0)_.
- **Variable assignment** → store JSX/text in `let`, reassign based on condition, then insert with `{}`.
- Use **nested JSX** when conditionally wrapping content.
- Prefer shortcuts for simple cases, but use variables/functions for readability when logic grows.

---

## Rendering Lists

**1. Rendering arrays**

- Store data in arrays/objects.
- Use **`map()`** → transform array → JSX components.
- Use **`filter()`** → select only items matching a condition.

**2. Example**

```jsx
const people = [
  { id: 1, name: "Molina", profession: "chemist" },
  { id: 2, name: "Salam", profession: "physicist" },
];

const chemists = people.filter((p) => p.profession === "chemist");
const listItems = chemists.map((p) => (
  <li key={p.id}>
    {p.name} - {p.profession}
  </li>
));
return <ul>{listItems}</ul>;
```

**3. Keys**

- Every list item **must** have a unique `key` prop.
- Keys = stable unique IDs (from DB, UUID, counters).
- Don’t use `index` or `Math.random()` → causes bugs and remounts.
- Keys are for React, not passed as props to your component.

**4. Rules of Keys**

- Unique **among siblings**.
- Must be **stable across renders**.
- Not allowed to change during reorders.

**5. Arrow functions & returns**

- Shorthand: `map(p => <li>...</li>)` → implicit return.
- If using `{}`, you must explicitly `return`.

**6. Why keys matter**

- Like filenames on your desktop.
- Help React know which item is which after insertion, deletion, reordering.
- Prevents unnecessary re-rendering and losing user input.

---

## Pure Component

---

**1. What is purity?**

- A **pure function**:

  - Doesn’t change external variables or objects.
  - Same inputs → same outputs (predictable).

- Example:

  ```js
  function double(x) {
    return 2 * x;
  }
  // always returns same result for same x
  ```

**2. React components = pure functions**

- Given same props, must return the same JSX.
- No hidden surprises, no side effects during rendering.

---

**3. Impure vs Pure Example**

❌ Impure (mutates external variable):

```js
let guest = 0;
function Cup() {
  guest++; // side effect
  return <h2>Guest #{guest}</h2>;
}
```

✅ Pure (depends only on props):

```js
function Cup({ guest }) {
  return <h2>Guest #{guest}</h2>;
}
```

---

**4. Local mutation is fine**

- Allowed if it’s created **inside** the function during render:

```js
export default function TeaGathering() {
  const cups = [];
  for (let i = 1; i <= 3; i++) {
    cups.push(<Cup key={i} guest={i} />);
  }
  return cups; // safe
}
```

- Not allowed if the array/object was created outside → that’s global mutation.

---

**5. Where side effects belong**

- Not in render.
- Use **event handlers** (`onClick`, `onChange`, etc.).
- If unavoidable, use **`useEffect`** (runs after render).

---

**6. Why React cares about purity**

- Rendering can happen at **any time**, in **any order**.
- Pure components = predictable, testable, bug-free.
- Impure ones cause inconsistent UI and hidden bugs.

---

## UI as Tree

---

### 1. Why Trees?

- UI = naturally hierarchical → best represented as a **tree**.
- Browsers: HTML → DOM tree, CSS → CSSOM tree.
- React: Components → **render tree**.

---

### 2. **Render Tree**

- Shows **parent-child relationship** between components in a single render pass.
- Root node = **root component** (usually `App`).
- Example:

  ```
  App
   ├── FancyText
   └── InspirationGenerator
         └── Copyright
  ```

- **Conditional rendering** → render tree can change across renders.

  - e.g. `<FancyText />` OR `<Color />` depending on props/state.

- **Top-level components**: near root → heavy, affect all below.
- **Leaf components**: near bottom → often re-rendered frequently.

---

### 3. **Module Dependency Tree**

- Represents **file imports** instead of components.
- Each node = module/file, each arrow = `import`.
- Includes non-components too (e.g. `quotes.js`).
- Different from render tree:

  - Copyright may **render under InspirationGenerator** but **import under App**.

- Used by **bundlers** (Webpack, Vite, etc.) to decide what goes into your production build.

---

### 4. **Why Important?**

- **Render tree** → helps debug rendering, performance, and data flow.
- **Dependency tree** → helps debug bundle size, unused imports, and optimize shipping code.

---
