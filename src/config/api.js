import config from './app.json'

const {baseURL} = config

const apiMaker = path => `${baseURL}/${path}`

export default {

  host: apiMaker(''),
  changePassword: apiMaker('user/updatePassword'),
  updateUserInfo: apiMaker('user/update/info'),
  // student
  login: apiMaker('user/login'),
  logout: apiMaker('user/logout'),
  findPassword: apiMaker('user/password/forget'),
  tokenVerify: apiMaker('verify-token'),
  register: apiMaker('user/register'),
  getVerifyCode: apiMaker('user/verifyCode'),
  getResult: apiMaker('user/:contestId/getResult'),
  preRegister: apiMaker('user/preRegister'),
  deleteCompetition: apiMaker(''),
  signUpContest: apiMaker('user/signUpContest'),
  getSchoolAdmins: apiMaker('user/getSchoolAdmins'),
  getAllContest: apiMaker('user/getAllContest'),
  getContestProblemList: apiMaker('user/:id/getContestProblemList'),
  getContestProblemDetail: apiMaker('user/getContestProblemDetail'),
  getContestProblemFile: apiMaker('user/problem/:id/attachment'),
  updateContestProblemSelect: apiMaker('user/updateContestProblemSelect'),
  getContestSignUpStatus: apiMaker('user/:contestId/getContestSignUpStatus'),
  abandonContest: apiMaker('user/:contestId/abandonContest'),
  getAllPassContest: apiMaker('user/getAllPassContest'),
  userSchools: apiMaker('user/schools'),
  signedUpContests: apiMaker('user/getSignedUpContest'),
  // school
  schoolLogin: apiMaker('school/admin/login'),
  schoolJoinedTeams: apiMaker('school/team/info'),
  schoolAddTeam: apiMaker('school/team/add'),
  schoolResult: apiMaker('school/team/awards'),
  schoolUpdateTeamInfo: apiMaker('school/team/update/'),
  schoolDeleteTeam: apiMaker('school/team/delete/'),
  schoolCheckTeam: apiMaker('school/team/check/:id'),
  schoolJoinedExcelOut: apiMaker('school/admin/team/export?'),
  schoolResultExcelOut: apiMaker('school/admin/result/export?'),
  schoolAcquireId: apiMaker('school/admin/contest'),
  schoolChecked: apiMaker('school/team/mult-check'),
  schoolImportTeamsExcel: apiMaker('school/admin/team/getImportTemplate'),
  schoolUploadExcel: apiMaker('school/admin/team/import/:id'),
  schoolProblem: apiMaker('school/team/problems'),
  schoolProblemUpdate: apiMaker('school/admin/team/problem/select'),
  schoolProblemCheck: apiMaker('school/admin/contest/:id/submit/check'),
  schoolProblemList: apiMaker('school/admin/problem-list/:id'),
  // admin
  adminLogin: apiMaker('sysadmin/login'),

  adminContests: apiMaker('sysadmin/contests'),
  adminContestCreate: apiMaker('sysadmin/contest/create'),
  adminContestUpdate: apiMaker('sysadmin/contest/:id/update'),
  adminContestDelete: apiMaker('sysadmin/contest/:id/delete'),
  adminContestResultCheck: apiMaker('sysadmin/contest/:id/result/check'),

  adminSchools: apiMaker('sysadmin/schools'),
  adminSchoolCreate: apiMaker('sysadmin/school/create'),
  adminSchoolUpdate: apiMaker('sysadmin/school/:id/update'),
  adminSchoolDelete: apiMaker('sysadmin/school/:id/delete'),
  adminSchoolTemp: apiMaker('sysadmin/getSchoolListTemplateFile'),
  adminSchoolImport: apiMaker('sysadmin/school/import'),

  adminSchoolAdmins: apiMaker('sysadmin/school-admins'),
  adminSchoolAdminCreate: apiMaker('sysadmin/school-admin/create'),
  adminUserUpdate: apiMaker('sysadmin/user/:id/update'),
  adminUserDelete: apiMaker('sysadmin/user/:id/delete'),

  adminContestRecords: apiMaker('sysadmin/contest-records'),
  adminContestRecordUpdate: apiMaker('sysadmin/contest-records/:id/update'),
  adminContestRecordsUpdate: apiMaker('sysadmin/contest-record/update'),
  adminContestRecordDelete: apiMaker('sysadmin/contest-record/delete'),
  adminContestRecordExcel: apiMaker('sysadmin/contest-record/export'),
  adminContestRecordExcelAll: apiMaker('sysadmin/contest-record/export/all'),
  adminContestRecordExcelImport: apiMaker('sysadmin/contest-record/import'),
  adminResultsUpdate: apiMaker('sysadmin/results/update'),

  adminProblems: apiMaker('sysadmin/problem/info'),
  adminProblemAdd: apiMaker('sysadmin/problem/add'),
  adminProblemUpdate: apiMaker('sysadmin/problem/update/:id'),
  adminProblemRemove: apiMaker('sysadmin/problem/delete/:id'),
  uploadPrivateFile: apiMaker('file/private/upload'),
  viewPrivateFile: apiMaker('file/private/get'),

  adminMessage: apiMaker('sysadmin/message/all'),
  // news
  newsMessageAll: apiMaker('sysadmin/message/all'),
  newsPassage: apiMaker('sysadmin/message/info'),
  newsUpdate: apiMaker('sysadmin/message/update/:id'),
  newsCreate: apiMaker('sysadmin/message/add'),
  newsDelete: apiMaker('sysadmin/message/delete/:id'),
  filePublic: apiMaker('file/public/upload')
}
