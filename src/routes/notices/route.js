import NoticeModel from './model'
import { NoticeContent, NoticeContentModel } from './NoticeContent/route'
const Notice = (nextState, callback) => {
  require.ensure([], () => {
    callback(null, require('./index'))
  })
}

export { Notice, NoticeModel, NoticeContent, NoticeContentModel }
