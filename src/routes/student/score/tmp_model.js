import modelExtend from 'dva-model-extend'
import { remove, update, create, fetchProblemTable } from './service'
import { modalModel, tableModel } from '../../../models/modelExtend'
export default modelExtend(modalModel, tableModel,
  {
    namespace: 'studentScore',
    state: {
      input: ''
    },
    subscriptions: {
      problemSubscriber ({dispatch, history}) {
        return history.listen(({pathname}) => {
          if (pathname === '/student/score') {
            dispatch({type: 'fetchProblemTable'})
          }
        })
      }
    },
    effects: {
      * fetchProblemTable ({payload}, {call, put, select}) {
        console.log('fetchProblem')
        const table = yield select(({studentScore}) => studentScore.table)
        if (table.length > 0) {
          // 已有数据，不需要获取
        } else {
          const data = []
          for (let i = 0; i < 1; i++) {
            data.push({
              id: i,
              info: `信息${i}`,
              name: `电子设计竞赛 ${i}`,
              status: '未开始',
              result: '一等',
              audit_time: '2017-3-5',
              time: 2012 + i + '届河北省决赛'
            })
          }
          yield put({type: 'setTable', payload: data})
        }
      },
      * edit ({payload}, {call}) {
        console.log('edit')
        // const data = yield call(edit, payload)
      },
      * delete ({payload}, {put, select}) {
        const input = yield select(({studentScore}) => studentScore.input)
        console.log(input)
      },
      * add ({payload}, {put, select}) {
        const form = yield select(({studentScore}) => studentScore.form)
        console.log(form)
      },
      * audit ({payload}, {put}) {
        console.log('audit')
      },
      * filter ({payload}, {put, select}) {
        const filter = yield select(({studentScore}) => studentScore.filter)
        console.log(filter)
      },
    },
    reducers: {
      onInputChange (state, {payload}) {
        return {
          ...state,
          input: payload
        }
      },
      onFormSubmit (state, {payload}) {
        return {
          ...state,
          form: payload
        }
      }
    }
  })