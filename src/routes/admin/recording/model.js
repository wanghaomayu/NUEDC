import modelExtend from 'dva-model-extend'
import { downloadExcel, resultUpdate } from './service'
import { alertModel, modalModel, tableModel } from '../../../models/modelExtend'
import { message } from 'antd'
import { sleep } from '../../../utils'

export default modelExtend(modalModel, tableModel, alertModel, {
  namespace: 'recording',
  state: {
    contestInfo: {
      id: '',
      result_check: '未公布'
    },
    content: []
  },
  subscriptions: {
    contestSubscriber ({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/admin/recording') {
          dispatch({type: 'fetchTable', payload: query})
        }
        if (query.contest_id) {
          dispatch({type: 'changeContestInfo', payload: query})
        }
      })
    }
  },
  effects: {
    * fetchTable ({payload = {}}, {put}) {
      const {contest_id} = payload
      if (contest_id === 'none') return
      yield put({type: 'adminContestRecord/fetchTable', payload: payload})
    },
    * changeContestInfo ({payload = {}}, {call, select, put}) {
      let {contestInfo} = yield select(({recording}) => recording)
      const {contest_id} = payload
      if (contest_id === 'none' || +contest_id === contestInfo.id) return

      yield call(sleep, 2000)
      let {table: contest = [{}]} = yield select(({contest}) => contest)
      contest.forEach((item) => {
        if (+contest_id === item.id) {
          contestInfo = item
        }
      })
      yield put({type: 'saveContestInfo', payload: contestInfo})
    },
    * downloadExcel ({payload}, {call}) {
      yield call(downloadExcel, {filename: '成绩导入Excel模板.xlsx'}, payload)
    },
    * checkRecording ({payload}, {call, put}) {
      const {query, body} = payload
      const data = yield call(resultUpdate, body)
      if (data.code === 0) {
        yield put({type: 'adminContestRecord/hideModal'})

        yield put({type: 'adminContestRecord/fetchTable', payload: query})
        message.success('成绩录入成功')
        message.success('成绩已更新')

      }
    }
  },
  reducers: {
    onFormSubmit (state, {payload}) {
      return {
        ...state,
        form: payload
      }
    },
    onFilter (state, {payload}) {
      return {
        ...state,
        schools: payload
      }
    },
    saveContestInfo(state, {payload: contestInfo}) {
      return {
        ...state,
        contestInfo
      }
    },
    saveExcelFail (state, {payload}) {
      return {
        ...state,
        content: payload
      }
    },
  }
})
