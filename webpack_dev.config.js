const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const glob = require("glob");
const PurifyCSSPlugin = require("purifycss-webpack");
// const StyleCssLintPlugin = require("stylelint-webpack-plugin");
const webpack = require("webpack");
const LodashWebpackPlugin = require("lodash-webpack-plugin");

const PurifyCssPlugin = new PurifyCSSPlugin({
    paths: glob.sync(path.join(__dirname, "../src/index.js")),
    styleExtensions: [".css", ".scss"],
    purifyOptions: {
        whitelist: ["*purify*"]
    }
});
// const StyleLintPlugin = new StyleCssLintPlugin({
//     configFile: ".stylelintrc",
//     context: "src",
//     files: "**/*.scss",
//     failOnError: false,
//     quiet: false
// });

module.exports = {
    entry: ["@babel/polyfill", "./src/index.js"],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(css)$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            localIdentName: "purify_[hash:base64:5]"
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                            config: {
                                path: __dirname + "/postcss.config.js"
                            },
                            plugins: [
                                require("postcss-sprites")({
                                    spritePath: "./dist/images"
                                })
                            ]
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: "[name]-[hash:5].min.[ext]",
                            limit: 10000, // size <= 20KB
                            publicPath: "images/",
                            outputPath: "images/"
                        }
                    },
                    {
                        loader: "img-loader",
                        options: {
                            plugins: [
                                require("imagemin-gifsicle")({}),
                                require("imagemin-mozjpeg")({}),
                                require("imagemin-pngquant")({}),
                                require("imagemin-svgo")({
                                    plugins: [{ removeTitle: true }, { convertPathData: false }]
                                })
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(svg)$/,
                exclude: /fonts/ /* dont want svg fonts from fonts folder to be included */,
                use: [
                    {
                        loader: "svg-url-loader",
                        options: {
                            noquotes: true,
                            limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
                            publicPath: "fonts/",
                            outputPath: "fonts/"
                        }
                    }
                ]
            },
            {
                test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                exclude: /images/ /* dont want svg images from image folder to be included */,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: "fonts/",
                            name: "[name][hash].[ext]"
                        }
                    }
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    // 抽离第三方插件
                    test: /node_modules/, // 指定是node_modules下的第三方包
                    chunks: "initial",
                    name: "vendor", // 打包后的文件名，任意命名
                    // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                    priority: 10
                },
                common: {
                    // 抽离自己写的公共代码，common这个名字可以随意起
                    chunks: "initial",
                    name: "common", // 任意命名
                    minSize: 0 // 只要超出0字节就生成一个新包
                }
            }
        }
    },
    resolve: {
        extensions: ["*", ".js", ".jsx"]
    },
    devtool: "cheap-module-source-map",
    plugins: [
        new CleanWebpackPlugin(["dist"]),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "index.html"),
            filename: "index.html",
            hash: true
        }),
        new webpack.HotModuleReplacementPlugin({
            multiStep: true,
        }),
        PurifyCssPlugin,
        // StyleLintPlugin,
        new LodashWebpackPlugin(),
        new webpack.ProvidePlugin({
            //它是一个插件，所以需要按插件的用法new一个
            $: "jquery" //接收名字:模块名
        })
    ],
    devServer: {
        contentBase: "./dist",
        hot: true,
        open: true
    },
    output: {
        publicPath: "",
        path: path.resolve(__dirname, "dist"),
        filename: "[name]-bundle.js"
    }
};
