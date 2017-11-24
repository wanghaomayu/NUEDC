/**
 * Created by Pororo on 17/7/14.
 */
import JoinedTeamsModel from './model'
const JoinedTeamsManage = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./index'))
  })
}
export { JoinedTeamsManage, JoinedTeamsModel }
