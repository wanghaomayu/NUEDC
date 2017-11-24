/**
 * Created by out_xu on 17/7/13.
 */
import StudentProblemModel from './model'
const StudentProblemManage = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./index'))
  })
}
export { StudentProblemManage, StudentProblemModel }