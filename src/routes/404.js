import React from 'react'
import {Link} from 'dva/router'
export default () => {
  return (
    <div id='page-404'>
      <section>
        <h1>404</h1>
        <p>你要找的页面不存在 <Link to='/'>返回首页</Link></p>
      </section>
      <style
        dangerouslySetInnerHTML={{
          __html: '#page-404{ height: calc(100% - 199px);}'
        }}
      />
    </div>
  )
}
