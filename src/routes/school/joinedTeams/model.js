import modelExtend from 'dva-model-extend'
import { add, allChecked, audit, downloadExcel, fetchJoinedTable, joinedExcelOut, remove, update } from './service'
import { alertModel, modalModel, tableModel } from '../../../models/modelExtend'
import { message } from 'antd'

export default modelExtend(modalModel, tableModel, alertModel, {
  namespace: 'joinedTeams',
  state: {
    contests: [],
    content: {
      fail: [],
      success: [],
      update: []
    },
    selects: [],
  },
  subscriptions: {
    joinedTeamsSubscriber ({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        const match = pathname === '/school/joinedTeams'
        if (match) {
          dispatch({type: 'fetchJoinedTable', payload: query})
        }
      })
    }
  },
  effects: {
    * fetchJoinedTable ({payload}, {call, put, select}) {
      const {contest_id, status, page = 1, size = 50} = payload
      if (contest_id === 'none') return
      const query = {
        page: page,
        size: size,
        contest_id,
        status: status || undefined
      }
      const {data: {count = '', teams = []}, code} = yield call(fetchJoinedTable, query)
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
    },
    * edit ({payload}, {call, put}) {
      const {query, body, id} = payload
      const data = yield call(update, body, id)
      if (data.code === 0) {
        yield put({type: 'hideModal'})
        message.success('修改成功')
        yield put({type: 'fetchJoinedTable', payload: query})
        yield put({type: 'hideModal'})
      }
    },
    * delete ({payload}, {put, call}) {
      const {query, record} = payload
      const {id} = record

      const data = yield call(remove, id)
      if (data.code === 0) {
        message.success('删除成功')
        yield put({type: 'fetchJoinedTable', payload: query})
      }
    },
    * add ({payload}, {put, select, call}) {
      const {query, body} = payload
      const data = yield call(add, body)
      if (data.code === 0) {
        yield put({type: 'hideModal'})
        message.success('创建成功')
        yield put({type: 'fetchJoinedTable', payload: query})
      }
    },
    * audit ({payload}, {put, call}) {
      const {query, id, body} = payload
      const data = yield call(audit, body, id)
      if (data.code === 0) {
        yield put({type: 'hideModal'})
        message.success('审核通过')
        yield put({type: 'fetchJoinedTable', payload: query})
      }
    },
    * joinedOut ({payload}, {call, select}) {
      const {contest_id: contestsId} = payload
      const date = new Date().valueOf() + ''
      const data = {
        ...payload,
        contest_id: contestsId
      }
      yield call(joinedExcelOut, {filename: date.substr(-3, 3) + '本校参赛队伍竞赛' + contestsId + '.xlsx'}, data)
    },
    * allChecked ({payload}, {call, select, put}) {
      const query = payload
      const {selects: checks = []} = yield select(({joinedTeams}) => joinedTeams)
      const data = yield call(allChecked, {checks})
      if (data.code === 0) {
        message.success('批量审核成功')
        yield put({type: 'fetchJoinedTable', payload: query})
      }
    },
    * downloadExcel ({payload}, {call, put, select}) {
      yield call(downloadExcel, {filename: '队伍导入Excel模板.xlsx'})
    }
  },
  reducers: {
    saveSuccessExcel (state, {payload}) {
      return {
        ...state,
        content: payload
      }
    },
    saveContest (state, {payload}) {
      return {
        ...state,
        contests: payload
      }
    },
    updateSelects (state, {payload: selects}) {
      return {
        ...state,
        selects
      }
    }
  }
})
