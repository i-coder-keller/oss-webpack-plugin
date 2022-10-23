import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { babel } from '@rollup/plugin-babel'
import json from "@rollup/plugin-json"
// import * as packageJson from "./package.json"
// const { dependencies = {}, peerDependencies = {} } = packageJson
// const dependenciesNames = Object.keys(dependencies)
// const peerDependenciesNames = Object.keys(peerDependencies)
// const externalList = [...dependenciesNames, ...peerDependenciesNames]
export default {
    input: 'src/index.js',
    output: {
        file: `core/index.js`,
        format: 'cjs'
    },
    plugins: [
        nodeResolve(),
        commonjs(),
        json(),
        babel({
            babelHelpers: 'runtime'
        })
    ],
    // external: [
    //     new RegExp(`^(${externalList.join('|')})$`),
    //     new RegExp(`^(${externalList.join('|')})/`) // 因为有些模块是通过模块子路径来引入，比如 import _sum from 'lodash/sum'，所以这个匹配也少不了。
    // ]
}