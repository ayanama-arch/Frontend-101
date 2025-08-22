# Notes - 03

## Babel

Babel is a javascript package that will turn the ES6 code into older version to support older browser  
Babel comes along with parcel

## Tree Shaking

Parcel provides Tree Shaking which Removing unnecessary code

## Shortcuts

Writing longer command in the command line requires effort so to minimize the effort we can add the command to package.json file and assign it the shorter name

```js
    "scripts": {
    "start": "npx parcel index.html",
    "build": "npx parcel build index.html",
    "test": "jest"
  }
```

Then we can write the command in shorter format like below

```cli
    npm run start or npm run
    npm run build
```

## NPM vs NPX

NPM by itself doesn’t run any packages. If you want to run a package using npm, you must specify that package in your package.json file.  

npx is also a CLI tool whose purpose is to make it easy to install and manage dependencies hosted in the npm registry.

## To remove console.log()

In order to minify and compress the code we also need to remove console.log() parcel doesn't do it so we need to install extra plugin of babel in order to do that

1. You need to install babel-plugin-transform-remove-console in Developer mode

2. In CLI run command

    ```git
        npm install babel-plugin-transform-remove-console --save-dev
    ```

3. Create a file name .babelrc inside main directory

4. Add json code provided by webiste in it

    ```json
        "plugins": [ ["transform-remove-console", 
        { "exclude": [ "error", "warn"] }] ]
    ```

Note: It will also remove the console.log in the console of browser so while developing remove it

## Use of key in React

Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity

## JSX

JSX is not HTML inside Javascript, It is HTML like syntax.  
JSX sanitizes the malicious data fetched by API.

## Difference between JSX & HTML

## How JSX execute

JSX => React.CreateElement() (converted by babel) => Object => HTML(DOM)

## Components

Everything is component in React

Component are of two types:-

1. Functional Component
2. Class based Component

In functional component we should write the first letter as capital letter, It's not mandatory  

Example of functional component:

```js
    const MyComponent = () => {
        return <h1>My first Component</h1>;
    }
```

## Functional Component example

Functional component with JSX

```js
    import React from "react";
    import ReactDOM from "react-dom/client";

    // This is JSX
    const Title = <h1>Title of Page</h1>;

    const SampleFunc = () => <h2>Sample Function test!!</h2>;

    // Functional component

    function MyFunc() {
    return (
        <div>
        {Title}
        {SampleFunc()}
        <SampleFunc />
        <h2>Hello world!</h2>
        </div>
    );
    }

    const root = ReactDOM.createRoot(document.getElementById("root"));

    // Rendering function
    root.render(<MyFunc />);
```

Note: You've to return the functional component in div or <React.Fragment>Child</React.Fragment>

## <React.Fragment>

Using <React.Fragment> or the shorthand <>...</> helps keep your DOM structure clean and avoids unnecessary nesting when you don't want to introduce additional elements just for the sake of wrapping.

## HTML vs JSX

In JSX we generally use camelcase attribute and inline styles in double curly braces {{}} etc for more visit below site  

[HTML vs JSX on Freecodecamp.org](https://www.freecodecamp.org/news/html-vs-jsx-whats-the-difference/)

## Rendering Components

React for building user interfaces, these three syntax variations are used to render components:

`{TitleComponent}`: This syntax is used to render the TitleComponent as a self-closing tag without any children. It's typically used when the component doesn't have any content or children elements to render.

`{<TitleComponent/>}`: This syntax is also used to render the TitleComponent as a self-closing tag, and it's functionally equivalent to the first syntax. It's a matter of personal preference which one you use.

`{<TitleComponent></TitleComponent>}:` This syntax is used to render the TitleComponent with an opening and closing tag, allowing you to include children elements or content inside the component. This is used when you want to pass content or other JSX elements as children to the TitleComponent.

## Benefits of JSX

`XSS` - Cross site scripting (XSS) is an attack in which an attacker injects malicious executable scripts into the code of a trusted application or website. Attackers often initiate an XSS attack by sending a malicious link to a user and enticing the user to click it.

JSX takes care of XSS.

## Inline CSS in REACT

In React, you can use inline styles directly within JSX by passing a JavaScript object with camelCased versions of the CSS property names. Here's an example of how you can apply inline styles in a React component:

```jsx
    import React from 'react';

    const MyComponent = () => {
    const divStyle = {
        color: 'blue',
        backgroundColor: 'lightgray',
        padding: '10px',
        borderRadius: '5px'
    };

    return (
        <div style={divStyle}>
        Hello, Boss! This text is styled using inline CSS in React JSX.
        </div>
    );
    };
    export default MyComponent;
```

In this example, the divStyle object contains CSS properties and their corresponding values. These styles are applied directly to the `<div>` element using the style attribute in JSX.

The keys in the divStyle object are camelCased versions of the CSS property names (backgroundColor instead of background-color, borderRadius instead of border-radius, etc.).

Remember that the values for the styles are strings, and you need to use camelCase for property names as opposed to the hyphenated style you might be used to in regular CSS.

This approach allows you to dynamically compute styles based on component state or props, making it a powerful way to style your React components
