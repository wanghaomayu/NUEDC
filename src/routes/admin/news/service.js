/**
 * Created by out_xu on 17/7/14.
 */
import { API, request } from '../../../utils'

const fetchTable = async (data) => request({
  url: API.adminMessage,
  method: 'get',
  token: true,
  data
})

const remove = async (data,id) => request({
  url: API.newsDelete.replace(':id', id),
  method: 'delete',
  token: true,
  data: data
})

const update = async (data, id) => request({
  url: API.adminContestRecordUpdate.replace(':id', id),
  method: 'post',
  token: true,
  data
})

export { remove, update, fetchTable }
