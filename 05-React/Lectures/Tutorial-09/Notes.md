# Tutorial - 09

## Modularity

Modularity in React refers to the practice of breaking down a React application into smaller, reusable, and self-contained components. React is designed with modularity in mind, and building applications using a modular approach has several benefits, including code maintainability, reusability, and scalability.

### Here are some key principles and practices related to modularity in React

* Component-Based Architecture: React applications are built using components. Each component represents a part of the user interface and encapsulates its logic and rendering. Components can be reused across different parts of the application.

* Component Composition: You can compose larger UIs by combining smaller components. This promotes reusability and allows you to create complex user interfaces by assembling components like building blocks.

* Separation of Concerns: React components should focus on a single responsibility, such as rendering UI or handling user interactions. This separation of concerns makes it easier to understand, test, and maintain your code.

* Folder Structure: Organize your React project into a structured folder hierarchy. Group related components, styles, and assets together to maintain a clean project structure.

* Reusable Components: Design components to be as reusable as possible. Avoid hardcoding values or styles that limit their flexibility. Use props to customize component behavior.

* Component Libraries: Consider using third-party component libraries (e.g., Material-UI, Ant Design) that provide a set of pre-built, modular components that you can integrate into your application.

* State Management: Implement a state management solution like Redux or React Context for managing the application's state in a modular and centralized manner.

* Testing: Modular components are easier to test in isolation. Use testing libraries like Jest and React Testing Library to write unit tests for your components.

* Code Splitting: For larger applications, implement code splitting to load only the necessary components and resources when they are needed, improving performance.

Modularity in React is essential for building scalable and maintainable applications. By breaking your application into reusable components and following best practices, you can create a more manageable and efficient codebase.

## Custom Hook

Custom hooks are functions that allow you to extract and reuse stateful logic across multiple components. Custom hooks enable you to abstract complex logic into reusable pieces, improving code modularity and maintainability. Custom hooks should follow the naming convention of starting with "use" to make it clear that they are hooks.

### 1. Creating a Custom Hook

To create a custom hook, define a JavaScript function that encapsulates the reusable logic. This function can use built-in React hooks or other custom hooks.

```js
// useCounter.js
  import { useState } from 'react';

  function useCounter(initialValue) {
    const [count, setCount] = useState(initialValue);

    const increment = () => {
      setCount(count + 1);
    };

    const decrement = () => {
      setCount(count - 1);
    };

    return {
      count,
      increment,
      decrement,
    };
  }

  export default useCounter;
```

### 2. Using the Custom Hook

```js
  // Counter.js
  import React from 'react';
  import useCounter from './useCounter';

  function Counter() {
    const { count, increment, decrement } = useCounter(0);

    return (
      <div>
        <p>Count: {count}</p>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
      </div>
    );
  }

  export default Counter;
```

Custom hooks are a powerful way to abstract and share logic between components in a clean and reusable manner. They are particularly useful for handling complex state management, side effects, or any other logic that needs to be shared across different parts of your React application.

## isOnline Hook

useIsOnline hook in React that checks the user's online status using the window.navigator.onLine property and updates it whenever the online status changes:

```js
  import { useState, useEffect } from 'react';

  function useIsOnline() {
    const [isOnline, setIsOnline] = useState(window.navigator.onLine);

    useEffect(() => {
      // Function to update online status
      const handleOnlineStatusChange = () => {
        setIsOnline(window.navigator.onLine);
      };

      // Subscribe to the online and offline events
      window.addEventListener('online', handleOnlineStatusChange);
      window.addEventListener('offline', handleOnlineStatusChange);

      // Clean up event listeners on unmount
      return () => {
        window.removeEventListener('online', handleOnlineStatusChange);
        window.removeEventListener('offline', handleOnlineStatusChange);
      };
    }, []); // Empty dependency array to run the effect only once

    return isOnline;
  }

  export default useIsOnline;
```

You can use this useIsOnline hook in your components to check the online status of the user:

```js
  import React from 'react';
  import useIsOnline from './useIsOnline';

  function OnlineStatus() {
    const isOnline = useIsOnline();

    return (
      <div>
        <p>User is {isOnline ? 'online' : 'offline'}</p>
      </div>
    );
  }

  export default OnlineStatus;
```

## addEventListener and removeEventListener

* In JavaScript and many programming environments, including the web browser environment where JavaScript is commonly used, an "event listener" is a function that is registered to be called when a specific event occurs. Event listeners are used to respond to various user interactions or other events, such as clicks, keyboard inputs, mouse movements, and more.

* The removeEventListener method is used to unregister or remove an event listener that was previously attached to an HTML element or another object. This is important for cleaning up and preventing memory leaks when you no longer need an event listener to respond to a specific event.

* Here's the basic syntax of removeEventListener:

  ```js
    element.removeEventListener(event, listenerFunction, useCapture);
  ```

  * element: The HTML element or object from which you want to remove the event listener.
  * event: A string that specifies the type of event (e.g., 'click', 'keydown', 'mousemove').
  * listenerFunction: The function that was previously added as the event listener and you want to remove.
  * useCapture (optional): A boolean value indicating whether to use the capture phase or not. If useCapture is omitted or false, the listener will be removed from the bubble phase.

* Here's an example of how to add and remove an event listener in JavaScript:

```js
  // Adding an event listener
  const myButton = document.getElementById('myButton');

  function clickHandler() {
    console.log('Button clicked!');
  }

  myButton.addEventListener('click', clickHandler);

  // Removing the event listener
  myButton.removeEventListener('click', clickHandler);
```

* In this example, we first add a click event listener to the myButton element using addEventListener. Then, we remove the same event listener using removeEventListener. This ensures that the event listener is no longer active and won't respond to future click events on the button element.

* Removing event listeners is important in web development to prevent memory leaks and ensure that your application behaves as expected when you no longer need certain interactions or behaviors.

## Lazy loading

* code splitting
* chunking
* Dynamic bundling
* on Demand laoding
* Dynamic Import
* Upon on Demand Loading --> suspends loading bcoz it is not there.

```js
import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Error from "./components/Error";

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

// Lazy loading profile
const About = lazy(() => import("./components/About"));

const AppLayOut = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Outlet />
      <Footer />
    </React.Fragment>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayOut />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<h1>Loading....</h1>}>
            <About />
          </Suspense>
        ),
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
```

### Important

* When we lazy load the component first time it's throw an error because it is not loaded instantly it takes time.
* React will suspend the loading

`Solution:` We use Suspense library to handle the error

* We have to wrap the Component inside Suspense

```jsx
  <Suspense>
      <Component/>
  </Suspense>

  // You can see it in above code
```

* Suspense takes a component as fallback prop so when it's fail to find the component at initial error it will load the component

* Here we will provide a Shimmer as a prop so it will show shimmer while it loads the actual chunk

```jsx
  <Suspense fallback={<Shimmer/>}>
    <Component/>
  </Suspense>
```

### Don't lazy load inside other component because it will be loaded after every cycle
