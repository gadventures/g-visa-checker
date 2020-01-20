var path = require("path")
var webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: './src/index',
    devtool: 'sourcemap',
    output: {
        path: path.resolve('./static/dist/'),
        filename: "index.js",
        library: 'visachecker.js',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
                presets: [ '@babel/env' ],
                plugins:  [
                    ["@babel/plugin-proposal-decorators", {legacy: true}],
                    "@babel/plugin-proposal-class-properties",
                    "@babel/plugin-transform-runtime",
                    "@babel/plugin-transform-react-jsx"
                ]
              }
          },
        },
        {
            test: /\.html$/,
            use: [
                {
                    loader: "html-loader"
                }
            ]
        }
      ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./static/index.html",
            filename: "./index.html"
        }),
        new webpack.DefinePlugin({
            GAPI_PUBLIC_KEY: JSON.stringify('live_7ae668e5fee57a7750709ebd2a56128250067503'),
            GAPI_BASE_URL: JSON.stringify('https://rest.gadventures.com')
        }),
    ]
}
