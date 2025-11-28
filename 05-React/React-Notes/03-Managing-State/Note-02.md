# Preserving & Resetting State — compact revision notes

## 1) First principles (one-liners)

- **State lives inside React**, not inside your component function.
- React matches state to a **position in the render tree** (a seat).
- A component’s identity = **(element type, key, and position among siblings)**. Change any of those and React will unmount and recreate state.

---

## 2) Mental model (exact)

- Imagine a **row of seats** (the children of a parent). Each seat holds the state for whatever component is sitting there.
- If the seat gets a different component type, that previous occupant (and its state) is evicted.
- **Keys** act like passports — they tell React “this seat belongs to Taylor” rather than “first seat”.

---

## 3) Minimal examples + what happens

### A. Two independent counters (separate positions)

```jsx
// App.js
import { useState } from "react";
function Counter() {
  const [n, setN] = useState(0);
  return <button onClick={() => setN(n + 1)}>{n}</button>;
}
export default function App() {
  return (
    <div>
      <Counter />
      <Counter />
    </div>
  );
}
```

**Result:** Each counter has its own state. Increment one → the other unchanged.

---

### B. Toggle a component off/on (state destroyed when unmounted)

```jsx
function App() {
  const [show, setShow] = useState(true);
  return (
    <>
      {show && <Counter />}
      <button onClick={() => setShow((s) => !s)}>toggle</button>
    </>
  );
}
```

**Result:** Unmounting `<Counter />` destroys its state. Re-mount = fresh state (initial value).

---

### C. Same component type, same position → state preserved

```jsx
function App() {
  const [fancy, setFancy] = useState(false);
  return (
    <div>
      {fancy ? <Counter isFancy={true} /> : <Counter isFancy={false} />}
      <button onClick={() => setFancy((f) => !f)}>flip</button>
    </div>
  );
}
```

**Result:** Counter state preserved because a `Counter` remains at the same tree position (same seat).

---

### D. Different component type at same position → state reset

```jsx
function App() {
  const [paused, setPaused] = useState(false);
  return (
    <div>
      {paused ? <p>paused</p> : <Counter />}
      <button onClick={() => setPaused((p) => !p)}>pause</button>
    </div>
  );
}
```

**Result:** Swapping `Counter` ↔ `p` unmounts `Counter` → its state is destroyed.

---

### E. Resetting or separating logically identical components using keys

```jsx
// Scoreboard: want separate scores for Taylor and Sarah even if same position
{
  isTaylor ? (
    <Counter key="taylor" person="Taylor" />
  ) : (
    <Counter key="sarah" person="Sarah" />
  );
}
```

**Result:** Different keys prevent React from reusing the same state; toggling resets to each person’s fresh Counter.

---

## 4) How to force a reset (practical)

- **Set a different `key`** on the component (e.g., key={user.id}). React will recreate the subtree.
- **Unmount** and re-mount the component (e.g., conditional rendering).
- **Change component type** (Counter → p) — React unmounts the old one.

**Common use:** Reset forms when switching users: `<Chat key={user.id} user={user} />`

---

## 5) Why nested component definitions break state

```jsx
function Outer() {
  function Inner() {
    const [t, setT] = useState("");
    return <input value={t} onChange={(e) => setT(e.target.value)} />;
  }
  return (
    <>
      <Inner />
      <button>…</button>
    </>
  );
}
```

Because `Inner` is redefined each render, React sees a _different component_ each time → child state is reset repeatedly.
**Fix:** define components at module/top-level.

---

## 6) Keys: rules & gotchas

- Keys are used **only among siblings** to identify elements.
- Keys should be **stable** and **unique** for the sibling list (e.g., id).
- Avoid using list **index** as key when items can be reordered/added/removed — it will cause state and DOM mismatches.
- Keys do **not** affect props; they only affect reconciliation (matching old vs new children).

---

## 7) Quick debugging checklist (if state resets unexpectedly)

1. Did the component unmount? (conditional render removed it)
2. Did its **element type** change? (Counter → p)
3. Did the **position** in the render tree change? (wrapped in different parent element)
4. Was the component **defined inside** another component? (nested declaration)
5. Are you using **unstable keys** (array index) for lists?
6. Did you change the **key** intentionally or accidently?

If YES to any → React probably unmounted and recreated state.

---

## 8) One-page cheat sheet (copy this)

- Preserve state: same **type + same position + same key**.
- Reset state: change **type**, **position**, or **key** (or unmount).
- Keys = identity; positions = seat number; element type = class of occupant.
- Never declare components inside render functions.

---

## 9) Tiny practice tasks (fast)

1. Create two `<Counter />` components and increment both — verify isolation.
2. Toggle the second counter off and back on — verify it resets.
3. Implement scoreboard with `{isPlayerA ? <Counter key="A" /> : <Counter key="B" />}` — verify each player’s counter resets when switched.
4. Put a component definition inside another function and observe that input state is lost on every re-render — then move it out to fix.

---

## 10) Useful one-line rules to memorize

- **Position + Type + Key → identity.**
- **Unmount = forget.**
- **Key = force recreate.**

---
