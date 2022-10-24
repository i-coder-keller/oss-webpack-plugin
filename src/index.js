const { validate } = require('schema-utils')
const { green, red } = require('colors')
const { fileValidate } = require('./utils')
const schema = require('./schema.json')
const OSS = require('ali-oss')
const PLUGIN_NAME = "oss-webpack-plugin"

class OssWebpackPlugin {
    options = {}
    client = null
    constructor(options) {
        validate(schema, options, { name: PLUGIN_NAME })
        this.options = options
    }
    apply(compiler) {
        this.repairUrl(compiler)
        compiler.hooks.emit.tapAsync(PLUGIN_NAME, compilation => {
            const assets = Object.keys(compilation.assets).filter(key => fileValidate(key, this.options.test))
            assets.forEach(key => {
                const source = compilation.assets[key].source()
                this.upload(key, source)
            })
        })

    }
    repairUrl(compiler) {
        const reg2strings = this.options.test.map(reg => `${reg}`)
        compiler.options.module.rules.forEach(rule => {
            if (reg2strings.includes(`${rule.test}`)) {
                if (rule.generator) {
                    rule.generator.publicPath = this.options.publicPath
                } else {
                    rule.generator = {
                        publicPath: this.options.publicPath
                    }
                }
            }
        })
    }
    initOss() {
        const { region, accessKeyId, accessKeySecret, bucket } = this.options
        this.client = new OSS({
            region,
            accessKeyId,
            accessKeySecret,
            bucket,
        })
    }
    async upload(fileName, fileBlob) {
        try {
            const result = await this.client.put(fileName, fileBlob)
            console.log(green(`🚀 ${PLUGIN_NAME}: upload success: ${red(result)}`))
        } catch (error) {
            throw new Error(`${PLUGIN_NAME}: upload error: ${error}`)
        }
    }
}
module.exports = { OssWebpackPlugin }