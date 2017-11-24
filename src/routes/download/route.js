import DownloadModel from './model'
const Download = (nextState, callback) => {
  require.ensure([], () => {
    callback(null, require('./index'))
  })
}

export { Download, DownloadModel}
