import modelExtend from 'dva-model-extend'
import { signUpContest, userSchools } from './service'
import { modalModel, tableModel } from '../../../models/modelExtend'
import { message } from 'antd'
import { routerRedux } from 'dva/router'

export default modelExtend(modalModel, tableModel, {
  namespace: 'studentSignUp',
  state: {
    input: '',
    info: '',
    userSchools: ''
  },
  subscriptions: {
    contestSubscriber ({dispatch, history}) {
      return history.listen(({pathname}) => {
        const match = pathname === `/student/signup`
        if (match) {
          dispatch({type: 'getUserSchool'})
        }
      })
    }
  },
  effects: {
    * getUserSchool ({}, {call, put}) {
      const data = yield call(userSchools)
      if (data.code === 0) {
        yield put({type: 'schools', payload: data.data.schools})
      } else {
        yield put({type: 'schools', payload: []})
      }
    },
    * signUpContest ({payload}, {call, put}) {
      const data = yield call(signUpContest, payload)
      if (data.code === 0) {
        message.success('报名成功，请等待审核')
        yield put({type: 'onFormSubmit', payload: payload})
        yield put(routerRedux.push(`/student`))
        yield put({type: 'studentContest/fetchTableSignUp'})
      }
    }
  },
  reducers: {
    schools (state, {payload}) {
      return {
        ...state,
        schools: payload
      }
    },
    studentInfo (state, {payload}) {
      return {
        ...state,
        info: payload
      }
    },
    onFormSubmit (state, {payload}) {
      return {
        ...state,
        form: payload
      }
    },
    onFilter (state, {payload}) {
      return {
        ...state,
        contestsId: payload
      }
    },
    saveFilter (state, {payload}) {
      return {
        ...state,
        contest: payload
      }
    }
  }
})
