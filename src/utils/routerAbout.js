/**
 * Created by out_xu on 17/7/13.
 */
import { browserHistory } from 'dva/router'
const windowScroll = anchorName => {
  if (anchorName) {
    // 找到锚点
    const anchorElement = document.getElementById(anchorName)
    // 如果对应id的锚点存在，就跳转到锚点
    if (anchorElement) {
      anchorElement.scrollIntoView()
    }
  }
}

const goto = path => {
  if (path) {
    browserHistory.push(path)
  } else {
    throw new Error('目标路由不存在')
  }
}

const urlEncode = params => {
  let paramsArray = []
  Object.keys(params).forEach(key => params[key] && paramsArray.push(`${key}=${params[key]}`))
  return paramsArray.join('&')
}

const queryURL = (name) => {
  let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
  let r = window.location.search.substr(1).match(reg)
  if (r !== null) return decodeURI(r[2])
  return null
}
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export { goto, windowScroll, queryURL, sleep, urlEncode }