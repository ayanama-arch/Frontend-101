Alright Boss, let’s slice this mountain of React array state wisdom into crisp, bite-sized **notes** for your quick revision 🚀

---

# 📌 Notes: Updating Arrays in React State

## 🔑 Core Rule

- **Arrays in state are immutable** → never mutate them directly.
- Don’t use `push()`, `pop()`, `splice()`, or assignments like `arr[0] = ...`.
- Always create a **new array** and update state with it.

---

## ⚖️ Mutating vs Non-Mutating Methods

| ❌ Avoid (mutates array) | ✅ Prefer (returns new array)                         |
| ------------------------ | ----------------------------------------------------- |
| `push`, `unshift`        | `concat`, `[...arr]`                                  |
| `pop`, `shift`, `splice` | `filter`, `slice`                                     |
| `splice`, `arr[i] = ...` | `map`                                                 |
| `reverse`, `sort`        | copy first → `[...arr].reverse()` / `[...arr].sort()` |

👉 **Pitfall:** `slice ✅` vs `splice ❌`.

- `slice` → returns a copy (non-mutating).
- `splice` → edits the original array (mutating).

---

## 🟢 Common Operations

### 1. **Adding Items**

```js
setArtists([...artists, { id: nextId++, name: name }]);
```

- `push()` ❌ → mutates
- Spread `[...arr, newItem]` ✅

To prepend:

```js
setArtists([{ id: nextId++, name: name }, ...artists]);
```

---

### 2. **Removing Items**

Use `filter`:

```js
setArtists(artists.filter((a) => a.id !== artist.id));
```

---

### 3. **Transforming Items**

Use `map`:

```js
setShapes(
  shapes.map((shape) =>
    shape.type === "circle" ? { ...shape, y: shape.y + 50 } : shape
  )
);
```

---

### 4. **Replacing Items**

```js
setCounters(counters.map((c, i) => (i === index ? c + 1 : c)));
```

---

### 5. **Inserting Items**

Use `slice` + spread:

```js
setArtists([
  ...artists.slice(0, insertAt),
  { id: nextId++, name },
  ...artists.slice(insertAt),
]);
```

---

### 6. **Sorting / Reversing**

Copy first:

```js
const nextList = [...list];
nextList.reverse();
setList(nextList);
```

⚠️ But don’t mutate objects inside the copied array directly:

```js
// ❌ Wrong
nextList[0].seen = true;
```

Instead:

```js
setList(
  list.map((item) => (item.id === targetId ? { ...item, seen: true } : item))
);
```

---

## 🟠 Updating Objects Inside Arrays

- Arrays store references to objects → copying the array doesn’t copy objects inside.
- Use `map` + spread (`{ ...obj }`) to create updated copies.

```js
setMyList(
  myList.map((artwork) =>
    artwork.id === artworkId ? { ...artwork, seen: nextSeen } : artwork
  )
);
```

---

## 🟢 Using Immer for Conciseness

Immer lets you write mutating code safely.

```js
updateMyTodos((draft) => {
  const artwork = draft.find((a) => a.id === artworkId);
  artwork.seen = true; // looks like mutation, but safe
});
```

- Works because Immer creates a new immutable state behind the scenes.

---

## 📝 Recap

1. **Never mutate arrays in state.**
2. Create **new arrays** with spread, `map`, `filter`, `slice`.
3. For deep updates, copy objects too (`{ ...obj }`).
4. If code gets verbose → use **Immer**.

---

Boss, do you also want me to create a **visual cheat sheet (like a table of each operation with code snippet)** so you can use it as a 1-page quick reference while coding?
