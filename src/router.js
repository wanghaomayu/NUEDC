import React from 'react'
import { IndexRoute, Route, Router } from 'dva/router'
import { message } from 'antd'
import App from './routes/app'
import NotFound from './routes/404'

import { Forget, Login, Register } from './routes/user/routes'
import {
  AdminInfo,
  AdminInfoModel,
  AdminNews,
  AdminNewsModel,
  AdminPage,
  ContestManage,
  ContestModel,
  ContestRecord,
  ContestRecordModel,
  GuideAdmin,
  NewsEdit,
  NewsEditModel,
  PrivilegeManage,
  PrivilegeModel,
  ProblemManage,
  ProblemModel,
  RecordingManage,
  RecordingModel,
  SchoolAdminManage,
  SchoolAdminModel,
  SchoolManage,
  SchoolModel,
  TeamAdminManage,
  TeamAdminModel
} from './routes/admin/routes'
import {
  GuideSchool,
  JoinedTeamsManage,
  JoinedTeamsModel,
  SchoolInfoManage,
  SchoolInfoModel,
  SchoolPage,
  SchoolPageModel,
  SchoolProblem,
  SchoolProblemList,
  SchoolProblemsModel,
  SchoolResultManage,
  SchoolResultModel
} from './routes/school/routes'
import {
  Guide,
  SchoolContestManage,
  SchoolContestModel,
  StudentInfo,
  StudentInfoModel,
  StudentPage,
  StudentProblemManage,
  StudentProblemModel,
  StudentScoreManage,
  StudentScoreModel,
  StudentSignUpManage,
  StudentSignUpModel
} from './routes/student/routes'

import Home from './routes/home/route'
import { News, NewsContent, NewsContentModel, NewsModel } from './routes/news/route'
import { Notice, NoticeContent, NoticeContentModel, NoticeModel } from './routes/notices/route'
import { Download, DownloadModel } from './routes/download/route'

const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}

const checkAuth = (nextState, replace) => {
  const userRole = window.localStorage.getItem('nuedcRole')
  const {routes = []} = nextState
  if (userRole !== routes[1].path) {
    message.error('权限不足')
    replace({pathname: '/'})
    return false
  }
}

const checkLogin = (nextState, replace) => {
  const token = window.localStorage.getItem('nuedcToken') || ''
  const userRole = window.localStorage.getItem('nuedcRole')
  if (token.length > 3) {
    replace({pathname: '/' + userRole})
  }
}

const Routers = ({history, app}) => {
  return (
    <Router history={history}>
      <Route path='/' component={App}>
        <IndexRoute getComponent={Home} />
        <Route path='home' getComponent={Home} />
        <Route path='download' getComponent={Download} onEnter={() => registerModel(app, DownloadModel)}>
          {/*<Route path=':id' getComponent={DownloadContent} onEnter={() => registerModel(app, DownloadContentModel)}/>*/}
        </Route>
        <Route path='news' getComponent={News} onEnter={() => registerModel(app, NewsModel)}>
          <Route path=':id' getComponent={NewsContent} onEnter={() => registerModel(app, NewsContentModel)} />
        </Route>
        <Route path='notices' getComponent={Notice} onEnter={() => registerModel(app, NoticeModel)}>
          <Route path=':id' getComponent={NoticeContent} onEnter={() => registerModel(app, NoticeContentModel)} />
        </Route>
        <Route path='login' component={Login} onEnter={(nextState, replace) => {
          checkLogin(nextState, replace)
        }} />
        <Route path='register' getComponent={Register} onEnter={(nextState, replace) => {
          checkLogin(nextState, replace)
        }} />
        <Route path='forget' getComponent={Forget} onEnter={(nextState, replace) => {
          checkLogin(nextState, replace)
        }} />
        <Route path='admin' component={AdminPage} onEnter={(nextState, replace) => {
          checkAuth(nextState, replace)
          registerModel(app, ContestModel)
        }}
        >
          <IndexRoute getComponent={ContestManage} />
          <Route
            path='contest' getComponent={ContestManage}
          />
          <Route
            path='problem' getComponent={ProblemManage}
            onEnter={() => {
              registerModel(app, ProblemModel)
            }}
          />
          <Route
            path='school' getComponent={SchoolManage}
            onEnter={() => {
              registerModel(app, SchoolModel)
              registerModel(app, SchoolAdminModel)
            }}
          />
          <Route
            path='team' getComponent={TeamAdminManage}
            onEnter={() => {
              registerModel(app, ContestRecordModel)
              registerModel(app, TeamAdminModel)
            }}
          />
          <Route
            path='schoolAdmin' getComponent={SchoolAdminManage}
            onEnter={() => registerModel(app, SchoolAdminModel)}
          />
          <Route
            path='contestRecord' getComponent={ContestRecord}
            onEnter={() => {
              registerModel(app, ContestRecordModel)
            }}
          />
          <Route
            path='recording' getComponent={RecordingManage}
            onEnter={() => {
              registerModel(app, ContestRecordModel)
              registerModel(app, RecordingModel)
            }}
          />
          <Route
            path='privilege' getComponent={PrivilegeManage}
            onEnter={() => registerModel(app, PrivilegeModel)}
          />
          <Route
            path='news' getComponent={AdminNews}
            onEnter={() => registerModel(app, AdminNewsModel)}
          />
          <Route
            path='news/edit' getComponent={NewsEdit}
            onEnter={() => registerModel(app, NewsEditModel)}
          />
          <Route
            path='notices' getComponent={AdminNews}
            onEnter={() => registerModel(app, AdminNewsModel)}
          />
          <Route
            path='notices/edit' getComponent={NewsEdit}
            onEnter={() => registerModel(app, NewsEditModel)}
          />
          <Route path='guide' getComponent={GuideAdmin}
            onEnter={() => {}}
          />
          <Route path='password' getComponent={AdminInfo}
            onEnter={() => {
              registerModel(app, AdminInfoModel)
            }}
          />
        </Route>
        <Route path='student' component={StudentPage} onEnter={(nextState, replace) => {
          checkAuth(nextState, replace)
          registerModel(app, SchoolContestModel)
        }}
        >
          <IndexRoute getComponent={SchoolContestManage} />

          <Route
            path='problem' getComponent={StudentProblemManage}
            onEnter={() => {
              registerModel(app, SchoolContestModel)
              registerModel(app, StudentProblemModel)
            }}
          />
          <Route
            path='studentInfo' getComponent={StudentInfo}
            onEnter={() => registerModel(app, StudentInfoModel)}
          />
          <Route path='score' getComponent={StudentScoreManage}
            onEnter={() => {
              registerModel(app, StudentScoreModel)
            }}
          />
          <Route path='signup' getComponent={StudentSignUpManage}
            onEnter={() => {
              registerModel(app, StudentSignUpModel)
            }}
          />
          <Route path='guide' getComponent={Guide}
            onEnter={() => {}}
          />
        </Route>
        <Route path='school' component={SchoolPage} onEnter={(nextState, replace) => {
          checkAuth(nextState, replace)
          registerModel(app, SchoolPageModel)
        }}>
          <IndexRoute getComponent={SchoolInfoManage} onEnter={() => registerModel(app, SchoolInfoModel)} />
          <Route
            path='schoolInfo' getComponent={SchoolInfoManage}
            onEnter={() => registerModel(app, SchoolInfoModel)}
          />
          <Route
            path='joinedTeams' getComponent={JoinedTeamsManage}
            onEnter={() => registerModel(app, JoinedTeamsModel)}
          />
          <Route
            path='schoolResult' getComponent={SchoolResultManage}
            onEnter={() => registerModel(app, SchoolResultModel)}
          />
          <Route
            path='problem' getComponent={SchoolProblem}
            onEnter={() => {
              registerModel(app, SchoolProblemsModel)
            }}
          />
          <Route
            path='problemList' getComponent={SchoolProblemList}
            onEnter={() => {
              registerModel(app, SchoolProblemsModel)
            }}
          />
          <Route path='guide' getComponent={GuideSchool}
            onEnter={() => {}}
          />
        </Route>
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  )
}

export default Routers
