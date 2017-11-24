/**
 * Created by out_xu on 17/7/13.
 */
import RecordingModel from './model'
const RecordingManage = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./index'))
  })
}
export { RecordingManage, RecordingModel }