/**
 * Created by out_xu on 17/8/1.
 */

import pathToRegexp from 'path-to-regexp'
import { fetchSelectOption } from './joinedTeams/service'
export default  {
  namespace: 'school',
  state: {
    contests: [],
    query: {}
  },
  subscriptions: {
    schoolSubscriber ({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        const match = pathToRegexp('/school/:params').exec(pathname)
        if (match || pathname === '/school') {
          dispatch({type: 'initQuery'})
        }
      })
    }
  },
  effects: {
    * initQuery ({payload}, {call, select, put}){
      const {contests, query} = yield select(({school}) => school)
      if (JSON.stringify(query).length <= 2) {
        if (contests.length === 0) {
          const {data = {}, code} = yield call(fetchSelectOption)
          if (code === 0) {
            const {contests = [{id: 'none'}]} = data
            const defaultValue = contests[contests.length - 1] || {id: 'none'}
            const problem = {
              contest_id: defaultValue.id
            }
            const query = {problem, joinedTeams: problem, schoolResult: problem}
            yield put({type: 'saveContests', payload: contests.reverse()})
            yield put({type: 'saveQuery', payload: query})
          }
        }
      }
    },
  },
  reducers: {
    saveContests (state, {payload}) {
      return {
        ...state,
        contests: payload
      }
    },
    saveQuery (state, {payload: query}) {
      return {
        ...state,
        query
      }
    }
  }
}
