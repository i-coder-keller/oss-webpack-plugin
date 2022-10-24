const HtmlWebpackPlugin = require('html-webpack-plugin')
const { OssWebpackPlugin } = require('../src/index.js')
const path = require('path')
console.log(JSON.stringify(
    {
        test: [/\.(jpe?g|svg|png)$/, /.css$/i],
        publicPath: 'http://www.baidu.com/',
        region: '',
        accessKeyId: '',
        accessKeySecret: '',
        stsToken: '',
        bucket: '',
        upload(filename, file) {
            console.log(filename, file)
        }
    }
))
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
        new OssWebpackPlugin({
            test: [/\.(jpe?g|svg|png)$/, /.css$/i],
            publicPath: 'http://www.baidu.com/',
            region: '',
            accessKeyId: '',
            accessKeySecret: '',
            stsToken: '',
            bucket: '',
            upload(filename, file) {
                console.log(filename, file)
            }
        })
    ]
}