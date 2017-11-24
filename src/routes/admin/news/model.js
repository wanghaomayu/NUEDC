import modelExtend from 'dva-model-extend'
import { modalModel, tableModel } from '../../../models/modelExtend'
import { fetchTable, remove, update } from './service'
import { message } from 'antd'

export default modelExtend(modalModel, tableModel, {
  namespace: 'adminNews',
  state: {},
  subscriptions: {
    contestSubscriber ({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/admin/news' || pathname === '/admin/notices') {
          const type = pathname === '/admin/news' ? 0 : 1
          query = {
            ...query,
            type
          }
          dispatch({type: 'fetchTable', payload: query})
        }
      })
    }
  },
  effects: {
    * fetchTable ({payload = {}}, {call, select, put}) {
      const {page = 1, size = 50, type = 0} = payload
      const query = {page, size, type}
      const data = yield call(fetchTable, query)
      if (data.code === 0) {
        const {data: {count, messages}} = data
        const tableConfig = {
          tablePage: page,
          tableSize: size,
          tableCount: count
        }
        const table = messages.map((t, i) => ({
          ...t,
          fakeId: i + 1 + (page - 1) * size
        }))
        yield put({type: 'setTable', payload: table})
        yield put({type: 'setTableConfig', payload: tableConfig})
      }
    },
    * preview ({payload}, {call, put, select}) {
      console.log(payload)
      const {query, record} = payload
      let uri = ''
      if (record.type === 0) {
        uri += '/news/'
      } else {
        uri = '/notices/'
      }
      uri += record.id
      let a = document.createElement('a')
      a.href = uri
      a.target = '_blank'
      a.click()
    },
    * delete ({payload}, {put, call}) {
      const {type, id} = payload

      const data = yield call(remove, {type}, id)
      if (data.code === 0) {
        message.success('删除成功')
        yield put({type: 'fetchTable', payload: {type}})
      }
    }
  },
  reducers: {
    queryChange(state, {payload})
    {
      return {
        ...state,
        ...payload
      }
    }
  }
})
