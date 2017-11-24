/**
 * Created by raoul on 17-7-16.
 */
import StudentPage from './index'
import { StudentProblemManage, StudentProblemModel } from './problem/route'
import { StudentScoreManage, StudentScoreModel } from './score/route'
import { StudentSignUpManage, StudentSignUpModel } from './signup/route'
import { SchoolContestManage, SchoolContestModel } from './contest/route'
import { StudentInfo, StudentInfoModel } from './userInfo/route'
import { Guide } from './guide/route'
export {
  StudentPage,
  SchoolContestModel, SchoolContestManage,
  StudentProblemManage, StudentProblemModel,
  StudentScoreManage, StudentScoreModel,
  StudentSignUpManage, StudentSignUpModel,
  StudentInfo, StudentInfoModel,
  Guide
}
