# React_Redus_Express_mongodb_redis

## 需求配置
* node `^6.9.0`
* npm `^3.0.0`

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

如果一切顺利，你会看到如下:

<img src="http://i.imgur.com/zR7VRG6.png?2" />

开发过程中，你用得最多的会是`npm dev`，但是这里还有很多其它的处理：

|`npm run <script>`|解释|
|------------------|-----------|
|`start`|服务启动在3000端口，代码热替换开启。|
|`dev`|与`npm start`相同, 但是启动nodemon守护进程。|
|`deploy:prod`|与`deploy`相同，但是`NODE_ENV`值为"production"。build在start之前。|

## 程序目录

```
.
├── bin                               # 启动脚本
│   ├── compile.js
│   └── server.js
├── build                             # 所有打包配置项
│   ├── karma.conf.js
│   ├── webpack-compiler.js
│   └── webpack.config.js             # webpack的指定环境配置文件
├── config                            # 项目配置文件
│   ├── environments.js
│   └── index.js
├── core
│   ├── mongo.js
│   ├── redis.js
│   ├── routes_loader.js
│   └── simulator.js
├── database
│   ├── _tmp
│   └── mongod.lock
├── dist
├── models
│   ├── api_user.js
│   └── model_users.js
├── nginx.conf
├── package.json
├── server                            # Express 程序 (使用 webpack 中间件)
│   └── main.js                       # 服务端程序入口文件
├── simulator
│   ├── generator
│   │   └── getGuuid.js
│   ├── redis
│   │   └── text.js
│   └── user
│       ├── addUser.js
│       ├── delUser.js
│       ├── findAll.js
│       └── updateUser.js
├── src                               # 程序源文件
│   ├── components                    # 全局可复用的表现组件(Presentational Components)
│   │   └── Header
│   │       ├── Header.js
│   │       ├── Header.scss
│   │       └── index.js
│   ├── containers                    # 全局可复用的容器组件
│   │   └── AppContainer.js
│   ├── index.html
│   ├── layouts                       # 主页结构
│   │   └── CoreLayout
│   │       ├── CoreLayout.js
│   │       ├── CoreLayout.scss
│   │       └── index.js
│   ├── main.js                       # 程序启动和渲染
│   ├── routes                        # 主路由和异步分割点
│   │   ├── Counter
│   │   │   ├── components
│   │   │   │   └── Counter.js
│   │   │   ├── containers
│   │   │   │   └── CounterContainer.js
│   │   │   ├── index.js
│   │   │   └── modules
│   │   │       └── counter.js
│   │   ├── Elapse
│   │   │   ├── components
│   │   │   │   └── Elapse.js
│   │   │   ├── containers
│   │   │   │   └── ElapseContainer.js
│   │   │   ├── index.js
│   │   │   └── modules
│   │   │       └── elapse.js
│   │   ├── Home                          # 不规则路由
│   │   │   ├── assets                    # 组件引入的静态资源
│   │   │   │   └── Duck.jpg
│   │   │   ├── components                # 直观React组件
│   │   │   │   ├── HomeView.js
│   │   │   │   └── HomeView.scss
│   │   │   └── index.js                  # 路由定义和代码异步分割
│   │   ├── PageNotFound
│   │   │   ├── assets
│   │   │   │   └── 404.jpg
│   │   │   ├── components
│   │   │   │   ├── PageNotFound.js
│   │   │   │   └── PageNotFound.scss
│   │   │   ├── index.js
│   │   │   └── redirect.js
│   │   ├── Route
│   │   │   ├── components
│   │   │   │   └── Route.js
│   │   │   └── index.js
│   │   ├── Zen
│   │   │   ├── components
│   │   │   │   ├── Zen.js
│   │   │   │   └── Zen.scss
│   │   │   ├── containers
│   │   │   │   └── ZenContainer.js
│   │   │   ├── index.js
│   │   │   └── modules
│   │   │       └── zen.js
│   │   └── index.js                  # 用store启动主程序路由
│   ├── static                        # 静态文件(不要到处imported源文件)
│   │   ├── favicon.ico
│   │   ├── humans.txt
│   │   └── robots.txt
│   ├── store                         # Redux指定块
│   │   ├── createStore.js            # 创建和使用redux store
│   │   ├── location.js
│   │   └── reducers.js               # Reducer注册和注入
│   └── styles                        # 程序样式
│       ├── _base.scss
│       └── core.scss
└── tests                              # 单元测试
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
