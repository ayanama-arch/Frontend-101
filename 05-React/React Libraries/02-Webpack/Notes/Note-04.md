# Plugins

Plugins in webpack allow you to perform a wide range of tasks, such as optimizing, minifying, and manipulating the output bundles. Here are some commonly used plugins in webpack:

## HtmlWebpackPlugin

The HtmlWebpackPlugin simplifies creation of HTML files to serve your webpack bundles. This is especially useful for webpack bundles that include a hash in the filename which changes every compilation.

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: "./src/file-01.js",
  output: {
    filename: "main.[contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
};
```

## Production vs Development

It's a common practice to have separate webpack configuration files for development and production to tailor the build process and optimizations accordingly. Here's an example of how you might structure your webpack configuration files:

`webpack.config.dev.js (Development Configuration):`

```javascript
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.config.common");

module.exports = merge(commonConfig, {
  mode: "development",
  devtool: "cheap-module-source-map",
  devServer: {
    port: 8080,
    hot: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
```

In this example:

The mode is set to 'development'.
A development-friendly source map (cheap-module-source-map) is used.
The devServer configuration sets up a development server with hot module replacement.

`webpack.config.prod.js (Production Configuration):`

```javascript
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.config.common");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(commonConfig, {
  mode: "production",
  devtool: "source-map",
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
});
```

In this example:

The mode is set to 'production'.
A production-friendly source map (source-map) is used for better debugging in production.
The optimization section includes settings for minimizing and optimizing the output.

`webpack.config.common.js (Common Configuration):`

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
      // Add your loaders here
    ],
  },
  // Add other common configurations here
};
```

In this example:

Common configurations shared between development and production are placed in this file.
You can specify loaders, plugins, and other configurations that are common to both environments.
To use these configurations, you can run webpack with the specific configuration file:

```bash
# For development
webpack --config webpack.config.dev.js

# For production
webpack --config webpack.config.prod.js
```

## Merge

The merge function comes from the webpack-merge library. This library provides a convenient way to merge multiple webpack configuration objects into one.

Here's a brief explanation of how merge works:

`Installation:`
First, you need to install the webpack-merge package. You can do this using npm or yarn:

```bash
npm install webpack-merge --save-dev
```

`Usage:`
After installing the package, you can use it in your webpack configuration files. In the provided example, the merge function is used to merge the common configuration (webpack.config.common.js) with either the development or production configuration, depending on the environment.

```javascript
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.config.common");
const devConfig = require("./webpack.config.dev");
const prodConfig = require("./webpack.config.prod");

const mergedDevConfig = merge(commonConfig, devConfig);
const mergedProdConfig = merge(commonConfig, prodConfig);
```

The merge function takes two or more configuration objects as arguments and merges them. It deeply merges arrays and objects, and it prioritizes the values from the later configurations if there are conflicts.

`Result:`
The result is a merged webpack configuration that inherits the properties from both the common configuration and the environment-specific configuration. This approach makes it easy to manage and maintain different configurations for development and production while avoiding code duplication.

## Webpack-dev-server

webpack-dev-server is a development server that comes with webpack and is designed to enhance the development workflow. It provides a simple way to serve your webpack bundles during development, with features like live reloading and hot module replacement (HMR).

Here are some key features and aspects of webpack-dev-server:

`Live Reloading:`
webpack-dev-server watches for changes in your source code and automatically triggers a browser refresh when a change is detected.
This allows you to see the updates in real-time as you modify your code.

`Hot Module Replacement (HMR):`
HMR is a feature that allows you to update specific modules in your application without a full page reload.
It can significantly speed up the development process by preserving the application state and avoiding a full page refresh.

`Configuration:`
The webpack-dev-server can be configured using the devServer section in your webpack configuration file. Here's an example of how you might configure it in your webpack.config.dev.js file:

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'), // Serve content from the 'dist' directory
    port: 8080, // Specify the port to listen on
    hot: true, // Enable Hot Module Replacement
    open: true, // Open the default browser when the server starts
    proxy: {
      '/api': 'http://localhost:3000', // Proxy API requests to a backend server
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Use a template HTML file
    }),
  ],
};
```

Let me break down some key configurations in the devServer section:

`contentBase:`
Specifies the directory from which content will be served. In this example, it serves content from the 'dist' directory.

`port:`
Specifies the port on which the development server will listen. In this case, it's set to 8080.

`hot:`
Enables Hot Module Replacement (HMR), allowing modules to be replaced without a full page reload.

`open:`
Opens the default browser when the server starts. It's a convenient option for quickly viewing your application.
proxy:

Configures the development server to proxy requests to a different backend server, useful for avoiding CORS issues during development. In the example, requests to '/api' are proxied to `'http://localhost:3000'`
plugins:

`Dev Middleware:`
webpack-dev-server uses webpack's Dev Middleware under the hood to serve the bundles.
This middleware keeps the `bundles in memory`, reducing the need for disk I/O and speeding up the development server.
Proxying API Requests:

`HTTPS Support:`
webpack-dev-server supports HTTPS, allowing you to test your applications in a secure environment during development.

`History API Fallback:`
When using client-side routing (e.g., with React Router), webpack-dev-server can be configured to redirect requests to the index.html file, preventing issues with client-side routing.
To use webpack-dev-server, you typically install it as a development dependency:

```bash
npm install webpack-dev-server --save-dev
```

Then, you can add a script in your package.json to start the development server:

```json
"scripts": {
  "start": "webpack-dev-server --config webpack.config.dev.js"
}
```

Running npm start (or yarn start) will launch the development server with the specified webpack configuration for development.

`CleanWebpackPlugin:`
Cleans the output directory before each build, ensuring only the used files remain.

```bash
npm install clean-webpack-plugin --save-dev
```

```javascript
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  // other configurations...
  plugins: [
    new CleanWebpackPlugin(),
    // other plugins...
  ],
};
```
