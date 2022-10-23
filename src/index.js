const { validate } = require('schema-utils')
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
        compiler.hooks.emit.tagAsync(PLUGIN_NAME, compilation => {
            console.log(compilation.assets)
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
            await this.client.put(fileName, fileBlob)
        } catch (error) {
            throw new Error(`${PLUGIN_NAME}:upload error: ${error}`)
        }
    }
}
module.exports = { OssWebpackPlugin }