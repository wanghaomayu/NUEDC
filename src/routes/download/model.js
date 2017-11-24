/**
 * Created by Pororo on 17/7/20.
 */
import modelExtend from 'dva-model-extend'
import { fetchPassagesAll } from './service'
import { message } from 'antd'
import { modalModel, tableModel } from '../../models/modelExtend'
import { windowScroll } from '../../utils'
export default modelExtend(modalModel, tableModel, {
  namespace: 'download',
  state: {},
  subscriptions: {
    contestSubscriber ({dispatch, history}) {
      return history.listen(({pathname}) => {
        const match = pathname === `/download`
        if (match) {
          windowScroll('nav-header')
          dispatch({type: 'fetchPassages'})
        }
      })
    }
  },
  effects: {
    * fetchPassages ({payload}, {call, put}) {
      const query = {
        page: 1,
        size: 10,
        type: 1
      }
      const news = yield call(fetchPassagesAll, query)
      if (news.code === 0) {
        const {data} = news
        const tableConfig = {
          tablePage: 1,
          tableSize: 10,
          tableCount: data.count
        }
        yield put({type: 'updateModalContent', payload: data})
        yield put({type: 'setTableConfig', payload: tableConfig})
      }
    },
    * fetchMore ({payload}, {call, put, select}) {
      const {tableSize, tableCount} = yield select(({download}) => download)
      const tableConfig = {
        tablePage: 1,
        tableSize: tableSize + 10,
        tableCount: tableCount
      }
      const query = {
        page: 1,
        size: tableSize + 10,
        type: 1
      }
      const news = yield call(fetchPassagesAll, query)
      if (news.code === 0) {
        const {data} = news
        if (tableSize < tableCount) {
          yield put({type: 'setTableConfig', payload: tableConfig})
          yield put({type: 'updateModalContent', payload: data})
        } else {
          message.success('已全部加载完毕')
        }
      }
    }
  }
})
