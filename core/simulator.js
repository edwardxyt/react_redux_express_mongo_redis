const path = require('path')
const fs = require('fs')
const glob = require('glob')
const config = require('../config')
const debug = require('debug')('app:core/simulator')

const PREFIX_API = config.compiler_api

/**
 *
 * api路由
 * app.use('/api', require('../routes/api/orgs'));
 *
 * 该路由加载暂时适用于测试开发阶段,只针对api进行路由，需要继续优化修改
 *
 */
const apiRouters = (app, cb) => {
  return glob('./simulator/**/*.js', {}, (er, files) => {
    let routeFiles = [];

    files.forEach((file) => {
      // console.log(file);  // ./simulator/generator/getGuuid.js
      let items = file.split('/');
      // console.log(items);  // [ '.', 'simulator', 'generator', 'getGuuid.js' ]
      let url = items.slice(2);
      // console.log(url);  // [ 'generator', 'getGuuid.js' ]
      let jsFile = url[url.length - 1].replace('.js', '');
      // console.log(jsFile);  // getGuuid

      // 改写路径
      url[url.length - 1] = jsFile;
      // console.log(url);  // [ 'generator', 'getGuuid' ]

      // 改写require的模块路径
      items[0] = '..';
      items[items.length - 1] = jsFile;
      // console.log(items);  // [ '..', 'simulator', 'generator', 'getGuuid' ]

      routeFiles.push(items.join('/'));
      // console.log(routeFiles);  // [ '../simulator/generator/getGuuid' ]
    });

    // 批量加载路由
    // routeFiles 如下结构
    // [
    //   '../simulator/generator/getGuuid',
    //   '../simulator/redis/text',
    //   '../simulator/user/addUser',
    //   '../simulator/user/delUser',
    //   '../simulator/user/findAll',
    //   '../simulator/user/updateUser'
    // ]
    debug('  --> ::::::::  加载自定义路由 ::::::::::::');
    routeFiles.forEach( (routeFile, key) => {
      // 例：app.use('/api', require('../simulator/generator/getGuuid'))
      // 例：http://192.168.31.237:3000/api/generator/getGuuid
      app.use(PREFIX_API, require(routeFile))

      debug(`  --> ${++key} ${PREFIX_API}${routeFile}`);
      if (routeFiles.length === key) {
        cb('browserHistory启动');
      }
    });

    // ------------------------------------
    // browserHistory
    // 例：/Users/edward/workspaces/react_redux_express_mongo_redis/dist/index.html
    // ------------------------------------
    // app.use('*', function(req, res, next) {
    //   res.sendFile(path.join(ROOT_PATH, '/src/index.html'))
    // })


    // ------------------------------------
    // 404 中间件（middleware）
    // ------------------------------------
    // app.use(function(request, response, next) {
    //   debug("In comes a " + request.method + " to " + request.url);
    //   next();
    // });

    // app.use(function(request, response) {
    //   response.writeHead(404, { "Content-Type": "text/plain" });
    //   response.end("404 error!\n");
    // });

  });
};

module.exports = { apiRouters };
