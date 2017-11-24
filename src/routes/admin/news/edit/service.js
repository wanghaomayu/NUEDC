/**
 * Created by out_xu on 17/7/14.
 */
import { API, request } from '../../../../utils'

const fetchMessage = async (data) => request({
  url: API.newsPassage,
  method: 'get',
  token: true,
  data
})

const remove = async (id) => request({
  url: API.adminContestRecordDelete.replace(':id', id),
  method: 'get',
  token: true
})

const create = async (data) => request({
  url: API.newsCreate,
  method: 'post',
  token: true,
  data
})

const update = async (data, id) => request({
  url: API.newsUpdate.replace(':id', id),
  method: 'put',
  token: true,
  data
})

export { remove, update, fetchMessage, create }
