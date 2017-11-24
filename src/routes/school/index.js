import React from 'react'
import menuConfig from './config/menu.json'
import Sider from '../../components/Layout/Sider'
import '../admin/index.less'

import { connect } from 'dva'
const SchoolPage = ({location, app, children, school}) => (
  <div className='main-wrapper'>
    <sider className='sider light'>
      <Sider menuConfig={menuConfig} location={location} app={app} query={school.query} />
    </sider>
    <div className='main-container'>
      {children}
    </div>
  </div>
)

export default connect(({app, school}) => ({app, school}))(SchoolPage)
