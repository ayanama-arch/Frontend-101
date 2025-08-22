# Tanstack Query

Tanstack Query is one of the best tool to manage server state.

## Installation

`Note` It is recommended to use ESLint Plugin query

```bash
    # react-query
    npm install @tanstack/react-query

    # ESLint Plugin
    npm i -D @tanstack/eslint-plugin-query
```

## Devtools

`Note:` In Nextjs install it as dev dependency
In react it is automatically set to dev dependency

```bash
    # devtool
    npm i @tanstack/react-query-devtools
```

Floating Mode will mount the devtools as a fixed, floating element in your app and provide a toggle in the corner of the screen to show and hide the devtools. This toggle state will be stored and remembered in localStorage across reloads.

Place the following code as high in your React app as you can. The closer it is to the root of the page, the better it will work!

````tsx
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* The rest of your application */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}```
````

## Queries

A query is a declarative dependency on an asynchronous data source.
It is tied to a unique key.
Queries are used with any Promise-based method (e.g., GET and POST) to fetch data from a server.

### Best Practice

Use Mutations instead of Queries when your method modifies data on the server.

### Subscribing to a Query

Use the useQuery hook to subscribe to a query in your components or custom hooks.
Parameters for useQuery Hook:

Unique Key: A unique key for the query.
Function: A function that returns a promise which either:

- Resolves the data, or
- Throws an error.

`Note:` The unique key you provide is used internally for refetching, caching, and sharing your queries throughout your application.

### Result Object

`isPending or status === 'pending'` - The query has no data yet
`isError or status === 'error'` - The query encountered an error
`isSuccess or status === 'success'` - The query was successful and data is available
`error` - If the query is in an isError state, the error is available via the error property.
`data` - If the query is in an isSuccess state, the data is available via the data property.
`isFetching` - In any state, if the query is fetching at any time (including background refetching) isFetching will be true.

If you don't want to use boolean then you can use `status`

```jsx
function Todos() {
  const { status, data, error } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodoList,
  });

  if (status === "pending") {
    return <span>Loading...</span>;
  }

  if (status === "error") {
    return <span>Error: {error.message}</span>;
  }

  // also status === 'success', but "else" logic works, too
  return (
    <ul>
      {data.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}
```

## Query Keys

TanStack Query manages query caching for you based on query keys. Query keys have to be an Array at the top level, and can be as simple as an Array with a single string, or as complex as an array of many strings and nested objects.

```jsx
// A list of todos
useQuery({ queryKey: ['todos'], ... })

// Something else, whatever!
useQuery({ queryKey: ['something', 'special'], ... })
```

### Array keys with variables

```tsx
// An individual todo
useQuery({ queryKey: ['todo', 5], ... })

// An individual todo in a "preview" format
useQuery({ queryKey: ['todo', 5, { preview: true }], ...})

// A list of todos that are "done"
useQuery({ queryKey: ['todos', { type: 'done' }], ... })
```

- Query Keys are hashed deterministically

### Example

```tsx
function Todos({ todoId }) {
  const result = useQuery({
    queryKey: ["todos", todoId],
    queryFn: () => fetchTodoById(todoId),
  });
}
```

## Query Functions

A query function can be literally any function that returns a promise.

```tsx
// Example-01
useQuery({ queryKey: ["todos"], queryFn: fetchAllTodos });

// Example-02
useQuery({ queryKey: ["todos", todoId], queryFn: () => fetchTodoById(todoId) });

// Example-03
useQuery({
  queryKey: ["todos", todoId],
  queryFn: async () => {
    const data = await fetchTodoById(todoId);
    return data;
  },
});

// Example-04
useQuery({
  queryKey: ["todos", todoId],
  queryFn: ({ queryKey }) => fetchTodoById(queryKey[1]),
});
```

### Usage with fetch and other clients that do not throw by default

While most utilities like axios or graphql-request automatically throw errors for unsuccessful HTTP calls, some utilities like fetch do not throw errors by default. If that's the case, you'll need to throw them on your own. Here is a simple way to do that with the popular fetch API:

````tsx
useQuery({
  queryKey: ['todos', todoId],
  queryFn: async () => {
    const response = await fetch('/todos/' + todoId)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json()
  },
})```
````

## Network Mode

TanStack Query provides three network modes to manage Queries and Mutations based on network connection status. These modes can be set individually for each Query/Mutation or globally via query/mutation defaults.
