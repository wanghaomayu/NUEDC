/**
 * Created by out_xu on 17/7/7.
 */
import enquire from 'enquire.js'

export default cb => {
  /* eslint-disable no-unused-expressions */
  // and (min-width: 320px)
  enquire.register('only screen and (max-width: 767px)', {
    match: () => {
      cb && cb(true)
    },
    unmatch: () => {
      cb && cb()
    },
  })
  /* eslint-enable no-unused-expressions */
}
