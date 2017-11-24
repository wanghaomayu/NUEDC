import NewsModel from './model'
import { NewsContent, NewsContentModel } from './newscontent/route'
const News = (nextState, callback) => {
  require.ensure([], () => {
    callback(null, require('./index'))
  })
}

export { News, NewsModel, NewsContent, NewsContentModel }
