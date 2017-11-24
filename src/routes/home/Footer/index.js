import React from 'react'
import PropTypes from 'prop-types'
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack'
import QueueAnim from 'rc-queue-anim'
import './index.less'
import config from './footer.json'

class Footer extends React.Component {
  static propTypes = {
    id: PropTypes.string
  }

  static defaultProps = {
    className: 'footer-home'
  }

  getLiChildren = (data, i) => {
    const links = data.contentLink.split(/\n/).filter(item => item)
    const content = data.content.split(/\n/).filter(item => item)
      .map((item, ii) => {
        const cItem = item.trim()
        const isImg = cItem.match(/\.(jpg|png|svg|bmp|jpeg)$/i)
        return (<li className={isImg ? 'icon' : ''} key={ii}>
          <a href={links[ii]} target='_blank'>
            {isImg ? <img src={cItem} width='100%' /> : cItem}
          </a>
        </li>)
      })
    return (<li className={data.className} key={i} id={`${this.props.id}-block${i}`}>
      <h2>{data.title}</h2>
      <ul>
        {content}
      </ul>
    </li>)
  }

  render () {
    const props = {...this.props}
    const isMode = props.isMode
    delete props.isMode
    const dataSource = config.footerItem
    const liChildrenToRender = dataSource.map(this.getLiChildren)
    return (
      <OverPack
        {...props}
        playScale={isMode ? 0.5 : 0.2}
      >
        <QueueAnim type='bottom' component='ul' key='ul' leaveReverse id={`${props.id}-ul`}>
          {liChildrenToRender}
        </QueueAnim>
      </OverPack>
    )
  }
}

export default Footer
