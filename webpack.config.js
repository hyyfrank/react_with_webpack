const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  entry: {
      app: './src/index.js'
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
      hot: true
    },
  mode:"development",
   module: {
     rules: [
       {
         test: /\.css$/,
         use: ['style-loader', 'css-loader']
       }
     ]
   },
  plugins:[
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname,'src','index.html'),//模板
      filename:'index.html',
      hash:true,//防止缓存
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    publicPath: "",
    path: path.resolve(__dirname, "dist"),
    filename: "[name]-bundle.js"
  },
}