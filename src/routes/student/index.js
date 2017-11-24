/**
 * Created by raoul on 17-7-16.
 */
import React from 'react'
import menuConfig from './config/menu.json'
import { connect } from 'dva'
import '../admin/index.less'
import Sider from '../../components/Layout/Sider'
const StudentPage = ({children, location, studentContest}) => (
  <div className='main-wrapper'>
    <sider className='sider light'>
      <Sider menuConfig={menuConfig} location={location} query={studentContest.query} />
    </sider>
    <div className='main-container'>
      {children}
    </div>
  </div>
)

export default connect(({studentContest}) => ({studentContest}))(StudentPage)
