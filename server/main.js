const express = require('express')
const debug = require('debug')('app:server_main')
const path = require('path')
const webpack = require('webpack')
const webpackConfig = require('../build/webpack.config')
const config = require('../config')

const server = express()
const paths = config.utils_paths

// ------------------------------------
// 配置网站图标
// ------------------------------------
// const favicon = require('serve-favicon');
// server.use(favicon(path.join(__dirname + '/static/img/favicon.ico')));

// ------------------------------------
// 定义cookie解析器
// session 持久化存储
// ------------------------------------
const cookieParser = require('cookie-parser');
const session = require('express-session');  //session
const MongoStore = require('connect-mongo')(session); //写入数据库session
const RedisStore = require('connect-redis')(session);

server.use(cookieParser());
// server.use(session({
//   secret: config.mongodb.cookieSecret,  //防止篡改Cookie 作为服务器端生成session的签名
//   key: config.mongodb.database,  //cookie name
//   cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },  //30 days
//   store: new MongoStore({
//       url: config.mongodb.path + config.mongodb.port + '/' + config.mongodb.database
//   })
// }));
server.use(session({
  secret: config.redis.cookieSecret,  //防止篡改Cookie 作为服务器端生成session的签名
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },  //30 days
  store: new RedisStore({
    host: config.redis.host,
    port: config.redis.port,
    db: 1,
    pass: config.redis.password
  })
}));

// ------------------------------------
// 配置后端API地址前缀
// ------------------------------------
// global.API_HOST = 'http://192.168.3.131:8080';
// global.HOST_PLATFORM = [API_HOST, '/platform-app'].join('');

// ------------------------------------
// 配置页面模版引擎
// ------------------------------------
// server.set('views', path.join(__dirname, 'views'));
// server.set('view engine', 'pug');

// ------------------------------------
// 配置Mongo数据库
// ------------------------------------
// const mongoose = require("mongoose");
// const db = require('../models/mongo');

// ------------------------------------
// 定义数据解析器
// bodyParser.json 是用来解析json数据格式的。
// bodyParser.urlencoded 则是用来解析我们通常的form表单提交的数据，也就是请求头中包含这样的信息： Content-Type: application/x-www-form-urlencoded
// bodyParser.urlencoded 模块用于解析req.body的数据，解析成功后覆盖原来的req.body，如果解析失败则为 {}
// extended 选项允许配置使用 querystring(false) 或 qs(true) 来解析数据，默认值是true，但这已经是不被赞成的了
// ------------------------------------
const bodyParser = require('body-parser');
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// ------------------------------------
// CORS, 跨域资源共享
// ------------------------------------
server.all( '*', function ( req, res, next ) {
  res.set({
    'Access-Control-Allow-origin': '*',
    'Access-Control-Allow-Headers': 'X-Requested-With',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Access-Control-Max-Age': '3600',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
  } );
  next();
});

// 加载模拟后台接口的逻辑路由
// 但是无法F5刷新页面，但是HMR代替即可
// server.all(require('../core/simulator').apiRouters(server));
require('../core/simulator').apiRouters(server)

// ------------------------------------
// 应用Webpack HMR中间件
// ------------------------------------
if (config.env === 'development') {
  const compiler = webpack(webpackConfig)

  debug('启用webpack dev和HMR(Hot Module Replacement (HRM) 又稱熱替換)中间件。')
  server.use(require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: paths.client(),
    hot: true,
    quiet: config.compiler_quiet,
    noInfo: config.compiler_quiet,
    lazy: false,
    stats: config.compiler_stats
  }))
  server.use(require('webpack-hot-middleware')(compiler))

  // 开发模式下 静态目录指向 /Users/edward/workspaces/react-redux/src/static
  server.use(express.static(paths.client('static')))

  // 刷新页面保留 路由功能（但不能使用测试接口功能）
  // server.use('*', function(req, res, next) {
  //   const filename = path.join(compiler.outputPath, 'index.html')
  //   compiler.outputFileSystem.readFile(filename, (err, result) => {
  //     if (err) {
  //       return next(err)
  //     }
  //     res.set('content-type', 'text/html')
  //     res.send(result)
  //     res.end()
  //   })
  // })
} else {
  debug('Server is being run outside of live development mode, meaning it will ' +
    'only serve the compiled application bundle in ~/dist. Generally you ' +
    'do not need an application server for this and can instead use a web ' +
    'server such as nginx to serve your static files. See the "deployment" ' +
    'section in the README for more information on deployment strategies.')

  //生成环境下 直接指向静态目录的 /Users/edward/workspaces/react-redux/dist
  server.use(express.static(paths.dist()))
}

module.exports = server
