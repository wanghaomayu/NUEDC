import axios from 'axios'
import { message } from 'antd'
import { API, codeHelper } from './'

const fetch = options => {
  let {
    method = 'get',
    data,
    url,
    token = false
  } = options
  const header = token ? {'token': window.localStorage.getItem('nuedcToken')} : {}
  const myAxios = axios.create({  //   自定义配置新建一个axios实例
    timeout: 15000,
    headers: header
  })
  switch (method.toLowerCase()) {
    case 'get':
      return myAxios.get(url, data)
    case 'delete':
      return myAxios.delete(url, data)
    case 'post':
      return myAxios.post(url, data)
    case 'put':
      return myAxios.put(url, data)
    case 'patch':
      return myAxios.patch(url, data)
    case 'export':
      return myAxios.get(url, {
        params: data,
        responseType: 'blob'
      })
    default:
      return myAxios(options)
  }
}

const downFile = (blob, fileName) => {
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveBlob(blob, fileName)
  } else {
    let link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = fileName
    link.target = '_blank'
    link.click()
    window.URL.revokeObjectURL(link.href)
  }
}

export default async options => {
  try {
    const res = await fetch(options)   //   这里用到了上面定义的fetch(options)，所以不同模块用到的request函数需要的参数是options对象{URL，method，token，data}

    if (options.method === 'export') {
      downFile(res.data, options.filename)
      return {
        code: 0
      }
    }

    const {data} = res

    if (data.code === 20004) {
      return data
    } else if (data.code !== 0) {
      codeHelper(data.code)
    }
    return data

  } catch (e) {
    if (options.url === API.tokenVerify) {
      message.error('网络错误，请刷新页面重试')
    }
    return {
      code: -1,
      data: {}
    }
  }
}
