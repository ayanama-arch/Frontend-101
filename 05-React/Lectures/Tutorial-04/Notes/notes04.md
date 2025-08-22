# Notes - 04

## JSX Return

Only one parent element can return JSX to solve the problem enclosed all element inside the div

```jsx
    const jsx = (
        <div>
        <h1>Element1</h1>
        <h1>Element2</h1>
        <h1>Element3</h1>
    </div>
    )
```

## React.Fragment

```jsx
    const jsx = (
    <React.Fragment>
        <h1>Element1</h1>
        <h1>Element2</h1>
        <h1>Element3</h1>
    </React.Fragment>
    )
```

You can also remove div instead of it write it with empty tag instead of React.Fragment

```jsx
    const jsx = (
    <>
        <h1>Element1</h1>
        <h1>Element2</h1>
        <h1>Element3</h1>
    </>
    )
```

## React.StrictMode

In React, StrictMode is a tool designed for identifying common issues in the development mode of your React applications. When you wrap your application with StrictMode, it performs additional checks and warnings to help you write better and more maintainable code.

Some of the checks performed by StrictMode include:

`Identifying components with unsafe lifecycle methods:` It helps you catch deprecated and unsafe lifecycle methods, encouraging you to use the recommended alternatives.

`Detecting unexpected side effects:` StrictMode can help you find components where the render phase has side effects, which can lead to bugs and performance issues.

`Spotting legacy string ref API usage:` It warns about the usage of the legacy string ref API, encouraging the use of the newer function ref API.

`Warning about legacy context API usage:` If you are using the legacy context API, StrictMode will provide a warning and suggest migrating to the new context API.

By using StrictMode during development, you can catch potential problems early and ensure that your code follows best practices. It is important to note that these checks are only active in the development environment and are meant to assist developers during the development process.

To use StrictMode, you can wrap your root component in the ReactDOM.render() method:

```jsx
    import React from 'react';
    import ReactDOM from 'react-dom';

    ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
    );
```

This way, StrictMode will be applied to all components within the App component, helping you identify and address potential issues.

## Inline Style

```jsx
    const styleObj = {
        backgroundColor:"red",
    }

    const jsx = (
    <div style={styleObj}>
        <h1>Element1</h1>
        <h1>Element2</h1>
        <h1>Element3</h1>
    </div>
    )
```

## Can we use nested React.Fragment

Yes we can use nested React.Fragment

## Config Driven UI

When the UI is determined by the external configuration rather than hard-coded within the components.  
For example the image on the screen directly not should be hard coded it should come from database this is called config driven UI.

## PROPS

* To pass props, add them to the JSX, just like you would with HTML attributes.
* To read props, use the function Avatar({ person, size }) destructuring syntax.
* You can specify a default value like size = 100, which is used for missing and undefined props.
* You can forward all props with `<Avatar {...props} />` JSX spread syntax, but don’t overuse it!
* Nested JSX like `<Card><Avatar /></Card>` will appear as Card component’s children prop.
* Props are read-only snapshots in time: every render receives a new version of props.
* You can’t change props. When you need interactivity, you’ll need to set state.

### Passing Data as props

```jsx
    const RestaurantCard = (props) => {
    return (
        <div className="card">
        <img src={props.restaurant.image} alt="Burger" />
        <h2>{props.restaurant.title}</h2>
        <h3>{props.restaurant.type.join(", ")}</h3>
        <h4>{props.restaurant.rating} stars</h4>
        </div>
    );
    };

    const Body = () => {
    return (
        <div className="restaurant-list">
        <RestaurantCard restaurant={restaurantData[0]} />
        <RestaurantCard restaurant={restaurantData[1]} />
        <RestaurantCard restaurant={restaurantData[2]} />
        <RestaurantCard restaurant={restaurantData[5]} />
        </div>
    );
    };
```

### More optimize way of passing data

```jsx
    const RestaurantCard = ({ image, title }) => {
    return (
        <div className="card">
        <img src={image} alt="Burger" />
        <h2>{title}</h2>
        <h3>{props.restaurant.type.join(", ")}</h3>
        <h4>{props.restaurant.rating} stars</h4>
        </div>
    );
    };

    const Body = () => {
    return (
        <div className="restaurant-list">
        <RestaurantCard {...restaurantData[0]} />
        <RestaurantCard {...restaurantData[1]} />
        <RestaurantCard {...restaurantData[2]} />
        <RestaurantCard {...restaurantData[5]} />
        </div>
    );
    };
```

### More optimization

```jsx
    const RestaurantCard = ({ image, title, type, rating }) => {
    return (
        <div className="card">
        <img src={image} alt="Burger" />
        <h2>{title}</h2>
        <h3>{type.join(", ")}</h3>
        <h4>{rating} stars</h4>
        </div>
    );
    };

    const Body = () => {
    return (
        <div className="restaurant-list">
        {restaurantData.map((restaurant) => (
            <RestaurantCard {...restaurant} />
        ))}
        </div>
    );
    };
```

## Map vs forEach

As forEach doesn't return anything and map returns thing so we should use map in jsx.

## VirtualDOM

The virtual DOM (VDOM) is a programming concept where an ideal, or “virtual”, representation of a UI is kept in memory and synced with the “real” DOM by a library such as ReactDOM. This process is called reconciliation.

## Renconcilation in React

Reconciliation is the process by which React updates the UI to reflect changes in the component state. The reconciliation algorithm is the set of rules that React uses to determine how to update the UI in the most efficient way possible.  
The algorithm React uses to diff one tree with another to determine which parts need to be changed.

## Diff Algorithm

The Diffing algorithm in React allows for the efficient updates and rendering of these DOM elements. As changes occur within the application's state or properties, React uses its diff algorithm to compare the new Virtual DOM with the old one.

## What is React Fibre

React Fiber is an internal engine change geared to make React faster and smarter. The Fiber reconciler, which became the default reconciler for React 16 and above, is a complete rewrite of React's reconciliation algorithm to solve some long-standing issues in React.  
[Read more about React Fibre](https://github.com/acdlite/react-fiber-architecture)

## Why we don't use index as key in map function

In summary, using the index of an array as the key prop in React's map() function can cause issues when the list items can be added, removed, or reordered. To avoid these problems, you should always use a unique identifier as the key prop instead.

## React Folder Structure

Establishing a well-organized folder structure is crucial for maintaining a scalable and maintainable React application. While there's no one-size-fits-all structure, here's a commonly used and recommended approach:

```lua
    /src
    |-- /components
    |   |-- /Header
    |   |   |-- Header.js
    |   |   |-- Header.css
    |   |
    |   |-- /Footer
    |   |   |-- Footer.js
    |   |   |-- Footer.css
    |   |
    |   |-- /SomeComponent
    |       |-- SomeComponent.js
    |       |-- SomeComponent.css
    |
    |-- /containers
    |   |-- /Home
    |   |   |-- Home.js
    |   |   |-- Home.css
    |   |
    |   |-- /Dashboard
    |       |-- Dashboard.js
    |       |-- Dashboard.css
    |
    |-- /services
    |   |-- api.js
    |
    |-- /utils
    |   |-- helperFunctions.js
    |
    |-- /styles
    |   |-- globalStyles.css
    |
    |-- /assets
    |   |-- /images
    |   |-- /fonts
    |
    |-- /redux
    |   |-- /actions
    |   |-- /reducers
    |   |-- /store
    |
    |-- /routes
    |   |-- AppRouter.js
    |
    |-- App.js
    |-- index.js
    |-- index.css
    |-- config.js
    |-- .env
    |-- .gitignore
    |-- package.json
    |-- README.md
```

Here's a breakdown of the structure:

`components:` Reusable presentational components.
`containers:` Components that are connected to the Redux store or manage local state.
`services:` API calls, third-party integrations, etc.
`utils:` Helper functions or utilities.
`styles:` Global styles.
`assets:` Images, fonts, and other static assets.
`redux:` Actions, reducers, and the Redux store.
`routes:` Handles routing, often using React Router.
`App.js:` The main component where your application is initialized.
`index.js:` The entry point of your application.
`index.css:` Global styles for the entire application.
`config.js:` Configuration settings for your application.
`.env:` Environment variables.
`.gitignore:` Specifies intentionally untracked files to ignore in version control.
`package.json:` Lists dependencies and other project metadata.
`README.md:` Project documentation.
Remember, the structure can vary based on the project's size and requirements. Adjust it according to your specific needs. It's also a good practice to keep related files (e.g., JS and CSS) in the same folder for easier maintenance.

## export Default

You can only export only one thing default

## Export by name

When component is not exported as defualt then it is exported by name, you can export as many named component as you want unlike defualt.

## Named import

When component is exported normally not defualt then we need to import it as {named} component.

## Default Import

In default import you can change name while importing suppose the component name is Header but you can import as CustomizedHeader

## Import as *

It means importing all the functions in the object

## File extenson as jsx --> Header.jsx instead of Header.js

It's a matter of choice not creates much difference.

## constant or config files

It is file where hard coded data is placed which will later used by compnents

## Search Variable in React

If we put the value of input hardcoded then you won't be able to change it.

```js
    const SearchButton = () => { 
        // Declaration of harcoded text 
        let searchTxt = "KFC";

        return (
            <div className="search-container">
                <input
                type="text"
                className="search-input"
                placeholder="Search"

                // Here is reference to harcoded text
                value={searchTxt}

                />
                <button className="search-btn">Search</button>
            </div>
        );
    };
```

## Hooks

### What is Hook?

* It is just a function, we get it from the React as named import.
* There are many hooks in React.  
* One of such hook is useState(), It is used to create state variable.  
* Hook returns an array

### useState() Hook

```js
    // Importing useState()
    import {useState} from 'react'


    const SearchButton = () => { 
        // Declaration of harcoded text 
        // let searchTxt = "KFC";


        // searchText is a local state variable declaring using useState()
        const [searchText] = useState("default value")

        return (
            <div className="search-container">
                <input
                type="text"
                className="search-input"
                placeholder="Search"

                // Here is reference to harcoded text
                value={searchTxt}

                />
                <button className="search-btn">Search</button>
            </div>
        );
    };
```

* Every component in React maintains a state, Every time you use local variable use state

### Variables in React - (Searchinput)

<!-- This is two way binding -->

```js
    const SearchText = () => {
  [searchInput, setSearchInput] = useState("Default");  // returns = [variablename, function to update variable]

  return (
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
        <button className="search-btn">Search</button>
      </div>
  );
};

```

### Why State Variable

Everytime you want your variable in synch with UI you should use state variable

## Working Search Bar

```js
    function filterData(searchInput, restaurants) {
        const filterData = restaurants.filter((restaurant) =>
            restaurant.title.includes(searchInput)
        );
        return filterData;
        }

    const Body = () => {
        const [searchInput, setSearchInput] = useState("");
        const [restaurants, setRestaurants] = useState(restaurantData);

        return (
            <>
            <div className="search-container">
                <input
                type="text"
                className="search-input"
                placeholder="Search"
                value={searchInput}
                onChange={(e) => {
                    setSearchInput(e.target.value);
                }}
                />
                <button
                className="search-btn"
                onClick={() => {
                    // need to filter the data
                    const data = filterData(searchInput, restaurants);
                    // update the state
                    setRestaurants(data);
                }}
                >
                Search
                </button>
            </div>

            <div className="restaurant-list">
                {restaurants.map((restaurant) => (
                <RestaurantCard {...restaurant} key={restaurant.id} />
                ))}
            </div>
            </>
        );
    };
```

## FAQ

### Is JSX mandatory for React?

While JSX is not strictly mandatory, it significantly enhances the development experience when working with React. Most React developers choose to use JSX for its benefits in terms of readability, ease of use, and integration with React components.

### {TitleComponent} vs {`<TitleComponent/>`} vs {`<TitleComponent></TitleComponent>`} in JSX

* Use {TitleComponent} when you want to pass the component itself as a prop.
* Use {`<TitleComponent/>`} when you want to render the component without passing any props.
* Use {`<TitleComponent></TitleComponent>`} when you want to render the component and include children components or other content inside it.

### What is Virtual DOM?

Virtual DOM (VDOM) is a programming concept used in React and other modern JavaScript frameworks to improve the performance and efficiency of updating the user interface. It is not a feature of the browser's DOM; rather, it is a lightweight copy of the actual DOM kept in memory by React.

Here's how the Virtual DOM works in React:

`Initial Render:`

* When a React component is first rendered or when the state or props of a component change, React creates a virtual representation of the DOM tree.
* This virtual representation is a lightweight JavaScript object that mirrors the structure of the actual DOM.

`Reconciliation:`

* When there are updates (due to state or prop changes), React creates a new virtual DOM tree.
* It then compares this new virtual DOM tree with the previous one using a process called "reconciliation."
* React identifies the differences (or "diffs") between the new and old virtual DOM trees.

`Efficient Updates:`

* React calculates the most efficient way to update the actual DOM based on the differences found during reconciliation.
* Instead of updating the entire real DOM, React updates only the specific parts of the DOM that have changed.
* This targeted update approach significantly improves the rendering performance, especially in complex applications where many components can be re-rendered due to state or prop changes.

`Batching Updates:`

* React batches multiple updates into a single update operation to further optimize the rendering process.
* This batching reduces the number of times the actual DOM is manipulated, minimizing the performance impact.

By using the Virtual DOM, React optimizes the rendering process, making applications more responsive and efficient. Developers can work with React components as if they are interacting with the real DOM, while React efficiently handles the underlying updates behind the scenes, resulting in a smoother user experience.

### What is React Fiber?

**React Fiber** is a complete rewrite of the React reconciliation algorithm, introduced to React in version 16. It is an ongoing project within the React ecosystem that aims to improve the performance and responsiveness of React applications, especially for complex and interactive user interfaces.

The term **"Fiber"** refers to a set of new internal algorithms and data structures in React that enable:

* **Asynchronous Rendering:** React Fiber enables asynchronous rendering, meaning that the rendering work can be paused, allowing the browser to respond to user interactions and other high-priority tasks. Once the browser is idle, React Fiber can resume rendering, improving the application's responsiveness.

* **Incremental Rendering:** React Fiber allows React to split the rendering work into smaller chunks, allowing the application to show intermediate states during rendering. This incremental rendering approach can lead to a perceived performance improvement, as users see updates more frequently.

* **Improved Scheduling:** React Fiber provides better control over scheduling rendering tasks, allowing React to prioritize and reorder updates based on their importance. This can lead to more predictable performance and a smoother user experience.

* **Support for Error Boundaries:** React Fiber enhances error handling by allowing components to catch errors during rendering, providing a way to gracefully handle errors without causing the entire application to crash.

* **Better Support for Concurrent Mode:** Concurrent Mode is an experimental set of features in React that allows applications to be more responsive and gracefully handle tasks like data fetching, rendering, and user interactions concurrently. React Fiber provides a foundation for Concurrent Mode to be built upon.

React Fiber is a significant internal improvement in React, focusing on making React more flexible and efficient for future developments. While most React developers don't need to interact directly with Fiber, its benefits are felt indirectly through improved performance and responsiveness in React applications.

### Can we use index as keys in React?

Yes, you can use index as keys in React, but it is generally not recommended, especially when the list of items is dynamic and can change over time. Using index as keys can lead to issues with component state and rendering, particularly when items are added, removed, or reordered.

React uses keys to identify elements in a list uniquely. When you use index as keys and the order of the list changes, React might re-render more components than necessary or fail to update the components correctly.
