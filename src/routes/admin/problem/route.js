/**
 * Created by out_xu on 17/7/13.
 */
import ProblemModel from './model'
const ProblemManage = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./index'))
  })
}
export { ProblemManage, ProblemModel }