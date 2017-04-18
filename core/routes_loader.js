const glob = require('glob');

/**
 *
 * api路由
 * app.use('/api', require('../routes/api/orgs'));
 *
 * 该路由加载暂时适用于测试开发阶段,只针对api进行路由，需要继续优化修改
 * by 2017.01.13 genbin
 */
const apiRouters = (app) => {
  return glob('./routes/api/*.js', {}, (er, files) => {
    let routeFiles = [];

    files.map((file) => {
      let items = file.split('/');
      let url = items.slice(2);
      let jsFile = url[url.length - 1].replace('.js', '');

      // 改写路径
      url[url.length - 1] = jsFile;

      // 改写require的模块路径
      items[0] = '..';
      items[items.length - 1] = jsFile;

      routeFiles.push(items.join('/'));

    });

    // 批量加载路由
    routeFiles.map( (routeFile) =>
        app.use('/api', require(routeFile))
    );

  });
};

/**
 *
 * 页面路由
 * app.use('/organization', require('../routes/organization/index'));
 *
 * 该路由加载暂时适用于测试开发阶段,只针对"页面"进行路由，需要继续优化修改
 * by 2017.01.13 genbin
 */
const pageRouters = (app) => {
  let pageRouters = [];

  return glob('./routes/*/index.js', {}, (er, files) => {
    let pageRouters = [];

    files.map((file) => {
      let items = file.split('/');
      let url = items.slice(2);
      let jsFile = url[url.length - 1].replace('.js', '');

      // 改写路径
      url = url.slice(0,1);

      // 改写require的模块路径
      items[0] = '..';
      items[items.length-1] = jsFile;

      pageRouters.push({
        url: '/' + url,
        reqPath: items.join('/')
      });

    });

    // 批量加载路由
    pageRouters.map( (pageRouter) =>
      app.use(pageRouter.url, require(pageRouter.reqPath))
    );

  }); // end of glob
};

module.exports = { apiRouters, pageRouters };
