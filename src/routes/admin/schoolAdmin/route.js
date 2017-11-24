/**
 * Created by out_xu on 17/7/13.
 */
import SchoolAdminModel from './model'
const SchoolAdminManage = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./index'))
  })
}
export { SchoolAdminManage, SchoolAdminModel }/**
 * Created by out_xu on 17/7/20.
 */
