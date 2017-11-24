import React from 'react'
import { Button } from 'antd'
import { TweenOneGroup } from 'rc-tween-one'
import BannerAnim, { Element } from 'rc-banner-anim'
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack'
import './index.less'
import 'rc-banner-anim/assets/index.css'
import config from './banner.json'
const BgElement = Element.BgElement
class HomeBanner extends React.Component {
  render () {
    const props = {...this.props}
    const {banner} = config
    const childrenToRender = banner.map((item, i) => {
      const {title,content,button,bg,time} = item
      return (
        <Element
          key={i}
          prefixCls='banner-user-elem'
        >
          <BgElement
            className='bg'
            style={{background: `url(${bg}) center`}}
            key='bg'
          />
          <div className={`${props.className}-content-bg`}>
            <span>
              <span className={`${props.className}-content-title`}>
                {title}
              </span>
              <span className={`${props.className}-content-time`}>
                {time}
              </span>
              <br />
              <span className={`${props.className}-content-main`}>
                {content}
              </span>
            </span>
            <Button
              type='ghost'
              key='button'
              id={`${props.id}-buttonBlock${i}`}
            >
              {button}
            </Button>
          </div>

        </Element>
      )
    })
    return (
      <OverPack
        {...props}
      >
        <TweenOneGroup
          key='banner'
          enter={{opacity: 0, type: 'from'}}
          leave={{opacity: 0}}
          component=''
        >
          <div className={`${props.className}-wrapper`}>
            <BannerAnim
              key='banner'
            >
              {childrenToRender}
            </BannerAnim>
          </div>
        </TweenOneGroup>
      </OverPack>
    )
  }
}

HomeBanner.defaultProps = {
  className: 'home-banner'
}

export default HomeBanner
