import React from 'react'
import QueueAnim from 'rc-queue-anim'
import TweenOne from 'rc-tween-one'
import { Link } from 'dva/router'
import './index.less'
import {showItems} from './showItem.json'
import { connect } from 'dva'

const ShowItems = ({download, dispatch}) => {
  // const {modalContent} = download
  const demoToChildren = showItems.map((item, i) => {
    const {img = '/assets/home/showItem/3.jpg', title, link, content = '资料下载'} = item
    return (
      <li key={i}>
        <a href={link}>
          <div className='home-anim-demo-img'><img src={img} width='100%' /></div>
          <h2>{title}</h2>
          <div className='home-anim-demo-text'>
            <h2>{content}</h2>
          </div>
        </a>
      </li>
    )
  })

  return (
    <div
      className='home-content show-items'
    >
      <QueueAnim
        className='page-text'
        key='text'
        type='bottom'
        leaveReverse
        delay={[0, 100]}
      >
        <h1 key='h1'>下载中心</h1>
        <p key='p'>
          下载中心为您提供最新最全的电子设计竞赛资料下载
        </p>
      </QueueAnim>
      <TweenOne

        key='img'
        className='home-anim-demo'
      >
        <ul>
          {demoToChildren}
        </ul>
        <div className='download-content'>
          <TweenOne
            key='a'
            className='download-button'
            style={{marginBottom: '80px'}}
          >
            {/* <Link onClick={fetchMore}>查看更多</Link> */}
          </TweenOne>
        </div>
      </TweenOne>
    </div>
  )
}

export default connect(({app, download}) => ({app, download}))(ShowItems)
