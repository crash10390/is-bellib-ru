const path = require('path');

const config = {
    entry: {
        'app': './app/app.js',
        'add_book': './app/elcat/add_book.js',
        'accounts': './app/accounts/accounts.js',
        'message_box': './app/accounts/message.box.js',
        'search_result': './app/elcat/search_result.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].bundle.js",
        chunkFilename: "[id].chunk.js"
    },
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: "file-loader?name=[name].[ext]&publicPath=/static/&outputPath=images/"
            },
            {test: /\.handlebars$/, use: "handlebars-loader"}
        ]
    }
};

module.exports = config;