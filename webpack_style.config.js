require("path");
const path = require('path');
const glob = require("glob");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurifyCSSPlugin = require("purifycss-webpack");

const isProd = process.env.NODE_ENV === 'production';
const PATHS = {
    app: path.join(__dirname, "src"),
};

const MiniCssPlugin = new MiniCssExtractPlugin({
    filename: "[name].css",
});
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const PurifyCssPlugin = new PurifyCSSPlugin({
    paths: glob.sync(path.join(__dirname, '../src/components/home.jsx')),
    styleExtensions: ['.css', '.scss'],
    purifyOptions: {
        whitelist: ['*purify*']
    }
})

const cssDevRules=[
    {
        loader:'style-loader'
    },
    {
        loader:'css-loader?modules&localIdentName=[name]_[local]_[hash:base64:5]',
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
        MiniCssPlugin,
        // new ExtractTextPlugin("styles.css"),
    ];
}
module.exports = baseConfig;
