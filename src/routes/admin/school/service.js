/**
 * Created by out_xu on 17/7/14.
 */
import { API, request } from '../../../utils'

const fetchTable = async (data) => request({
  url: API.adminSchools,
  method: 'get',
  token: true,
  data
})

const downloadExcel = async ({filename}) => request({
  url: API.adminSchoolTemp,
  method: 'export',
  token: true,
  filename
})

const remove = async (id) => request({
  url: API.adminSchoolDelete.replace(':id', id),
  method: 'get',
  token: true
})

const update = async (data, id) => request({
  url: API.adminSchoolUpdate.replace(':id', id),
  method: 'post',
  token: true,
  data
})

const create = async (data) => request({
  url: API.adminSchoolCreate,
  method: 'post',
  token: true,
  data
})

export { remove, update, create, fetchTable,downloadExcel }
