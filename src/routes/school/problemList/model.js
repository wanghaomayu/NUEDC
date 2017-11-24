import modelExtend from 'dva-model-extend'
import { modalModel, tableModel } from '../../../models/modelExtend'
import { API, sleep, urlEncode } from '../../../utils'
import { fetchTable, update } from './service'

import { message } from 'antd'
import { routerRedux } from 'dva/router'
export default modelExtend(tableModel, modalModel, {
  namespace: 'schoolProblemList',
  state: {
    problemSelectInfo: {},
    tablePass: [],
    contestSelectInfo: {}
  },
  subscriptions: {
    problemSubscriber ({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/school/problemList') {
          dispatch({type: 'fetchTable', payload: query})
        }
      })
    }
  },
  effects: {
    * fetchTable ({payload}, {call, put, select}) {
      const {contest_id = ''} = payload
      let {tableSignUp: contest} = yield select(({studentContest}) => studentContest)
      if (!contest_id) {
        if (contest.length === 0) {
          yield call(sleep, 1000)
          let {tableSignUp: contestNow} = yield select(({studentContest}) => studentContest)
          contest = contestNow
        }
        const preId = contest[0] || {id: 'none'}
        yield call(sleep, 10)
        yield put(routerRedux.push(`/student/problem?contest_id=` + preId.id))
      } else {
        if (contest_id === 'none') return
        const {code = '', data: {problemList = [], problemSelectInfo = {}}} = yield call(fetchTable, contest_id)
        if (code === 0) {
          const table = problemList.map((item, i) => ({
            ...item,
            fakeId: i + 1
          }))
          let info = problemSelectInfo
          if (problemSelectInfo.problemId === -1) {
            info = {
              ...info,
              title: '未选题'
            }
          } else {
            yield call(sleep, 1000)
            let {tableSignUp: contestNow} = yield select(({studentContest}) => studentContest)
            contest = contestNow
            let indexArr = contest.map((item) => item.id)
            let index = indexArr.indexOf(+contest_id)
            info = {
              ...info,
              ...contest[index]
            }

            indexArr = table.map(item => item.id)
            index = indexArr.indexOf(+contest_id)
            info = {
              ...info,
              ...table[index]
            }
          }
          yield put({type: 'setTable', payload: table})
          yield put({type: 'setInfo', payload: info})
        } else {
          yield put({type: 'setTable', payload: []})
          yield put({type: 'setInfo', payload: {}})
        }
      }
    },
    * preview ({payload}, {put, call}) {
      const params = {
        token: window.localStorage.getItem('nuedcToken')
      }
      let url = API.getContestProblemFile.replace(':id', payload.id) + '?' + urlEncode(params)
      let a = document.createElement('a')
      a.href = url
      a.target = '_blank'
      a.click()
    },
    * download ({payload}, {put, call}) {
      const params = {
        token: window.localStorage.getItem('nuedcToken'),
        download: 1
      }
      let url = API.getContestProblemFile.replace(':id', payload.id) + '?' + urlEncode(params)
      let a = document.createElement('a')
      a.href = url
      a.target = '_blank'
      a.click()
    },
    * edit ({payload}, {call, put}) {
      const {body, query} = payload
      const data = yield call(update, body)
      if (data.code === 0) {
        yield put({type: 'studentContest/fetchTableSignUp'})
        yield put({type: 'studentContest/fetchTablePass'})
        message.success('选题成功')
        yield put({type: 'hideModal'})
        yield put({type: 'fetchTable', payload: query})

      }
    }
  },
  reducers: {
    setInfo (state, {payload: problemSelectInfo}) {
      return {
        ...state,
        problemSelectInfo
      }
    },
    setContestSelectInfo (state, {payload: contestSelectInfo}) {
      return {
        ...state,
        contestSelectInfo
      }
    },
    setTablePass(state, {payload: tablePass}) {
      return {
        ...state,
        tablePass
      }
    },
  }
})
