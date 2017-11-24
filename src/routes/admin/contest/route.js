/**
 * Created by out_xu on 17/7/13.
 */
import ContestModel from './model'
const ContestManage = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./index'))
  })
}
export { ContestManage, ContestModel }