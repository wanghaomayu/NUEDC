/**
 * Created by out_xu on 17/7/13.
 */
import ContestRecordModel from './model'
const ContestRecord = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./index'))
  })
}
export { ContestRecord, ContestRecordModel }