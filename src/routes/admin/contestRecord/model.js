import modelExtend from 'dva-model-extend'
import { modalModel, tableModel } from '../../../models/modelExtend'
import { downloadExcel, fetchTable, remove, update } from './service'
import { message } from 'antd'
export default modelExtend(modalModel, tableModel, {
  namespace: 'adminContestRecord',
  state: {},
  subscriptions: {
    contestSubscriber ({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/admin/contestRecord') {
          dispatch({type: 'fetchTable', payload: query})
        }
      })
    }
  },
  effects: {
    * fetchTable ({payload = {}}, {call, select, put}) {
      const {contest_id, status, result, school_id, page = 1, size = 50} = payload

      if (contest_id === 'none') return
      const query = {
        page: page,
        size: size,
        contest_id: contest_id || undefined,
        status: status || undefined,
        result: result || undefined,
        school_id: school_id || undefined
      }
      const data = yield call(fetchTable, query)
      if (data.code === 0) {
        const {data: {count, records}} = data
        const tableConfig = {
          tablePage: page,
          tableSize: size,
          tableCount: count
        }
        const table = records.map((t, i) => ({
          ...t,
          fakeId: i + 1 + (page - 1) * size
        }))
        yield put({type: 'setTable', payload: table})
        yield put({type: 'setTableConfig', payload: tableConfig})
      }
    },
    * downloadExcel ({payload}, {call}) {
      yield call(downloadExcel, {filename: '参赛记录列表.xlsx'}, payload)
    },
    * update ({payload}, {call, put, select}) {
      const {id} = yield select(({adminContestRecord}) => adminContestRecord.modalContent)
      const {query, values} = payload
      const body = {
        updates: [{
          record_id: id,
          ...values
        }]
      }
      const data = yield call(update, body)
      if (data.code === 0) {
        yield put({type: 'hideModal'})
        message.success('修改成功')
        yield put({type: 'fetchTable', payload: query})
      }
    },
    * delete ({payload}, {put, call}) {
      const {query, record} = payload
      const {id} = record
      const body = {
        record_ids: [id]
      }
      const data = yield call(remove, body)
      if (data.code === 0) {
        message.success('删除成功')
        yield put({type: 'fetchTable', payload: query})
      }
    }
  },
  reducers: {
    queryChange (state, {payload}) {
      return {
        ...state,
        ...payload
      }
    }
  }
})
