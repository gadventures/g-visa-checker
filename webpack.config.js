var path = require("path")
var webpack = require('webpack')
var CssExtract = require('mini-css-extract-plugin')
var UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    context: __dirname,
    entry: './src/index',
    devtool: 'sourcemap',
    output: {
        path: path.resolve('./dist/'),
        filename: "index.js",
        library: 'visachecker.js',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    plugins: [
        new CssExtract({
            filename: '[name]-[hash].css',
            chunkFilename: '[id].css'
        })
    ],
    module: {
        rules: [{
            test: /\.jsx?$/,
            type: 'javascript/esm',
            include: path.resolve(__dirname, 'src'),
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
                presets: [ '@babel/env' ],
                plugins: [
                    ["@babel/plugin-proposal-decorators", {legacy: true}],
                    "@babel/plugin-proposal-class-properties",
                    "@babel/plugin-transform-runtime",
                    "@babel/plugin-transform-react-jsx",
                ]
            }
        },
        {
            test: /\.s?css/,
            loaders: ['style-loader', 'css-loader']
        },
        {
            test: /\.(png|svg)$/,
            loader: 'file-loader?name=images/[name].[ext]'
        }],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            'react': path.resolve(__dirname, './node_modules/react'),
            'react-dom': path.resolve(__dirname, './node_modules/react-dom')
        }
    },
    externals: {
        'react': {
            'commonjs': 'react',
            'commonjs2': 'react',
            'amd': 'React',
            'root': 'React'
        },
        'react-dom': {
            'commonjs': 'react-dom',
            'commonjs2': 'react-dom',
            'amd': 'ReactDOM',
            'root': 'ReactDOM'
        }
    }
}

