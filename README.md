# React_Redux_Express_mongodb_redis

## 简要说明

采用react-router管理前端路由，基于antd开发react应用。redux管理数据流。node可用做中间层，mongodb用来存储虚拟数据（mockjs），也可以用做仅服务中间层的数据库。redis 缓存显示数据。nginx是最简单的反向代理而已。其中虚拟接口glob生成的路径，有兴趣的可以看看，这个脚手架我也是在别人的基础上加工的。

## 需求配置

- node `^6.9.4`
- npm `^3.10.10`
- nginx `^1.10.3`
- redis `^3.2.8`
- mongodb `^3.4.1`

## 开始

确认好你的环境配置，然后就可以开始以下步骤。

```bash
$ git clone https://github.com/edwardxyt/react_redux_express_mongo_redis.git
$ cd react_redux_express_mongo_redis
$ npm install                   # Install project dependencies
$ npm run dev                   # Compile and launch
# 或者 produce
$ npm run deploy:prod           # 生成打包
$ npm run start                 # node服务器
```

启动服务: nginx、mongodb、redis。

```bash
$ mongod --dbpath /Users/edward/workspaces/gm-web/database -logpath /Users/edward/workspaces/gm-web/logs --fork --port 27017
$ mongod -f /Users/edward/workspaces/gm-web/mongodb.conf

$ redis-server /Users/edward/workspaces/react-redux/redis.conf

$ nginx -c /Users/edward/workspaces/react-redux/nginx.conf

$ nginx -t -c /Users/edward/workspaces/react-redux/nginx.conf
```

如果一切顺利，你会看到如下:

![](https://github.com/edwardxyt/react_redux_express_mongo_redis/blob/master/README.png?raw=true) ![](https://github.com/edwardxyt/react_redux_express_mongo_redis/blob/master/INDEX.png?raw=true) ![](https://github.com/edwardxyt/react_redux_express_mongo_redis/blob/master/POSTMAN.png?raw=true)

开发过程中，你用得最多的会是`npm dev`，但是这里还有很多其它的处理：

`npm run <script>` | 解释
------------------ | ---------------------------------------
`start`            | 服务启动在3000端口，代码热替换开启。
`dev`              | 与`npm start`相同, 但是启动nodemon守护进程。
`deploy:prod`      | `NODE_ENV`值为"production"。build在start之前。

## 程序目录

```
.
├── bin                               # 启动脚本
├── build                             # 所有打包配置项
│   └── webpack.config.js             # webpack的指定环境配置文件
├── config                            # 项目配置文件
├── core                              # 核心
│   ├── mongo.js                      # mongodb配置项
│   ├── redis.js                      # redis配置项
│   └── simulator.js                  # glob虚拟接口
├── database                          # 数据库
├── dist                              # 输出
├── models                            # M层
├── nginx.conf                        # nginx配置项
├── server                            # Express 程序 (使用 webpack 中间件)
│   └── main.js                       # 服务端程序入口文件
├── simulator                         # C层既路由
├── src                               # 程序源文件
│   ├── components                    # 全局可复用的表现组件(Presentational Components)
│   │   └── Header                    # 公用头
│   ├── containers                    # 全局可复用的容器组件
│   │   └── AppContainer.js           # 入口react组件
│   ├── index.html                    # index.html
│   ├── layouts                       # 主页结构
│   ├── main.js                       # 程序启动和渲染
│   ├── routes                        # 主路由和异步分割点
│   │   ├── Home                      # 不规则路由
│   │   │   ├── assets                # 组件引入的静态资源
│   │   │   ├── components            # 直观React组件
│   │   │   └── index.js              # 路由定义和代码异步分割
│   │   └── index.js                  # 用store启动主程序路由
│   ├── static                        # 静态文件(不要到处imported源文件)
│   ├── store                         # Redux指定块
│   │   ├── createStore.js            # 创建和使用redux store
│   │   └── reducers.js               # Reducer注册和注入
│   └── styles                        # 程序样式
└── tests                             # 单元测试
```

## 样式

所有的css和sass都支持会被预处理。只要被引入，都会经过[PostCSS](https://github.com/postcss/postcss)压缩，加前缀。在生产环境下会提取到一个css文件下。

## 服务端

这个项目的服务端使用Express。需要注意的是，只有一个目的那就是提供了`webpack-dev-middleware` 和 `webpack-hot-middleware`（代码热替换）。替换[webpack-dev-server](https://github.com/webpack/webpack-dev-server)，让它更容易实现universal 渲染和为了不使这个包过于庞大。

## 打包优化

Babel被配置[babel-plugin-transform-runtime](https://www.npmjs.com/package/babel-plugin-transform-runtime)可以让代码更优化。另外，在生产环境，我们使用[react-optimize](https://github.com/thejameskyle/babel-react-optimize)来优化React代码。

在生产环境下，webpack会导出一个css文件并压缩Javascript，并把js模块优化到最好的性能。

## 静态部署

如果你正在使用nginx处理程序，确保所有的路由都直接指向 `~/dist/index.html` 文件，然后让react-router处理剩下的事。如果你不是很确定应该怎么做，[文档在这里](https://github.com/reactjs/react-router/blob/master/docs/guides/Histories.md#configuring-your-server)。Express在脚手架中用于扩展服务和代理API，或者其它你想要做的事，这完全取决于你。
