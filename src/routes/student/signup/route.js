/**
 * Created by out_xu on 17/7/13.
 */
import StudentSignUpModel from './model'
const StudentSignUpManage = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./index'))
  })
}
export { StudentSignUpManage, StudentSignUpModel }