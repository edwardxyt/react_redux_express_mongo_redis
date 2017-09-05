import {applyMiddleware, compose, createStore} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import promise from 'redux-promise'
import {browserHistory} from 'react-router'
import makeRootReducer from './reducers'
import {updateLocation} from './location'

export default(initialState = {}) => {
  // ======================================================
  // Middleware Configuration
  // 调试中间件
  // ======================================================
  let middleware;
  if (__DEV__) {
    middleware = [thunk, promise, logger]
  } else {
    middleware = [thunk, promise]
  }

  // ======================================================
  // Store Enhancers
  // 改进仓库 - 开发工具扩展
  // ======================================================
  const enhancers = []
  if (__DEV__) {
    const devToolsExtension = window.devToolsExtension
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // 仓库实例化、HMR设置
  // ======================================================
  const store = createStore(makeRootReducer(), initialState, compose(applyMiddleware(...middleware), ...enhancers))
  store.asyncReducers = {}

  // 想要取消订阅，请随时调用`store.unsubscribeHistory()`
  // ReactRouter.browserHistory.listen 来监听url的变化
  store.unsubscribeHistory = browserHistory.listen(updateLocation(store))
  // 如果想要继续监听 注释下句代码
  // store.unsubscribeHistory();

  // 开发环境下的热加载
  // 在你的代码中插入热替换代码
  // 用于替换创建store的reducer，比如从页面A跳转到页面B后，仅仅需要替换reducer就可以让B页面使用所需的状态，在按需加载状态时候非常有用
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      // const reducers = require('./reducers').default
      // store.replaceReducer(reducers(store.asyncReducers))
      store.replaceReducer(makeRootReducer(store.asyncReducers))
    })
  }

  // console.log(`initialState: `, store.getState());
  return store
}
