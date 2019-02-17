module.exports = {
    entry: [
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
        ]
    },
    plugins: [],
    resolve: {
        extensions: ['*', '.js', '.jsx']
    }
};

