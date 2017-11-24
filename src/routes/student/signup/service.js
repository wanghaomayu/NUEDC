/**
 * Created by out_xu on 17/7/14.
 */
import { API, request } from '../../../utils'
const signUpContest = async (data) => request({
  url: API.signUpContest,
  method: 'post',
  token: true,
  data
})
const getAllContest = async (data) => request({
  url: API.getAllContest,
  method: 'get',
  token: true
})
const getContestProblemList = async (id) => request({
  url: API.getContestProblemList.replace(':contestId', id),
  method: 'get',
  token: true
})
const getContestSignUpStatus = async (contestId) => request({
  // TODO: 竞赛ID的替换
  url: API.getContestSignUpStatus.replace(':contestId', contestId),
  method: 'get',
  token: true
})
const abandonContest = async (contestId) => request({
  url: API.abandonContest.replace(':contestId', contestId),
  method: 'get',
  token: true
})
const userSchools = async () => request({
  url: API.userSchools,
  method: 'get',
  token: false
})

export {getAllContest, signUpContest, userSchools, getContestSignUpStatus }