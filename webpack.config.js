const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: [
    "./src/index.js"
  ],
  output: {
    publicPath: "",
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  mode: "development",
  plugins:[
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname,'src','index.html'),//模板
      filename:'index.html',
      hash:true,//防止缓存
      minify:{
          removeAttributeQuotes:true//压缩 去掉引号
      }
    })
  ]
};