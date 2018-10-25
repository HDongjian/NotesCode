module.exports = {
    mode: "development",
    entry: "./js/entry.js",
    output: {
        path: __dirname,
        filename: './src/bundle.js'
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [{
                    loader: 'style-loader'
                },
                {
                    loader: "css-loader"
                }
            ]
        }]
    }
}