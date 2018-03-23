'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    devtool: 'source-map',
    // target: 'node',
    node: {
        fs: "empty",
        module: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    // vendor: [
    //     'react',
    //     'react-dom',
    //     'react-redux',
    //     'redux'
    // ],
    entry: [
       'webpack-hot-middleware/client?reload=true',
        path.join(__dirname, 'addons/web/main.js')
        // path.join(__dirname, 'app/main.js')
    ],
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: '[name].js',
        // filename: 'dung.js',
        publicPath: '/',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'app/index.tpl.html',
            inject: 'body',
            filename: 'index.html',
            hash: true,
            // title: The title to use for the generated HTML document.
//             filename: The file to write the HTML to. Defaults to index.html. You can specify a subdirectory here too (eg: assets/admin.html).
// template: Webpack require path to the template. Please see the docs for details.
//                                                                             inject: true | 'head' | 'body' | false Inject all assets into the given template or templateContent - When passing true or 'body' all javascript resources will be placed at the bottom of the body element. 'head' will place the scripts in the head element.
//     favicon: Adds the given favicon path to the output html.
//     minify: {...} | false Pass html-minifier's options as object to minify the output.
// hash: true | false if true then append a unique webpack compilation hash to all included scripts and CSS files. This is useful for cache busting.
//     cache: true | false if true (default) try to emit the file only if it was changed.
//     showErrors: true | false if true (default) errors details will be written into the HTML page.
//     chunks: Allows you to add only some chunks (e.g. only the unit-test chunk)
// chunksSortMode: Allows to control how chunks should be sorted before they are included to the html. Allowed values: 'none' | 'auto' | 'dependency' | {function} - default: 'auto'
// excludeChunks: Allows you to skip some chunks (e.g. don't add the unit-test chunk)
// xhtml: true | false If true render the link tags as self-closing, XHTML compliant. Default is false
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new ExtractTextPlugin("ok.css")
    ],
    // context: path.join(__dirname, 'static'),
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {"presets": ["react", "es2015", "stage-0", "react-hmre"],
                        "plugins": ["transform-decorators-legacy"]
                }
            },
            {
                test: /\.json?$/,
                loader: 'json'},
            {
                test: /\.css$/,
                loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]'
            },
            {
                test: /\.less?$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            }
        ]
  }
};
