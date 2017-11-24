/**
 * Created by Pororo on 17/7/17.
 */
import { API, request } from '../../../utils'

const changePassword = async (data) => request({
  url: API.changePassword,
  method: 'post',
  token: true,
  data
})

export { changePassword }
