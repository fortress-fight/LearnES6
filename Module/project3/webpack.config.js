var htmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
    entry: './src/app.js',
    output: {
        path: './dist',
        filename: 'js/[name].bundle.js'
    },
    module: {
        loaders: [{
            test: /.js$/,
            exclude: path.resolve(__dirname, 'node_modules'),
            include: path.resolve(__dirname, 'src'),
            loader: 'babel-loader'
        }]
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: 'body'
        })
    ]
}