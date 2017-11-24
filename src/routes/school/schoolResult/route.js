/**
 * Created by Pororo on 17/7/14.
 */
import SchoolResultModel from './model'
const SchoolResultManage = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./index'))
  })
}
export { SchoolResultManage, SchoolResultModel }
