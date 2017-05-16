import { injectReducer } from '../../store/reducers'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';


export default (store) => ({
  path: 'blog',
  breadcrumbName: "blog",
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Elapse = require('./containers/ElapseContainer').default
      const reducer = require('./modules/elapse').default
      injectReducer(store, { key: 'elapse', reducer })
      cb(null, Elapse)
      NProgress.done();
    })
  }
})
