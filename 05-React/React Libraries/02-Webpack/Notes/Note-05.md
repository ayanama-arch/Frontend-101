# Development vs Production

Separating development and production configurations in webpack is a good practice. This ensures that you can have different setups optimized for development (with features like source maps and hot module replacement) and production (with optimizations and minification). Here's how you can achieve this:

## Create Separate Config Files

Create two separate webpack configuration files: webpack.dev.js for development and webpack.prod.js for production.

`webpack.dev.js:`

```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    contentBase: "./dist",
    port: 3000,
    open: true,
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
      template: "src/index.html",
    }),
  ],
};
```

`webpack.prod.js:`

```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new CleanWebpackPlugin(),
  ],
};
```

- Modify npm Scripts
  Update your package.json scripts to use the appropriate configuration file based on the environment.

```json
"scripts": {
  "start": "webpack --config webpack.dev.js",
  "build": "webpack --config webpack.prod.js"
}
```

- Use Environment Variables (Optional)
  You can use environment variables to dynamically set the mode. For example, you can modify your webpack.prod.js to accept a NODE_ENV environment variable:

```javascript
const mode =
  process.env.NODE_ENV === "production" ? "production" : "development";

module.exports = {
  mode,
  // other configurations...
};
```

This way, you can use the same configuration file for both development and production by setting the NODE_ENV environment variable appropriately.

Now, you can run your scripts:

```bash
# For development:
npm start

# For production build:
npm run build
```

This setup ensures that you have distinct configurations for development and production in your webpack setup

## HTML-Loader

`Note:` file-loader is deprecated
In webpack, html-loader are useful loaders for processing HTML and handling file assets like images and fonts. Here's how you can use them in your webpack configuration:

- html-loader:
  html-loader allows you to import and bundle HTML files as string content within your JavaScript files.

`Installation:`

```bash
npm install html-loader --save-dev
```

`Configuration:`

```javascript
// webpack.common.config.js
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
};

// webpack.prod.js
const path = require("path");
const { default: merge } = require("webpack-merge");
const common = require("./webpack.config.common");

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "images/[hash][ext][query]",
  },
});
```

Now, you can import image files in your JavaScript files:

Now, you can have an HTML file like this:

```html
<!-- my-file.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My HTML File</title>
  </head>
  <body>
    <h1>Hello, World!</h1>
    <img src="./images/my-image.png" alt="My Image" />
  </body>
</html>
```

When you import my-file.html in your JavaScript file, webpack will handle both the HTML content and the referenced image file.
