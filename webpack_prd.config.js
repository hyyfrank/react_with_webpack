const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const glob = require("glob");
// const PurifyCSSPlugin = require("purifycss-webpack");
// const StyleCssLintPlugin = require("stylelint-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const LodashWebpackPlugin = require("lodash-webpack-plugin");
const webpack = require("webpack");

const cssnano = require("cssnano");
const {generateHtmlPages, getEntry} = require("./src/utils/webpack-utils");

const allpages = generateHtmlPages("./src/pages");

const MiniCssPlugin = new MiniCssExtractPlugin({
    filename: "[name].css",
    allChunks: true,
    disable: false,
});
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const PurifyCssPlugin = new PurifyCSSPlugin({
//     paths: glob.sync(path.join(__dirname, '../src/index.js')),
//     styleExtensions: ['.css', '.scss'],
//     purifyOptions: {
//         whitelist: ['*purify*']
//     }
// });

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


// const StyleLintPlugin = new StyleCssLintPlugin({
//     configFile: '.stylelintrc',
//     context: 'src',
//     files: '**/*.scss',
//     failOnError: false,
//     quiet: false,
// });

module.exports = {
    entry: getEntry("./src/pages"),
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
                test: /\.(css|less)$/,
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
                            // plugins: [require("postcss-sprites")({
                            //     spritePath: "./dist/images"
                            // })]
                        },
                    },
                    {
                        loader: "less-loader",
                        options: {
                            sourceMap: true,
                        }
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
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {   // 抽离第三方插件
                    test: /node_modules/,   // 指定是node_modules下的第三方包
                    chunks: 'initial',
                    name: 'vendor',  // 打包后的文件名，任意命名
                    // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                    priority: 10
                },
                common: { // 抽离自己写的公共代码，common这个名字可以随意起
                    chunks: 'initial',
                    name: 'common',  // 任意命名
                    minSize: 0    // 只要超出0字节就生成一个新包
                }
            }
        }
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
  
    devtool : 'cheap-module-source-map',
    plugins: [
        ...allpages,
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
            filename: 'index.html',
            hash: true,
            excludeChunks:["algorithms/algorithms","dashboard/dashboard","videos/videos"]
        }),
        MiniCssPlugin,
        // PurifyCssPlugin,
        // StyleLintPlugin,
        OptimizeCSSPlugin,
        new LodashWebpackPlugin(),
        new webpack.ProvidePlugin({    //它是一个插件，所以需要按插件的用法new一个
            $:'jquery',    //接收名字:模块名
        }),
    ],
    output: {
        publicPath: "",
        path: path.resolve(__dirname, "dist"),
        filename: "[name]-bundle.js"
    },
};