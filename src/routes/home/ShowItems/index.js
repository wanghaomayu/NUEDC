import React from 'react'
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack'
import QueueAnim from 'rc-queue-anim'
import TweenOne from 'rc-tween-one'

import { Link } from 'dva/router'
import './index.less'
import showItemConfig from './showItem.json'

class ShowItems extends React.Component {
  render () {
    const {showItems = [], title, subTitle} = showItemConfig
    const demoToChildren = showItems.map((item, i) => {
      const {img, link, title, content} = item
      if (i < 3) {
        return (
          <li key={i}>
            <Link to={link}>
              <div className='home-anim-demo-img'><img src={img} width='100%' /></div>
              <h2>{title}</h2>
              <div className='home-anim-demo-text'>
                <p>{content}</p>
              </div>
            </Link>
          </li>
        )
      }
    })

    return (
      <div className='home-show-item'>
        <OverPack
          className='home-content show-items'
          playScale={0.8}
          id='page2'
        >
          <QueueAnim
            className='page-text'
            key='text'
            type='bottom'
            leaveReverse
            delay={[0, 100]}
          >
            <h1 key='h1'>{title}</h1>
            <p key='p'>
              {subTitle}
            </p>
          </QueueAnim>
          <TweenOne
            animation={{y: '+=30', opacity: 0, type: 'from'}}
            key='img'
            className='home-anim-demo'
          >
            <ul>
              {demoToChildren}
            </ul>
          </TweenOne>
        </OverPack>
      </div>
    )
  }
}

export default ShowItems
