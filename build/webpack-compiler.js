const webpack = require('webpack')
const debug = require('debug')('app:build:webpack-compiler')
const config = require('../config')

function webpackCompiler (webpackConfig, statsFormat) {
  statsFormat = statsFormat || config.compiler_stats

  return new Promise((resolve, reject) => {
    const compiler = webpack(webpackConfig)

    debug('启动webpack.run()。')
    compiler.run((err, stats) => {
      if (err) {
        debug('Webpack编译器遇到致命错误。', err)
        return reject(err)
      }

      const jsonStats = stats.toJson()
      debug('Webpack编译完成。')
      debug(stats.toString(statsFormat))

      if (jsonStats.errors.length > 0) {
        debug('Webpack编译器遇到错误。')
        debug(jsonStats.errors.join('\n'))
        return reject(new Error('Webpack编译器遇到错误。'))
      } else if (jsonStats.warnings.length > 0) {
        debug('Webpack编译器遇到警告。')
        debug(jsonStats.warnings.join('\n'))
      } else {
        debug('未遇到错误或警告。')
      }
      resolve(jsonStats)
    })
  })
}

module.exports = webpackCompiler
