# Optimization

## Multiple entry points

In Webpack, having multiple entry points is a common scenario, especially in larger projects where you may want to split your code into different bundles. Each entry point represents a separate bundle that can be loaded independently. Here's how you can set up multiple entry points in a Webpack configuration:

`Webpack Configuration File (webpack.config.js):`

```javascript
const path = require("path");

module.exports = {
  entry: {
    main: "./src/main.js",
    vendor: "./src/vendor.js",
    admin: "./src/admin.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
```

In the example above, we have three entry points: main, vendor, and admin. The [name] placeholder in the filename property will be replaced with the actual entry point name.

HTML Files:

If you're using HTML files, you might want to generate separate HTML files for each entry point to include the corresponding bundles.

```html
<!-- index.html -->
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Main Page</title>
  </head>
  <body>
    <script src="main.bundle.js"></script>
  </body>
</html>

<!-- vendor.html -->
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Vendor Page</title>
  </head>
  <body>
    <script src="vendor.bundle.js"></script>
  </body>
</html>

<!-- admin.html -->
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Admin Page</title>
  </head>
  <body>
    <script src="admin.bundle.js"></script>
  </body>
</html>
```

`Usage in JavaScript:`
Inside your JavaScript files, you can import and export modules as needed for each entry point.

```javascript
// main.js
import commonModule from "./commonModule";
// other imports specific to main.js

// vendor.js
import vendorModule from "./vendorModule";
// other imports specific to vendor.js

// admin.js
import adminModule from "./adminModule";
// other imports specific to admin.js
```

This setup allows you to manage and bundle different parts of your application separately.

## CSS Extract Plugin

Extracting CSS in Webpack is a common practice to separate styles into a dedicated CSS file rather than including them in the JavaScript bundle. This is usually done using a plugin like mini-css-extract-plugin. Here's a basic example:

`Install the plugin:`

```bash
npm install --save-dev mini-css-extract-plugin
```

`Update your Webpack configuration (webpack.config.js):`

```javascript
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    main: "./src/main.js",
  },
  output: {
    filename: "bundle.js",
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
    new MiniCssExtractPlugin({
      filename: "styles.css", // specify the name for the extracted CSS file
    }),
  ],
};
```

In this configuration, the MiniCssExtractPlugin.loader is used to extract CSS into a separate file. The styles.css file will contain the compiled styles.

`Usage in your JavaScript files:`

**Import your CSS files in your JavaScript entry point(s):**

```javascript
// main.js
import "./styles.css";
// other imports and code specific to main.js
```

**Run Webpack:**

When you run your Webpack build, the styles will be extracted into the specified output file (styles.css in this case):

Now, when you check your dist directory, you should see a styles.css file containing your extracted styles

## Minficiation

To minify CSS in Webpack, you can use the `optimize-css-assets-webpack-plugin` along with the `terser-webpack-plugin` for JavaScript minification. Here's how you can modify your existing Webpack configuration to include CSS minification.

```js
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: {
    main: "./src/main.js",
  },
  output: {
    filename: "bundle.js",
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
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin(), // for JavaScript minification
      new CssMinimizerPlugin(), // For CSS Minification
    ],
  },
};
```

`Minify HTML`

```js
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    main: "./src/main.js",
  },
  output: {
    filename: "bundle.js",
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
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
    new OptimizeCssAssetsPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html", // path to your HTML template
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin(), // for JavaScript minification
    ],
  },
};
```
