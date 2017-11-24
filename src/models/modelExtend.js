/**
 * Created by out_xu on 17/7/15.
 */
//   modalModel函数就是改变state中的两个参数，比如改变modal就是帮助index里使用时控制模态框是否显示
//   state里面的modalContent就是决定模态框里面表单的内容的
const modalModel = {
  state: {
    modal: false,
    modalContent: {}
  },
  reducers: {
    showModal (state, {payload: modal}) {
      return {
        ...state,
        modal: true
      }
    },
    hideModal (state) {
      return {
        ...state,
        modal: false
      }
    },
    updateModalContent(state, {payload: modalContent}) {
      return {
        ...state,
        modalContent: modalContent
      }
    }
  }
}

const loadingModel = {
  state: {
    loading: false
  },
  reducers: {
    showLoading (state) {
      return {
        ...state,
        loading: true
      }
    },
    hideLoading (state) {
      return {
        ...state,
        loading: false
      }
    }
  }
}

const alertModel = {
  state: {
    alert: false
  },
  reducers: {
    showAlert (state) {
      return {
        ...state,
        alert: true
      }
    },
    hideAlert (state) {
      return {
        ...state,
        alert: false
      }
    }
  }
}

const tableModel = {
  state: {
    table: [],
    tablePage: -1,
    tableSize: -1,
    tableCount: -1
  },
  reducers: {
    setTable (state, {payload: table}) {
      return {
        ...state,
        table
      }
    },
    setTableConfig (state, {payload: {tablePage, tableSize, tableCount}}) {
      return {
        ...state,
        tableSize,
        tablePage,
        tableCount
      }
    }
  }
}

const counterModel = {
  state: {
    counter: false
  },
  subscriptions: {
    counterSubscriber ({dispatch, history}) {
      return history.listen(({pathname}) => {
        if (pathname === '/register') {
          dispatch({type: 'counterReset'})
        }
      })
    }
  },
  reducers: {
    counterReset (state) {
      return {
        ...state,
        counter: false
      }
    },
    counterStart (state) {
      return {
        ...state,
        counter: true
      }
    }
  }
}

const inputModel = {
  state: {
    input: ''
  },
  reducers: {
    onInputChange(state, {payload}) {
      return {
        ...state,
        input: payload
      }
    }
  }
}

export { modalModel, tableModel, counterModel, loadingModel, inputModel, alertModel }