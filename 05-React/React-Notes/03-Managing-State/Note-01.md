# Managing State

React shows the UI on the basis of state, so the state decides what users going to see.

---

## Reacting to Input with State

### 1. Declarative vs Imperative UI

- **Imperative (manual driving)**:
  You tell the computer _step-by-step_ what to do:

  ```js
  button.disabled = true;
  spinner.style.display = "block";
  ```

  Fragile—easy to forget a step, leads to bugs.

- **Declarative (taxi ride)**:
  You just say _what the UI should look like in a given state_, React figures out the rest.

---

### 2. Think in **Visual States**

Imagine a quiz form:

- `empty`: button disabled
- `typing`: button enabled
- `submitting`: form disabled + spinner shown
- `success`: thank-you message
- `error`: show error + form enabled

Instead of micromanaging DOM, describe _what the UI looks like_ in each state.

---

### 3. Triggers for State Changes

Two kinds of inputs:

- **Human**: typing, clicking
- **Computer**: API success/failure, timeout

Example:

- Typing text → from `empty` → `typing`
- Clicking submit → `submitting`
- API success → `success`
- API error → `error`

---

### 4. Representing State

Start with minimal state. Avoid “paradox” states (impossible combos).

❌ Too much state:

```js
const [isEmpty, setIsEmpty] = useState(true);
const [isTyping, setIsTyping] = useState(false);
```

✅ Simplify:

```js
const [answer, setAnswer] = useState("");
const [error, setError] = useState(null);
const [status, setStatus] = useState("empty");
// 'empty' | 'typing' | 'submitting' | 'success' | 'error'
```

---

### 5. Hooking State to Events

```jsx
function Form() {
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState("empty");
  const [error, setError] = useState(null);

  function handleChange(e) {
    setAnswer(e.target.value);
    setStatus(e.target.value ? "typing" : "empty");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    try {
      await submitForm(answer);
      setStatus("success");
    } catch (err) {
      setError(err);
      setStatus("error");
    }
  }

  if (status === "success") return <h1>Thanks!</h1>;

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={answer}
        onChange={handleChange}
        disabled={status === "submitting"}
      />
      <button disabled={!answer || status === "submitting"}>Submit</button>
      {status === "error" && <p>{error.message}</p>}
    </form>
  );
}
```

---

### 6. Key Takeaways

- **Declarative** = describe UI for each state.
- Identify all **visual states** before coding.
- Store only **essential state** (avoid duplicates).
- Hook state updates to **human + computer inputs**.
- Longer code, but safer and easier to extend.

---

### Tiny Analogy Example

Imagine a traffic light:

- Imperative:
  “Turn red bulb on, green off, yellow off.”
- Declarative:
  `status = "red"` → React decides which bulb lights up.

---

## **Choosing the State Structure – Notes**

### Core Principles

1. **Group related state**

   - If two values always update together → store them together.
   - Example:
     ❌ `x` and `y` separately (risk forgetting one).
     ✅ `{x, y}` in one object.

2. **Avoid contradictions in state**

   - Don’t keep multiple flags that can disagree.
   - Example: `isSending` & `isSent` can both be `true` → impossible.
   - Fix → use a single `status` with finite values (`'typing' | 'sending' | 'sent'`).

3. **Avoid redundant state**

   - Don’t store what you can derive.
   - Example: `fullName` = `firstName + lastName` → no need to store separately.

4. **Avoid duplication in state**

   - Don’t copy the same data in two places.
   - Example: storing both `items` and a full `selectedItem`.
   - Fix → just store `selectedId`, derive `selectedItem` from `items`.

5. **Avoid deeply nested state**

   - Nested trees are painful to update (copying parents up the chain).
   - Fix → “normalize” like a database: use an object keyed by IDs (`{ id → place }`) + `childIds` arrays.

---

### Examples in Action

- **Grouped state** → Cursor position:

  ```js
  const [position, setPosition] = useState({ x: 0, y: 0 });
  ```

- **Avoid contradictions** → Hotel feedback form:

  ```js
  const [status, setStatus] = useState("typing");
  // 'typing' | 'sending' | 'sent'
  ```

- **Avoid redundant** → Form name:

  ```js
  const fullName = firstName + " " + lastName;
  ```

- **Avoid duplication** → Menu selection:

  ```js
  const [selectedId, setSelectedId] = useState(0);
  const selectedItem = items.find((item) => item.id === selectedId);
  ```

- **Avoid deep nesting** → Travel plan:

  ```js
  const plan = {
    0: { id: 0, title: "Root", childIds: [1, 42] },
    1: { id: 1, title: "Earth", childIds: [2, 3] },
  };
  ```

---

### Mental Model

Think like a **database engineer**:

- Normalize data: store only essential pieces.
- Remove redundancy and duplication.
- Keep state flat where possible.
- Derived values = computed on the fly, not stored.

Einstein version:
**“Make your state as simple as it can be—but no simpler.”**

---

### Quick Recap

- Merge state that always updates together.
- Replace multiple flags with a single **status**.
- Don’t store derived values.
- Store IDs instead of objects.
- Normalize deep structures into flat maps.

---

## **Sharing State Between Components – Notes**

### 1. The Problem

- Each `Panel` has its own `isActive` state.
- That makes them **independent**: you can open both at once.
- But requirement: only **one panel open at a time** → need coordination.

---

### 2. The Solution → **Lifting State Up**

State must move from child → common parent. Why?
Because parent is the **single source of truth** that controls children.

#### Steps:

**Step 1: Remove state from child.**
`Panel` no longer has `useState`. Instead, it accepts `isActive` prop.

```js
function Panel({ title, children, isActive, onShow }) {
  return (
    <section>
      <h3>{title}</h3>
      {isActive ? <p>{children}</p> : <button onClick={onShow}>Show</button>}
    </section>
  );
}
```

---

**Step 2: Pass data from parent.**
Hardcode `isActive` in `Accordion` to test.

```js
<Panel title="About" isActive={true}>...</Panel>
<Panel title="Etymology" isActive={false}>...</Panel>
```

---

**Step 3: Add state in parent.**
Store which panel is active → `activeIndex`.

```js
export default function Accordion() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <h2>Almaty, Kazakhstan</h2>
      <Panel
        title="About"
        isActive={activeIndex === 0}
        onShow={() => setActiveIndex(0)}
      >
        ...
      </Panel>

      <Panel
        title="Etymology"
        isActive={activeIndex === 1}
        onShow={() => setActiveIndex(1)}
      >
        ...
      </Panel>
    </>
  );
}
```

---

### 3. Mental Model

- **Accordion** = _boss_ (controls which panel is active).
- **Panels** = _employees_ (receive instructions via props, report back via `onShow`).
- Rule of thumb: find the **closest common parent** and put shared state there.

---

### 4. Controlled vs Uncontrolled Components

- **Controlled** → parent drives them via props (`isActive`, `onShow`).
- **Uncontrolled** → manage their own state (e.g., a `<form>` input with `defaultValue`).

Both are useful. But when two or more components need to “agree,” make them **controlled** by lifting state up.

---

### 5. Recap

- To sync components → lift their state up.
- Parent = single source of truth.
- Pass **state** down via props.
- Pass **event handlers** down so child can request changes.
- Controlled components = predictable and testable.

---

---
