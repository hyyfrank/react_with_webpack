const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const glob = require("glob");
const PurifyCSSPlugin = require("purifycss-webpack");
const StyleCssLintPlugin = require("stylelint-webpack-plugin");
const webpack = require("webpack");


const PurifyCssPlugin = new PurifyCSSPlugin({
    paths: glob.sync(path.join(__dirname, '../src/index.js')),
    styleExtensions: ['.css', '.scss'],
    purifyOptions: {
        whitelist: ['*purify*']
    }
});
const StyleLintPlugin = new StyleCssLintPlugin({
    configFile: '.stylelintrc',
    context: 'src',
    files: '**/*.scss',
    failOnError: false,
    quiet: false,
});

module.exports = {
    entry: [
        "@babel/polyfill",
        "./src/index.js"
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(css|sass|scss)$/,
                use: [
                    {
                        loader:'style-loader'
                    },
                    {
                        loader:'css-loader',
                        options:{
                            modules: true,
                            localIdentName: 'purify_[hash:base64:5]',
                        }
                    },
                    {
                        loader:'postcss-loader',
                        options: {
                            sourceMap: true,
                            config: {
                                path: __dirname + '/postcss.config.js'
                            }
                        },
                    },
                    {
                        loader:'sass-loader',
                        options:{
                            sourceMap: true
                        }
                    }
                ],
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    devtool : 'inline-source-map',
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
            filename: 'index.html',
            hash: true,
        }),
        new webpack.HotModuleReplacementPlugin(),
        PurifyCssPlugin,
        StyleLintPlugin,
    ],
    devServer: {
        contentBase: './dist',
        hot: true,
        open: true,
    },
    output: {
        publicPath: "",
        path: path.resolve(__dirname, "dist"),
        filename: "[name]-bundle.js"
    },
};