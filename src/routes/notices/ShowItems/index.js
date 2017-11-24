import React from 'react'
import QueueAnim from 'rc-queue-anim'
import TweenOne from 'rc-tween-one'
import { Link } from 'dva/router'
import './index.less'
import { connect } from 'dva'

const ShowItems = ({notice, dispatch}) => {
  const {modalContent} = notice
  const {messages = []} = modalContent
  const demoToChildren = messages.map((item, i) => {
    const {img = '/assets/home/showItem/2.jpg', id, title, created_at} = item
    return (
      <li key={i}>
        <Link to={'/notices/' + id}>
          <div className='home-anim-demo-img'><img src={img} width='100%' /></div>
          <h2>{title}</h2>
          <div className='home-anim-demo-text'>
            <p>{created_at}</p>
          </div>
        </Link>
      </li>
    )
  })
  const fetchMore = (e) => {
    e.preventDefault()
    dispatch({type: 'notice/fetchMore'})
  }
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
        <h1 key='h1'>通知中心</h1>
        <p key='p'>
          通知中心为您提供最新最全的电子设计竞赛通知
        </p>
      </QueueAnim>
      <TweenOne

        key='img'
        className='home-anim-demo'
      >
        <ul>
          {demoToChildren}
        </ul>
        <div className='notice-content'>
          <TweenOne
            key='a'
            className='notice-button'
            style={{marginBottom: '80px'}}
          >
            <Link onClick={fetchMore}>查看更多</Link>
          </TweenOne>
        </div>
      </TweenOne>
    </div>
  )
}

export default connect(({app, notice}) => ({app, notice}))(ShowItems)
