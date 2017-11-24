/**
 * Created by out_xu on 17/8/1.
 */

import modelExtend from 'dva-model-extend'
import { alertModel, modalModel, tableModel } from '../../../models/modelExtend'
import { message } from 'antd'
import { API, newDate } from '../../../utils'
import { check, fetchProblems, fetchTable, update } from './service'

export default modelExtend(modalModel, tableModel, alertModel, {
  namespace: 'schoolProblem',
  state: {
    failed: [],
    status: '未审核',
    problems: [],
    selects: [],
    selectKeys: []
  },
  subscriptions: {
    schoolProblemSubscriber ({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        const match = pathname === '/school/problem' || pathname === '/school/problemList'
        if (match) {
          dispatch({type: 'fetchTable', payload: query})
        }
      })
    }
  },
  effects: {
    * fetchTable ({payload}, {call, put, select}) {
      const query = payload
      const {contest_id, status, page = 1, size = 50} = payload
      if (contest_id === 'none') return
      const {contests = []} = yield select(({school}) => school)
      let canSelect = []
      contests.forEach(item => {
        if (item.can_select_problem === 1) {
          canSelect.push(item)
        } else if (newDate(item.problem_start_time) < Date.now()) {
          canSelect.push(item)
        }
      })

      const {data: {count = '', teams = []}, code} = yield call(fetchTable, query)

      const data = yield call(fetchProblems, contest_id)
      if (code === 0) {
        const tableConfig = {
          tablePage: page,
          tableSize: size,
          tableCount: count
        }
        const table = teams.map((t, i) => ({
          ...t,
          fakeId: i + 1 + (page - 1) * size
        }))
        yield put({type: 'setTable', payload: table})
        yield put({type: 'setTableConfig', payload: tableConfig})
      } else {
        yield put({type: 'setTable', payload: []})
        yield put({type: 'setTableConfig', payload: {}})
      }
      if (data.code === 0) {
        const table = data.problem_list.map((item, i) => ({
          ...item,
          fakeId: i + 1
        }))
        yield put({type: 'saveProblems', payload: table})
      }
    },
    * edit ({payload}, {call, put}) {
      const {query, body} = payload
      const data = yield call(update, body)
      if (data.code === 0) {
        yield put({type: 'hideModal'})
        message.success('修改成功')
        yield put({type: 'fetchTable', payload: query})
      }
    },
    * submit ({payload}, {call, select, put}) {
      const {record, query} = payload
      const body = {
        data: [{
          record_id: record.id,
          problem_submit: '已提交'
        }]
      }
      const data = yield call(check, body, query.contest_id)
      if (data.code === 0) {
        message.success('提交成功')
        if (data.data.failed.length > 0) {
          yield put({type: 'schoolProblem/saveFailed', payload: data.data.failed})
          yield put({type: 'schoolProblem/showAlert'})
        } else {
          yield put({type: 'fetchTable', payload: query})
        }
      }
    },
    * submitAll ({payload}, {call, select, put}) {
      const query = payload
      const {selects = []} = yield select(({schoolProblem}) => schoolProblem)
      const data = yield call(check, {data: selects}, query.contest_id)
      if (data.code === 0) {
        message.success('批量提交成功')
        if (data.data.failed.length > 0) {
          yield put({type: 'schoolProblem/saveFailed', payload: data.data.failed})
          yield put({type: 'schoolProblem/showAlert'})
        }
        yield put({type: 'fetchTable', payload: query})
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
  },
  reducers: {
    saveContest (state, {payload}) {
      return {
        ...state,
        contests: payload
      }
    },
    changeStatus(state, {payload: status}) {
      return {
        ...state,
        status
      }
    },
    saveProblems(state, {payload: problems}) {
      return {
        ...state,
        problems
      }
    },
    updateSelects (state, {payload: selects}) {
      return {
        ...state,
        selects
      }
    },
    updateSelectKeys (state, {payload: selectKeys}) {
      return {
        ...state,
        selectKeys
      }
    },
    saveFailed (state, {payload}) {
      return {
        ...state,
        failed: payload
      }
    },
  }
})
