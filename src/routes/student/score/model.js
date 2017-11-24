import modelExtend from 'dva-model-extend'
import { getAllPassContest, getResult } from './service'
import { modalModel, tableModel } from '../../../models/modelExtend'
import { routerRedux } from 'dva/router'
export default modelExtend(modalModel, tableModel, {
  namespace: 'studentScore',
  state: {
    contest: []
  },
  subscriptions: {
    contestSubscriber ({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        const match = pathname === '/student/score'
        if (match) {
          dispatch({type: 'fetchTable', payload: query})
        }
      })
    }
  },
  effects: {
    * fetchTable ({payload}, {call, put, select}) {
      let {contest = [{}]} = yield select(({studentScore}) => studentScore)
      if (contest.length === 0) {
        const {data: allPassContest = {}} = yield call(getAllPassContest)
        contest = allPassContest.contestList || [{}]
        yield put({type: 'saveContest', payload: contest.reverse()})
      }
      const {contest_id: contestId} = payload
      if (contestId) {
        if (contestId === 'none') return
        let {data, code} = yield call(getResult, contestId)
        if (code === 0) {
          yield put({type: 'setTable', payload: data})
        } else {
          yield put({type: 'setTable', payload: []})
        }
      } else {
        yield put(routerRedux.push(`/student/score?contest_id=` + (contest[0].id || 'none')))
      }
    }
  },
  reducers: {
    onFormSubmit (state, {payload}) {
      return {
        ...state,
        form: payload
      }
    },
    saveContest (state, {payload}) {
      return {
        ...state,
        contest: payload
      }
    }
  }
})
