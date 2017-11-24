/**
 * Created by Pororo on 17/7/17.
 */
import StudentInfoModel from './model'
const StudentInfo = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./index'))
  })
}
export { StudentInfo, StudentInfoModel }
