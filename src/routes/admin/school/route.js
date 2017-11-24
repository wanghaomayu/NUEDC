/**
 * Created by out_xu on 17/7/13.
 */
import SchoolModel from './model'
const SchoolManage = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./index'))
  })
}
export { SchoolManage, SchoolModel }