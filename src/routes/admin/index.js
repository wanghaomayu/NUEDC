/**
 * Created by out_xu on 17/7/7.
 */
import React from 'react'
import menuConfig from './config/menu.json'
import { connect } from 'dva'
import Sider from '../../components/Layout/Sider'
import './index.less'
const AdminPage = ({children, location, contest}) => (
  <div className='main-wrapper'>
    <sider className='sider light'>
      <Sider menuConfig={menuConfig} location={location} query={contest.query} />
    </sider>
    <div className='main-container'>
      {children}
    </div>
  </div>
)

export default connect(({app, contest}) => ({app, contest}))(AdminPage)
