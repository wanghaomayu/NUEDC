/**
 * Created by Pororo on 17/7/19.
 */
import { API, request } from '../../utils/index'

const fetchPassagesAll = async (data) => request({
  url: API.newsMessageAll,
  method: 'get',
  data
})

export { fetchPassagesAll }
