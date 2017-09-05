// 我们只需要导入初始渲染所需的模块
// code-splitting
import CoreLayout from '../layouts/CoreLayout'
import Home from './Home'
import blog from './blog'
import CounterRoute from './Counter'
import ZenRoute from './Zen'
import ElapseRoute from './Elapse'
import RouteRoute from './Route'
import PageNotFound from './PageNotFound'
import Redirect from './PageNotFound/redirect'

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
NProgress.start();

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path: '/',
  breadcrumbName: "Home",
  component: CoreLayout,
  indexRoute: Home,
  childRoutes: [
    CounterRoute(store),
    blog(store),
    ZenRoute(store),
    ElapseRoute(store),
    RouteRoute(store),
    PageNotFound(),
    Redirect
  ]
})

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.

    const CourseRoute = {
      path: 'course/:courseId',

      getChildRoutes(location, callback) {
        require.ensure([], function (require) {
          callback(null, [
            require('./routes/Announcements'),
            require('./routes/Assignments'),
            require('./routes/Grades'),
          ])
        })
      },

      getIndexRoute(location, callback) {
        require.ensure([], function (require) {
          callback(null, {
            component: require('./components/Index')
          })
        })
      },

      getComponent(location, callback) {
        require.ensure([], function (require) {
          callback(null, require('./components/Course'))
        })
      }
    }
*/

export default createRoutes
