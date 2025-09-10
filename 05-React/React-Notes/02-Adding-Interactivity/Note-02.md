## Queueing a Series of State Updates

Setting state doesn’t change it right away—it **queues an update** for the next render. When you set state multiple times in one event, React groups them together (batching) before re-rendering.

Think of React like a **waiter**:
you don’t sprint to the kitchen with every dish, you write the whole order, then hand it over.

---

### Batching in Action

```jsx
export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button
        onClick={() => {
          setNumber(number + 1);
          setNumber(number + 1);
          setNumber(number + 1);
        }}
      >
        +3
      </button>
    </>
  );
}
```

**Expectation:** +3
**Reality:** +1

Why?
All three `setNumber(number + 1)` calls read from the **same snapshot** (`0`). React queues them, then applies only the “replace with 1” update once.

---

### Fix: Updater Functions

To apply multiple updates in one go, pass a function instead of a value:

```jsx
<button
  onClick={() => {
    setNumber((n) => n + 1);
    setNumber((n) => n + 1);
    setNumber((n) => n + 1);
  }}
>
  +3
</button>
```

Now React processes the queue like this:

| queued update | n   | returns |
| ------------- | --- | ------- |
| `n => n + 1`  | 0   | 1       |
| `n => n + 1`  | 1   | 2       |
| `n => n + 1`  | 2   | 3       |

Final state = **3** ✅

---

### Mixing Updates

#### Replace → Update

```jsx
<button
  onClick={() => {
    setNumber(number + 5); // replace with 5
    setNumber((n) => n + 1); // then add 1
  }}
>
  Increase
</button>
```

Result: `6`

---

#### Replace → Update → Replace

```jsx
<button
  onClick={() => {
    setNumber(number + 5); // replace with 5
    setNumber((n) => n + 1); // 6
    setNumber(42); // replace with 42
  }}
>
  Increase
</button>
```

Result: **42** (final replacement wins).

---

### Key Rules

- **Values** (`setState(5)`) → replace the state with that value.
- **Functions** (`setState(n => n + 1)`) → added to the queue, processed in order.
- **Batching** → React waits until the event handler is finished before re-rendering.
- Updates from **different events** (e.g. two separate clicks) are not batched.
- Updater functions must be **pure** (no side effects, only return new state).

---

### Recap

- Setting state doesn’t change it immediately—it queues updates.
- React batches multiple updates inside one event handler.
- **Values replace** state, **functions transform** it.
- Final result = React walking through the queue in order.
- Use updater functions when you need to build on the latest state in the same render cycle.

---

## 📌 **Updating Objects in React State – Notes**

#### 1. **State can hold any value**

- State is not limited to numbers or strings — it can store **objects, arrays, functions, anything**.
- Example:

  ```js
  const [position, setPosition] = useState({ x: 0, y: 0 });
  ```

---

#### 2. **Immutability Principle**

- Numbers, strings, booleans → immutable (unchangeable).
- Objects/arrays in JS → mutable, BUT in **React, treat them as immutable**.
- ❌ Wrong (mutation):

  ```js
  position.x = 5; // Mutates old state
  ```

- ✅ Correct (replacement):

  ```js
  setPosition({ x: 5, y: 0 }); // Creates new object
  ```

**Why?**
React re-renders only when you call the state updater (`setState`). If you mutate, React won’t notice.

---

#### 3. **Mutation vs Local Mutation**

- ❌ Mutation problem:

  ```js
  position.x = e.clientX;
  ```

  → Changes past state object (React doesn’t re-render).

- ✅ Local mutation (safe):

  ```js
  const nextPosition = {};
  nextPosition.x = e.clientX;
  nextPosition.y = e.clientY;
  setPosition(nextPosition);
  ```

  → New object, no one else references it. Perfectly fine.

---

#### 4. **Copying with Spread (`...`)**

- Often, you want to change **only one field** but keep others.
- ❌ Wrong:

  ```js
  person.firstName = e.target.value;
  ```

- ✅ Correct with spread:

  ```js
  setPerson({
    ...person,
    firstName: e.target.value,
  });
  ```

---

#### 5. **Dynamic Updates with One Handler**

- Instead of multiple handlers, use property names dynamically:

  ```js
  function handleChange(e) {
    setPerson({
      ...person,
      [e.target.name]: e.target.value,
    });
  }
  ```

- Works with inputs having `name="firstName"`, `name="email"`, etc.

---

#### 6. **Updating Nested Objects**

- ❌ Wrong:

  ```js
  person.artwork.city = "New Delhi";
  ```

- ✅ Correct (nested spreads):

  ```js
  setPerson({
    ...person,
    artwork: {
      ...person.artwork,
      city: "New Delhi",
    },
  });
  ```

---

#### 7. **Objects are references, not truly nested**

- `person.artwork` is just a pointer to another object.
- If multiple objects point to the same `artwork`, mutating one affects all.
- Example:

  ```js
  obj2.artwork = obj1;
  obj3.artwork = obj1;
  obj3.artwork.city = "Paris"; // Changes obj1 + obj2 as well
  ```

---

#### 8. **Immer – Cleaner Updates**

- With [Immer](https://github.com/immerjs/immer), you can write **mutable-looking code** but it creates immutable copies under the hood.
- Example:

  ```js
  updatePerson((draft) => {
    draft.artwork.city = "Lagos";
  });
  ```

---

#### 9. **Recap – Golden Rules**

1. Treat React state as **read-only**.
2. Never mutate old state directly.
3. Use spread syntax (`...`) to copy + override properties.
4. Spread is **shallow** (one level deep).
5. For deep updates, copy layer by layer, or use **Immer**.
6. Local mutation (of fresh objects) is fine.

---

⚡ **Mini Example:**

```js
const [user, setUser] = useState({
  name: "Alice",
  address: { city: "Mumbai", pincode: 400001 },
});

// ✅ Update city
setUser({
  ...user,
  address: {
    ...user.address,
    city: "Delhi",
  },
});
```

---
