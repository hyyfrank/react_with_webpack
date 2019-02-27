const merge = require('webpack-merge');
const common = require('./src/config/webpack_common.config');
const devserver = require('./src/config/webpack_devserver.config');
const fontParse = require('./src/config/webpack_font.config');
const imageParse = require('./src/config/webpack_image.config');
const jsParse = require('./src/config/webpack_js.config');
const optimizing = require('./src/config/webpack_optimizing.config');
const styleParse = require('./src/config/webpack_style.config');
const sourceMap = require('./src/config/webpack_sourcemap.config');
const hotModuleReplacement = require('./src/config/webpack_hmr.config');
const longCached = require('./src/config/webpack_longcached.config');

module.exports = merge([
    common,
    jsParse,
    styleParse,
    fontParse,
    imageParse,
    devserver,
    sourceMap,
    hotModuleReplacement,
    longCached,
    optimizing
]);