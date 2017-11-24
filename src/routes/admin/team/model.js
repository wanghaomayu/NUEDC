import { audit, auditAll } from './service'
import { message } from 'antd'

export default {
  namespace: 'teamManage',
  state: {
    selected: []
  },
  subscriptions: {
    contestSubscriber ({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/admin/team') {
          dispatch({type: 'fetchTable', payload: query})
        }
      })
    }
  },
  effects: {
    * fetchTable ({payload = {}}, {put}) {
      const {contest_id,} = payload
      if (contest_id === 'none') return
      yield put({type: 'adminContestRecord/fetchTable', payload: payload})
    },
    * auditAll ({payload}, {call, put, select}) {
      const query = payload
      const {selected} = yield select(({teamManage}) => teamManage)
      const updates = selected.map((item) => ({
        record_id: item,
        status: '已通过'
      }))
      const data = yield call(auditAll, {updates})
      if (data.code === 0) {
        yield put({type: 'teamManage/selectChange', payload: []})
        yield put({type: 'adminContestRecord/fetchTable', payload: query})
        message.success('批量审核成功')
      }
    }
  },
  reducers: {
    selectChange (state, {payload: selected}) {
      return {
        ...state,
        selected
      }
    }
  }
}
