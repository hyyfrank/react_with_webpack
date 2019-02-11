const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const baseConfig = {
  entry: {
    app: './src/index.js'
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
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
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
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
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    publicPath: "",
    path: path.resolve(__dirname, "dist"),
    filename: "[name]-bundle.js"
  },
}
if (process.env.NODE_ENV === 'development') {
  baseConfig.devtool = 'inline-source-map';
  baseConfig.devServer = {
    contentBase: './dist',
    hot: true,
    open: true,
  };
}
module.exports = baseConfig;
