const webpack = require('webpack')
const cssnano = require('cssnano')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const config = require('../config')
const debug = require('debug')('app:webpack_config')

const paths = config.utils_paths
const __DEV__ = config.globals.__DEV__
const __PROD__ = config.globals.__PROD__
const __TEST__ = config.globals.__TEST__

debug('创建webpack.config配置.')
const webpackConfig = {
  name: 'client',
  target: 'web',
  devtool: config.compiler_devtool,
  resolve: {
    root: paths.client(),
    extensions: ['', '.js', '.jsx', '.json']
  },
  module: {}
}
// ------------------------------------
// Entry Points
// 入口点
// app: [ '/Users/edward/workspaces/react-redux/src/main.js', 'webpack-hot-middleware/client?path=http://10.22.1.89:3000/__webpack_hmr' ]
// ------------------------------------
const APP_ENTRY = paths.client('main.js')
webpackConfig.entry = {
  app: __DEV__
    ? [APP_ENTRY].concat(`webpack-hot-middleware/client?path=${config.compiler_public_path}__webpack_hmr`, `babel-polyfill`)
    : [APP_ENTRY],
  vendor: config.compiler_vendors
}

// ------------------------------------
// Bundle Output
// 打包输出
// path: '/Users/edward/workspaces/react-redux/dist'
// ------------------------------------
webpackConfig.output = {
  filename: `[name].[${config.compiler_hash_type}].js`,
  chunkFilename: '[chunkhash].js',
  path: paths.dist(),
  publicPath: config.compiler_public_path
}

// ------------------------------------
// Plugins
// 插件
// template: /Users/edward/workspaces/react-redux/src/index.html
// favicon: /Users/edward/workspaces/react-redux/src/static/favicon.ico
// ------------------------------------
webpackConfig.plugins = [
  new webpack.DefinePlugin(config.globals),
  new HtmlWebpackPlugin({
    template: paths.client('index.html'),
    hash: false,
    favicon: paths.client('static/favicon.ico'),
    filename: 'index.html',
    inject: 'body',
    minify: {
      // caseSensitive: false, //是否大小写敏感
      collapseBooleanAttributes: true, //是否简写boolean格式的属性如：disabled="disabled" 简写为disabled
      collapseWhitespace: true //是否去除空格
    }
  })
]

if (__DEV__) {
  debug('启用实时开发插件 / Enable plugins for live development (HMR, NoErrors).')
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin(), new webpack.NoErrorsPlugin())
} else if (__PROD__) {
  debug('启用生产插件 / Enable plugins for production (OccurenceOrder(排序输出), Dedupe(删除重复数据) & UglifyJS(压缩代码)).')
  webpackConfig.plugins.push(new webpack.optimize.OccurrenceOrderPlugin(), new webpack.optimize.DedupePlugin(), new webpack.optimize.UglifyJsPlugin({
    compress: {
      unused: true,
      dead_code: true,
      warnings: false
    }
  }))
}

// 在测试期间不要拆分包，因为我们只需要导入一个包
if (!__TEST__) {
  webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({names: ['vendor']}))
}

// ------------------------------------
// Loaders
// ------------------------------------
// JavaScript / JSON
webpackConfig.module.loaders = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: 'babel',
    query: config.compiler_babel
  }, {
    test: /\.json$/,
    loader: 'json'
  }
]

// ------------------------------------
// Style Loaders
// ------------------------------------
// 我们使用cssnano和postcss加载器，所以我们告诉css-loader不重复最小化。
const BASE_CSS_LOADER = 'css?sourceMap&-minimize'

webpackConfig.module.loaders.push({
  test: /\.scss$/,
  exclude: null,
  loaders: ['style', BASE_CSS_LOADER, 'postcss', 'sass?sourceMap']
})
webpackConfig.module.loaders.push({
  test: /\.css$/,
  exclude: null,
  loaders: ['style', BASE_CSS_LOADER, 'postcss']
})

webpackConfig.sassLoader = {
  includePaths: paths.client('styles')
}

webpackConfig.postcss = [cssnano({
    autoprefixer: {
      add: true,
      remove: true,
      browsers: ['last 2 versions']
    },
    discardComments: {
      removeAll: true
    },
    discardUnused: false,
    mergeIdents: false,
    reduceIdents: false,
    safe: true,
    sourcemap: true
  })]

// File loaders
/* eslint-disable */
webpackConfig.module.loaders.push({
  test: /\.woff(\?.*)?$/,
  loader: 'url?prefix=fonts/&name=[hash:base64:20].[ext]&limit=10000&mimetype=application/font-woff'
}, {
  test: /\.woff2(\?.*)?$/,
  loader: 'url?prefix=fonts/&name=[hash:base64:20].[ext]&limit=10000&mimetype=application/font-woff2'
}, {
  test: /\.otf(\?.*)?$/,
  loader: 'file?prefix=fonts/&name=[hash:base64:20].[ext]&limit=10000&mimetype=font/opentype'
}, {
  test: /\.ttf(\?.*)?$/,
  loader: 'url?prefix=fonts/&name=[hash:base64:20].[ext]&limit=10000&mimetype=application/octet-stream'
}, {
  test: /\.eot(\?.*)?$/,
  loader: 'file?prefix=fonts/&name=[hash:base64:20].[ext]'
}, {
  test: /\.svg(\?.*)?$/,
  loader: 'url?prefix=fonts/&name=[hash:base64:20].[ext]&limit=10000&mimetype=image/svg+xml'
}, {
  test: /\.(png|jpg|gif)$/,
  loader: 'url?limit=8192'
})
/* eslint-enable */

// ------------------------------------
// Finalize Configuration
// 完成配置
// ------------------------------------
// when we don't know the public path (we know it only when HMR is enabled [in development]) we
// need to use the extractTextPlugin to fix this issue:
// http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
if (!__DEV__) {
  debug('将 ExtractTextPlugin 应用于CSS加载程序.')
  // console.log(webpackConfig.module.loaders);
  webpackConfig.module.loaders.filter((loader) => loader.loaders && loader.loaders.find((name) => /css/.test(name.split('?')[0]))).forEach((loader) => {
    // console.log(loader);
    const first = loader.loaders[0]
    const rest = loader.loaders.slice(1)
    // console.log(first, rest);
    // 切换loaders 变成loader字符串而已
    loader.loader = ExtractTextPlugin.extract(first, rest.join('!'))
    delete loader.loaders
    // console.log(loader);
  })
  // console.log(webpackConfig.module.loaders);
  // loader: '/Users/edward/workspaces/react_redux_express_mongo_redis/node_modules/_extract-text-webpack-plugin@1.0.1@extract-text-webpack-plugin/loader.js?{"omit":1,"extract":true,"remove":true}!style!css?sourceMap&-minimize!postcss'
  // loaders: [ 'style', 'css?sourceMap&-minimize', 'postcss' ]
  webpackConfig.plugins.push(new ExtractTextPlugin('[contenthash].css', {allChunks: true}))
}

module.exports = webpackConfig
