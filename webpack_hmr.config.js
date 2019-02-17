
const webpack = require("webpack");
const isProd = process.env.NODE_ENV === 'production';

const baseConfig = {};
if (!isProd) {
   baseConfig.plugins = [
        new webpack.HotModuleReplacementPlugin()
    ]
}
module.exports = baseConfig;

