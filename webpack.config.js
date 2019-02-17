const merge = require('webpack-merge');
const common = require('./webpack_common.config');
const devserver = require('./webpack_devserver.config');
const fontParse = require('./webpack_font.config');
const imageParse = require('./webpack_image.config');
const jsParse = require('./webpack_js.config');
const optimizing = require('./webpack_optimizing.config');
const styleParse = require('./webpack_style.config');
const sourceMap = require('./webpack_sourcemap.config');
const hotModuleReplacement = require('./webpack_hmr.config');
const longCached = require('./webpack_longcached.config');

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