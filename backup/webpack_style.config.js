const path = require('path');
const glob = require("glob");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurifyCSSPlugin = require("purifycss-webpack");
const StyleCssLintPlugin = require("stylelint-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// TODO:
// 1. style-lint(done)
// 2. css-next support(done)
// 3. css-to-string
// 4. css extract to separating file(done)
// 5. purify css to remove unused css.(done)
// 6. post-css use auto-prefix(done)
// 7. make css module always support(done)
// 8. minimize css file
const cssnano = require("cssnano");
const isProd = process.env.NODE_ENV === 'production';

const MiniCssPlugin = new MiniCssExtractPlugin({
    filename: "[name].css",
    allChunks: true,
    disable: !isProd,
});
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
const PurifyCssPlugin = new PurifyCSSPlugin({
    paths: glob.sync(path.join(__dirname, '../src/index.js')),
    styleExtensions: ['.css', '.scss'],
    purifyOptions: {
        whitelist: ['*purify*']
    }
});
const StyleLintPlugin = new StyleCssLintPlugin({
    configFile: '.stylelintrc',
    context: 'src',
    files: '**/*.scss',
    failOnError: false,
    quiet: false,
});

const OptimizeCSSPlugin = new OptimizeCSSAssetsPlugin({
    cssProcessor: cssnano,
    cssProcessorOptions: {
        discardComments: {
            removeAll: true,
        },
        // Run cssnano in safe mode to avoid
        // potentially unsafe transformations.
        safe: true,
    },
    canPrint: true,
});


const cssDevRules=[
    {
        loader:'style-loader'
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
];
const cssProdRules=
//     ExtractTextPlugin.extract({
//     fallback: "style-loader",
//     use: [
//         {
//             loader:'css-loader?modules&localIdentName=[name]_[local]_[hash:base64:5]',
//         },
//         {
//             loader:'sass-loader',
//         }
//     ]
// });
    [
    {
        loader: MiniCssExtractPlugin.loader,
        // loader:'style-loader'
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

];

console.log("is prod:"+isProd);
const baseConfig = {
    module: {
        rules: [
            {
                test: /\.(css|sass|scss)$/,
                use: isProd? cssProdRules:cssDevRules,
                exclude: /node_modules/,
            },
        ]
    },
};
if(isProd){
    baseConfig.plugins=[
        PurifyCssPlugin,
        StyleLintPlugin,
        MiniCssPlugin,
        OptimizeCSSPlugin,
        // new ExtractTextPlugin("styles.css"),
    ];



} else {
    baseConfig.plugins=[
        PurifyCssPlugin,
        StyleLintPlugin,
    ];
}
module.exports = baseConfig;
