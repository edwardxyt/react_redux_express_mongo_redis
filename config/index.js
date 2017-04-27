/* eslint key-spacing:0 spaced-comment:0 */
const path = require('path')
const debug = require('debug')('app:config-index')
const argv = require('yargs').argv
const ip = require('ip')

debug('创建默认配置');
debug('IP：', ip.address());
debug('PORT：', process.env.PORT || 3000);

// ========================================================
// global Configuration
// 由于虚拟接口不能很优雅的require到models
// 全局配置
// ========================================================
global.MONGO = path.resolve(__dirname, '..') + '/core/mongo';
global.REDIS = path.resolve(__dirname, '..') + '/core/redis';
global.API_USER = path.resolve(__dirname, '..') + '/models/api_user';

// ------------------------------------
// 配置后端API地址前缀
// ------------------------------------
// global.API_HOST = 'http://192.168.3.131:8080';
// global.HOST_PLATFORM = [API_HOST, '/platform-app'].join('');

// ========================================================
// Default Configuration
// 默认配置
// ========================================================
const config = {
  env : process.env.NODE_ENV || 'development',

  // ----------------------------------
  // Project Structure
  // 项目结构
  // ----------------------------------
  path_base  : path.resolve(__dirname, '..'),
  dir_client : 'src',
  dir_dist   : 'dist',
  dir_server : 'server',
  dir_test   : 'tests',

  // ----------------------------------
  // Server Configuration
  // 服务器配置
  // ----------------------------------
  // package.json 读取config对象里的配置
  // const PORT = process.env.npm_package_config_port
  // ----------------------------------
  server_host : ip.address(), // use string 'localhost' to prevent exposure on local network
  server_port : process.env.PORT || 3000,

  // ----------------------------------
  // Compiler Configuration
  // 编译器配置
  // ----------------------------------
  compiler_babel : {
    cacheDirectory : true,
    plugins        : ['transform-runtime', ["import", { libraryName: "antd", style: "css" }]],
    presets        : ['es2015', 'react', 'stage-0']
  },
  compiler_devtool         : 'source-map',
  compiler_hash_type       : 'hash',
  compiler_fail_on_warning : false,
  compiler_quiet           : false,
  compiler_public_path     : '/',
  compiler_api   : '/api',
  compiler_stats           : {
    chunks : false,
    chunkModules : false,
    colors : true
  },
  compiler_vendors : [
    'react',
    'react-redux',
    'react-router',
    'redux'
  ],

  // ----------------------------------
  // Test Configuration
  // 测试配置
  // ----------------------------------
  coverage_reporters : [
    { type : 'text-summary' },
    { type : 'lcov', dir : 'coverage' }
  ],

  // ----------------------------------
  // mongodb
  // ----------------------------------
  mongodb: {
    port: 27017,
    database: 'news',
    host: '127.0.0.1',
    path: 'mongodb://localhost:',
    user: '',
    password: '',
    cookieSecret: 'edward' //Cookie加密 与数据库无关 留用
  },

  // ----------------------------------
  // redis
  // ----------------------------------
  redis: {
    port: 6379,
    host: '127.0.0.1',
    password: 'porschev',
    options: {
      db: 1
    },
    cookieSecret: 'edward' //Cookie加密 与数据库无关 留用
  }
}

// ------------------------------------
// Environment
// 环境
// ------------------------------------
// N.B.: globals added here must _also_ be added to .eslintrc
config.globals = {
  'process.env'  : {
    'NODE_ENV' : JSON.stringify(config.env)
  },
  'NODE_ENV'     : config.env,
  '__DEV__'      : config.env === 'development',
  '__PROD__'     : config.env === 'production',
  '__TEST__'     : config.env === 'test',
  '__COVERAGE__' : !argv.watch && config.env === 'test',
  '__BASENAME__' : JSON.stringify(process.env.BASENAME || '')
}

// ------------------------------------
// Validate Vendor Dependencies
// 验证供应商依赖关系
// ------------------------------------
const pkg = require('../package.json')

config.compiler_vendors = config.compiler_vendors
  .filter((dep) => {
    if (pkg.dependencies[dep]) return true

    debug(
      `Package "${dep}" was not found as an npm dependency in package.json; ` +
      `it won't be included in the webpack vendor bundle.
       Consider removing it from compiler_vendors in ~/config/index.js`
    )
  })

// ------------------------------------
// Utilities
// 实用程序
// path.resolve 它可以接受多个参数，依次表示所要进入的路径，直到将最后一个参数转为绝对路径。如果根据参数无法得到绝对路径，就以当前所在路径作为基准。除了根目录，该方法的返回值都不带尾部的斜杠。
// ------------------------------------
function base () {
  const args = [config.path_base].concat([].slice.call(arguments))
  // debug(args);
  // debug(path.resolve.apply(path, args));
  return path.resolve.apply(path, args)
}

config.utils_paths = {
  base   : base,
  client : base.bind(null, config.dir_client),
  dist   : base.bind(null, config.dir_dist)
}

// ========================================================
// Environment Configuration
// 环境配置
// ========================================================
debug(`NODE_ENV："${config.env}".`)
const environments = require('./environments')
const overrides = environments[config.env]

// 覆盖配置
if (overrides) {
  debug('找到覆盖，应用于默认配置（合并覆盖后的配置文件）。')
  Object.assign(config, overrides(config))
  debug(`compiler_public_path：${config.compiler_public_path}`)
  debug(`compiler_api：${config.compiler_api}`)
} else {
  debug('未找到环境覆盖，将使用默认值.')
}

module.exports = config
