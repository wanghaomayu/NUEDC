export default (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./index'))
  })
}
