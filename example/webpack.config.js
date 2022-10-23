const HtmlWebpackPlugin = require('html-webpack-plugin')
const { AliossWebpackPlugin } = require('../src/index.js')
const path = require('path')
module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, './dist'),
    },
    module: {
        rules: [
            { test: /.css$/i, use: ['style-loader', 'css-loader'] },
            { test: /\.(jpe?g|svg|png)$/, type: 'asset', generator: { filename: 'static/img/[name].[hash:6][ext]' }, parser: { dataUrlCondition: { maxSize: 10 * 1024 } } },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new AliossWebpackPlugin({
            test: [/\.(jpe?g|svg|png)$/, /.css$/i],
            publicPath: 'http://www.baidu.com/'
        })
    ]
}