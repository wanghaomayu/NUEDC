/**
 * Created by out_xu on 17/7/16.
 */
import Login from './login'
const Register = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./register'))
  })
}
const Forget = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./forget'))
  })
}

export { Login, Register, Forget }