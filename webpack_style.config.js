
const isProd = process.env.NODE_ENV === 'production';
console.log("process node env is:"+process.env.NODE_ENV)
const cssDevRules=[
    {
        loader:'style-loader'
    },
    {
        loader:'css-loader?modules&localIdentName=[name]_[local]_[hash:base64:5]',
    },
    {
        loader:'sass-loader',
    }
];
const cssProdRules=[
    {
        loader:'style-loader'
    },
    {
        loader:'css-loader?modules&localIdentName=[name]_[local]_[hash:base64:5]',
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
    plugins: [

    ],
};
module.exports = baseConfig;
