/**
 * Created by out_xu on 17/7/14.
 */
import { API, request } from '../../../utils'

const fetchTable = async (data) => request({
  url: API.adminSchoolAdmins,
  method: 'get',
  token: true,
  data
})

const remove = async (id) => request({
  url: API.adminUserDelete.replace(':id', id),
  method: 'get',
  token: true
})

const update = async (data, id) => request({
  url: API.adminUserUpdate.replace(':id', id),
  method: 'post',
  token: true,
  data
})

const create = async (data) => request({
  url: API.adminSchoolAdminCreate,
  method: 'post',
  token: true,
  data
})

export { remove, update, create, fetchTable }
