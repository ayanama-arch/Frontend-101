# Configurations

## .babelrc vs babel.config.json

Both _.babelrc_ and _babel.config.json_ serve as configuration files for Babel, but they have some differences in terms of their use cases and flexibility.

- `File Name and Location:`

`.babelrc:` This configuration file is typically named .babelrc and is located in the root directory of your project.
`babel.config.json:` This file is named babel.config.json and is also placed in the root directory of your project.

- `Configuration Loading:`

`.babelrc:` Babel will automatically look for a .babelrc file in the project directory and use the configuration specified in that file.
`babel.config.json:` This file is used when you want to explicitly define the Babel configuration. It provides a centralized and standardized way to configure Babel across projects.

- `Project Scope:`

`.babelrc:` The configuration specified in a .babelrc file applies to the directory where the file is located and its subdirectories. It follows a project-specific scope.
`babel.config.json:` The configuration in a babel.config.json file applies to the entire project, overriding any other Babel configurations found in subdirectories. It follows a project-wide scope.

- `Package Access:`

`.babelrc:` The configuration can be added to the package.json file using a "babel" field. This is useful if you prefer keeping the configuration within the package.json.
`babel.config.json:` It is a separate file specifically designed for Babel configuration, making it more straightforward and explicit.

- `Programmatic Options:`

`.babelrc:` Babel configurations can also be set programmatically using the babel.transform() API, allowing for dynamic configuration based on runtime conditions.
`babel.config.json:` The configuration in babel.config.json is static and doesn't support dynamic changes based on runtime conditions.

- `Environment Variable Overrides:`

`.babelrc:` You can use environment variables to conditionally apply parts of the configuration in a .babelrc file.
`babel.config.json:` Allows for more flexibility in handling environment variables and overrides.

```lua
  babel.config.json < .babelrc < programmatic options from @babel/cli
```

`Note`: If you have both `.babelrc` and `babel.config.json`, Babel will use the configuration from `babel.config.json`.

In summary, while .babelrc has been the traditional choice for Babel configuration and is suitable for many projects, babel.config.json provides a standardized and project-wide configuration, making it easier to manage configuration settings, especially in larger projects or those that follow a monorepo structure. The choice between them often depends on the specific needs and preferences of the project and development team.

## .babelrc template

.babelrc is often used for per-directory configuration, so you may have multiple .babelrc files in different directories if needed.

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "node": "current"
        }
      }
    ],
    "@babel/preset-react"
  ],
  "plugins": [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-transform-runtime"
  ],
  "env": {
    "development": {
      "sourceMaps": "inline",
      "retainLines": true
    },
    "production": {
      "compact": true,
      "minified": true
    }
  }
}
```

- `Presets:`

`@babel/preset-env:` Transpiles ECMAScript 2015 (ES6) code to a version compatible with the current Node.js environment.
`@babel/preset-react:` Adds support for JSX syntax in React applications.

- `Plugins:`

`@babel/plugin-proposal-class-properties:` Allows the use of class properties in JavaScript classes.
`@babel/plugin-transform-runtime:` Provides support for transforming generators and other runtime features.

- `Environment-Specific Configurations:`

`"development":` Configuration for the development environment.

`"sourceMaps": "inline":` Embeds source maps directly into the transpiled code for easier debugging.
`"retainLines": true:` Retains line numbers in the transpiled code for improved error messages.
`"production":` Configuration for the production environment.

`"compact": true:` Produces more compact output by removing unnecessary whitespace.
`"minified": true:` Enables code minification for a smaller production bundle.

`NOTE:` plugins run in ascending order while presets run in descending order.

## babel.config.json

The babel.config.json file is often used for project-wide configurations and provides a centralized approach to Babel settings.
You can use same settings in babel.config.json

## Babel Module Formatters

Babel allows you to specify different module formats using the modules option. Here's how you can configure Babel to handle ES6 modules and transform them into different module formats like CommonJS, AMD, or UMD:

Assuming you have a babel.config.json file, you can add the modules option to control the output module format. For example:

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "node": "current"
        },
        "modules": "commonjs" // Specify the desired module format (commonjs, amd, umd, systemjs, auto)
      }
    ]
  ]
}
```

In this example, I've set the "modules" option to "commonjs", which means Babel will transform ES6 modules into CommonJS modules. You can replace "commonjs" with other options like "amd", "umd", "systemjs", or even "auto" for Babel to automatically choose based on your environment.

Here's a breakdown of the options:

`"commonjs":` Transforms ES6 modules into CommonJS modules, suitable for Node.js environments.

`"amd":` Transforms ES6 modules into AMD (Asynchronous Module Definition) format, often used in browser environments.

`"umd":` Transforms ES6 modules into UMD (Universal Module Definition) format, which can be used in both CommonJS and AMD environments as well as in the browser.

`"systemjs":` Transforms ES6 modules into SystemJS format, another module system for the browser.

`"auto":` Babel will automatically choose the appropriate format based on the environment. This is the default behavior if "modules" is not specified.

Choose the format that best suits your project's needs. If you have a specific environment or module system in mind, you can configure Babel accordingly.

## Babel with Webpack

When working with ES6 modules in a project that uses bundlers like Webpack, the typical approach is to keep the ES6 module syntax during development and let the bundler handle the transformation and bundling. Here's a general guide on how to handle ES6 modules with Webpack:

`Install Webpack:`
If you haven't already, install Webpack and the necessary loaders.

```bash
npm install webpack webpack-cli --save-dev
```

`Install Babel:`
Install Babel and the necessary presets and plugins for handling ES6 syntax.

```bash
npm install @babel/core @babel/preset-env babel-loader --save-dev
```

`Create Babel Configuration:`
Create a .babelrc file in your project's root directory to configure Babel. For example:

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "browsers": ["last 2 versions", "ie >= 11"]
        }
      }
    ]
  ]
}
```

Adjust the "targets" according to your project's browser compatibility requirements.

`Configure Webpack:`
Create a webpack.config.js file to configure Webpack. For example:

javascript
const path = require('path');

```js
module.exports = {
  entry: "./src/index.js", // Entry point of your application
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
        },
      },
    ],
  },
};
```

This configuration tells Webpack to use Babel for JavaScript files and output the bundled code to dist/bundle.js.

## Babel vs Webpack

`Babel:` Transpiles JavaScript code, allowing you to use the latest language features in your source code.

`Webpack (or other bundlers):` Bundles your JavaScript code, along with other assets, into optimized files suitable for deployment in production.

`babel-loader`: It tells webpack to use babel for transpilation.

If you want to use Babel and a bundler together, it's common to configure the bundler (e.g., Webpack) to use Babel as a loader for processing JavaScript files. This way, Babel is invoked by the bundler to transpile the code during the bundling process.

## Babel core-js

To add Babel's core-js polyfill library to support older browsers, you'll need to follow these steps:

- Install core-js:

```bash
npm install core-js
```

- Update Babel Configuration:
  Modify your Babel configuration file (e.g., .babelrc or babel.config.json) to include the core-js polyfill. Make sure it's added as a separate entry in the "entry" array under "env" for the relevant environments (e.g., "development", "production").

`Example .babelrc:`

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": 3,
        "targets": {
          "browsers": ["last 2 versions", "ie >= 11"]
        }
      }
    ]
  ]
}
```

In this example:

`"useBuiltIns": "usage":` Automatically detects and includes only the polyfills needed based on the actual code usage.

`"corejs": 3:` Specifies the version of core-js to use.

`"targets":` Defines the target browsers or environments.

- Import core-js:
  In your main entry file (e.g., index.js), import core-js at the top:

```javascript
import "core-js/stable";
import "regenerator-runtime/runtime";

// Rest of your application code
```

- Install Babel Polyfill:
  Install the @babel/polyfill package:

```bash
npm install --save @babel/polyfill
```

Then, include it in your project, typically at the entry point of your application (e.g., index.js):

```javascript
import "@babel/polyfill";
// Rest of your application code
```

**Important Notes:**
`Using "useBuiltIns":` "usage" will add polyfills based on your code usage, minimizing the size of the final bundle.

Ensure that core-js is included before your application code, either through Babel configuration or manual import.

Keep in mind that adding polyfills can increase the size of your JavaScript bundle. Consider using a bundler like Webpack to apply code splitting and load polyfills only when needed.

In summary, core-js/stable provides a more fine-grained control over polyfill inclusion, while @babel/polyfill is a more straightforward and inclusive solution. Consider your specific needs and preferences when choosing between them.
