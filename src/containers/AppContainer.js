import React, { Component, PropTypes } from 'react'
import { applyRouterMiddleware, browserHistory, Router } from 'react-router'
import { useScroll } from 'react-router-scroll'
import { Provider } from 'react-redux'

class AppContainer extends Component {
  static propTypes = {
    routes : PropTypes.object.isRequired,
    store  : PropTypes.object.isRequired
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    const { routes, store } = this.props
    // console.log(`routes: `, routes);
    return (
      <Provider store={store}>
        <div className="AppContainer">
          <Router history={browserHistory} children={routes} render={applyRouterMiddleware(useScroll())} />
        </div>
      </Provider>
    )
  }
}

export default AppContainer
