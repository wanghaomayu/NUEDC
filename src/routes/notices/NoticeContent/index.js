/**
 * Created by Pororo on 17/7/11.
 */
import React from 'react'
import MarkDown from '../../../components/Markdown'
import './index.less'
import TweenOne from 'rc-tween-one'
import { Button, Card, Icon } from 'antd'
import { Link } from 'dva/router'
import { connect } from 'dva'

const NoticePage = ({noticeContent}) => {
  const img = '/assets/home/banner/1.jpg'
  const {modalContent = {}} = noticeContent
  const {current = {}, pre = [], next = []} = modalContent
  const {title = '', created_at = '', content = ''} = current
  const prePassage = pre[0] || {id: ''}
  const nextPassage = next[0] || {id: ''}
  const prePassageId = prePassage.id || ''
  const nextPassageId = nextPassage.id || ''
  return (
    <div>
      <div className='news-content-header' style={{
        background: '#24BABC'
      }}>
        <TweenOne
          animation={{y: '+=30', opacity: 0, type: 'from'}}
          component='h1'
          key='h1'
          reverseDelay={200}
          className='news-content-title'
        >
          {title}
        </TweenOne>
        <TweenOne
          animation={{y: '+=30', opacity: 0, type: 'from', delay: 100}}
          component='p'
          key='p'
          reverseDelay={100}
          className='news-content-sub-title'
        >
          {created_at}
        </TweenOne>
      </div>
      <Card className='news-content-markdown'>
        <MarkDown content={content} />
        <div className='passage-footer'>
          {
            pre.length > 0 &&
            <Link to={'/notices/' + prePassageId}>
              <Button className='pre-passage-btn'><Icon type="arrow-left" />上一篇</Button>
            </Link>
          }
          {
            next.length > 0 &&
            <Link to={'/notices/' + nextPassageId}>
              <Button className='next-passage-btn'>下一篇<Icon type="arrow-right" /></Button>
            </Link>
          }
        </div>
      </Card>
    </div>
  )
}

export default connect(({app, noticeContent}) => ({app, noticeContent}))(NoticePage)
