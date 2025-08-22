# Notes - 05

## Monolithic Architecture

* In Monolithic an entire application is built as a single, indivisible unit.
* In this architecture, all the components and functionalities of the application are tightly integrated and interdependent.
* Entire application, including the user interface, business logic, and data storage, is developed, deployed, and scaled as a single monolithic entity.

## Microservice Architecture

* Each service in the microservice architecture represents a specific business capability and can be developed, deployed, and scaled independently.
* These services communicate with each other through well-defined APIs, often using lightweight protocols like HTTP or messaging systems.

## Separation of concern | Single Responsibility

## useEffect

* UseEffect is a built-in hook that allows you to perform side effects in functional components.
* Side effects are actions that are typically asynchronous and may affect the component's state, interact with the DOM, or perform network requests.
* The useEffect hook is often used to handle tasks like fetching data, setting up event listeners, updating the document title, or performing cleanup.

```js
    // useEffect(callback(),dependencyArray)
    useEffect((=>{},[]))
```

* useEffect will call when dependency is changed.

## What is CORS

CORS stands for Cross-Origin Resource Sharing. It's a security feature implemented in web browsers to control how web pages from one domain can request and interact with resources (like data, images, scripts) hosted on another domain. CORS is primarily a browser-based mechanism and is designed to prevent potential security vulnerabilities that can arise when web pages from different origins (domains) interact with each other.

### How CORS works

1. Same-Origin Policy: By default, web browsers enforce a "same-origin policy," which means that a web page from one domain is not allowed to make requests to resources on another domain using JavaScript unless they have the same origin (protocol, domain, and port). This policy is a security measure to prevent unauthorized access to data on different domains.

2. Cross-Origin Requests: However, there are legitimate cases where you might want to allow cross-origin requests. For instance, you might have a web application hosted on one domain that needs to make AJAX requests to an API hosted on another domain. This is where CORS comes into play.

3. CORS Headers: To enable controlled and secure cross-origin requests, the server hosting the resources can send specific HTTP headers that indicate which origins are allowed to access its resources. These headers include:

    * Access-Control-Allow-Origin: This header specifies the list of origins that are allowed to access the resource. For example, if example.com wants to access a resource on api.example.org, the server can include Access-Control-Allow-Origin: 'example.com' in its response header.
    * Access-Control-Allow-Methods: This header specifies the HTTP methods that are allowed when accessing the resource.
    * Access-Control-Allow-Headers: This header specifies which HTTP headers are allowed in the actual request.
    * Access-Control-Allow-Credentials: This header indicates whether the browser should include credentials (like cookies or HTTP authentication) in the request.
    * Access-Control-Expose-Headers: This header specifies which response headers can be exposed to the requesting client.

4. Preflight Requests: For some types of requests (e.g., those with certain HTTP methods or custom headers), the browser might send a "preflight" request before the actual request to check if the server allows the cross-origin request. This involves an HTTP OPTIONS request to the server with specific headers.

## Shimmer UI

Shimmer UI is commonly used in web and mobile applications, especially in scenarios where network latency or data fetching times can be significant. It is widely employed in applications with social feeds, news articles, product listings, and other content-heavy interfaces to enhance the user experience during data loading.

## Conditional Rendering in React

Conditional rendering in React allows you to display different components or content based on certain conditions. Here are some common ways to perform conditional rendering in React:

```js
    // Using `if` Statements:
    function MyComponent({ isLoggedIn }) {
    if (isLoggedIn) {
        return <UserDashboard />;
    } else {
        return <LoginScreen />;
    }
    }

    // Using the Ternary Operator:
    function MyComponent({ isLoggedIn }) {
    return isLoggedIn ? <UserDashboard /> : <LoginScreen />;
    }

    // Using Logical && Operator:
    function MyComponent({ isLoggedIn }) {
    return isLoggedIn && <UserDashboard />;
    }

    // Using map to Render Lists Conditionally:
    function MyListComponent({ items }) {
    return (
        <ul>
        {items.map(item => (
            item.isVisible && <li key={item.id}>{item.name}</li>
        ))}
        </ul>
    );
    }
```

## One way data binding

One-way data binding is a data flow pattern commonly used in web development frameworks like React and Angular. In one-way data binding, data is transferred in a single direction, from the data source (such as a component's state or a variable) to the UI (User Interface). Changes in the data source automatically reflect in the UI, but not vice versa. This means that the UI is always kept in sync with the underlying data.

### In the context of React

`State and Props:` In React, data flows in one direction, from a component's state or props to its child components. When the state or props of a component change, React re-renders the component and its children with the updated data. However, changes made in the child components do not directly affect the parent's state or props unless passed through callback functions.

`Example in React:`

```js
    class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        message: "Hello, World!"
        };
    }

    render() {
        return <div>{this.state.message}</div>;
    }
    }
```

In this example, the message property of the component's state is bound to the UI. When setState is called to update message, the UI will automatically reflect the updated value.

One-way data binding provides a clear and predictable data flow, making it easier to understand how data changes affect the UI. However, it also means that handling user input requires additional work, often involving event handling and callback functions to update the data source (state or props) based on user interactions.

## Javascript Expression & Javascript Statement

In React you can run only write javascript Expression

### Key Differences

1. Return Value:

    * `Expression:` Produces a value and can be used where a value is expected (e.g., assignments, function arguments).
    * `Statement:` Does not produce a value and is used for performing actions or controlling the flow of the program.

2. Usage:

    * `Expression:` Can be used within statements or other expressions.
    * `Statement:` Forms the basic building blocks of a program and defines its structure.

Understanding the distinction between expressions and statements is crucial for writing effective JavaScript code. Expressions are used to compute values, while statements are used to perform actions and control the program's flow.

## What is the importance of config.js file

All the hard coded data should be put in config or constant files

## useState() hook

useState hook is used to add state management to functional components. Prior to React 16.8, state could only be managed in class components. The introduction of hooks, including useState, provides a way for functional components to manage local state, making them more powerful and flexible. Here's why the useState hook is essential:

1. `Functional Components with State:`
Functional components are simpler and more concise than class components.
The useState hook allows functional components to have their own state, making them capable of managing local data without the need for a class.
2. `Simplified State Management:`
The useState hook simplifies the process of initializing and updating state variables. It's a cleaner and more straightforward way to handle component-level state.
You can use array destructuring to easily access the current state value and the function to update it.
3. `Avoiding Class Components:`
Hooks like useState reduce the need for class components. With hooks, functional components can now handle complex state logic, side effects, and context usage without converting them into class components.
4. `Predictable Behavior:`
Hooks ensure that state variables persist between renders. This means that when the component re-renders, the state remains consistent and doesn't reset to its initial value.
5. `Consistent API:`
The useState hook provides a consistent way to manage state across functional components. Once you understand how to use useState, you can apply similar patterns to other hooks like useEffect and useContext.

`Example Usage of useState:`

```js
    import React, { useState } from 'react';

    function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    );
}
```

In this example, useState is used to create a state variable count and a corresponding function setCount to update its value. Whenever the button is clicked, the count state is incremented, and the component re-renders with the updated value.

Overall, the useState hook simplifies state management in functional components, making React applications more efficient and maintainable.
