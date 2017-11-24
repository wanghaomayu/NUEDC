/**
 * Created by out_xu on 17/8/1.
 */
import { API, request } from '../../../utils'

const fetchSelectOption = async () => request({
  url: API.schoolAcquireId,
  method: 'get',
  token: true
})

const fetchTable = async (data) => request({
  url: API.schoolProblem,
  method: 'get',
  token: true,
  data
})

const update = async (data) => request({
  url: API.schoolProblemUpdate,
  method: 'put',
  token: true,
  data
})

const fetchProblems = async (id) => request({
  url: API.schoolProblemList.replace(':id', id),
  method: 'get',
  token: true
})

const check = async (data, id) => request({
  url: API.schoolProblemCheck.replace(':id', id),
  method: 'post',
  token: true,
  data
})

export { check, fetchSelectOption, fetchTable, update, fetchProblems }