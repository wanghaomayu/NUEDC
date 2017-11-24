import { API, request } from '../../utils/index'

const fetchPassagesAll = async (data) => request({
  url: API.newsMessageAll,
  method: 'get',
  data
})

export { fetchPassagesAll }
