/**
 * Created by Pororo on 17/7/17.
 */
import AdminInfoModel from './model'
const AdminInfo = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./index'))
  })
}
export { AdminInfo, AdminInfoModel }
