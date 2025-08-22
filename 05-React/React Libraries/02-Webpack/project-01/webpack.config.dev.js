const path = require("path");
const common = require("./webpack.config.common");
const { merge } = require("webpack-merge");
const { webpack } = require("webpack");

module.exports = merge(common, {
  mode: "development",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    port: 5173,
    hot: true,
  },
  // plugins: [new webpack.hotModuleReplacementPlugin()],
});
