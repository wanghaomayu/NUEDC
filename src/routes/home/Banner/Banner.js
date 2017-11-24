import React, { PropTypes } from 'react'
import { Button, Icon } from 'antd'
import QueueAnim from 'rc-queue-anim'
import TweenOne from 'rc-tween-one'
import { goto } from '../../../utils'
import './index.less'
class Banner extends React.Component {
  render () {
    const props = {...this.props}
    delete props.isMode
    return (
      <div className='banner' style={{backgroundImage: `url("/assets/home/banner/3.jpg")`}}>
        <QueueAnim
          type={['bottom', 'top']}
          delay={200}
          className={`${props.className}-wrapper`}
          key='text'
        >
          <span
            className='title'
            key='title'
          >
            <br />
            <span className='title-number'>全国大学生电子设计竞赛</span>

            <br />
            <span className='title-number'>河北赛区</span>
          </span>
          <p key='content' id={`${props.id}-content`}>创造激情 精彩无限</p>
          <Button ghost key='button' size='large' id={`${props.id}-button`} onClick={() => goto('/login')}
            style={{marginRight: 5}}>
            点击登录报名
          </Button>

        </QueueAnim>
        <TweenOne
          animation={{y: '-=20', yoyo: true, repeat: -1, duration: 1000}}
          className={`${props.className}-icon`}
          key='icon'
        >
          <br />
          <Icon type='down' />
        </TweenOne>
      </div>
    )
  }
}

Banner.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string
}

Banner.defaultProps = {
  className: 'banner'
}

export default Banner
