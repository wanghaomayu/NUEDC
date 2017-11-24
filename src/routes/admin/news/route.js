/**
 * Created by out_xu on 17/7/13.
 */
import AdminNewsModel from './model'
import NewsEditModel from './edit/model'
const AdminNews = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./index'))
  })
}

const NewsEdit = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./edit/index'))
  })
}

export { AdminNews, AdminNewsModel, NewsEdit, NewsEditModel }