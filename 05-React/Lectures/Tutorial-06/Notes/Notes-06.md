# Making API Call

## Fetch API

`Basic GET Request:`

```js
    // Making a GET request to a JSON API endpoint
    fetch('https://api.example.com/data')
    .then(response => {
        // Check if the request was successful (status code 200)
        if (response.ok) {
        // Parse the JSON response
        return response.json();
        }
        // Handle errors if the response status is not 200
        throw new Error('Network response was not ok.');
    })
    .then(data => {
        // Work with the JSON data
        console.log(data);
    })
    .catch(error => {
        // Handle errors that occurred during the fetch operation
        console.error('There has been a problem with your fetch operation:', error);
    });
```

* The fetch function is used to make a GET request to `https://api.example.com/data`.
* The response is checked for success (status code 200).
* If successful, the JSON data is parsed from the response using the .json() method.
* The parsed data is then logged to the console.
* If there are any errors during the request, they are caught in the .catch() block.

`POST Request with JSON Payload:`

```javascript
    // Making a POST request with JSON payload
    fetch('https://api.example.com/post', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        key: 'value',
    }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
  });
```

In this example:

* The fetch function is used to make a POST request to `https://api.example.com/post`.
* The method is set to 'POST', and the headers specify that the payload is in JSON format.
* The JSON payload (an object) is converted to a string using JSON.stringify() and sent as the body of the request.
* The response is parsed as JSON and logged to the console.

Additionally, handle errors and responses appropriately based on your application's requirements

## Calling API using Axios

Axios is a popular JavaScript library that simplifies the process of making HTTP requests in browsers and Node.js applications. It provides a convenient and easy-to-use API for performing asynchronous operations, including making API calls. Here's how you can use Axios to make API calls:

`Installing Axios:` First, you need to install Axios using a package manager like npm or yarn. In your terminal or command prompt, run:

```bash
    npm install axios
    # or
    yarn add axios
```

`Making a GET Request:`

```javascript
    // Import Axios at the top of your file
    import axios from 'axios';

    // Making a GET request
    axios.get('https://api.example.com/data')
    .then(response => {
        // Handle successful response
        console.log('Data:', response.data);
    })
    .catch(error => {
        // Handle error
        console.error('Error:', error);
    });
```

`Making a POST Request with JSON Payload:`

```javascript
    // Making a POST request with JSON payload
    axios.post('https://api.example.com/post', {
        key: 'value'
    })
    .then(response => {
        // Handle successful response
        console.log('Response:', response.data);
    })
    .catch(error => {
        // Handle error
        console.error('Error:', error);
  });
```

`Using Async/Await with Axios:`
You can also use async/await syntax for making API calls with Axios, especially inside functions marked as async:

```javascript
    async function fetchData() {
        try {
            const response = await axios.get('https://api.example.com/data');
            console.log('Data:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Call the async function
    fetchData();
```

Axios provides a concise and expressive way to make HTTP requests in JavaScript applications, and it offers additional features such as interceptors, request and response transformations, and cancellation tokens, making it a powerful tool for managing API calls. Remember to handle errors appropriately and customize the requests and responses based on your API's requirements.

## useEffect() hook

* It will be called once after render if there is an empty dependency array or if it has depenedency it will re-render each time dependency changes

The useEffect hook in React is used to perform side effects in functional components. Side effects can include data fetching, subscriptions, or manually changing the DOM, among other things. It is similar to lifecycle methods in class components, specifically componentDidMount, componentDidUpdate, and componentWillUnmount.

### Here's how you can use the useEffect hook

`Basic Usage:`

```jsx
    import React, { useEffect, useState } from 'react';

    function MyComponent() {
    const [count, setCount] = useState(0);

    // useEffect runs after every render
    useEffect(() => {
        document.title = `Count: ${count}`;

        // Clean up function (componentWillUnmount)
        return () => {
        document.title = 'React App'; // Reset the document title
        };
    }, [count]); // Dependency array: runs the effect only when `count` changes

    return (
        <div>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    );
}
```

In this example:

* `useEffect takes two arguments:` a function containing the code to run for the effect, and an optional dependency array (second argument).
* The effect sets the document title to include the current count value.
* The effect runs after the initial render and after every re-render because it doesn't have a dependency array (or, equivalently, because the dependency array is empty).

`With Dependency Array:`

```jsx
    useEffect(() => {
    // Code to run on mount and when `dependency` changes
}, [dependency]);
```

In this version of useEffect:

* The effect will run after the initial render and whenever the value of dependency changes.
* If the dependency array is empty ([]), the effect runs only after the initial render, similar to componentDidMount.

`Cleanup and Unmounting:`
useEffect can also return a cleanup function, which will be executed when the component is unmounted or before the effect runs again. This is equivalent to componentWillUnmount in class components.

```jsx
    Copy code
    useEffect(() => {
    // Code to run on mount

    // Cleanup function (componentWillUnmount)
    return () => {
        // Code to run on unmount
    };
}, []);
```

The cleanup function runs when the component is unmounted or when the effect is re-run (due to dependencies changing).
If the effect doesn't depend on any values, the cleanup function will be executed only when the component is unmounted.

***useEffect*** is a powerful tool for handling side effects in functional components and is a key feature of React's Hooks API. It allows you to manage asynchronous operations, subscriptions, and other side effects in a clean and concise way. Remember to handle dependencies properly to avoid unintended side effects and optimize performance.

### Cleanup in useEffect()

the effect sets up a subscription, and the cleanup function unsubscribes from it when the component is unmounted.

```jsx
    import React, { useEffect, useState } from 'react';

    function SubscriptionComponent() {
        const [message, setMessage] = useState('');

        useEffect(() => {
            // Simulating a subscription setup
            const subscription = setInterval(() => {
            setMessage('New message received!');
            }, 2000);

            // Cleanup function (componentWillUnmount)
            return () => {
            // Unsubscribe and clear the interval when the component is unmounted
            clearInterval(subscription);
            };
        }, []); // Empty dependency array means the effect runs only on mount and unmount

        return (
            <div>
            <h2>Subscription Example</h2>
            <p>{message}</p>
            </div>
        );
    }

    export default SubscriptionComponent;
```

In this example:

* The useEffect sets up an interval that updates the message state every 2 seconds, simulating new messages being received.
* The cleanup function returned by useEffect is responsible for clearing the interval when the component is unmounted. This ensures that the interval doesn't continue running in the background after the component is removed from the DOM.
* The empty dependency array ([]) means the effect runs only once, similar to componentDidMount, and the cleanup function will be executed when the component is unmounted.
* By returning a cleanup function from the useEffect, you ensure that any resources or subscriptions created within the effect are properly cleaned up when the component is no longer in use, preventing memory leaks and unexpected behavior.
