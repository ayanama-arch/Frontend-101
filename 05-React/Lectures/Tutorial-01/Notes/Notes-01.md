# Intro to React

## 1. Library vs Framework

A framework is used for building and deploying an application quickly. When we use a framework, we can use resources to facilitate faster development and a greater user experience. A library is used to enhance the functionality of an application.

## 2. What is Emmet?

Emmet is a set of plug-ins for text editors that allows for high-speed coding and editing in HTML, XML, XSLT, and other structured code formats via content assist.

## 3. What is CDN?

A content delivery network, or content distribution network, is a geographically distributed network of proxy servers and their data centers. The goal is to provide high availability and performance by distributing the service spatially relative to end users.  
There are many CDN providers like Akamai, Amazon Cloudfront, Azure CDN etc.

## Why we should host our images on CDN?

* To speed up load time
* To get higher positions in search results
* To Increase conversions
* To keep calm and stay secure
* To be protected from DDoS attacks on your content
* To be online whatever happens
* To reduce costs in the long run

## 4. What is crossorigin attribute?

The crossorigin attribute sets the mode of the request to an HTTP CORS Request.  

CORS stands for Cross-Origin Resource Sharing, and is a mechanism that allows resources on a web page to be requested from another domain outside their own domain. It defines a way of how a browser and server can interact to determine whether it is safe to allow the cross-origin request. CORS allows servers to specify who can access the assets on the server, among many other things

## 5. What is Integrity attribute?

The integrity attribute allows a browser to check the fetched script to ensure that the code is never loaded if the source has been manipulated.

## 6. Async vs defer

Async allows your script to run as soon as it's loaded, without blocking other elements on the page. Defer means your script will only execute after the page has finished loading. In most cases, async is the better option — but there are exceptions.

## Why React is called REACT

When data in a React application changes, the components that depend on that data are automatically updated, which allows for efficient and seamless updates to the user interface. The name “React” reflects this reactive nature of the library.

## React vs ReactDOM

React is a JavaScript library for building User Interfaces and ReactDOM is the JavaScript library that allows React to interact with the DOM.

* `React:` responsible for creating React elements (kinda like document.createElement())
* `ReactDOM:` responsible for rendering React elements to the DOM (kinda like rootElement.append())

## 5. Simple HTML Code

```html
<div id="root"> Hello World! </div>
```

## 6. HTML with Javascript

```html
<div id="root"></div>

<script>
    const heading = document.createElement('h1');

    heading.innerHTML = "Hello World"

    const root = document.querySelector("#root");

    root.appendChild(heading)
</script>
```

## 7. HTML with React

```html
    <div id="root"></div>

    <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>

    <script>
        const heading = React.createElement('h1', {}, 'hello world')

        const root = ReactDOM.createRoot(document.getElementById('root'));

        root.render(heading)
    </script>
```

## 8. Creating Complex HTML structure

```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>React Introduction</title>
    </head>
    <body>
        <div id="root">Not rendered yet</div>

        <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
        <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>

        <script>
            const heading1 = React.createElement('h1',{id:"head-1",key:'1'},"First Heading")
            const heading2 = React.createElement('h1',{id:"head-2",key:'2'},"Second Heading")

            const container = React.createElement('div',{className:"container"},[heading1,heading2])

            const root = ReactDOM.createRoot(document.getElementById('root'))
            root.render(container)
        </script>
    </body>
    </html>
```
