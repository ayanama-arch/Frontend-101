# Notes

## Props Drilling

* Passing props from one component to the childs in heirarchy known as prop drilling.

In React, props (short for properties) are a way to pass data from a parent component to a child component. This mechanism helps you create dynamic and reusable React components. Here's how you can use props drilling in React:

1. `Passing Props from Parent to Child:`

    In your parent component, you can pass data to a child component by specifying attributes in the JSX tag of the child component. For example:

    ```jsx
        // ParentComponent.js
        import React from 'react';
        import ChildComponent from './ChildComponent';

        const ParentComponent = () => {
        const data = 'Hello from Parent!';

        return <ChildComponent data={data} />;
    };

    export default ParentComponent;
    ```

    In the above example, the data variable is passed as a prop to the ChildComponent.

2. `Accessing Props in the Child Component:`

    In the child component, you can access the passed props by defining a parameter in the functional component or by using this.props in a class component:

    ```jsx
        // ChildComponent.js
        import React from 'react';

        const ChildComponent = (props) => {
        return <div>{props.data}</div>;
        };

    export default ChildComponent;
    ```

    In this case, the data prop received from the parent component is displayed inside the ChildComponent.

3. `Props Drilling:`

Props drilling occurs when you have a deep component tree, and you need to pass data from a high-level parent component to a low-level child component. If you have components in between that don't need the prop, you have to pass the prop through them anyway. This can make the code harder to maintain.

To avoid props drilling, you can use other state management solutions like React Context API or state management libraries like Redux. These tools allow you to manage state in a centralized way without passing props through every level of your component tree.

However, if your application is small or you don't want to introduce additional complexity, props drilling might be a reasonable solution. Just be aware of the potential downsides as your application grows in complexity.

## React Developer Tools

## Accoridan

 An accordion is a UI pattern where you have a list of items, and only one item is expanded (visible) at a time. React makes it easy to create an accordion component using its state management capabilities. Here's how you can create a simple accordion component in React:

```jsx
    import React, { useState } from 'react';

    const Accordion = ({ items }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const onTitleClick = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    const renderedItems = items.map((item, index) => {
        const isActive = index === activeIndex;
        return (
        <div key={index}>
            <div
            className={`title ${isActive ? 'active' : ''}`}
            onClick={() => onTitleClick(index)}
            >
            {item.title}
            </div>
            {isActive && <div className="content">{item.content}</div>}
        </div>
        );
    });

    return <div className="accordion">{renderedItems}</div>;
    };

export default Accordion;
```

In the above example, the Accordion component takes an array of items as a prop. Each item in the array should have a title and content property.

Here's a breakdown of the code:

The useState hook is used to manage the active index of the accordion. activeIndex holds the index of the currently active item. Initially, it is set to null, indicating no item is active.

The onTitleClick function toggles the active index when a title is clicked. If the clicked title is the same as the currently active one, it collapses the accordion item. Otherwise, it expands the clicked item and collapses the previously active one.

The map function is used to iterate through the items array and create accordion items. For the active item, it renders both the title and content. For inactive items, it only renders the title.

The CSS classes like title, active, and content are used for styling purposes. Make sure to define appropriate styles in your CSS file.

To use the Accordion component, you can pass an array of items like this:

```jsx
    import React from 'react';
    import Accordion from './Accordion';

    const items = [
    {
        title: 'Item 1',
        content: 'Content for Item 1'
    },
    {
        title: 'Item 2',
        content: 'Content for Item 2'
    },
    {
        title: 'Item 3',
        content: 'Content for Item 3'
    }
    ];

    const App = () => {
    return <Accordion items={items} />;
    };

export default App;
```

In this example, App component renders the Accordion component with the items array as a prop. Each item has a title and content property.

## Build Collapsiblle Accoridian

## Lifting the StateUp

Lifting state up is a common pattern in React where the state is moved to a higher-level component in the component hierarchy. This pattern is useful when multiple components need to share the same state, or when a child component needs to update the state of its parent or another sibling component.

Here's a step-by-step guide on how to lift state up in React:

1. `Identify the Shared State:`

    Determine which components need to share the same state. If multiple components need access to the same data or need to modify the same data, it's a good candidate for lifting the state up.

2. `Move the State to a Common Ancestor:`

    Identify the common ancestor (parent) component of the components that need access to the state. Move the state and the functions to update that state to the parent component.

3. `Pass State and Callback Functions as Props:`

    Pass the state data and the functions to update the state down to the child components as props. This allows child components to read the state and update it indirectly through the functions passed as props.

4. `Handle State Changes in the Parent Component:`

    In the parent component, define functions to handle state changes. Pass these functions as props to the child components. When a child component needs to update the shared state, it calls the function passed from the parent.

Here's an example to illustrate lifting state up in React:

```jsx
    import React, { useState } from 'react';
    import ChildComponent from './ChildComponent';

    const ParentComponent = () => {
    const [count, setCount] = useState(0);

    const incrementCount = () => {
        setCount(count + 1);
    };

    return (
        <div>
        <h1>Count: {count}</h1>
        <ChildComponent increment={incrementCount} />
        </div>
    );
    };

    const ChildComponent = ({ increment }) => {
    return (
        <button onClick={increment}>
        Increment Count
        </button>
    );
    };

export default ParentComponent;
```

In this example, the count state and the incrementCount function are defined in the ParentComponent. The incrementCount function is passed down to the ChildComponent as a prop. When the button in the ChildComponent is clicked, it calls the increment function received as a prop, which updates the state in the parent component.

By lifting the state up to the common ancestor (ParentComponent), the state can be shared and manipulated by both the parent and child components.

## React Context

### Creating React Context

```jsx
    import {createContext} from 'react'

    const UserContext = createContext({
        user:{
            name:"Dummy Name",
            email:"dummy@gmail.com"
        }
    })
    
    export default = UserContext;
```

### Using React Context

```jsx
    import {useContext} from 'react'
    import UserContext from 'component/UserContext'

    // Passing the Context what we want to use in useContext hook
    // We can create multiple context
    const user = UseContext(UserContext)
```

### By ChatGPT

React Context is a feature in React that provides a way to pass data through the component tree without having to pass props down manually at every level. It's especially useful when you have deeply nested components that need access to certain data or functions, such as themes, user authentication status, or language preferences. Context allows you to share such values across components without the need for prop drilling.

Here's how you can use React Context:

1. `Creating a Context:`
First, you need to create a context using the React.createContext() method. This creates a context object with two components: Provider and Consumer. The Provider component is used to wrap the part of the component tree where you want to provide the context, and the Consumer component is used to access the context value within a component.

    ```jsx
        // MyContext.js
        import React from 'react';

        const MyContext = React.createContext();

        export default MyContext;
    ```

2. `Providing Context Value:`

    Wrap the part of your component tree where you want to provide the context with the Provider component. Pass the data you want to share as the value prop.

    ```jsx
        // App.js
        import React from 'react';
        import MyContext from './MyContext';
        import ChildComponent from './ChildComponent';

        const App = () => {
        const contextValue = 'Hello from Context';

        return (
            <MyContext.Provider value={contextValue}>
            <ChildComponent />
            </MyContext.Provider>
        );
        };

        export default App;
    ```

3. `Consuming Context Value:`

    In the components where you want to access the context, use the Consumer component or the useContext hook to access the context value.

    Using Consumer component:

    ```jsx
        // ChildComponent.js
        import React from 'react';
        import MyContext from './MyContext';

        const ChildComponent = () => {
        return (
            <MyContext.Consumer>
            {(contextValue) => <div>{contextValue}</div>}
            </MyContext.Consumer>
        );
        };

        export default ChildComponent;
    ```

`Using useContext hook (functional components only):`

```jsx
    // ChildComponent.js
    import React, { useContext } from 'react';
    import MyContext from './MyContext';

    const ChildComponent = () => {
    const contextValue = useContext(MyContext);

    return <div>{contextValue}</div>;
    };

    export default ChildComponent;
```

With the useContext hook, accessing context values becomes even more straightforward, especially in functional components.

Using React Context, you can avoid prop drilling and make your components more maintainable

## Context in class Based Component

In class-based components, you can use React Context by using the contextType property or the static contextType property to access the context. Here's how you can use React Context in a class-based component:

1. `Creating a Context:`
    First, create your context as shown previously:

    ```jsx
        // MyContext.js
        import React from 'react';

        const MyContext = React.createContext();

        export default MyContext;
    ```

2. `Providing Context Value:`

    Wrap the part of your component tree where you want to provide the context with the Provider component. Pass the data you want to share as the value prop.

    ```jsx
        // App.js
        import React from 'react';
        import MyContext from './MyContext';
        import ChildComponent from './ChildComponent';

        class App extends React.Component {
        render() {
            const contextValue = 'Hello from Context';

            return (
            <MyContext.Provider value={contextValue}>
                <ChildComponent />
            </MyContext.Provider>
            );
        }
        }

    export default App;
    ```

3. `Consuming Context Value in Class-Based Component:`

    In a class-based component, you can access the context value using the this.context property. However, you need to specify the context type using the contextType property.

    ```jsx
        // ChildComponent.js
        import React from 'react';
        import MyContext from './MyContext';

        class ChildComponent extends React.Component {
        static contextType = MyContext;

        render() {
            return <div>{this.context}</div>;
        }
        }

    export default ChildComponent;
    ```

In this example, we set the contextType to MyContext, allowing you to access the context value using this.context in the ChildComponent.

This approach is specifically for class-based components. If you are working with functional components, you can use the useContext hook, which is a more modern and concise way to access context values, as demonstrated in the previous response.

Using React Context in class-based components, as shown above, allows you to share data across your component tree without the need for prop drilling

### UserContext.Consumer

### UserContext.Provider

the Context.Provider component is used to provide a context to its child components. It accepts a value prop, which allows you to pass the data (or a value) that you want to share with components consuming this context.

Here's an example of how you can use Context.Provider in a functional component:

```jsx
    import React, { createContext, useContext } from 'react';

    // Create a context
    const MyContext = createContext();

    const ParentComponent = () => {
    const contextValue = "Hello from Context Provider";

    return (
        <MyContext.Provider value={contextValue}>
        <ChildComponent />
        </MyContext.Provider>
    );
    };

    const ChildComponent = () => {
    // Consume the context using the useContext hook
    const contextValue = useContext(MyContext);

    return <div>{contextValue}</div>;
    };

export default ParentComponent;
```

In the example above:

* We create a context using the createContext function: const MyContext = createContext();.
* In the ParentComponent, we use MyContext.Provider to provide the context value. The value prop is set to "Hello from Context Provider".
* The ChildComponent consumes the context value using the useContext hook. It receives the context value provided by the MyContext.Provider component from its nearest ancestor in the component tree.
* By wrapping components with Context.Provider, you can share data across the component tree without passing props explicitly, making your application more maintainable and avoiding prop drilling

### UserContext.displayName

In React, the displayName property is used to give a name to a component. This property is helpful for debugging and profiling React components. When you set the displayName property on a component, it will appear in React DevTools, making it easier to identify components in the component tree.

When working with context, you can use the displayName property to give a name to your context. This is particularly useful if you have multiple contexts in your application. Here's how you can set the displayName property for a context using the createContext method:

```jsx
    // UserContext.js
    import React from 'react';

    const UserContext = React.createContext();

    UserContext.displayName = 'UserContext';

export default UserContext;
```

In this example, the displayName property is set to 'UserContext' for the UserContext context. This way, when you inspect the context in React DevTools, it will be displayed as "UserContext," making it clear which context you are working with.

Setting the displayName property is optional, but it can significantly improve the debugging experience, especially in larger applications with multiple contexts and components
