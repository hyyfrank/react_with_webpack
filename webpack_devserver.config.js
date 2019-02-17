
const isProd = process.env.NODE_ENV === 'production';
const baseConfig = {};
if (!isProd) {
    baseConfig.devServer = {
        contentBase: './dist',
        hot: true,
        open: true,
    };
}
module.exports = baseConfig;
