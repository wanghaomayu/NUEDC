/**
 * Created by Pororo on 17/7/7.
 */
import React from 'react'
import './index.less'
import ShowItems from './ShowItems'
import { connect } from 'dva'

const news = ({children}) => {
  return (
    <div className='news-wrapper'>
      {
        children ||
        <div className='newsCard'>
          <div className='news-content'>
            <ShowItems />
          </div>
        </div>
      }
    </div>
  )
}

export default connect(({app, news}) => ({app, news}))(news)
