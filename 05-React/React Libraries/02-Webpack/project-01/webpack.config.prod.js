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
