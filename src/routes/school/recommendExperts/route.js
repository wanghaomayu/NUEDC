/**
 * Created by Pororo on 17/7/14.
 */
import RecommendExpertsModel from './model'
const RecommendExpertsManage = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./index'))
  })
}
export { RecommendExpertsManage, RecommendExpertsModel }
