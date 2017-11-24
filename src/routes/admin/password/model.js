/**
 * Created by Pororo on 17/7/17.
 */
import modelExtend from 'dva-model-extend'
import { changePassword, update } from './service'
import { message } from 'antd'
import { modalModel, tableModel } from '../../../models/modelExtend'
export default modelExtend(modalModel, tableModel, {
  namespace: 'adminInfo',
  state: {},
  effects: {
    * changePassword ({payload}, {call, put, select}) {
      const data = yield call(changePassword, payload)
      if (data.code === 0) {
        message.success('密码修改成功')
        yield put({type: 'studentInfo/hideModal'})
      }
    }
  }
})
