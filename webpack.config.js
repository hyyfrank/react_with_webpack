const path = require("path");

module.exports = {
  entry: {
    app: "./src/main.js"
  },
  output: {
    publicPath: __dirname + "/build/", // js引用路径或者CDN地址
    path: path.resolve(__dirname, "build"), // 打包文件的输出目录
    filename: "bundle.js"
  }
};