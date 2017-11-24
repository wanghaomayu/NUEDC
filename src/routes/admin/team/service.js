/**
 * Created by out_xu on 17/7/14.
 */
import { API, request } from '../../../utils'

const remove = async (id) => request({
  url: API.adminContestRecordDelete.replace(':id', id),
  method: 'get',
  token: true
})

const update = async (data, id) => request({
  url: API.adminContestRecordUpdate.replace(':id', id),
  method: 'post',
  token: true,
  data
})

const auditAll = async (data) => request({
  url: API.adminContestRecordsUpdate,
  method: 'post',
  token: true,
  data
})
export { remove, update, auditAll }
