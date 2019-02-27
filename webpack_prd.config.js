const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const glob = require("glob");
const PurifyCSSPlugin = require("purifycss-webpack");
const StyleCssLintPlugin = require("stylelint-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const cssnano = require("cssnano");

const MiniCssPlugin = new MiniCssExtractPlugin({
    filename: "[name].css",
    allChunks: true,
    disable: false,
});
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
const PurifyCssPlugin = new PurifyCSSPlugin({
    paths: glob.sync(path.join(__dirname, '../src/index.js')),
    styleExtensions: ['.css', '.scss'],
    purifyOptions: {
        whitelist: ['*purify*']
    }
});

const OptimizeCSSPlugin = new OptimizeCSSAssetsPlugin({
    cssProcessor: cssnano,
    cssProcessorOptions: {
        discardComments: {
            removeAll: true,
        },
        safe: true,
    },
    canPrint: true,
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
                use:  [
                    {
                        loader: MiniCssExtractPlugin.loader,
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
                            config: {
                                path: __dirname + '/postcss.config.js'
                            }
                        },
                    },
                    {
                        loader:'sass-loader',
                    }

                ],
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    devtool : 'cheap-module-source-map',
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
            filename: 'index.html',
            hash: true,
        }),
        MiniCssPlugin,
        PurifyCssPlugin,
        StyleLintPlugin,
        OptimizeCSSPlugin,
    ],
    output: {
        publicPath: "",
        path: path.resolve(__dirname, "dist"),
        filename: "[name]-bundle.js"
    },
};