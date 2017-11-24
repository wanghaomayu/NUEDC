import modelExtend from 'dva-model-extend'
import { modalModel, tableModel } from '../../../models/modelExtend'
import { message } from 'antd'
import { API, sleep, urlEncode } from '../../../utils'
import { routerRedux } from 'dva/router'
import { add, fetchTable, remove, update } from './service'
export default modelExtend(tableModel, modalModel, {
  namespace: 'adminProblems',
  state: {},
  subscriptions: {
    problemSubscriber ({dispatch, history}) {
      return history.listen(({pathname, query = {}}) => {
        if (pathname === '/admin/problem') {
          dispatch({type: 'fetchTable', payload: query})
        }
      })
    }
  },
  effects: {
    * fetchTable({payload}, {call, put, select}) {
      const {contest_id} = payload
      if (!contest_id) {
        let {table: contest = [{}]} = yield select(({contest}) => contest)
        if (contest.length === 0) {
          yield call(sleep, 1000)
          let {table: contestNow} = yield select(({contest}) => contest)
          contest = contestNow
        }
        const preId = contest[0] || {id: 'none'}
        yield call(sleep, 10)
        yield put(routerRedux.push(`/admin/problem?contest_id=` + preId.id))
      } else {
        if (contest_id === 'none') return
        const {code, data: {problems}} = yield call(fetchTable, payload)
        if (code === 0) {
          const table = problems.reverse().map((item, i) => ({
            ...item,
            fakeId: i + 1
          }))
          yield put({type: 'setTable', payload: table})
        } else {
          yield put({type: 'setTable', payload: []})
        }
      }
    },
    * add ({payload}, {call, put}) {
      const {body, query} = payload
      const data = yield call(add, body)
      if (data.code === 0) {
        message.success('添加成功')
        yield put({type: 'hideModal'})
        yield put({type: 'fetchTable', payload: query})
      }
    },
    * edit ({payload}, {call, put, select}) {
      const {body, query} = payload
      const {modalContent: {id = ''}} = yield select(({adminProblems}) => adminProblems)
      const data = yield call(update, body, id)
      if (data.code === 0) {
        message.success('修改成功')
        yield put({type: 'hideModal'})
        yield put({type: 'fetchTable', payload: query})
      }
    },
    * delete ({payload}, {put, call}) {
      const {record: {id}, query} = payload
      const data = yield call(remove, id)
      if (data.code === 0) {
        message.success('删除成功')
        yield put({type: 'fetchTable', payload: query})
      }
    },
    * preview ({payload}, {put, call}) {
      const params = {
        path: payload.attach_path,
        token: window.localStorage.getItem('nuedcToken')
      }
      let url = API.viewPrivateFile + '?' + urlEncode(params)
      let a = document.createElement('a')
      a.href = url
      a.target = '_blank'
      a.click()
    },
    * download ({payload}, {put, call}) {
      const params = {
        path: payload.attach_path,
        token: window.localStorage.getItem('nuedcToken'),
        download: 1
      }
      let url = API.viewPrivateFile + '?' + urlEncode(params)
      let a = document.createElement('a')
      a.href = url
      a.target = '_blank'
      a.click()
    }
  },
  reducers: {}
})
