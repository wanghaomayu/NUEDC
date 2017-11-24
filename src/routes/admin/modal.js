export default {
  namespace: 'admin',
  state: {
    query: {}
  },
  subscriptions: {},
  effects: {},
  reducers: {
    saveQuery (state, {payload}) {
      const query = {
        ...state.query,
        payload
      }
      return {
        ...state,
        query
      }
    }
  }
}
