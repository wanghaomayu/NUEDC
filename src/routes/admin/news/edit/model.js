import modelExtend from 'dva-model-extend'
import { inputModel, modalModel } from '../../../../models/modelExtend'
import { create, fetchMessage, remove, update } from './service'
import { message } from 'antd'
import { routerRedux } from 'dva/router'
export default modelExtend(modalModel, inputModel, {
  namespace: 'adminNewsEdit',
  state: {
    content: undefined
  },
  subscriptions: {
    contestSubscriber ({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/admin/notices/edit' || pathname === '/admin/news/edit') {
          if (query.id) {
            dispatch({type: 'fetchMessage', payload: {pathname, query}})
          }
        }
      })
    }
  },
  effects: {
    * fetchMessage ({payload}, {call, select, put}) {
      let {pathname, query} = payload
      const type = pathname === '/admin/news/edit' ? 0 : 1
      query = {
        messageId: query.id,
        type
      }
      const data = yield call(fetchMessage, query)
      if (data.code === 0) {
        const {current: {title, content}} = data.data
        yield put({type: 'contentChange', payload: content})
        yield put({type: 'onInputChange', payload: title})

      }
    },
    * update ({payload}, {call, put, select}) {
      const {id, pathname} = payload
      const type = pathname === '/admin/news/edit' ? 0 : 1

      const {input: title = '', content = ''} = yield select(({adminNewsEdit}) => adminNewsEdit)
      const body = {
        title,
        content,
        type
      }
      if (id) {
        const data = yield call(update, body, id)
        if (data.code === 0) {
          message.success('修改成功')
          yield put(routerRedux.push(`/admin/${type === 0 ? 'news' : 'notices'}`))
        }
      } else {
        const data = yield call(create, body)
        if (data.code === 0) {
          message.success('发布成功')
          yield put(routerRedux.push(`/admin/${type === 0 ? 'news' : 'notices'}`))
        }
      }

    },
    * delete ({payload}, {put, call}) {
      const {id} = payload
      const data = yield call(remove, id)
      if (data.code === 0) {
        message.success('删除成功')
        yield put({type: 'fetchTable', payload: {force: true}})
      }
    }
  },
  reducers: {
    contentChange (state, {payload: content}) {
      console.log(content)
      return {
        ...state,
        content
      }
    }
  }
})
