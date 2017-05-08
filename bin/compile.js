const fs = require('fs-extra')
const debug = require('debug')('app:bin:compile')
const webpackCompiler = require('../build/webpack-compiler')
const webpackConfig = require('../build/webpack.config')
const config = require('../config')

const paths = config.utils_paths

const compile = () => {
  debug('启动编译器. webpack-compiler')
  return Promise.resolve().then(() => {
    debug('启动webpackCompiler')
    return webpackCompiler(webpackConfig)
  }).then(stats => {
    if (stats.warnings.length && config.compiler_fail_on_warning) {
      throw new Error('Config设置为失败警告，退出状态码为“1”。')
    }
    debug('将静态资产复制到dist文件夹。')
    fs.copySync(paths.client('static'), paths.dist())
  }).then(() => {
    debug('编译成功完成。')
  }).catch((err) => {
    debug('编译器遇到错误。', err)
    process.exit(1)
  })
}

compile()
