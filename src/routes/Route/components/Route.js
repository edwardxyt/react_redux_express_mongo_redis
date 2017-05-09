import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link, withRouter} from 'react-router'

class Route extends Component {

  constructor(props) {
    super(props)
    this.redirect = this.redirect.bind(this)
  }

  redirect() {
    this.props.router.push('/form')
  }

  render() {
    const {location} = this.props

    return (
      <div>
        <h1>
          Path:
          <Link to='/form'>{location.pathname}</Link>
        </h1>
        <div>
          <button onClick={this.redirect}>Go</button>
        </div>
      </div>
    )
  }
}

Route.propTypes = {
  location: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired
}

// 在2.4.0版本之前，router对象通过this.context进行传递，不过这种方式往往会引起莫名的错误。
// 因此在2.4.0版本之后推荐的是采取所谓的HOC模式进行router对象的访问。
// React Router也提供了一个withRouter函数来方便进行封装。
export default withRouter(Route)
