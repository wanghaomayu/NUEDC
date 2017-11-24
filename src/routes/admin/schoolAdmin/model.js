import modelExtend from 'dva-model-extend'
import { modalModel, tableModel } from '../../../models/modelExtend'
import { create, fetchTable, remove, update } from './service'
import { message } from 'antd'

export default modelExtend(modalModel, tableModel, {
  namespace: 'adminSchoolAdmin',
  state: {},
  subscriptions: {
    contestSubscriber ({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/admin/schoolAdmin') {
          dispatch({type: 'fetchTable', payload: query})
        }
      })
    }
  },
  effects: {
    * fetchTable ({payload = {}}, {call, select, put}) {
      const {page = 1, size = 50, school_id} = payload
      const query = {
        page: page,
        size: size,
        school_id: school_id || undefined
      }
      const data = yield call(fetchTable, query)
      if (data.code === 0) {
        const {data: {count, school_admins = []}} = data
        const tableConfig = {
          tablePage: page,
          tableSize: size,
          tableCount: count
        }
        const table = school_admins.map((t, i) => ({
          ...t,
          fakeId: i + 1 + (page - 1) * size
        }))
        yield put({type: 'setTable', payload: table})
        yield put({type: 'setTableConfig', payload: tableConfig})
      }
    },
    * update ({payload}, {call, put, select}) {
      const {id} = yield select(({adminSchoolAdmin}) => adminSchoolAdmin.modalContent)
      const {query, values} = payload
      const data = yield call(update, values, id)
      if (data.code === 0) {
        yield put({type: 'hideModal'})
        message.success('修改成功')
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
    * create ({payload}, {put, call}) {
      const {query, values} = payload
      const data = yield call(create, values)

      if (data.code === 0) {
        yield put({type: 'fetchTable', payload: query})
        message.success('添加成功')
        yield put({type: 'hideModal'})
      }
    }
  },
  reducers: {}
})
