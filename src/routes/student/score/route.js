/**
 * Created by out_xu on 17/7/13.
 */
import StudentScoreModel from './model'
const StudentScoreManage = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./index'))
  })
}
export { StudentScoreManage, StudentScoreModel }