import React, {Component} from 'react'
import PropTypes from 'prop-types'
import NotFoundImage from '../assets/404.jpg'
import classes from './PageNotFound.scss'
import {withRouter} from 'react-router'

class PageNotFound extends Component {
  render() {
    const props = this.props
    return (
      <div className={classes.container}>
        <h1>Page not found!!!</h1>
        <h3>
          <a className={classes.link} onClick={props.router.goBack}>Back</a>
        </h3>
        <img src={NotFoundImage}/>
      </div>
    )
  }
}

PageNotFound.propTypes = {
  router: PropTypes.object.isRequired
}

// 在2.4.0版本之前，router对象通过this.context进行传递，不过这种方式往往会引起莫名的错误。
// 因此在2.4.0版本之后推荐的是采取所谓的HOC模式进行router对象的访问。
// React Router也提供了一个withRouter函数来方便进行封装。
export default withRouter(PageNotFound)
