/**
 * Created by out_xu on 17/7/13.
 */
import PrivilegeModel from './model'
const PrivilegeManage = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./index'))
  })
}
export { PrivilegeManage, PrivilegeModel }