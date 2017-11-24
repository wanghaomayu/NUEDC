/**
 * Created by out_xu on 17/7/13.
 */
import SchoolProblemListModel from './model'
const SchoolProblemList = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./index'))
  })
}
export { SchoolProblemList, SchoolProblemListModel }