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
                            sourceMap: true,
                            config: {
                                path: __dirname + '/postcss.config.js'
                            },
                            plugins: [require("postcss-sprites")({
                                spritePath: "./dist/images"
                            })]
                        },
                    },
                    {
                        loader:'sass-loader',
                    }

                ],
                exclude: /node_modules/,
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use:[
                    'url-loader?limit=10000&name=images/[name].[ext]',
                    {
                        loader: 'img-loader',
                        options: {
                            plugins: [
                                require('imagemin-gifsicle')({}),
                                require('imagemin-mozjpeg')({}),
                                require('imagemin-pngquant')({}),
                                require('imagemin-svgo')({
                                    plugins: [
                                        { removeTitle: true },
                                        { convertPathData: false }
                                    ]
                                })
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(svg)$/,
                exclude: /fonts/, /* dont want svg fonts from fonts folder to be included */
                use: [
                    {
                        loader: 'svg-url-loader',
                        options: {
                            noquotes: true
                        },
                    },
                ],
            },
            {
                test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                exclude: /images/,  /* dont want svg images from image folder to be included */
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name][hash].[ext]',
                            limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
                            publicPath: "fonts/",
                            outputPath: "fonts/"
                        },
                    },
                ],
            }
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