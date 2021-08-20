/* eslint-disable global-require */
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

// const PurifyCSSPlugin = require("purifycss-webpack");
const StyleCssLintPlugin = require("stylelint-webpack-plugin");
// const ESLintPlugin = require("eslint-webpack-plugin");
const webpack = require("webpack");
const fs = require("fs");
// const LodashWebpackPlugin = require("lodash-webpack-plugin");
// const {generateHtmlPages, getEntry, getDebugChunk} = require("./src/utils/webpack-utils");

// const allpages = generateHtmlPages("./src/pages");
// const PurifyCssPlugin = new PurifyCSSPlugin({
//     paths: glob.sync(path.join(__dirname, "../src/index.js")),
//     styleExtensions: [".css", ".scss"],
//     purifyOptions: {
//         whitelist: ["*purify*"]
//     }
// });

const lessToJs = require("less-vars-to-js");

const themeVariables = lessToJs(
  fs.readFileSync(
    path.join(__dirname, "./src/css/ant-default-vars.less"),
    "utf8"
  )
);

const StyleLintPlugin = new StyleCssLintPlugin({
  configFile: ".stylelintrc",
  context: "src",
  files: "**/*.less",
  failOnError: false,
  quiet: false
});

// const EslintPluginWithOption = new ESLintPlugin();

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
        test: /\.css$/,
        use: [
          require.resolve("style-loader"),
          {
            loader: require.resolve("css-loader"),
            options: {
              importLoaders: 1
            }
          },
          {
            loader: require.resolve("postcss-loader")
          }
        ]
      },
      {
        test: /\.less$/,
        exclude: [/src/],
        use: [
          require.resolve("style-loader"),
          {
            loader: require.resolve("css-loader"),
            options: {
              importLoaders: 1
            }
          },
          {
            loader: require.resolve("postcss-loader")
          },
          {
            loader: require.resolve("less-loader"),
            options: {
              lessOptions: {
                javascriptEnabled: true,
                modifyVars: themeVariables
              }
            }
            // options: { modifyVars: { "@primary-color": "#1DA57A" } }
          }
        ]
      },
      {
        test: /\.less$/,
        exclude: [/node_modules/],
        use: [
          require.resolve("style-loader"),
          {
            loader: require.resolve("css-loader"),
            options: {
              modules: true,
              localIdentName: "[local]_[hash:base64:8]"
            }
          },
          {
            loader: require.resolve("postcss-loader")
          },
          {
            loader: require.resolve("less-loader"),
            options: {
              lessOptions: {
                javascriptEnabled: true,
                modifyVars: themeVariables
              }
            }
            // options: { modifyVars: { "@primary-color": "#1DA57A" } }
          }
        ]
      },

      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true // webpack@2.x and newer
            }
          }
        ]
      },
      {
        test: /\.(svg)$/,
        exclude:
          /fonts/ /* dont want svg fonts from fonts folder to be included */,
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
        exclude:
          /images/ /* dont want svg images from image folder to be included */,
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
      multiStep: true
    }),
    // PurifyCssPlugin,
    // EslintPluginWithOption,
    StyleLintPlugin
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: "./dist",
    proxy: {
      "/api": {
        target: "http://127.0.0.1:5000",
        changeOrigin: true
      }
    },
    hot: true,
    open: true
  },
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "dist"),
    filename: "[name]-bundle.js"
  }
};
