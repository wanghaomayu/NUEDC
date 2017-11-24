/**
 * Created by Pororo on 17/7/14.
 */
import modelExtend from 'dva-model-extend'
import { fetchDate } from './service'
import { modalModel, tableModel } from '../../../models/modelExtend'
export default modelExtend(modalModel, tableModel, {
  namespace: 'recommendExperts',
  state: {},
  subscriptions: {
    contestSubscriber ({dispatch, history}) {
      return history.listen(({pathname}) => {
        const match = pathname === '/school/recommendExperts'
        if (match) {
          dispatch({type: 'fetchExpertsTable'})
        }
      })
    }
  },
  effects: {
    * fetchExpertsTable ({payload}, {call, put, select}) {
      const table = yield select(({recommendExperts}) => recommendExperts.table)
      if (table.length > 0) {
        // 已有数据，不需要获取
      } else {
        const data = []
        for (let i = 0; i < 10; i++) {
          data.push({
            id: i,
            name: '王和兴' + i,
            gender: `女`,
            position: `老师`,
            title_of_professor: '教授',
            mobile: '18332518016',
            note: '电子设计竞赛专家推荐',
            status: '未开始',
            result: '已审核'
          })
        }
        yield put({type: 'setTable', payload: data})
      }
    },
    * recommend ({payload}, {put, select}) {
      const form = yield select(({recommendExperts}) => recommendExperts.form)
      console.log(form)
    }
  },
  reducers: {
    onFormSubmit (state, {payload}) {
      return {
        ...state,
        form: payload
      }
    }
  }
})
