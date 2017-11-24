/**
 * Created by out_xu on 17/7/13.
 */
import React from 'react'
import './index.less'
import Header from './Header'
import Footer from './Footer'
import TweenOne from 'rc-tween-one'
const Layout = (props) => {
  const {app, routes = []} = props
  const {nobg = []} = app
  let routePath = routes.map((item) => {
    return item.path === '/' ? '' : item.path
  })
  return (
    <div className='layout'>
      <div className='layout-content'>
        <TweenOne
          animation={[{y: -10, type: 'from'}]}
          reverseDelay={10}
          className='anim'
          key={props.location.pathname}
        >
          <div className={nobg.includes(routePath.join('/')) ? 'no-bg' : ''}>
            <Header {...props} />
          </div>
          {props.children}
        </TweenOne>
      </div>
      <Footer />
    </div>
  )
}

export default Layout
