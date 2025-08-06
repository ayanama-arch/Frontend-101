## 🔥 RTK Query Lifecycle Callbacks (Cheat Sheet)

RTK Query provides special lifecycle methods **inside `endpoints`** to perform side effects like optimistic updates, logging, or error handling.

---

### ✅ `onQueryStarted`

> Callback that runs when a query or mutation is _initiated_.

**Use it for:**

- Optimistic updates (update cache before server response).
- Side effects (log, UI spinner, analytics).
- Awaiting the result manually.

**Signature:**

```ts
onQueryStarted(arg, {
  dispatch,
  queryFulfilled,
  getState,
  extra,
  requestId,
  getCacheEntry,
});
```

**Example:**

```ts
getUser: builder.query({
  query: (id) => `/user/${id}`,
  onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
    try {
      const result = await queryFulfilled;
      // do something with result.data
    } catch (err) {
      // handle error
    }
  },
});
```

---

### ✅ `onCacheEntryAdded` (only for queries)

> Called when cache entry is added and can be used to listen for live updates (WebSocket, polling, etc.)

**Use it for:**

- Setting up subscriptions or socket listeners.
- Cleaning up when cache is removed.

**Signature:**

```ts
onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved, ... })
```

**Example:**

```ts
getMessages: builder.query({
  query: () => "/messages",
  async onCacheEntryAdded(
    arg,
    { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
  ) {
    await cacheDataLoaded;
    const socket = new WebSocket("ws://example.com");

    socket.onmessage = (event) => {
      updateCachedData((draft) => {
        draft.push(JSON.parse(event.data));
      });
    };

    await cacheEntryRemoved;
    socket.close();
  },
});
```

---

### ⚙️ `queryFulfilled` (used inside `onQueryStarted`)

> A promise you can `await` to get result or catch error from the query/mutation.

**Example:**

```ts
onQueryStarted: async (arg, { queryFulfilled }) => {
  try {
    const { data } = await queryFulfilled;
    // handle successful response
  } catch (error) {
    // handle error
  }
};
```

---

### 🚀 Summary Table

| Callback            | Type                         | Trigger Time                | Common Use Case                       |
| ------------------- | ---------------------------- | --------------------------- | ------------------------------------- |
| `onQueryStarted`    | Query/Mutation               | When API call starts        | Optimistic UI, logging, cache changes |
| `onCacheEntryAdded` | Query                        | When query cache is created | Subscriptions, WebSocket integration  |
| `queryFulfilled`    | Used inside `onQueryStarted` | When API call completes     | Awaiting actual response result       |

---

### 📌 Notes

- Both `onQueryStarted` and `onCacheEntryAdded` are defined **inside the `builder.query()` or `builder.mutation()`** config object.
- These callbacks do not affect the API response directly but allow **side effects or cache manipulation**.

---
