import modelExtend from 'dva-model-extend'
import { create, fetchTable, remove, resultCheck, update } from './service'
import { alertModel, inputModel, modalModel, tableModel } from '../../../models/modelExtend'
import pathToRegexp from 'path-to-regexp'

import { message } from 'antd'
export default modelExtend(modalModel, tableModel, alertModel, inputModel, {
  namespace: 'contest',
  state: {
    contestId: '',
    query: {}
  },
  subscriptions: {
    contestSubscriber ({dispatch, history}) {
      return history.listen(({pathname}) => {
        const match = pathToRegexp('/admin/:params').exec(pathname)
        if (match || pathname === '/admin') {
          dispatch({type: 'initQuery'})
          dispatch({type: 'fetchTable'})
          dispatch({type: 'hideAlert'})
        }
      })
    }
  },

  effects: {
    * initQuery ({payload}, {call, select, put}) {
      const {table, query} = yield select(({contest}) => contest)
      if (JSON.stringify(query).length <= 2) {
        if (table.length === 0) {
          const data = yield call(fetchTable)
          if (data.code === 0) {
            const {contests = [{id: 'none'}]} = data.data
            const defaultValue = contests[contests.length - 1] || {id: 'none'}
            const problem = {
              contest_id: defaultValue.id
            }
            const query = {problem, team: problem, recording: problem, contestRecord: problem, schoolAdmin: {page: 1}}
            yield put({type: 'saveQuery', payload: query})
          }
        }
      }
    },
    * fetchTable ({payload = false}, {call, select, put}) {
      const table = yield select(({contest}) => contest.table)
      if (table.length === 0 || payload) {
        const data = yield call(fetchTable)
        if (data.code === 0) {
          const {contests} = data.data
          const table = contests.map((t, i) => ({
            ...t,
            fakeId: i + 1
          }))
          yield put({type: 'setTable', payload: table.reverse()})
        } else {
          yield put({type: 'setTable', payload: []})
        }
      }
    },
    * update ({payload}, {call, put, select}) {
      const {id} = yield select(({contest}) => contest.modalContent)
      const data = yield call(update, payload, id)
      if (data.code === 0) {
        yield put({type: 'hideModal'})
        message.success('修改成功')
        yield put({type: 'fetchTable', payload: true})
      }
    },

    * delete ({payload}, {put, select, call}) {
      const {id} = payload
      const {input} = yield select(({contest}) => contest)
      const data = yield call(remove, {password: input}, id)
      if (data.code === 0) {
        message.success('删除成功')
        yield put({type: 'fetchTable', payload: true})
      }
    },
    * status ({payload}, {put}) {
      yield put({type: 'update', payload: payload})
    },
    * resultCheck ({payload}, {call, put, select}) {
      const {id} = yield select(({contest}) => contest.modalContent)
      const {code} = yield call(resultCheck, payload, id)
      if (code === 0) {
        yield put({type: 'fetchTable', payload: true})
        yield put({type: 'hideModal'})
        message.success('成绩公布状态修改成功')
      }
    },
    * create ({payload}, {put, call}) {
      const data = yield call(create, payload)
      if (data.code === 0) {
        yield put({type: 'hideModal'})
        message.success('创建成功')
        yield put({type: 'changeContestId', payload: data.data.contest_id})
        yield put({type: 'fetchTable', payload: true})
        yield put({type: 'showAlert'})
      }
    }
  },
  reducers: {
    changeContestId (state, {payload: contestId}) {
      return {
        ...state,
        contestId
      }
    },
    saveQuery (state, {payload: query}) {
      return {
        ...state,
        query
      }
    }
  }
})
