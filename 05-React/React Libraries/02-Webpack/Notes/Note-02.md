# Installation of Webpack

`Step 1:` Install webpack and webpack-cli

```bash
npm install webpack webpack-cli --save-dev
```

This command installs webpack and webpack-cli as devDependencies and adds them to your package.json file.

`Step 2:` Create a basic webpack configuration file (webpack.config.js)
Create a file named webpack.config.js in your project root. This file will contain the configuration for webpack. Here's a simple example:

```javascript
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
```

`Step 3:` Create an entry file (e.g., src/index.js)
Create a JavaScript file that will serve as the entry point for your application. For example, create a file named `src/index.js.`

`Step 4:` Run webpack
You can now run webpack to bundle your code. Add a script to your package.json file to make it easier.

Open package.json and add the following script:

```json
"scripts": {
  "build": "webpack"
}
```

Now, you can run webpack by using the following command:

```bash
npm run build
```

This will bundle your code and generate a bundle.js file in the dist directory.

## Imports and exports and webpack modules

When working with webpack, it's essential to understand how to import and export modules in JavaScript, especially when configuring webpack to bundle and manage your project's dependencies.

`Import and Export in JavaScript:`
Let's start with a quick overview of import and export syntax in JavaScript.

Exporting a Module (Named Export):

```javascript
// myModule.js
export const myFunction = () => {
  // code here
};

export const myVariable = 42;

// Exporting Default:
// myDefaultModule.js
const myDefaultFunction = () => {
  // code here
};

export default myDefaultFunction;
```

`Importing in Another Module:`

```javascript
// anotherModule.js
import { myFunction, myVariable } from "./myModule";
// or
import myDefaultFunction from "./myDefaultModule";
```

`Configuring webpack for Modules:`
Assuming you have a project structure like this:

```lua
project-root
|-- src
|   |-- index.js
|   |-- myModule.js
|   |-- myDefaultModule.js
|-- webpack.config.js
|-- package.json
```

Your webpack.config.js might look something like this:

```javascript
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
```

**Explanation:**
`entry:` Specifies the entry point of your application (e.g., ./src/index.js).
`output:` Specifies where to emit the bundled files (e.g., './dist/bundle.js').
`module:` Configures how webpack treats different types of files.
`rules:` Specifies an array of rules to apply for different file types.
`test:` A regular expression that matches the file types to be processed by the loader.
`exclude:` Directories to exclude (e.g., node_modules).
`use:` Specifies the loader to be used (e.g., Babel for JavaScript files).
