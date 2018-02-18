const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: './main.js',
    plugins: [
        new CleanWebpackPlugin(['build']),
        new CopyWebpackPlugin([
            { from: './layout.html', to: './', force: true },
            { from: './main.css', to: './', force: true },
            { from: './css/', to: './css', force: true },
            { from: './public/', to: './public', force: true },
            { from: './templates/', to: './templates', force: true }
        ])
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'main.bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};
