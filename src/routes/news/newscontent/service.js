/**
 * Created by Pororo on 17/7/19.
 */
import { API, request } from '../../../utils'

const fetchPassage = async (data) => request({
  url: API.newsPassage,
  method: 'get',
  data
})

export { fetchPassage }
