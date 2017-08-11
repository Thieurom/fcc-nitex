const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');


const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js',
        publicPath: '/'
    },
    module: {
        rules: [
            { test: /\.(js)$/, use: 'babel-loader' },
            { test: /\.css$/, use: ['style-loader', 'css-loader?modules&importLoaders=1&localIdentName=_[hash:base64:5]'] },
            { test: /\.(png|jpg|gif)$/, use: 'url-loader' }
        ]
    },
    devServer: {
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
};


module.exports = config;
