import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {browserHistory, Router} from 'react-router'
import {Provider} from 'react-redux'

class AppContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static propTypes = {
    routes: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    const {routes, store} = this.props
    // console.log(`routes: `, routes);
    return (
      <Provider store={store}>
        <div className="AppContainer">
          <Router history={browserHistory} children={routes}/>
        </div>
      </Provider>
    )
  }
}

export default AppContainer
