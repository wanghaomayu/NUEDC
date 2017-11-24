
export default {
  namespace: 'message',
  state: {},
  effects: {

    *logout ({payload,}, {call, put}) {
      const data = yield call(logout, parse(payload))
      if (data.success) {
        yield put({type: 'query'})
      } else {
        throw (data)
      }
    },
  },
  reducers: {
    querySuccess (state, {payload: user}) {
      return {
        ...state,
        user,
      }
    },
  },
}
