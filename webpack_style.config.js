require("path");
const path = require('path');
const glob = require("glob");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurifyCSSPlugin = require("purifycss-webpack");
const StyleCssLintPlugin = require("stylelint-webpack-plugin");

const isProd = process.env.NODE_ENV === 'production';
const PATHS = {
    app: path.join(__dirname, "src"),
};

const MiniCssPlugin = new MiniCssExtractPlugin({
    filename: "[name].css",
});
const ExtractTextPlugin = require("extract-text-webpack-plugin");
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
//todo:
// 1. style-lint(done)
// 2. css-next support
// 3. css-to-string
// 4. css extract to seperate file
// 5. purify css to remove unused css.
// 6. post-css use auto-prefix
// 7. make css module always support
// 8. optimization on css.
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
        // new ExtractTextPlugin("styles.css"),
    ];
} else {
    baseConfig.plugins=[
        PurifyCssPlugin,
        StyleLintPlugin,
    ];
}
module.exports = baseConfig;
