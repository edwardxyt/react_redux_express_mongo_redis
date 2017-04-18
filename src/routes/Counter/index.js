import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'counter',
  // 异步获取组件，getComponent仅在路由匹配时调用
  getComponent (nextState, cb) {
    // Webpack - 使用'require.ensure' 异步加载模块
    require.ensure([], (require) => {
      // Webpack - 使用require回调来定义绑定的依赖关系
      const Counter = require('./containers/CounterContainer').default
      const reducer = require('./modules/counter').default

      // 添加reducer到存储 'counter'
      injectReducer(store, { key: 'counter', reducer })

      /* Return getComponent */
      cb(null, Counter)

    /* Webpack named bundle */
    }, 'counter')
  }
})
