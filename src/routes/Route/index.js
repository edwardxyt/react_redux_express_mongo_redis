export default (store) => ({
  path: 'route/:id',
  breadcrumbName: "Route",
  getComponent (nextState, cb) {
    console.log(nextState);
    require.ensure([], (require) => {
      const Route = require('./components/Route').default
      cb(null, Route)
    })
  }
})
