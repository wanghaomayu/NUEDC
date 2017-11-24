/**
 * Created by out_xu on 17/7/14.
 */
import { API, request } from '../../../utils'

const userSchools = async () => request({
  url: API.userSchools,
  method: 'get',
  token: false
})
const getAllPassContest = async () => request({
  url: API.getAllPassContest,
  method: 'get',
  token: true
})
const getResult = async (contestId) => request({
  url: API.getResult.replace(':contestId', contestId),
  method: 'get',
  token: true
})
export { getAllPassContest, userSchools, getResult }