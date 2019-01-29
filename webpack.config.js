const path = require("path");
const webpack = require("webpack");
module.exports = {
  entry: [
    "./src/main.js",
    "webpack/hot/dev-server",
    "webpack-dev-server/client?http://localhost:8080"
  ],
  output: {
    publicPath: "",
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js"
  },
  mode: "development", 
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};