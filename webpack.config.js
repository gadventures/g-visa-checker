var path = require("path")
var webpack = require('webpack')
var CssExtract = require('mini-css-extract-plugin')

module.exports = {
    context: __dirname,
    entry: './src/index',
    output: {
        path: path.resolve('./dist/'),
        filename: "[name]-[hash].js",
        library: 'g-visa-checker',
        publicPath: '/dest/'
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
            include: path.resolve(__dirname, 'src'),
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
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
            loaders: [CssExtract.loader, 'style-loader', 'css-loader']
        },
        {
            test: /\.(png|svg)$/,
            loader: 'file-loader?name=images/[name].[ext]'
        }],
    },
    resolve: {
        extensions: ['.js', '.jsx']
        alias: {
            'react': path.resolve(__dirname, './node_modules/react'),
            'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
            "react-flag-icon-css": path.resolve(__dirname, './node_modules/react-flag-icon-css'),
            "react-redux": path.resolve(__dirname, './node_modules/react-redux'),
            "react-select": path.resolve(__dirname, './node_modules/react-select'),
            "redux": path.resolve(__dirname, './node_modules/redux'),
            "styled-components": path.resolve(__dirname, './node_modules/styled-components')
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

