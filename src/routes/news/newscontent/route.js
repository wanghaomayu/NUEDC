/**
 * Created by Pororo on 17/7/11.
 */
import NewsContentModel from './model'
const NewsContent = (nextState, callback) => {
  require.ensure([], () => {
    callback(null, require('./index'))
  })
}

export { NewsContent, NewsContentModel }
