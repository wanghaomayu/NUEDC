import modelExtend from 'dva-model-extend'
import { alertModel, modalModel, tableModel } from '../../../models/modelExtend'
import { create, downloadExcel, fetchTable, remove, update } from './service'
import { message } from 'antd'

export default modelExtend(modalModel, tableModel, alertModel, {
  namespace: 'adminSchool',
  state: {
    schoolId: '',
    content: []
  },
  subscriptions: {
    contestSubscriber ({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/admin/school') {
          dispatch({type: 'fetchTable', payload: query})
          dispatch({type: 'hideAlert'})
        }
      })
    }
  },
  effects: {
    * fetchTable ({payload = {}}, {call, select, put}) {
      const {tablePage, tableSize} = yield select(({adminSchool}) => adminSchool)
      const {page = 1, size = 50, force = false} = payload
      if (tablePage !== page || tableSize !== size || force) {
        const data = yield call(fetchTable, {page, size})
        if (data.code === 0) {
          const {data: {count, schools}} = data
          const tableConfig = {
            tablePage: page,
            tableSize: size,
            tableCount: count
          }
          const table = schools.map((t, i) => ({
            ...t,
            fakeId: i + 1 + (page - 1) * size
          }))
          yield put({type: 'setTable', payload: table})
          yield put({type: 'setTableConfig', payload: tableConfig})
        }
      }
    },
    * update ({payload}, {call, put, select}) {
      const {id} = yield select(({adminSchool}) => adminSchool.modalContent)
      const data = yield call(update, payload, id)
      if (data.code === 0) {
        yield put({type: 'hideModal'})
        message.success('修改成功')
        yield put({type: 'fetchTable', payload: {force: true}})
      }
    },
    * delete ({payload}, {put, call}) {
      const {id} = payload
      const data = yield call(remove, id)
      if (data.code === 0) {
        message.success('删除成功')
        yield put({type: 'fetchTable', payload: {force: true}})
      }
    },
    * downloadExcel ({}, {call}) {
      yield call(downloadExcel, {filename: '学校导入Excel模板.xlsx'})
    },
    * create ({payload}, {put, call}) {
      const data = yield call(create, payload)
      if (data.code === 0) {
        yield put({type: 'fetchTable', payload: {force: true}})
        message.success('添加成功')
        yield put({type: 'changeSchoolId', payload: data.data.school_id})
        yield put({type: 'hideModal'})
        yield put({type: 'showAlert'})
      }
    }
  },
  reducers: {
    changeSchoolId (state, {payload: schoolId}) {
      return {
        ...state,
        schoolId
      }
    },
    saveExcelFail (state, {payload}) {
      return {
        ...state,
        content: payload
      }
    }
  }
})
