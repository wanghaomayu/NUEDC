/**
 * Created by out_xu on 17/7/13.
 */
import TeamAdminModel from './model'
const TeamAdminManage = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./index'))
  })
}
export { TeamAdminManage, TeamAdminModel }