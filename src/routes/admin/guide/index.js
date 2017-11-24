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
import {guide} from './guide.json'
const GuidePage = ({}) => {
  const {title = '', created_at = '', content = ''} = guide
  return (
    <div>
      <div className='news-content-header'>
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
          {/*{created_at}*/}
        </TweenOne>
      </div>
      <Card className='news-content-markdown'>
        <MarkDown content={content} />
      </Card>
    </div>
  )
}

export default connect(({app, GuideContent}) => ({app, GuideContent}))(GuidePage)
