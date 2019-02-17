const isProd = process.env.NODE_ENV === 'production';
const baseConfig = {};
if (!isProd) {
    baseConfig.devtool = 'inline-source-map';
} else {
    baseConfig.devtool = 'cheap-module-source-map';
}
module.exports = baseConfig;
