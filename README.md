<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200"
      src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
  <h1>OSS Webpack Plugin</h1>
</div>

<h2 align="center">Install</h2>

<h3>Webpack 5</h3>

```bash
npm i --save-dev oss-webpack-plugin
```

```bash
yarn add --dev html-webpack-plugin
```

这是一个 [webpack](http://webpack.js.org/) 插件 他可以为你的`webpack`静态资源提供服务，你可以提供一些正则来匹配你想要服务的资源，包括不限于图片、css等，插件内置了阿里云oss服务，你可以输入一些配置来决定你的oss配置，或则来提供一个上传函数来自定义上传
<h2 align="center">用法</h2>

**webpack.config.js**
```js
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

```

<h2 align="center">参数</h2>

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**`test`**|`{Array<Regx>}`|`undefined`|这是一个必传项，他可以来决定处理那些资源|
|**`publicPath`**|`{String}`|`undefined`|这个参数决定了资源请求应该发向哪里 |
|**`region`**|`{String}`|`undefined`|请查看阿里云oss 上传参数[docs](https://help.aliyun.com/document_detail/31886.html) |
|**`accessKeyId`**|`{String}`|`undefined`| 请查看阿里云oss 上传参数[docs](https://help.aliyun.com/document_detail/31886.html) |
|**`accessKeySecret`**|`{String}`| `undefined`| 请查看阿里云oss 上传参数[docs](https://help.aliyun.com/document_detail/31886.html) |
|**`stsToken`**|`{String}`|`undefined`|请查看阿里云oss 上传参数[docs](https://help.aliyun.com/document_detail/31886.html)|
|**`bucket`**|`{String`|`undefined`|请查看阿里云oss 上传参数[docs](https://help.aliyun.com/document_detail/31886.html)|
|**`upload`**|`{Function}`|`undefined`| 可以自定义上传函数|
