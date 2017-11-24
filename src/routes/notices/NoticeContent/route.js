import NoticeContentModel from './model'
const NoticeContent = (nextState, callback) => {
  require.ensure([], () => {
    callback(null, require('./index'))
  })
}

export { NoticeContent, NoticeContentModel }
