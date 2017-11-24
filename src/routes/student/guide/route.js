/**
 * Created by out_xu on 17/7/13.
 */
// import SchoolContestModel from './model'
const Guide = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./index'))
  })
}
export { Guide}