const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
  entry: {
    app: './src/index.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true
  },
<<<<<<< HEAD
  mode: "development",
=======
>>>>>>> 2975c9d... add babel,  react and css module
  module: {
    rules: [
      {
        test: /\.css$/,
<<<<<<< HEAD
        use: ['style-loader', 'css-loader']
=======
        use: [
          {
            loader:'style-loader'
          },
          {
            loader:'css-loader?modules&localIdentName=[name]_[hash:base64:5]',
          }
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
>>>>>>> 2975c9d... add babel,  react and css module
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),//模板
      filename: 'index.html',
      hash: true,//防止缓存
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    publicPath: "",
    path: path.resolve(__dirname, "dist"),
    filename: "[name]-bundle.js"
  },
}