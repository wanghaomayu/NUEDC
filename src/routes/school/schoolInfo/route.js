/**
 * Created by Pororo on 17/7/17.
 */
import SchoolInfoModel from './model'
const SchoolInfoManage = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./index'))
  })
}
export { SchoolInfoManage, SchoolInfoModel }
