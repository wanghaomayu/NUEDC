/**
 * Created by out_xu on 17/7/14.
 */
/**
 * Created by out_xu on 17/7/14.
 */
import { API, request } from '../../../utils'

const fetchContest = async (data) => request({
  url: API.adminContests,
  method: 'get',
  token: true
})
const fetchTable = async (data) => request({
  url: API.adminProblems,
  method: 'get',
  token: true,
  data: data
})

const remove = async (id) => request({
  url: API.adminProblemRemove.replace(':id', id),
  method: 'delete',
  token: true,
})

const update = async (data, id) => request({
  url: API.adminProblemUpdate.replace(':id', id),
  method: 'put',
  token: true,
  data
})
const add = async (data) => request({
  url: API.adminProblemAdd,
  method: 'post',
  token: true,
  data
})

const preview = async (data) => request({
  url: API.viewPrivateFile,
  method: 'get',
  token: true,
  data
})

export { remove, update, add, fetchTable, preview, fetchContest }