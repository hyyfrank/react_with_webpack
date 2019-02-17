const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    entry: [
        "@babel/polyfill",
        "./src/index.js"
    ],
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
            filename: 'index.html',
            hash: true,
        }),
    ],
    output: {
        publicPath: "",
        path: path.resolve(__dirname, "dist"),
        filename: "[name]-bundle.js"
    },
};