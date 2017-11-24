/**
 * Created by out_xu on 17/7/14.
 */
import { API, request } from '../../../utils'

const fetchTable = async (data) => request({
  url: API.adminContests,
  method: 'get',
  token: true
})

const remove = async (data, id) => request({
  url: API.adminContestDelete.replace(':id', id),
  method: 'post',
  token: true,
  data
})

const update = async (data, id) => request({
  url: API.adminContestUpdate.replace(':id', id),
  method: 'post',
  token: true,
  data
})

const create = async (data) => request({
  url: API.adminContestCreate,
  method: 'post',
  token: true,
  data
})

const resultCheck = async (data, id) => request({
  url: API.adminContestResultCheck.replace(':id', id),
  method: 'post',
  token: true,
  data
})

export { remove, update, create, fetchTable, resultCheck }