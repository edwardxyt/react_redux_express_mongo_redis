import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './store/createStore'
import AppContainer from './containers/AppContainer'

// ========================================================
// Store Instantiation
// 仓库实例化
// ========================================================
const initialState = window.___INITIAL_STATE__

const store = createStore(initialState)

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')

let render = () => {
  // 获取路由对象
  const routes = require('./routes/index').default(store)

  ReactDOM.render(
    <AppContainer store={store} routes={routes} />,
    MOUNT_NODE
  )
}

// ========================================================
// Developer Tools Setup
// 页面加载时，弹窗 Developer Tools
// ========================================================
if (__DEV__) {
  if (window.devToolsExtension) {
    window.devToolsExtension.open()
  }
}

// This code is excluded from production bundle
// 此代码从生产包中排除
if (__DEV__ && module.hot) {
  // Development render functions
  const renderApp = render
  const renderError = (error) => {
    const RedBox = require('redbox-react').default

    ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
  }

  // 在try / catch中包装渲染
  render = () => {
    try {
      renderApp()
    } catch (error) {
      console.error(error)
      renderError(error)
    }
  }

  // 设置热模块更换
  // 在你的代码中插入热替换代码
  // setImmediate 方法 是在当前"任务队列"的尾部添加事件
  module.hot.accept('./routes/index', () =>
    setImmediate(() => {
      ReactDOM.unmountComponentAtNode(MOUNT_NODE)
      render()
    })
  )
}

// ========================================================
// Go!
// ========================================================
render()
