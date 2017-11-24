/**
 * Created by Pororo on 17/7/19.
 */
import modelExtend from 'dva-model-extend'
import { fetchPassage } from './service'
import { modalModel, tableModel } from '../../../models/modelExtend'
import pathToRegexp from 'path-to-regexp'
import { routerRedux } from 'dva/router'
export default modelExtend(modalModel, tableModel, {
  namespace: 'noticeContent',
  state: {},
  subscriptions: {
    contestSubscriber ({dispatch, history}) {
      return history.listen(({pathname, params}) => {
        const match = pathToRegexp(`/notices/:id`).exec(pathname)

        if (match) {
          const id = match[1]
          dispatch({type: 'fetchPassage', payload: id})
        }
      })
    }
  },
  effects: {
    * fetchPassage ({payload}, {call, put}) {
      const query = {
        messageId: payload,
        type: 1
      }
      const data = yield call(fetchPassage, query)
      if (data.code === 0) {
        yield put({type: 'updateModalContent', payload: data.data})
      } else {
        yield put(routerRedux.push('/news'))
      }
    }
  }
})
