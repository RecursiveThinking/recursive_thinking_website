const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: `${__dirname}/main.js`,
    plugins: [
        new CleanWebpackPlugin(['build']),
        new HtmlWebpackPlugin({
            template: './layout.html',
            filename: './index.html'
        }),
        new CopyWebpackPlugin([
            { from: './public/', to: './public', force: true },
            { from: './templates/', to: './templates', force: true },
            { from: './css/', to: './css', force: true },
            { from: './buildspec.yml', to: './', force: true },
            { from: './template.yml', to: './', force: true },
            { from: './backend/', to: './', force: true },
            { from: './main.css', to: './', force: true }
        ])
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: './public/main.bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                },
                exclude: /node_modules/
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map',
    devServer: {
        // NOTE: The dev server DOES NOT write to the disk -- it keeps assets in memory instead 
        // When you use webpack-dev-server, the build folder will be deleted. Don't worry!
        contentBase: './build', // serve static assets from here
        open: true // opens browser automagically
    }
};
