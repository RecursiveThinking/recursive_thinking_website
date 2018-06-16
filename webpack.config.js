const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: `${__dirname}/src/main.js`,
    plugins: [
        new CleanWebpackPlugin(['build']),
        new CopyWebpackPlugin([
            { from: './buildspec.yml', to: './', force: true }
        ]),
        new ExtractTextPlugin("main.css"),
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: './[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                use: [ 'babel-loader' ],
                exclude: /node_modules/
            },
            {
                test: /index\.html$/,
                // note: items in the 'use' clause are run bottom -> top
                use: [ 
                    'file-loader?name=[path][name].[ext]', // run third
                    'extract-loader', // run second
                    'html-loader' // run first
                ],
            },
            {
                test: /\.html$/,
                use: [ 'html-loader' ],
                exclude: [ /index\.html$/ ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|ico)$/,
                use: [ 'file-loader?name=[path][name].[ext]' ]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: [ 
                        'css-loader',
                        'postcss-loader'
                    ]
                }),
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
