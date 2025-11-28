# **Example: Task Manager with Reducer + Context**

We’ll break it into 3 files so you can see how everything connects.

---

## **1. TasksContext.js**

👉 Holds reducer, contexts, provider, and custom hooks.

```js
import { createContext, useReducer, useContext } from "react";

// Contexts
const TasksContext = createContext(null);
const TasksDispatchContext = createContext(null);

// Reducer
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
      throw new Error("Unknown action: " + action.type);
    }
  }
}

let nextId = 3;
const initialTasks = [
  { id: 0, text: "Visit Kyoto temple", done: true },
  { id: 1, text: "Eat sushi", done: false },
  { id: 2, text: "Buy souvenirs", done: false },
];

// Provider
export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

// Custom Hooks
export function useTasks() {
  return useContext(TasksContext);
}

export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}
```

---

## **2. TaskApp.js**

👉 Wrap the whole app in `TasksProvider`.

```js
import { TasksProvider } from "./TasksContext";
import TaskList from "./TaskList";
import AddTask from "./AddTask";

export default function TaskApp() {
  return (
    <TasksProvider>
      <h1>Kyoto Day Plan</h1>
      <AddTask />
      <TaskList />
    </TasksProvider>
  );
}
```

---

## **3. AddTask.js**

👉 Uses `dispatch` to add new tasks.

```js
import { useState } from "react";
import { useTasksDispatch } from "./TasksContext";

let nextId = 100; // just to avoid collision

export default function AddTask() {
  const [text, setText] = useState("");
  const dispatch = useTasksDispatch();

  return (
    <div>
      <input
        placeholder="Add new task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={() => {
          dispatch({
            type: "added",
            id: nextId++,
            text: text,
          });
          setText("");
        }}
      >
        Add
      </button>
    </div>
  );
}
```

---

## **4. TaskList.js**

👉 Reads tasks from context + updates/deletes with dispatch.

```js
import { useState } from "react";
import { useTasks, useTasksDispatch } from "./TasksContext";

export default function TaskList() {
  const tasks = useTasks();
  return (
    <ul>
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </ul>
  );
}

function Task({ task }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useTasksDispatch();
  let taskContent;

  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={(e) =>
            dispatch({
              type: "changed",
              task: { ...task, text: e.target.value },
            })
          }
        />
        <button onClick={() => setIsEditing(false)}>Save</button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </>
    );
  }

  return (
    <li>
      {taskContent}
      <button onClick={() => dispatch({ type: "deleted", id: task.id })}>
        Delete
      </button>
    </li>
  );
}
```

---

# 🔥 How it all flows

1. **Add/Edit/Delete button clicked → `dispatch(action)`**
2. **Reducer** runs → updates tasks state.
3. **Context Provider** shares new tasks + dispatch with all children.
4. **TaskList & AddTask** re-render with updated tasks.

---

👉 This is the full working combo:

- **Reducer** = brains (how state changes).
- **Context** = wires (delivers state/dispatch anywhere).
- **Components** = consumers (use state/dispatch directly).

---
