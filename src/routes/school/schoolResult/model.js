import modelExtend from 'dva-model-extend'
import { fetchResultTable, resultExcelOut } from './service'
import { modalModel, tableModel } from '../../../models/modelExtend'
export default modelExtend(modalModel, tableModel, {
  namespace: 'schoolResult',
  state: {
    input: '',
    contests: []
  },
  subscriptions: {
    schoolResultSubscriber ({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        const match = pathname === '/school/schoolResult'
        if (match) {
          dispatch({type: 'fetchResultTable', payload: query})
        }
      })
    }
  },
  effects: {
    * fetchResultTable ({payload}, {call, put, select}) {
      const {contest_id, result_info, page = 1, size = 50} = payload
      if (contest_id === 'none') return
      const query = {
        page: page,
        size: size,
        contest_id: contest_id,
        result_info: result_info || undefined
      }
      const {code, data: {count, results}} = yield call(fetchResultTable, query)
      if (code === 0) {
        const tableConfig = {
          tablePage: page,
          tableSize: size,
          tableCount: count
        }
        const table = results.map((t, i) => ({
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
    * ResultOut ({payload}, {put, call, select}) {
      const {contest_id: contestsId} = payload
      const date = new Date().valueOf() + ''
      const data = {
        ...payload,
        contest_id: contestsId
      }
      yield call(resultExcelOut, {filename: date.substr(-3, 3) + '本校赛果竞赛' + contestsId + '.xlsx'}, data)
    }
  },
  reducers: {
    saveContest (state, {payload}) {
      return {
        ...state,
        contests: payload
      }
    }
  }
})
