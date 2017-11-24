/**
 * Created by out_xu on 17/7/14.
 */
import { API, request, urlEncode } from '../../../utils'

const fetchJoinedTable = async (data) => request({
  url: API.schoolJoinedTeams,
  method: 'get',
  token: true,
  data
})

const fetchSelectOption = async () => request({
  url: API.schoolAcquireId,
  method: 'get',
  token: true
})

const joinedExcelOut = async ({filename}, data) => request({
  url: API.schoolJoinedExcelOut + urlEncode({...data}),
  method: 'export',
  token: true,
  filename
})

const remove = async (data) => request({
  url: API.schoolDeleteTeam + data,
  method: 'delete',
  token: true
})

const update = async (data, id) => request({
  url: API.schoolUpdateTeamInfo + id,
  method: 'put',
  token: true,
  data: data
})

const audit = async (data, id) => request({
  url: API.schoolCheckTeam.replace(':id', id),
  method: 'put',
  token: true,
  data: data
})

const add = async (data) => request({
  url: API.schoolAddTeam,
  method: 'post',
  token: true,
  data
})

const allChecked = async (data) => request({
  url: API.schoolChecked,
  method: 'put',
  token: true,
  data
})

const downloadExcel = async ({filename}) => request({
  url: API.schoolImportTeamsExcel,
  method: 'export',
  token: true,
  filename
})

export { remove, update, add, fetchJoinedTable, audit, joinedExcelOut, fetchSelectOption, allChecked, downloadExcel }
